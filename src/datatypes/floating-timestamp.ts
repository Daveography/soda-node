export class FloatingTimestamp extends Date {
  toString(): string {
    return super.toISOString();
  }
}