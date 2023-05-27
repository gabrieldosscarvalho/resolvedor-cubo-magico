//import { mainExampleCubeDemo } from "./example-cube/webgl-demo";

import { Cube, Degrees, LetterFaceType } from "./cube";
import { Viewport } from "./viewport";

const getInputRadioValue = (
  radioNodeList: RadioNodeList
): string | undefined => {
  for (const node of Array.from(radioNodeList)) {
    const { checked, value } = node as HTMLInputElement;

    if (checked) {
      return value;
    }
  }
};

const listenerApplyButton = (cube: Cube, viewport: Viewport) => {
  const domBtnApply = document.getElementById("btn-apply") as HTMLButtonElement;
  const domFace = document.querySelectorAll(
    "[name='face']"
  ) as NodeList as RadioNodeList;
  const domAngle = document.querySelectorAll(
    "[name='angles']"
  ) as NodeList as RadioNodeList;

  domBtnApply.addEventListener("click", (event: MouseEvent) => {
    event.stopPropagation();

    console.log("--domBtnApply click", {
      event,
      domFace,
      domAngle,
    });

    const checkedFace = getInputRadioValue(domFace);
    const checkedAngle = getInputRadioValue(domAngle);

    console.log({ checkedFace, checkedAngle });

    if (checkedFace && checkedAngle) {
      cube.move({
        face: checkedFace as LetterFaceType,
        degree: parseInt(checkedAngle) as Degrees,
      });

      viewport.renderCube(cube);
    }
  });
};

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
  listenerApplyButton(cube, viewport);
});

const renderCube = (ctx: CanvasRenderingContext2D, cube: Cube) => {};
