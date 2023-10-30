//Hamburger
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

//klik di luar hamburger
window.addEventListener("click", function (e) {
  if (e.target != hamburger && e.target != navMenu) {
    hamburger.classList.remove("hamburger-active");
    navMenu.classList.add("hidden");
  }
});

//Navbar fixed
window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
  } else {
    header.classList.remove("navbar-fixed");
  }
};

//preloader
const loader = document.querySelector("#preloader");

// Menggunakan event 'load' untuk memastikan semua sumber daya halaman telah dimuat
window.addEventListener("load", function () {
  // Menunggu 2 detik sebelum menghilangkan preloader
  setTimeout(function () {
    loader.style.display = "none";
  }, 2000); // 2000 milidetik (2 detik)
});

//audio play
// function audio() {
//   const audio = document.querySelector("#bgAudio");
//   if (audio) {
//     audio.play();
//   }
// }

//dark mode toggle
const darkToggle = document.querySelector("#dark-toggle");
const html = document.querySelector("html");

darkToggle.addEventListener("click", function () {
  if (darkToggle.checked) {
    html.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    html.classList.remove("dark");
    localStorage.theme = "light";
  }
});

//mindahin posisi toggle
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  darkToggle.checked = true;
} else {
  darkToggle.checked = false;
}

//audio permission
function autoplayUnlock(element) {
  var context = new (window.AudioContext || window.webkitAudioContext)();

  return new Promise(function (resolve, reject) {
    if (context.state === "suspended") {
      var unlock = function unlock() {
        context
          .resume()
          .then(function () {
            window.removeEventListener("keydown", unlock);
            element.removeEventListener("click", unlock);
            element.removeEventListener("touchstart", unlock);
            element.removeEventListener("touchend", unlock);

            resolve();
          })
          .catch(function (error) {
            reject(error);
          });
      };

      window.addEventListener("keydown", unlock, false);
      element.addEventListener("click", unlock, false);
      element.addEventListener("touchstart", unlock, false);
      element.addEventListener("touchend", unlock, false);
    } else {
      resolve();
    }
  });
}

var autoplayUnlockElement = document.getElementById("autoplay-unlock-overlay");
var audioElement = document.getElementById("bgAudio");

autoplayUnlock(autoplayUnlockElement)
  .then(function () {
    document.body.removeChild(autoplayUnlockElement);
    audioElement.play();
  })
  .catch(function (error) {
    console.error(error);
  });
