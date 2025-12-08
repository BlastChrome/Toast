import EVENTS from "./events.js";
class Toast {
  constructor(pubsub) {
    this.toastDuration = 2000; // default value
    this.toastEl = document.querySelector(".toast");
    this.toastIcons = {
      success: "✅",
      error: "❌",
      info: "ℹ️",
      warning: "⚠️",
    };
    this.pubSub = pubsub;
    this.pubSub.subscribe(EVENTS.colorChanged, this.showToast.bind(this));
  }

  showToast({ message, type, duration = 5000 } = {}) {
    const toastMessage = message || "Update available";
    const toastType = type || "success";
    const toastDuration = duration || this.toastDuration;

    this.toastEl.querySelector(".toast__message").textContent = toastMessage;
    this.toastEl.querySelector(".toast__icon").textContent = this.toastIcons[toastType];
    this.toastEl.classList.add("show");
    this.toastEl.classList.add(`toast--${toastType}`);
    this.hideToast(toastDuration);
    this.pubSub.publish(EVENTS.showToast, {
      message: toastMessage,
      type: toastType,
      duration: toastDuration,
      timeStamp: new Date(),
    });
  }

  hideToast(duration) {
    setTimeout(() => {
      const classesToRemove = this.toastEl.classList.value.split(" ").filter(item => item !== "toast");
      this.toastEl.classList.remove(...classesToRemove);
      this.pubSub.publish(EVENTS.hideToast);
    }, duration);
  }
}
export default Toast;
