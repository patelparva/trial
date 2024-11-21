const root = document.documentElement;
const theme_changer = document.querySelector(".theme-checkbox");

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

theme_changer.addEventListener("change", () => {
  if (theme_changer.checked) {
    root.style.setProperty("--content-background", "#242424");
  } else {
    root.style.setProperty("--content-background", "#ffffff");
  }
});

handle_loader = () => {
  document.querySelector(".loader").classList.add("d-none");

  document.querySelector(".main-container").classList.remove("d-none");
};

var board_data = {};

get_data = async () => {
  var f_data = [];
  await db
    .collection("Solutions")
    .get()
    .then((board_data) => {
      board_data.forEach((data) => {
        board_data[data.id] = data.data();

        f_data[data.id] = data.data();

        // console.log(data.data())
      });

      handle_loader();

      // console.log(board_data);
    });

  return f_data;
};

document.addEventListener("DOMContentLoaded", function () {
  el_autohide = document.querySelector(".autohide");

  // add padding-top to bady (if necessary)
  navbar_height = document.querySelector(".navbar").offsetHeight;
  document.body.style.paddingTop = navbar_height + "px";

  if (el_autohide) {
    var last_scroll_top = 0;
    window.addEventListener("scroll", function () {
      let scroll_top = window.scrollY;
      if (scroll_top < last_scroll_top) {
        el_autohide.classList.remove("scrolled-down");
        el_autohide.classList.add("scrolled-up");
      } else {
        el_autohide.classList.remove("scrolled-up");
        el_autohide.classList.add("scrolled-down");
      }
      last_scroll_top = scroll_top;
    });
  }
});

display_404 = (arg) => {
  try {
    arg;
  } catch {
    document.querySelector(".pnf-section").classList.remove("d-none");
    document.querySelector(".main-container").classList.add("d-none");
  }

  if (!arg) {
    document.querySelector(".pnf-section").classList.remove("d-none");
    document.querySelector(".main-container").classList.add("d-none");
  }
};

function randomString(length) {
  var chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");

  if (!length) {
    length = Math.floor(Math.random() * chars.length);
  }

  var str = "";
  for (var i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}
