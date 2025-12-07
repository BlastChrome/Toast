import EVENTS from "./events.js";
class Toast {
  constructor(pubsub) {
    this.toastDuration = 5000; // default value
    this.toastEl = document.querySelector(".toast");
    this.pubSub = pubsub;
    this.pubSub.subscribe(EVENTS.colorChanged, this.showToast.bind(this));
  }

  showToast({ message, type, duration = 5000 } = {}) {
    const toastMessage = message || "Update available";
    const toastType = type || "success";
    const toastDuration = duration || this.toastDuration;

    this.toastEl.querySelector(".toast__message").textContent = toastMessage;
    this.toastEl.classList.add("show");
    this.toastEl.classList.add(`toast--${toastType}`);
    this.hideToast(toastDuration);
    this.pubSub.publish(EVENTS.showToast, { message: toastMessage, type: toastType });
  }

  hideToast(duration) {
    setTimeout(() => {
      this.toastEl.classList.remove(...this.toastEl.classList);
      this.toastEl.classList.add("toast");
      this.pubSub.publish(EVENTS.hideToast);
    }, duration);
  }
}
export default Toast;
