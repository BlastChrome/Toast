import PubSub from "./pubsub.js";
import Toast from "./toast.js";
const pubSub = new PubSub();
const toast = new Toast();

const button = document.querySelector("button");
const colors = [
  "color-1",
  "color-2",
  "color-3",
  "color-4",
  "color-5",
  "color-6",
  "color-7",
  "color-8",
  "color-9",
];
const handleButtonClick = (e) => {
  let num = getRandomIntInclusive(1, colors.length);
  const currClass = button.classList[0];
  const newClass = `color-${num}`;
  if (currClass == newClass) {
    num = getRandomIntInclusive(1, colors.length);
  }
  button.classList = "";
  button.classList.add(`color-${num}`);
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

button.addEventListener("click", handleButtonClick);
