import PubSub from "./pubsub.js";
import Toast from "./toast.js";

const main = (() => {
  const pubSub = new PubSub();
  const toast = new Toast();

  const MIN = 1;
  const MAX = 9;
  const button = document.querySelector("button");

  const EVENTS = {
    colorChanged: "color:changed",
  };

  const handleButtonClick = (e) => {
    const button = e.target;
    const currClass = button.classList.value;
    const newClass = `color-${
      Math.floor(Math.random() * (MAX - MIN + 1)) + MIN
    }`;
    button.classList = newClass;
    pubSub.publish(EVENTS.colorChanged, newClass);
  };

  button.addEventListener("click", handleButtonClick);

  pubSub.subscribe(EVENTS.colorChanged, toast.showToast("show toast"));
})();
