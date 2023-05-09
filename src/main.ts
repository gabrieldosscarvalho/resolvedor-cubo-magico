//import { mainExampleCubeDemo } from "./example-cube/webgl-demo";

import { CanvasContext } from "./canvas-context";
import { Cube } from "./cube";

function init(canvasContext: CanvasContext) {
  canvasContext.dom.style.backgroundColor = "#333";
}

document.addEventListener("DOMContentLoaded", () => {
  const domMain = document.getElementById("main") as HTMLCanvasElement;
  const ctx = domMain.getContext("2d");

  if (ctx === null) {
    throw new Error("Canvas não encotrado");
  }

  console.log("--ctx", { ctx });

  init(new CanvasContext(ctx, domMain));

  const cube = new Cube(2);

  console.log("--cube", { cube });

  //mainExampleCubeDemo(ctx);
});
