interface PixelPosition {
  readonly x: number;
  readonly y: number;
}

interface PixelAttributes {
  readonly position: PixelPosition;
  readonly color: string;
  readonly size: number;
}

export class Pixel implements PixelAttributes {
  readonly position: PixelPosition;
  readonly color: string;
  readonly size: number;

  constructor(attributes: PixelAttributes) {
    this.position = attributes.position;
    this.color = attributes.color;
    this.size = attributes.size;
  }
}
