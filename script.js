// Elements
const navToggleBtn = document.getElementById("nav-toggle");
const navToggleIcon = navToggleBtn.querySelector("i");
const mobileNav = document.getElementById("mobile-nav");
const navLinks = document.querySelectorAll(".nav-link");

// ==========================================================
// DATA
// ==========================================================
var testimonials = [
  {
    id: 1,
    name: "Sarah L",
    kindWord:
      "Coming home after a PURESPACE clean is honestly the best feeling. Everything looks beautiful, smells fresh, and even the little details are taken care of. It's become one of my favorite things to do for myself.",
    location: "Austin, Texas, USA",
    imgUrl: "av-1.png",
  },
  {
    id: 2,
    name: "Michael R",
    kindWord:
      "I've tried a few cleaning services before, but PURESPACE really stands out. The team is punctual, professional, and incredibly thorough. Coming home to a spotless space makes such a difference after a long workday.",
    location: "Dallas, Texas, USA",
    imgUrl: "av-2.png",
  },
  {
    id: 3,
    name: "Emily W",
    kindWord:
      "Booking was simple, the service was excellent, and every room felt refreshed. I especially appreciate the attention to the little details. PURESPACE has made keeping my home clean so much easier.",
    location: "Denver, Colorado, USA",
    imgUrl: "av-3.png",
  },
  {
    id: 4,
    name: "Olivia M",
    kindWord:
      "PURESPACE gives me more time to enjoy the things I love instead of worrying about cleaning. The team is friendly, reliable, and always leaves my home feeling fresh and peaceful. I couldn't be happier with the experience.",
    location: "Portland, Oregon, USA",
    imgUrl: "av-4.png",
  },
];
// Functions
const isMenuOpen = () => mobileNav.classList.contains("is-open");

const setMenu = (open) => {
  mobileNav.classList.toggle("is-open", open);

  navToggleIcon.classList.toggle("ri-menu-line", !open);
  navToggleIcon.classList.toggle("ri-close-large-line", open);

  navToggleBtn.setAttribute("aria-expanded", String(open));
  navToggleBtn.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
};

const setCurrentLink = (link) => {
  navLinks.forEach((x) => {
    if (x.getAttribute("href") === link) {
      x.classList.add("is-current");
      x.setAttribute("aria-current", true);
    } else {
      x.classList.remove("is-current");
      x.removeAttribute("aria-current");
    }
  });
};

// Event listeners
navToggleBtn.addEventListener("click", () => {
  setMenu(!isMenuOpen());
});

document.addEventListener("click", (event) => {
  const link = event.target.closest(".nav-link");

  if (link) {
    setCurrentLink(link.getAttribute("href"));
    setMenu(false);
  } else {
    return;
  }
});

// Testimonials
const testimonialFirst = document.getElementById("testimonial-1");
const testimonialSecond = document.getElementById("testimonial-2");

const renderCard = (card, index) => {
  const testimonial = testimonials[index];

  card.querySelector(".quote-text").textContent = testimonial.kindWord;
  card.querySelector(".person").textContent = testimonial.name;
  card.querySelector(".avatar").src = `./src/img/client/${testimonial.imgUrl}`;

  const location = card.querySelector(".location");
  if (location) {
    location.textContent = testimonial.location;
  }
};

let currentIndex = 0;

const renderHTML = () => {
  renderCard(testimonialFirst, currentIndex);

  const secondIndex = (currentIndex + 1) % testimonials.length;
  renderCard(testimonialSecond, secondIndex);
};

renderHTML();

document.addEventListener("click", (event) => {
  const clickedBtn = event.target.closest(".testi-cta");

  if (!clickedBtn) return;

  switch (clickedBtn.id) {
    case "next":
      currentIndex = (currentIndex + 1) % testimonials.length;
      break;

    case "prev":
      currentIndex =
        (currentIndex - 1 + testimonials.length) % testimonials.length;
      break;

    default:
      return;
  }

  renderHTML();
});
