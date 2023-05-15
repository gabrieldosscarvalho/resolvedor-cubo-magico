/**
 * Elementos do cubo
 *
 * - 6 faces
 * - 52 facets
 *
 * - quando uma linha/coluna se movimenta movimenta todos os elementos
 *   dela para o sentido do movimento
 *
 * - quando todos as faces tem a mesma cor o cubo esta completo
 *
 */

import { Facet } from "./facet";
import { FacetColorPicker } from "./facet-colors";

export type NumberFaces = 1 | 2 | 3 | 4 | 5 | 6;

interface CubeMovement {
  face: NumberFaces;
  direction: "LEFT" | "RIGHT";
}

type Face = Facet[];

export class Cube {
  // readonly currentFace = 1;

  readonly faces: Face[];

  readonly size: number;

  constructor(size: number) {
    this.faces = [];
    this.size = size;
  }

  public initRandom() {
    const cubeSize = this.size * this.size;

    const colorPicker = new FacetColorPicker(cubeSize);

    console.log("---initRandom", { size: this.size, cubeSize, colorPicker });

    for (let faceIndex = 1; faceIndex <= 6; faceIndex++) {
      for (let facetIndex = 0; facetIndex < cubeSize; facetIndex++) {
        if (this.faces[faceIndex] === undefined) {
          this.faces[faceIndex] = [];
        }

        this.faces[faceIndex][facetIndex] = new Facet(
          colorPicker.popRandomColor()
        );
      }
    }
  }

  move(movement: CubeMovement) {}
}
