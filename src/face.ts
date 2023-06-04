import { Facet, Facets } from "./facet";
import { FACET_COLORS } from "./facet-colors";

export enum LetterFace {
  F = 1,
  R = 2,
  U = 3,
  B = 4,
  L = 5,
  D = 6,
}

export type LetterFaceType = keyof typeof LetterFace;

export interface FaceAttributes {
  readonly N: Facet[];
  readonly E: Facet[];
  readonly S: Facet[];
  readonly W: Facet[];
  readonly facets: Facets;
}

export class Face implements FaceAttributes {
  readonly N!: Facet[];
  readonly E!: Facet[];
  readonly S!: Facet[];
  readonly W!: Facet[];
  readonly facets!: Facets;

  constructor(attributes: FaceAttributes) {
    Object.assign(this, {}, attributes);
  }
}
