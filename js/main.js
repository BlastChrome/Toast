import Toast from "./toast.js";
import PubSub from "./pubsub.js";
import EVENTS from "./events.js";

const main = (() => {
  const pubsub = new PubSub();
  const toast = new Toast(pubsub);

  const handleToastButtonClick = e => {
    const type = e.target.dataset.toastType;
    const message = e.target.dataset.toastMessage;
    const duration = e.target.dataset.toastDuration;
    toast.showToast({ message, type, duration });
  };

  const handleToastFormSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const toastValues = {};
    for (const [key, value] of formData.entries()) {
      toastValues[key] = value;
    }
    toast.showToast(toastValues);
  };

  const toastButtons = [...document.querySelectorAll("[data-toast-trigger]")];
  const toastForm = document.querySelector(".toast-form");
  toastButtons.forEach(button => button.addEventListener("click", handleToastButtonClick));
  toastForm.addEventListener("submit", handleToastFormSubmit);
})();
