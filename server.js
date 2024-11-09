const express = require("express");
const path = require("path");

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));

app.get("/", (req, res) => {
  res.sendFile(path.join(initial_path, "pages/home.html"));
});

app.get("/about-us", (req, res) => {
  res.sendFile(path.join(initial_path, "pages/about.html"));
});

// Textbook Solutions Starts
app.get("/tb-solutions", (req, res) => {
  res.sendFile(path.join(initial_path, "pages/tb-solutions/main.html"));
});

app.get("/tb-solutions/:board", (req, res) => {
  res.sendFile(path.join(initial_path, "pages/tb-solutions/boardDetails.html"));
});

app.get("/tb-solutions/:board/:class", (req, res) => {
  res.sendFile(path.join(initial_path, "pages/tb-solutions/classDetails.html"));
});

app.get("/tb-solutions/:board/:class/:subject", (req, res) => {
  res.sendFile(
    path.join(initial_path, "pages/tb-solutions/subjectDetails.html")
  );
});

app.get("/tb-solutions/:board/:class/:subject/:chapter", (req, res) => {
  res.sendFile(
    path.join(initial_path, "pages/tb-solutions/chapterSolutions.html")
  );
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
app.get("/blogs", (req, res) => {
  res.sendFile(path.join(initial_path, "pages/blogs/main.html"));
});

// FAQ's
app.get("/faqs", (req, res) => {
  res.sendFile(path.join(initial_path, "pages/faq.html"));
});

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
