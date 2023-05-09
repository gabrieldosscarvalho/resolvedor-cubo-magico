interface PixelPosition {
  readonly x: number;
  readonly y: number;
}

const SIZE = 50;

class Pixel {
  constructor(readonly position: PixelPosition, readonly size: number = SIZE) {}
}
