import EVENTS from "./events.js";

class Toast {
  constructor(pubsub) {
    this.timing = 1000;
    this.toastEl = document.querySelector(".toast");
    this.pubSub = pubsub;
    this.pubSub.subscribe(EVENTS.colorChanged, this.showToast.bind(this));
  }

  showToast({ message } = {}) {
    const toastMessage = message || "Update available";
    this.toastEl.querySelector(".toast__message").innerHTML = toastMessage;
    this.toastEl.classList.add("show");
    this.hideToast();
    this.pubSub.publish(EVENTS.showToast, { message: toastMessage });
  }

  hideToast() {
    setTimeout(() => {
      this.toastEl.classList.remove("show");
      this.toastEl.classList.add("hide");
      this.toastEl.classList.remove("hide");
      this.pubSub.publish(EVENTS.hideToast);
    }, this.timing);
  }
}
export default Toast;
