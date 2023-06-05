//import { mainExampleCubeDemo } from "./example-cube/webgl-demo";

import { Cube, Degrees } from "./cube";
import { LetterFace, LetterFaceType } from "./face";
import { FACET_COLORS } from "./facet-colors";
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
  const domBtnCommands = document.querySelectorAll(".btn-command");

  domBtnCommands.forEach((domBtn) => {
    (domBtn as HTMLButtonElement).addEventListener(
      "click",
      (event: MouseEvent) => {
        event.stopPropagation();

        const [command, negativeDegree] = (
          domBtn.getAttribute("data-value") ?? ""
        ).split("");

        cube.move({
          face: command as LetterFaceType,
          degree: negativeDegree ? -90 : 90,
        });

        viewport.renderCube(cube);

        registerCommand(command + (negativeDegree ?? ""));

        console.log({ cubeToKociembaString: cubeToKociembaString(cube) });
      }
    );
  });
};

const registerCommand = (command: string) => {
  const domLogCommands = document.querySelector(
    ".log-commands"
  ) as HTMLDivElement;

  domLogCommands.innerHTML += `<span>${command.toLocaleUpperCase()}</span>`;
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
  const cubeSize = 3;

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

  console.log({ cubeToKociembaString: cubeToKociembaString(cube) });
});

const cubeToKociembaString = (cube: Cube): string => {
  let result = "";

  const facesKociemba = [
    LetterFace.U,
    LetterFace.R,
    LetterFace.F,
    LetterFace.D,
    LetterFace.L,
    LetterFace.B,
  ];

  for (const faceIndex of facesKociemba) {
    for (const facet of cube.faces[faceIndex].facets) {
      switch (facet.color) {
        case FACET_COLORS.WHITE:
          result += "U";
          break;
        case FACET_COLORS.RED:
          result += "R";
          break;
        case FACET_COLORS.GREEN:
          result += "F";
          break;
        case FACET_COLORS.YELLOW:
          result += "D";
          break;
        case FACET_COLORS.ORANGE:
          result += "L";
          break;
        case FACET_COLORS.BLUE:
          result += "B";
          break;
      }
    }
  }

  return result;
};
