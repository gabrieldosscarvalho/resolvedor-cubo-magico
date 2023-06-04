import { randomIntFromInterval } from "./utls";

export enum FACET_COLORS {
  GREEN = "#4CAF50",
  RED = "#F44336",
  WHITE = "#FFFFFF",
  BLUE = "#03A9F4",
  ORANGE = "#FB8C00",
  YELLOW = "#FFEB3B",
}

const FACET_COLORS_KEYS = Object.keys(FACET_COLORS);

type FacetColorsKeysType = keyof typeof FACET_COLORS;

export class FacetColorPicker {
  readonly colors: FACET_COLORS[][];

  constructor(readonly size: number) {
    this.colors = [];

    for (
      let colorIndex = 0;
      colorIndex < FACET_COLORS_KEYS.length;
      colorIndex++
    ) {
      for (let index = 0; index < size; index++) {
        if (this.colors[colorIndex] === undefined) {
          this.colors[colorIndex] = [];
        }

        this.colors[colorIndex][index] =
          FACET_COLORS[FACET_COLORS_KEYS[colorIndex] as FacetColorsKeysType];
      }
    }
  }

  popRandomColor(): FACET_COLORS {
    const indexColor = randomIntFromInterval(0, FACET_COLORS_KEYS.length - 1);
    const index = randomIntFromInterval(0, this.size - 1);

    if (this.colors[indexColor][index]) {
      const color = this.colors[indexColor][index];

      delete this.colors[indexColor][index];

      return color;
    }

    return this.popRandomColor();
  }

  *popColor(): Generator<FACET_COLORS> {
    for (let colorIndex = 0; colorIndex < this.colors.length; colorIndex++) {
      for (let index = 0; index < this.colors[colorIndex].length; index++) {
        const color = this.colors[colorIndex][index];

        yield color;
      }
    }
  }
}
