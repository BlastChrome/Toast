import pubSub from "./pubsub.js";
import Toast from "./toast.js";
import EVENTS from "./events.js";

const main = (() => {
  const toast = new Toast();

  const MIN = 1;
  const MAX = 9;
  const button = document.querySelector("button");

  const handleButtonClick = () => {
    const currClass = button.classList.value;
    const newClass = `color-${
      Math.floor(Math.random() * (MAX - MIN + 1)) + MIN
    }`;
    button.classList = newClass;
    pubSub.publish(EVENTS.colorChanged, "color has been changed");
  };

  button.addEventListener("click", handleButtonClick);

  pubSub.subscribe(EVENTS.colorChanged, (data) => {
    toast.showToast(data);
  });
  pubSub.subscribe(EVENTS.hideToast, handleButtonClick);
})();
