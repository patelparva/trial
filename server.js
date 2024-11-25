const express = require("express");
const path = require("path");
const firebase = require("firebase/app");
const firestore = require("firebase/firestore");
const {
  query,
  orderBy,
  limit,
  collection,
  getDocs,
} = require("firebase/firestore");

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public"));

// Firebase initialization
const firebaseConfig = {
  apiKey: "AIzaSyAv0Dq-BelCiwDC74N-BX6E8jw3w_jST24",
  authDomain: "bookesc-a45ef.firebaseapp.com",
  projectId: "bookesc-a45ef",
  storageBucket: "bookesc-a45ef.appspot.com",
  messagingSenderId: "54131302420",
  appId: "1:54131302420:web:2ffbf3846e03e4a1a1c701",
  measurementId: "G-8RQKCJR9GG",
};

const fapp = firebase.initializeApp(firebaseConfig);

const db = firestore.getFirestore(fapp);
// Firebase End

app.get("/", async (req, res) => {
  res.sendFile(path.join(initial_path, "pages/home.html"));
});

// About
app.get("/about-us", (req, res) => {
  res.sendFile(path.join(initial_path, "pages/about.html"));
});

// Contact
app.get("/contact-us", (req, res) => {
  res.sendFile(path.join(initial_path, "pages/contact.html"));
});

// Robots.txt
app.get("/robots.txt", (req, res) => {
  res.sendFile(path.join(initial_path, "robots.txt"));
});

// Textbook Solutions Starts
app.get("/tb-solutions", (req, res) => {
  res.sendFile(path.join(initial_path, "pages/tb-solutions/main.html"));
});

app.get("/tb-solutions/:board", (req, res) => {
  res.sendFile(path.join(initial_path, "pages/tb-solutions/boardDetails.html"));
});

getSubjects = async (grade) => {
  var data = "";

  const ref = collection(db, "Solutions");
  const querySnapshot = await getDocs(ref);

  querySnapshot.forEach((temp_var) => {
    if (temp_var.id == "NCERT") {
      data = temp_var.data()["grade" + grade.split("class-").pop()];
    }
  });

  return data;
};

app.get("/tb-solutions/:board/:class", async (req, res) => {
  const currentUrl = req.url;
  var subjects = await getSubjects(currentUrl.split("/")[3]);

  if (subjects == "") {
    res.sendFile(path.join(initial_path, "pages/404-page.html"));
  } else {
    res.render("pages/tb-solutions/classDetails.ejs", {
      data: subjects,
      board: currentUrl.split("/")[2],
      grade: currentUrl.split("/")[3],
    });
  }
});

getChapters = async (grade, subject) => {
  var data = "";
  new_data = [];

  const ref = collection(db, "Solutions");
  const querySnapshot = await getDocs(ref);

  querySnapshot.forEach((temp_var) => {
    if (temp_var.id == "NCERT") {
      data = temp_var.data()["grade" + grade.split("class-").pop()][subject];
    }
  });

  for (var temp_data in data) {
    if (temp_data != "book_name") {
      new_data.push(temp_data);
    }
  }

  new_data.sort(function (a, b) {
    return a.split("r")[1] - b.split("r")[1];
  });

  return [new_data, data];
};

app.get("/tb-solutions/:board/:class/:subject", async (req, res) => {
  const currentUrl = req.url;
  var chapters = await getChapters(
    currentUrl.split("/")[3],
    currentUrl.split("/")[4]
  );

  if (chapters == "") {
    res.sendFile(path.join(initial_path, "pages/404-page.html"));
  } else {
    res.render("pages/tb-solutions/subjectDetails.ejs", {
      data: chapters[1],
      _list: chapters[0],
      board: currentUrl.split("/")[2],
      grade: currentUrl.split("/")[3],
      subject: currentUrl.split("/")[4],
    });
  }
});

getChapter = async (grade, subject, chapter) => {
  var data = "";

  const ref = collection(db, "Solutions");
  const querySnapshot = await getDocs(ref);

  querySnapshot.forEach((temp_var) => {
    if (temp_var.id == "NCERT") {
      data =
        temp_var.data()["grade" + grade.split("class-").pop()][subject][
          "chapter" + chapter
        ];
    }
  });

  return data;
};

app.get("/tb-solutions/:board/:class/:subject/:chapter", async (req, res) => {
  const currentUrl = req.url;
  var chapter = await getChapter(
    currentUrl.split("/")[3],
    currentUrl.split("/")[4],
    currentUrl.split("/")[5].split("-")[1]
  );

  if (chapter == "") {
    res.sendFile(path.join(initial_path, "pages/404-page.html"));
  } else {
    res.render("pages/tb-solutions/chapterSolutions.ejs", {
      data: chapter,
      board: currentUrl.split("/")[2],
      grade: currentUrl.split("/")[3],
      subject: currentUrl.split("/")[4],
      chapter: currentUrl.split("/")[5].split("-")[1],
    });
  }
});
// Textbook Solution Ends

// Textbook PDF's Starts
app.get("/tb-pdf/gseb", (req, res) => {
  res.sendFile(path.join(initial_path, "pages/tb-pdf/gseb.html"));
});

app.get("/tb-pdf/ncert", (req, res) => {
  res.sendFile(path.join(initial_path, "pages/tb-pdf/ncert.html"));
});

// Practice Papers
app.get("/practice-papers", (req, res) => {
  res.sendFile(path.join(initial_path, "pages/practice-papers/main.html"));
});

// Blogs

getBlogs = async () => {
  var data = [];

  const blog_ref = collection(db, "Blogs");
  const q = query(blog_ref, orderBy("timestamp", "desc"), limit(10));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((blog) => {
    data.push(blog.data());
  });

  return [data];
};

get_specific_blog = async (url_title) => {
  var data = "";

  const blog_ref = collection(db, "Blogs");
  const q = query(blog_ref, orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((blog) => {
    if (blog.data()["title"].toLowerCase().replace(/ /g, "-") == url_title) {
      data = blog.data();
    }
  });

  return data;
};

app.get("/blogs", async (req, res) => {
  const blog_data = await getBlogs();

  res.render("pages/blogs/main.ejs", {
    data: blog_data[0],
  });
});

app.get("/blogs/:blog", async (req, res) => {
  const currentUrl = req.url;

  const blog_data = await get_specific_blog(currentUrl.split("/")[2]);

  if (blog_data == "") {
    res.sendFile(path.join(initial_path, "pages/404-page.html"));
  } else {
    res.render("pages/blogs/blog.ejs", { data: blog_data });
  }
});
// Blogs End

// Privacy Policy
app.get("/privacy-policy", (req, res) => {
  res.sendFile(path.join(initial_path, "pages/privacy-policy.html"));
});

// T&C's
app.get("/terms-and-conditions", (req, res) => {
  res.sendFile(path.join(initial_path, "pages/terms-and-conditions.html"));
});

// Sitemap
app.get("/sitemap", (req, res) => {
  res.sendFile(path.join(__dirname, "sitemap.txt"));
});

app.get("/sitemap-xml", (req, res) => {
  res.sendFile(path.join(__dirname, "sitemap.xml"));
});

// 404 page
app.use((req, res) => {
  res.sendFile(path.join(initial_path, "pages/404-page.html"));
});

app.listen(3000, () => {
  console.log("listening......");
});
