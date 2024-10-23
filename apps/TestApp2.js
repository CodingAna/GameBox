import { Point } from "/Geometry.js";

export class TestApp2 {
  static get NAME() {return "TestApp2";}
  static get ICON() {return "#BB77FF";}


  constructor() {
  }

  init = () => {
  }

  start = () => {
  }

  renderFrame = (draw, screen, render) => {
    draw.setColor("#FF00FF");
    draw.rect(new Point(100, 80), new Point(250, 120));
  }
}
