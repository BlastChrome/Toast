import pubSub from "./pubsub.js";
import EVENTS from "./events.js";

class Toast {
  constructor() {
    this.toastEl = document.querySelector(".toast");
    this.timing = 1000;
    this.PubSub = pubSub;
    this.PubSub.subscribe(EVENTS.showToast, () => {
      console.log("showing toast");
    });
    this.PubSub.subscribe(EVENTS.hideToast, () => {
      console.log("hiding toast");
    });
  }

  showToast(message) {
    this.toastEl.querySelector(".toast__message").innerHTML = message;
    this.toastEl.classList.add("show");
    this.hideToast();
    this.PubSub.publish(EVENTS.showToast);
  }

  hideToast() {
    setTimeout(() => {
      this.toastEl.classList.remove("show");
      this.toastEl.classList.add("hide");
      this.toastEl.classList.remove("hide");
      this.PubSub.publish(EVENTS.hideToast);
    }, this.timing);
  }
}
export default Toast;
