//import { mainExampleCubeDemo } from "./example-cube/webgl-demo";

import { Cube } from "./cube";
import { LetterFace, LetterFaceType } from "./face";
import { FACET_COLORS } from "./facet-colors";
import { Viewport } from "./viewport";

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

const listenerApplyButton = (cube: Cube, viewport: Viewport) => {
  const domBtnCommands = document.querySelectorAll(".btn-command");
  const domBtnResolver = document.querySelector(
    ".resolver-btn"
  ) as HTMLButtonElement;

  domBtnCommands.forEach((domBtn) => {
    (domBtn as HTMLButtonElement).addEventListener(
      "click",
      (event: MouseEvent) => {
        event.stopPropagation();

        const command = domBtn.getAttribute("data-value") ?? "";
        const negativeDegree = command.includes("'");

        for (let index = 1; index <= (command.includes("2") ? 2 : 1); index++) {
          cube.move({
            face: command[0] as LetterFaceType,
            degree: negativeDegree ? -90 : 90,
          });
        }

        viewport.renderCube(cube);

        registerCommand(command);
      }
    );
  });

  const onceClickSearchSolution = async (event: MouseEvent) => {
    domBtnResolver.removeEventListener("click", onceClickSearchSolution);

    await cubeResolve(cube, viewport);
  };
  domBtnResolver.addEventListener("click", onceClickSearchSolution);
};

const registerCommand = (command: string) => {
  const domLogCommands = document.querySelector(
    ".log-commands"
  ) as HTMLDivElement;

  domLogCommands.innerHTML += `<span>${command.toLocaleUpperCase()}</span>`;
};

const cubeResolve = async (cube: Cube, viewport: Viewport): Promise<void> => {
  const domResolverDiv = document.querySelector(
    ".resolver div"
  ) as HTMLDivElement;

  document.body.style.cursor = "wait";
  domResolverDiv.innerHTML = "...";

  const kociembaString = cubeToKociembaString(cube);

  const solution = await fetch(
    `http://localhost:3333/cube-resolver/${kociembaString}`,
    { mode: "no-cors" }
  ).then((res) => res.text());

  const _solution = solution.split(" ");

  domResolverDiv.innerHTML = "";

  _solution.forEach((command: string) => {
    if (command)
      domResolverDiv.innerHTML += `<button
                                class="btn-command"
                                data-value="${command.toLocaleUpperCase()}"
                                style="background-color: #555"
                              >${command.toLocaleUpperCase()}</button>`;
  });

  document.body.style.cursor = "default";

  listenerApplyButton(cube, viewport);
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

  viewport.renderCube(cube);

  listenerApplyButton(cube, viewport);
});
