import { Point } from "/Geometry.js";

export class TestApp {
  static get NAME() {return "TestApp";}
  static get ICON() {return "#FFBB77";}


  constructor() {
  }

  init = () => {
  }

  start = () => {
  }

  renderFrame = (draw, screen, render) => {
    draw.setColor("#FFFFFF");
    draw.rect(new Point(10, 20), new Point(50, 100));
  }
}
