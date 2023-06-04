import { FACET_COLORS } from "./facet-colors";

export type Facets = Facet[];

export class Facet {
  constructor(public color: FACET_COLORS) {}
}
