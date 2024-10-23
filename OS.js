import { TestApp } from "./apps/TestApp.js";
import { TestApp2 } from "./apps/TestApp2.js";
import { CustomDraw } from "./CustomDraw.js";
import { Point } from "./Geometry.js";

export class OS {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;

    // read-only => set up in constructor instead of init()
    this.screen = {
      width: 630,
      height: 360,
      borderWidth: 20,
      borderHeight: 20,
    };
  }

  init = () => {
    this.render = {
      delta: 0,
      fps: 0,
      last: Date.now(),
      now: Date.now(),
    };

    this.draw = new CustomDraw(this.canvas, this.context);

    this.currentApp = null;
    this.homescreenActive = true;
    this.homescreenRowSelection = 0;

    this.apps = [TestApp, TestApp2];
  }

  start = () => {
    // stuff
    requestAnimationFrame(this.mainRenderer);
  }

  keyboardHandler = (event) => {
    if (event.key === "ArrowUp") this.triggerDpad("up");
    else if (event.key === "ArrowDown") this.triggerDpad("down");
    else if (event.key === "ArrowLeft") this.homescreenRowSelection--; //this.triggerDpad("left");
    else if (event.key === "ArrowRight") this.homescreenRowSelection++; //this.triggerDpad("right");
    else if (event.key === " ") {
      this.currentApp = new this.apps[this.homescreenRowSelection];
      this.homescreenActive = !this.homescreenActive;//this.triggerButton("a");
    }
    else if (event.key === "b") this.triggerButton("b");
    else if (event.key === "x") this.triggerButton("x");
    else if (event.key === "y") this.triggerButton("y");
    else console.log(event.key);
  }

  // add gamepad / keyboard input handler
  // pass into app.gamepadHandler etc

  mainRenderer = () => {
    this.context.clearRect(0, 0, this.screen.width, this.screen.height);

    this.render.last = this.render.now;
    this.render.now = Date.now();
    this.render.delta = (this.render.now - this.render.last) / 1000;
    this.render.fps = 1 / this.render.delta;

    // Render main function

    if (this.homescreenActive) {
      this.draw.setColor("#77FFBB");

      //this.draw.rectAnimation2(0, 1, 0, this.render.delta, new Point(200, 200), new Point(300, 300), new Point(150, 150), new Point(350, 350), false);

      let iconWidth = 80;
      let iconWidthSelectedDiff = 5;
      let baseOffsetX = 50;
      let baseOffsetY = 50;
      let textOffset = 8;
      let textSize = 12;

      for (let i=0; i<this.apps.length; i++) {
        let isSelected = i === this.homescreenRowSelection;
        let app = this.apps[i];

        this.draw.setColor(app.ICON);
        /*
        let rectX = baseOffsetX + (iconWidth + baseOffsetX) * i - (isSelected ? iconWidthSelectedDiff : 0);
        let rectY = baseOffsetY - (isSelected ? iconWidthSelectedDiff : 0);
        let rectXto = rectX + iconWidth + (isSelected ? iconWidthSelectedDiff * 2 : 0);
        let rectYto = rectY + iconWidth + (isSelected ? iconWidthSelectedDiff * 2 : 0);
        //this.draw.rect(new Point(rectX - (isSelected ? iconWidth / 2 : 0), rectY), new Point(baseOffsetX + iconWidth * (i + 1) - (isSelected ? iconWidth / 2 : 0), baseOffsetY + iconWidth));
        this.draw.rect(new Point(rectX, rectY), new Point(rectXto, rectYto));
        */

        let rectX = baseOffsetX + (iconWidth + baseOffsetX) * i;
        let rectY = baseOffsetX;

        if (isSelected) {
          this.draw.rectAnimation2(1, 0.85, 0, this.render.delta, new Point(rectX, rectY), new Point(rectX + iconWidth, rectY + iconWidth), new Point(rectX - iconWidthSelectedDiff, rectY - iconWidthSelectedDiff), new Point(rectX + iconWidth + iconWidthSelectedDiff, rectY + iconWidth + iconWidthSelectedDiff), true);
        } else {
          this.draw.rect(new Point(rectX, rectY), new Point(rectX + iconWidth, rectY + iconWidth), false);
        }





        this.draw.setColor("#ffffff");
        this.draw.text(app.NAME, new Point(rectX + (isSelected ? iconWidthSelectedDiff : 0), baseOffsetY + iconWidth + textSize + textOffset + iconWidthSelectedDiff), textSize);
      }
    } else {
      // error; no app nor homescreen active
      if (this.currentApp === null) return;
      this.currentApp.renderFrame(this.draw, this.screen, this.render);
    }

    requestAnimationFrame(this.mainRenderer);
  }
}
