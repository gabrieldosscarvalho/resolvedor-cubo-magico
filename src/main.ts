//import { mainExampleCubeDemo } from "./example-cube/webgl-demo";

import { Cube } from "./cube";
import { Viewport } from "./viewport";

document.addEventListener("DOMContentLoaded", () => {
  const domMain = document.getElementById("main") as HTMLCanvasElement;
  const ctx = domMain.getContext("2d");

  if (ctx === null) {
    throw new Error("Canvas não encotrado");
  }

  // const cubeSize = parseInt(
  //   prompt("Informe o tamanho do cubo (ex.: 2): ") ?? "2"
  // );
  const cubeSize = 2;

  const viewport = new Viewport({
    canvasContext: ctx,
    canvasDOM: domMain,
    cubeSize,
  });

  const cube = new Cube(cubeSize);

  cube.initRandom();

  viewport.init();

  console.log("--cube", { cube });

  console.log("--viwport", { viwport: viewport });

  viewport.renderCube(cube);

  //mainExampleCubeDemo(ctx);
});

const renderCube = (ctx: CanvasRenderingContext2D, cube: Cube) => {};
