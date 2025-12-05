class PubSub {
  constructor() {
    this.events = {};
  }

  subscribe(event, cb) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(cb);
  }

  unsubscribe(event, cb) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((cb) => cb !== cb);
  }

  publish(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach((cb) => {
      cb(data);
    });
  }
}
export default PubSub;
