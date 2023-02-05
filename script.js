'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
///////////////////////////////////////
// Modal window

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(open => open.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//document.documentElement.style.setProperty('--color-primary', 'red');

btnScrollTo.addEventListener('click', function () {
  //const section1Coords = section1.getBoundingClientRect();
  //window.scrollTo({
  // left: section1Coords.left + window.pageXOffset,
  //  top: section1Coords.top + window.pageYOffset,
  //  behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});
/*
const nav = document.querySelector('.nav__link');
nav.addEventListener('click', function (e) {
  this.style.backgroundColor = 'red';
  console.log(e.target);
});*/
const navLinks = document.querySelector('.nav__links');

navLinks.addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target.classList.contains('nav__link')) {
    const href = event.target.getAttribute('href');
    console.log(event.target);
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
  }
});
const h1 = document.querySelector('h1');
/*
h1.querySelectorAll('.highlight');
h1.firstElementChild.style.color = 'red';
h1.lastElementChild.style.color = 'black';
h1.parentElement;
h1.closest('.header').style.backgroundColor = 'orangered';
console.log(h1.nextElementSibling);
h1.previousElementSibling;
h1.nextElementSibling;
h1.parentElement.children;
*/
const container = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const content = document.querySelectorAll('.operations__content');

container.addEventListener('click', function (event) {
  const tab = event.target.closest('.operations__tab');
  if (!tab) return;
  //remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  content.forEach(c => c.classList.remove('operations__content--active'));
  //add active class to the clicked button
  tab.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${tab.dataset.tab}`)
    .classList.add('operations__content--active');
});

const logo = document.querySelector('.nav__logo');
const link = document.querySelectorAll('.nav__link');
const nav = document.querySelector('.nav');

const linkOpacity = function (event) {
  if (event.target.classList.contains('nav__link')) {
    logo.style.opacity = this;
    link.forEach(l => {
      if (event.target !== l) l.style.opacity = this;
    });
  }
};

nav.addEventListener('mouseover', linkOpacity.bind(0.5));

nav.addEventListener('mouseout', linkOpacity.bind(1));

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const obsHeader = function (entries) {
  if (!entries[0].isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(obsHeader, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

const sections = document.querySelectorAll('.section');

const sectionFunction = function (entries, observer) {
  if (entries[0].isIntersecting) {
    entries[0].target.classList.remove('section--hidden');
    observer.unobserve(entries[0].target);
  }
};

const sectionObserver = new IntersectionObserver(sectionFunction, {
  root: null,
  threshold: 0.15,
});

sections.forEach(sec => {
  sectionObserver.observe(sec);
  //sec.classList.add('section--hidden');
});

const featuresImg = document.querySelectorAll('img[data-src]');

const imgFunction = function (entries, observer) {
  if (entries[0].isIntersecting) {
    const dataImg = entries[0].target.dataset.src;
    entries[0].target.src = `${dataImg}`;
    entries[0].target.addEventListener('load', function () {
      entries[0].target.classList.remove('lazy-img');
    });
    observer.unobserve(entries[0].target);
  }
};

const imgObserver = new IntersectionObserver(imgFunction, {
  root: null,
  threshold: 1,
});

featuresImg.forEach(img => imgObserver.observe(img));

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');
const dots = document.querySelectorAll('.dots__dot');

const slideMax = slides.length;
let slideState = 0;

const createDots = function () {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

const activeDot = function (number) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${number}"]`)
    .classList.add('dots__dot--active');
};

dotsContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('dots__dot')) {
    slideState = +event.target.dataset.slide;
    slideLoop();
  }
});

const slideLoop = function () {
  slides.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${100 * (i - slideState)}%)`)
  );
  activeDot(slideState);
};
slideLoop();

const btnRightFunc = function () {
  slideState === slideMax - 1 ? (slideState = 0) : slideState++;
  slideLoop();
};

const btnLeftFunc = function () {
  slideState === 0 ? (slideState = slideMax - 1) : slideState--;
  slideLoop();
};

btnRight.addEventListener('click', btnRightFunc);

btnLeft.addEventListener('click', btnLeftFunc);

document.addEventListener('keydown', function (event) {
  event.key === 'ArrowLeft'
    ? btnLeftFunc()
    : event.key === 'ArrowRight'
    ? btnRightFunc()
    : '';
});
