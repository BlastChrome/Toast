import EVENTS from "./events.js";
class Toast {
  constructor(pubsub) {
    this.toastDuration = 0; // default value, 0 keeps the toast out until dismissed
    this.toastEl = document.querySelector(".toast");
    this.toastIcons = {
      success: "✅",
      error: "❌",
      info: "ℹ️",
      warning: "⚠️",
    };
    this.pubSub = pubsub;

    this.toastEl.addEventListener("click", this.handleToastClick.bind(this));
  }

  showToast({ message, type, duration, sticky } = {}) {
    const toastMessage = message || "Update available";
    const toastType = type || "success";
    const toastDuration = duration || this.toastDuration;
    const toastSticky = sticky == "on" ? true : false;

    const toastPayload = {
      message: toastMessage,
      type: toastType,
      duration: toastDuration,
      sticky: toastSticky,
      timeStamp: new Date(),
    };

    this.toastEl.querySelector(".toast__message").textContent = toastMessage;
    this.toastEl.querySelector(".toast__icon").textContent =
      this.toastIcons[toastType];

    this.toastEl.classList.add("show");
    this.toastEl.classList.add(`toast--${toastType}`);

    this.pubSub.publish(EVENTS.showToast, toastPayload);
    if (!toastSticky) this.hideToast(toastDuration);
  }

  hideToast(duration) {
    setTimeout(() => {
      const classesToRemove = this.toastEl.classList.value
        .split(" ")
        .filter((item) => item !== "toast");
      this.toastEl.classList.remove(...classesToRemove);
      this.pubSub.publish(EVENTS.hideToast);
    }, duration);
  }

  handleToastClick(e) {
    const dismissToast = e.target.closest(".toast__action");
    if (!dismissToast) return;
    this.hideToast();
  }
}
export default Toast;
