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

import { cloneDeep } from "lodash";
import { Facet } from "./facet";
import { FacetColorPicker } from "./facet-colors";

export enum LetterFace {
  F = 1,
  R = 2,
  U = 3,
  B = 4,
  L = 5,
  D = 6,
}
export type LetterFaceType = keyof typeof LetterFace;
export type NumberFaces = 1 | 2 | 3 | 4 | 5 | 6;
export type Degrees = -90 | 90;

const faceMovements: Readonly<
  Record<
    LetterFaceType,
    Readonly<LetterFace[]>
    // Record<
    //   keyof typeof LetterFace,
    //   { faceValue: LetterFace; nextFace: LetterFace | undefined }
    // >
    // Readonly<
    //   {
    //     faceValue: LetterFace;
    //     nextFace: LetterFace;
    //   }[]
    // >
  >
> = {
  F: [LetterFace.R, LetterFace.D, LetterFace.L, LetterFace.U],
  R: [LetterFace.F, LetterFace.U, LetterFace.B, LetterFace.D],
  U: [LetterFace.R, LetterFace.F, LetterFace.L, LetterFace.B],
  B: [LetterFace.U, LetterFace.L, LetterFace.D, LetterFace.R],
  L: [LetterFace.U, LetterFace.F, LetterFace.D, LetterFace.B],
  D: [LetterFace.F, LetterFace.R, LetterFace.B, LetterFace.L],
  // {
  //   R: { faceValue: LetterFace.U, nextFace: LetterFace.D },
  //   D: { faceValue: LetterFace.R, nextFace: LetterFace.L },
  //   L: { faceValue: LetterFace.D, nextFace: LetterFace.U },
  //   U: { faceValue: LetterFace.L },
  // },
  // [
  //   { faceValue: LetterFace.U, nextFace: LetterFace.D },
  //   { faceValue: LetterFace.U, nextFace: LetterFace.D },
  // ],
} as const;

interface CubeMovement {
  face: keyof typeof LetterFace;
  degree: Degrees;
}

type Face = Facet[];

const print = (val: unknown) => (val ? JSON.parse(JSON.stringify(val)) : val);

export class Cube {
  // readonly currentFace = 1;

  faces: Face[];

  readonly size: number;
  readonly cubeSize: number;

  constructor(size: number) {
    this.faces = [];
    this.size = size;
    this.cubeSize = this.size * this.size;
  }

  public initRandom() {
    const colorPicker = new FacetColorPicker(this.cubeSize);

    console.log("---initRandom", {
      size: this.size,
      cubeSize: this.cubeSize,
      colorPicker,
    });

    for (let faceIndex = 1; faceIndex <= 6; faceIndex++) {
      for (let facetIndex = 0; facetIndex < this.cubeSize; facetIndex++) {
        if (this.faces[faceIndex] === undefined) {
          this.faces[faceIndex] = [];
        }

        this.faces[faceIndex][facetIndex] = new Facet(
          colorPicker.popRandomColor()
        );
      }
    }
  }

  move(movement: CubeMovement) {
    console.group("--move");

    const nextFaces = faceMovements[movement.face];

    const newFaces = cloneDeep(this.faces);

    console.log("--move: Data", {
      movement,
      nextFaces,
      faces: print(this.faces),
      newFaces: print(newFaces),
    });

    const oldFacesToGetFacets: Record<number, Face> = {} as Record<
      LetterFace,
      Face
    >;

    const next = (currentNextFacesIndex: number): void => {
      if (currentNextFacesIndex >= nextFaces.length) {
        return;
      }

      console.group(`--next: ${currentNextFacesIndex}`);

      const currentFaceIndex = nextFaces[currentNextFacesIndex];
      const nextFacesIndexToGetFacets =
        currentNextFacesIndex === 0
          ? nextFaces.length - 1
          : currentNextFacesIndex - 1;

      const currentFace = cloneDeep(this.faces[currentFaceIndex]);

      oldFacesToGetFacets[currentNextFacesIndex] = cloneDeep(currentFace);

      let faceToGetFacets = cloneDeep(
        oldFacesToGetFacets[nextFacesIndexToGetFacets] ?? []
      );

      console.log("--next: Data Pre if", {
        currentFaceIndex,
        nextFacesIndexToGetFacets,
        oldFacesToGetFacets: print(oldFacesToGetFacets),
        faceToGetFacets: print(faceToGetFacets),
        currentFace: print(currentFace),
      });

      if (faceToGetFacets.length === 0) {
        oldFacesToGetFacets[nextFacesIndexToGetFacets] = cloneDeep(
          this.faces[nextFacesIndexToGetFacets]
        );

        faceToGetFacets = cloneDeep(
          oldFacesToGetFacets[nextFacesIndexToGetFacets]
        );
      }

      console.log("--next: Data After if", {
        oldFacesToGetFacets: print(oldFacesToGetFacets),
        faceToGetFacets: print(faceToGetFacets),
      });

      for (
        let facetIndex = 0;
        facetIndex < this.cubeSize;
        facetIndex = facetIndex + this.size
      ) {
        currentFace[facetIndex] = { ...faceToGetFacets[facetIndex] };
      }

      console.log("--next: Data end", {
        currentFaceIndex,
        nextFacesIndexToGetFacets,
        currentFace: print(currentFace),
        oldFacesToGetFacets: print(oldFacesToGetFacets),
        faceToGetFacets: print(faceToGetFacets),
      });

      newFaces[currentFaceIndex] = cloneDeep(currentFace);

      console.groupEnd();

      return next(++currentNextFacesIndex);
    };

    next(0);

    console.log("--move: Data end", {
      movement,
      nextFaces,
      faces: print(this.faces),
      newFaces: print(newFaces),
    });

    this.faces = cloneDeep(newFaces);

    console.groupEnd();
  }
}
