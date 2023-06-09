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
import { Face, LetterFace, LetterFaceType } from "./face";
import { Facet, Facets } from "./facet";
import { FacetColorPicker } from "./facet-colors";
import { randomIntFromInterval } from "./utls";

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
  face: LetterFaceType;
  degree: Degrees;
}

type FaceOld = Facet[];

const print = (val: unknown) => (val ? JSON.parse(JSON.stringify(val)) : val);

export class Cube {
  // readonly currentFace = 1;

  facesOld: FaceOld[];

  faces: Face[];

  readonly size: number;
  readonly cubeSize: number;

  constructor(
    size: 3 // SÓ PODE SER 3 ENQUANTO NÃO FOR RESOLVIDO A MONTAGEM DOS FACETS PELOS PONTOS CARDEAIS
  ) {
    this.facesOld = [];
    this.faces = [];
    this.size = size;
    this.cubeSize = this.size * this.size;
  }

  public init() {
    const colorPicker = new FacetColorPicker(this.cubeSize);

    let currentColor = colorPicker.popColor();

    const tempFaces = [];

    for (let faceIndex = 1; faceIndex <= 6; faceIndex++) {
      const facets = [];

      for (let facetIndex = 0; facetIndex < this.cubeSize; facetIndex++) {
        facets.push(new Facet(currentColor.next().value));
      }

      tempFaces[faceIndex] = [...facets];
    }

    this.mountCube(tempFaces);
  }

  public initRandom() {
    this.init();

    const moves = randomIntFromInterval(20, 50);
    const letterFaceKey = Object.values(LetterFace);
    for (let index = 0; index < moves; index++) {
      this.move({
        face: letterFaceKey[randomIntFromInterval(0, 5)] as LetterFaceType,
        degree: randomIntFromInterval(0, 1) ? 90 : -90,
      });
    }
  }

  private mountCube(faces: Array<Facets>) {
    this.faces[LetterFace.F] = new Face({
      N: [
        faces[LetterFace.U][6],
        faces[LetterFace.U][7],
        faces[LetterFace.U][8],
      ],
      E: [
        faces[LetterFace.R][0],
        faces[LetterFace.R][3],
        faces[LetterFace.R][6],
      ],
      S: [
        faces[LetterFace.D][2],
        faces[LetterFace.D][1],
        faces[LetterFace.D][0],
      ],
      W: [
        faces[LetterFace.L][8],
        faces[LetterFace.L][5],
        faces[LetterFace.L][2],
      ],
      facets: [...faces[LetterFace.F]],
    });

    this.faces[LetterFace.R] = new Face({
      N: [
        faces[LetterFace.U][8],
        faces[LetterFace.U][5],
        faces[LetterFace.U][2],
      ],
      E: [
        faces[LetterFace.B][0],
        faces[LetterFace.B][3],
        faces[LetterFace.B][6],
      ],
      S: [
        faces[LetterFace.D][8],
        faces[LetterFace.D][5],
        faces[LetterFace.D][2],
      ],
      W: [
        faces[LetterFace.F][8],
        faces[LetterFace.F][5],
        faces[LetterFace.F][2],
      ],
      facets: [...faces[LetterFace.R]],
    });

    this.faces[LetterFace.U] = new Face({
      N: [
        faces[LetterFace.B][0],
        faces[LetterFace.B][1],
        faces[LetterFace.B][2],
      ],
      E: [
        faces[LetterFace.R][0],
        faces[LetterFace.R][1],
        faces[LetterFace.R][2],
      ],
      S: [
        faces[LetterFace.F][0],
        faces[LetterFace.F][1],
        faces[LetterFace.F][2],
      ],
      W: [
        faces[LetterFace.L][0],
        faces[LetterFace.L][1],
        faces[LetterFace.L][2],
      ],
      facets: [...faces[LetterFace.U]],
    });

    this.faces[LetterFace.B] = new Face({
      N: [
        faces[LetterFace.U][2],
        faces[LetterFace.U][1],
        faces[LetterFace.U][0],
      ],
      E: [
        faces[LetterFace.L][0],
        faces[LetterFace.L][3],
        faces[LetterFace.L][6],
      ],
      S: [
        faces[LetterFace.D][6],
        faces[LetterFace.D][7],
        faces[LetterFace.D][8],
      ],
      W: [
        faces[LetterFace.R][8],
        faces[LetterFace.R][5],
        faces[LetterFace.R][2],
      ],
      facets: [...faces[LetterFace.B]],
    });

    this.faces[LetterFace.L] = new Face({
      N: [
        faces[LetterFace.U][0],
        faces[LetterFace.U][3],
        faces[LetterFace.U][6],
      ],
      E: [
        faces[LetterFace.F][0],
        faces[LetterFace.F][3],
        faces[LetterFace.F][6],
      ],
      S: [
        faces[LetterFace.D][0],
        faces[LetterFace.D][3],
        faces[LetterFace.D][6],
      ],
      W: [
        faces[LetterFace.B][8],
        faces[LetterFace.B][5],
        faces[LetterFace.B][2],
      ],
      facets: [...faces[LetterFace.L]],
    });

    this.faces[LetterFace.D] = new Face({
      N: [
        faces[LetterFace.F][6],
        faces[LetterFace.F][7],
        faces[LetterFace.F][8],
      ],
      E: [
        faces[LetterFace.R][6],
        faces[LetterFace.R][7],
        faces[LetterFace.R][8],
      ],
      S: [
        faces[LetterFace.B][6],
        faces[LetterFace.B][7],
        faces[LetterFace.B][8],
      ],
      W: [
        faces[LetterFace.L][6],
        faces[LetterFace.L][7],
        faces[LetterFace.L][8],
      ],
      facets: [...faces[LetterFace.D]],
    });
  }

  move(movement: CubeMovement) {
    const movementFace = LetterFace[movement.face];

    const oldFace = cloneDeep(this.faces[movementFace]);
    const face = this.faces[movementFace];

    switch (movement.degree) {
      case 90:
        for (let index = 0; index < this.size; index++) {
          face.N[index].color = oldFace.W[index].color;
          face.E[index].color = oldFace.N[index].color;
          face.S[index].color = oldFace.E[index].color;
          face.W[index].color = oldFace.S[index].color;
        }

        face.facets[2].color = oldFace.facets[0].color;
        face.facets[5].color = oldFace.facets[1].color;
        face.facets[8].color = oldFace.facets[2].color;
        face.facets[6].color = oldFace.facets[8].color;
        face.facets[7].color = oldFace.facets[5].color;
        face.facets[0].color = oldFace.facets[6].color;
        face.facets[3].color = oldFace.facets[7].color;
        face.facets[1].color = oldFace.facets[3].color;
        break;

      case -90:
        for (let index = 0; index < this.size; index++) {
          face.N[index].color = oldFace.E[index].color;
          face.E[index].color = oldFace.S[index].color;
          face.S[index].color = oldFace.W[index].color;
          face.W[index].color = oldFace.N[index].color;
        }

        face.facets[2].color = oldFace.facets[8].color;
        face.facets[5].color = oldFace.facets[7].color;
        face.facets[8].color = oldFace.facets[6].color;
        face.facets[6].color = oldFace.facets[0].color;
        face.facets[7].color = oldFace.facets[3].color;
        face.facets[0].color = oldFace.facets[2].color;
        face.facets[3].color = oldFace.facets[1].color;
        face.facets[1].color = oldFace.facets[5].color;
        break;
    }
  }
}
