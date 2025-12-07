import EVENTS from "./events.js";
class ColorHistory {
  constructor(pubsub) {
    this.history = [];
    this.limit = 3;
    this.count = 0;
    this.pubsub = pubsub;
    this.stop = this.pubsub.subscribe(EVENTS.colorChanged, this.addColorToHistory.bind(this));
  }

  addColorToHistory({ newColor }) {
    this.history.push(newColor);
    if (this.history.length > this.limit) {
      this.history.shift();
    }
    this.count++;
    this.pubsub.publish(EVENTS.historyUpdated, {
      count: this.count,
      message: `history update: ${this.count} time(s)`,
    });
  }
}
export default ColorHistory;
