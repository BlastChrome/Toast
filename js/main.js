import Toast from "./toast.js";
import PubSub from "./pubsub.js";
import EVENTS from "./events.js";

const main = (() => {
  const pubsub = new PubSub();
  const toast = new Toast(pubsub);

  const MIN = 1;
  const MAX = 9;
  const button = document.querySelector("button");

  const handleButtonClick = () => {
    const currClass = button.classList.value;
    const newClass = `color-${Math.floor(Math.random() * (MAX - MIN + 1)) + MIN}`;
    button.classList = newClass;
    pubsub.publish(EVENTS.colorChanged, {
      oldColor: currClass,
      newColor: newClass,
      message: "show toast",
    });
  };

  button.addEventListener("click", handleButtonClick);
})();
