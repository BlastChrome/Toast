import Toast from "./toast.js";
import PubSub from "./pubsub.js";
import EVENTS from "./events.js";

const main = (() => {
  const pubsub = new PubSub();
  const toast = new Toast(pubsub);

  const handleToastButtonClick = e => {
    const type = e.target.dataset.toastType;
    const message = e.target.dataset.toastMessage;
    toast.showToast({ message, type });
  };
  const toastButtons = [...document.querySelectorAll("[data-toast-trigger]")];

  toastButtons.forEach(button => button.addEventListener("click", handleToastButtonClick));
})();
