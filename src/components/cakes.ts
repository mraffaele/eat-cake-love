const slidePauseTime = 5000;
let cakes: NodeListOf<Element>;
let pips: NodeListOf<Element>;
let currentSlideIndex = 0;
let previousSlideIndex: number;

const getNextSlideIndex = (): number => {
  const maxSlides = cakes.length;
  let nextSlideIndex = currentSlideIndex + 1;
  if (nextSlideIndex > maxSlides - 1) {
    nextSlideIndex = 0;
  }
  return nextSlideIndex;
};

const doNextSlide = (): void => {
  let nextSlideIndex = getNextSlideIndex();
  changeSlide(nextSlideIndex);
  changePips(nextSlideIndex);
  previousSlideIndex = currentSlideIndex;
  currentSlideIndex = nextSlideIndex;
  wait();
};

const preloadSlide = (index: number): void => {
  const img = new Image();
  const imgSrc = cakes[index].getAttribute("src") as string;
  img.setAttribute("src", imgSrc);
  console.log(img);
};

const changeSlide = (
  nextIndex: number,
  currentIndex: number = currentSlideIndex
): void => {
  const previousSlideClassName = "cake--previous";
  const currentSlideClassName = "cake--active";
  if (previousSlideIndex !== undefined) {
    cakes[previousSlideIndex].classList.remove(previousSlideClassName);
  }
  cakes[currentIndex].classList.remove(currentSlideClassName);
  cakes[currentIndex].classList.add(previousSlideClassName);
  cakes[nextIndex].classList.add(currentSlideClassName);
};

const changePips = (
  nextIndex: number,
  currentIndex: number = currentSlideIndex
): void => {
  const currentPipClassName = "pip--active";
  pips[currentIndex].classList.remove(currentPipClassName);
  pips[nextIndex].classList.add(currentPipClassName);
};

const nextSlide = (): void => {
  requestAnimationFrame(doNextSlide);
};

const wait = (): void => {
  preloadSlide(getNextSlideIndex());
  setTimeout(nextSlide, slidePauseTime);
};

const createPips = (): void => {
  const container = document.createElement("ol");
  container.classList.add("pips");
  const pip = document.createElement("li");
  pip.className = "pip";

  for (let i = 0; i < cakes.length; i++) {
    const clone = pip.cloneNode(true) as unknown as any;
    clone.setAttribute("data-jumpIndex", i);
    if (i === 0) {
      clone.classList.add("pip--active");
    }
    container.appendChild(clone);
  }

  document.querySelector(".pips")?.replaceWith(container);
};

const setup = (): void => {
  cakes = document.querySelectorAll(".cake");
  createPips();
  pips = document.querySelectorAll(".pip");
  wait();
};

export const bake = setup;
