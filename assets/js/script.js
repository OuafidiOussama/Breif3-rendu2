
/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const menuToggleBtn = document.querySelector("[data-menu-toggle-btn]");

menuToggleBtn.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

window.addEventListener("resize", (evt)=>{
  if(evt.target.innerWidth < 500){
    document.querySelectorAll(".menu").forEach((element)=>{
      element.classList.add("has-scrollbar");
    });
  }else{
    document.querySelectorAll(".menu").forEach((element)=>{
      element.classList.remove("has-scrollbar");
    });
  }
});


