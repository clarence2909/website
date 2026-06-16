const brands = [
  {
    name: "BYOMA",
    title: "SCIENCE-BACKED, CLINICALLY-PROVEN SKIN BARRIER CARE",
    copy: "With a mission to democratise and demystify beauty, every product is powered by barrier-first complexes that are clinically proven to deliver targeted results while protecting skin barrier health.",
    year: "2025",
    bg: "linear-gradient(135deg, #d8f48d, #86c675 48%, #eaf7c5)",
    panel: "#d8f48d",
    color: "#000"
  },
  {
    name: "Ethique Beauty",
    title: "Clean, Effective, and Ethical Solid Shampoos + Conditioners",
    copy: "Concentrated, clean ingredients in solid bars, delivering results that are better for hair and the planet.",
    year: "2020",
    bg: "linear-gradient(135deg, #fbecd0, #dfa15b 48%, #f8d8c0)",
    panel: "#f2d09c",
    color: "#000"
  },
  {
    name: "Eva NYC",
    title: "A New Generation of Haircare",
    copy: "Brooklyn-born hair products crafted to a higher standard with science-backed and responsibly sourced ingredients.",
    year: "2022",
    bg: "linear-gradient(135deg, #ffc4d0, #f07092 45%, #ffd8a9)",
    panel: "#f5b7c8",
    color: "#000"
  },
  {
    name: "amika",
    title: "salon-raised haircare rooted in results for all",
    copy: "A fearless haircare brand rooted in clinical results and formulas that nourish your skin, scalp, and strands.",
    year: "2022",
    bg: "linear-gradient(135deg, #bee1f7, #6989c8 50%, #f5d85f)",
    panel: "#6d2d33",
    color: "#bee1f7"
  }
];

const testimonials = [
  {
    text: "Bansk Beauty leverages its capabilities and network to support brands in reaching the next level while celebrating their individuality.",
    author: "Amanda Wallbrink, VP Consumer Private Equity at Bansk Group"
  },
  {
    text: "Purpose-united teams collaborate seamlessly, conquer challenges resolutely, and innovate fearlessly.",
    author: "Heather McGowan, Author & Futurist"
  },
  {
    text: "They have nurtured some of the best brands in beauty, crafting thriving communities essential to sustainable growth.",
    author: "Conor Begley, Chief Strategy Officer and Co-founder at Creator IQ"
  }
];

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-btn");
const mobileNav = document.querySelector(".mobile-nav");

function updateHeader() {
  if (!header) return;
  header.classList.toggle("is-sticky", window.scrollY > 10);
}

function toggleMenu() {
  const isOpen = menuButton.classList.toggle("active");
  mobileNav.classList.toggle("active", isOpen);
  header.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  document.body.style.overflow = isOpen ? "hidden" : "";
}

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", toggleMenu);
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (menuButton.classList.contains("active")) toggleMenu();
    });
  });
}

window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("load", () => {
  if (window.location.hash) {
    document.querySelector(window.location.hash)?.scrollIntoView();
  }
  updateHeader();
  window.setTimeout(updateHeader, 100);
});
updateHeader();

const carousel = document.querySelector(".brand-carousel");
const brandSection = document.querySelector(".brand-section");
let activeBrand = 2;
let expandedBrand = null;

function renderBrands() {
  if (!carousel) return;
  carousel.innerHTML = brands.map((brand, index) => `
    <article class="brand-slide" style="--brand-bg:${brand.bg};--brand-panel:${brand.panel};--brand-color:${brand.color};">
      <div class="brand-hero" role="button" tabindex="0" aria-label="Open ${brand.name}">
        <div class="brand-logo-text">${brand.name}</div>
      </div>
      <div class="brand-info">
        <button class="brand-info-close" type="button" aria-label="Close ${brand.name} details">&times;</button>
        <div class="brand-info-left">
          <h3>${brand.title}</h3>
          <p>${brand.copy}</p>
          <a class="pill-btn brand-button" href="#">Visit Website</a>
          <div class="brand-meta">
            <span>Year Of Investment:</span>
            <span>${brand.year}</span>
          </div>
        </div>
        <div class="brand-gallery" aria-hidden="true">
          <span class="gallery-tile"></span>
          <span class="gallery-tile"></span>
          <span class="gallery-tile"></span>
          <span class="gallery-tile"></span>
        </div>
      </div>
    </article>
  `).join("");

  carousel.querySelectorAll(".brand-hero").forEach((hero, index) => {
    hero.addEventListener("click", () => expandBrand(index));
    hero.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        expandBrand(index);
      }
    });
  });
  carousel.querySelectorAll(".brand-info-close").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      collapseBrand();
    });
  });
  updateBrandClasses();
}

function updateBrandClasses() {
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll(".brand-slide")];
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === activeBrand);
    slide.classList.toggle("prev", index === (activeBrand - 1 + brands.length) % brands.length && expandedBrand === null);
    slide.classList.toggle("next", index === (activeBrand + 1) % brands.length && expandedBrand === null);
    slide.classList.toggle("expanded", index === expandedBrand);
  });
  brandSection?.classList.toggle("opened", expandedBrand !== null);
}

function goBrand(direction) {
  activeBrand = (activeBrand + direction + brands.length) % brands.length;
  if (expandedBrand !== null) {
    expandedBrand = activeBrand;
  }
  updateBrandClasses();
}

function expandBrand(index) {
  activeBrand = index;
  expandedBrand = expandedBrand === index && window.innerWidth <= 768 ? null : index;
  updateBrandClasses();
}

function collapseBrand() {
  expandedBrand = null;
  updateBrandClasses();
}

renderBrands();
document.querySelector(".prev-brand")?.addEventListener("click", () => goBrand(-1));
document.querySelector(".next-brand")?.addEventListener("click", () => goBrand(1));
document.querySelector(".brand-close")?.addEventListener("click", collapseBrand);

let autoBrand = window.setInterval(() => goBrand(1), 14000);
brandSection?.addEventListener("mouseenter", () => window.clearInterval(autoBrand));
brandSection?.addEventListener("mouseleave", () => {
  autoBrand = window.setInterval(() => goBrand(1), 14000);
});

const testimonialText = document.querySelector(".testimonial-text");
const testimonialAuthor = document.querySelector(".testimonial-author");
let activeTestimonial = 0;

function updateTestimonial() {
  if (!testimonialText || !testimonialAuthor) return;
  testimonialText.textContent = `"${testimonials[activeTestimonial].text}"`;
  testimonialAuthor.textContent = testimonials[activeTestimonial].author;
}

function goTestimonial(direction) {
  activeTestimonial = (activeTestimonial + direction + testimonials.length) % testimonials.length;
  updateTestimonial();
}

document.querySelector(".testimonial-prev")?.addEventListener("click", () => goTestimonial(-1));
document.querySelector(".testimonial-next")?.addEventListener("click", () => goTestimonial(1));
updateTestimonial();

const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("visible"));
}
