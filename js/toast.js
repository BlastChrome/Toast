import EVENTS from "./events.js";

class Toast {
  constructor(pubsub) {
    this.timing = 1000;
    this.toastEl = document.querySelector(".toast");
    this.pubSub = pubsub;
    this.pubSub.subscribe(EVENTS.historyUpdated, this.showToast.bind(this));
  }

  showToast({ message }) {
    this.toastEl.querySelector(".toast__message").innerHTML = message;
    this.toastEl.classList.add("show");
    this.hideToast();
    this.pubSub.publish(EVENTS.showToast);
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
