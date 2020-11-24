@@include("files/regular.js", {});
@@include("files/script.js", {});
@@include("files/functions.js", {});
@@include("files/forms.js", {});
@@include("files/scroll.js", {});

let burgerClass = document.querySelector(".burger"),
  menuClass = document.querySelector(".menu"),
  menuList = document.querySelector(".menu__list");
body = document.querySelector("body");
// activeClass=document.querySelector(".;
console.log("burger: ", burgerClass);

burgerClass.addEventListener("click", function (e) {
  burgerClass.classList.toggle("_active");
  menuClass.classList.toggle("_active");
  menuList.classList.toggle("_active");
  body.classList.toggle("_lock");
});
