import { Cube, NumberFaces } from "./cube";
import { Face, LetterFace } from "./face";
import { Pixel } from "./pixel";

const EMPTY_PIXEL_COLOR = "#ccc";

interface ViewportAttributes {
  readonly canvasContext: CanvasRenderingContext2D;
  readonly canvasDOM: HTMLCanvasElement;
  readonly cubeSize: number;
  readonly width?: number;
  readonly height?: number;
}

export class Viewport {
  private canvasContext: CanvasRenderingContext2D;
  private canvasDOM: HTMLCanvasElement;
  readonly cubeSize: number;
  private width: number;
  private height: number;

  private pixels: Map<string, Pixel>;

  private cubePixels: Map<NumberFaces, Pixel[]>;

  constructor(attributes: ViewportAttributes) {
    this.canvasContext = attributes.canvasContext;
    this.canvasDOM = attributes.canvasDOM;
    this.cubeSize = attributes.cubeSize;
    this.width = attributes?.width ?? 640;
    this.height = attributes?.height ?? 480;

    this.pixels = new Map();
    this.cubePixels = new Map();
  }

  public init() {
    this.initStyle();

    this.initPixels();
  }

  private initStyle() {
    this.canvasDOM.setAttribute("width", `${this.width}px`);
    this.canvasDOM.setAttribute("height", `${this.height}px`);

    this.canvasDOM.style.backgroundColor = "#333";
  }

  private initPixels() {
    const pixelSize = this.getPixelSize();
    const numberLines = Math.ceil(this.height / pixelSize);
    const numberColumns = Math.ceil(this.width / pixelSize);

    for (let line = 0; line < numberLines; line++) {
      for (let column = 0; column < numberColumns; column++) {
        this.updatePixel(
          new Pixel({
            position: { x: column, y: line },
            color: EMPTY_PIXEL_COLOR,
            size: pixelSize,
          })
        );
      }
    }
  }

  private getPixelSize() {
    const pixelSeizeFactor = Math.ceil(this.width / this.height);
    const minCubeColumns = (this.cubeSize * 2 * 4) / pixelSeizeFactor;
    const minCubeLines = (this.cubeSize * 2 * 3) / pixelSeizeFactor;

    const result = this.width / minCubeColumns - this.height / minCubeLines;

    return Math.floor(
      result <= -1 ? this.width / minCubeColumns : this.height / minCubeLines
    );
  }

  private updatePixel(pixel: Pixel) {
    this.pixels.set(`${pixel.position.x}-${pixel.position.y}`, pixel);

    this.renderPixel(pixel);
  }

  private renderPixel(pixel: Pixel) {
    const _x = pixel.size * pixel.position.x;
    const _y = pixel.size * pixel.position.y;

    this.canvasContext.clearRect(_x, _y, pixel.size, pixel.size);

    this.canvasContext.lineWidth = 2;
    this.canvasContext.strokeStyle = EMPTY_PIXEL_COLOR;
    this.canvasContext.strokeRect(_x, _y, pixel.size, pixel.size);

    if (pixel.color !== EMPTY_PIXEL_COLOR) {
      this.canvasContext.fillStyle = pixel.color;
      this.canvasContext.fillRect(
        _x + 1,
        _y + 1,
        pixel.size - 2,
        pixel.size - 2
      );
    }
  }

  public renderCube(cube: Cube) {
    const faces = cube.faces;

    this.renderFace(
      {
        lineInitialValue: this.cubeSize,
        lineIsValid: (line: number) => line < this.cubeSize * 2,
        columnInitialValue: this.cubeSize,
        columnIsValid: (column: number) => column < this.cubeSize * 2,
      },
      faces[LetterFace.F]
    );

    this.renderFace(
      {
        lineInitialValue: this.cubeSize,
        lineIsValid: (line: number) => line < this.cubeSize * 2,
        columnInitialValue: this.cubeSize * 2,
        columnIsValid: (column: number) => column < this.cubeSize * 3,
      },
      faces[LetterFace.R]
    );

    this.renderFace(
      {
        lineInitialValue: 0,
        lineIsValid: (line: number) => line < this.cubeSize,
        columnInitialValue: this.cubeSize,
        columnIsValid: (column: number) => column < this.cubeSize * 2,
      },
      faces[LetterFace.U]
    );

    this.renderFace(
      {
        lineInitialValue: this.cubeSize,
        lineIsValid: (line: number) => line < this.cubeSize * 2,
        columnInitialValue: this.cubeSize * 3,
        columnIsValid: (column: number) => column < this.cubeSize * 4,
      },
      faces[LetterFace.B]
    );

    this.renderFace(
      {
        lineInitialValue: this.cubeSize,
        lineIsValid: (line: number) => line < this.cubeSize * 2,
        columnInitialValue: 0,
        columnIsValid: (column: number) => column < this.cubeSize,
      },
      faces[LetterFace.L]
    );

    this.renderFace(
      {
        lineInitialValue: this.cubeSize * 2,
        lineIsValid: (line: number) => line < this.cubeSize * 3,
        columnInitialValue: this.cubeSize,
        columnIsValid: (column: number) => column < this.cubeSize * 2,
      },
      faces[LetterFace.D]
    );
  }

  private renderFace(
    renderArguments: {
      lineInitialValue: number;
      lineIsValid: (line: number) => boolean;
      columnInitialValue: number;
      columnIsValid: (column: number) => boolean;
    },
    { facets }: Face
  ) {
    let line = renderArguments.lineInitialValue;
    let column = renderArguments.columnInitialValue;
    let indexFacet = 0;

    while (indexFacet < facets.length) {
      while (renderArguments.lineIsValid(line)) {
        while (renderArguments.columnIsValid(column)) {
          const currentPixel = this.pixels.get(`${column}-${line}`);
          if (!currentPixel) {
            throw new Error("Pixel not found");
          }

          this.updatePixel(
            new Pixel({
              ...currentPixel!,
              color: facets[indexFacet].color,
            })
          );

          indexFacet++;
          column++;
        }

        column = renderArguments.columnInitialValue;
        line++;
      }

      line = renderArguments.lineInitialValue;
    }
  }
}
