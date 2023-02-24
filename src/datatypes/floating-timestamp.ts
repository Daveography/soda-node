export class FloatingTimestamp extends Date {
  public toString(): string {
    return this.toISOString();
  }

  public toISOString() {
    // Outputs an ISO8601 date in local time instead of UTC
    const adjustedDate = new Date(this.valueOf() - (this.getTimezoneOffset() * 1000 * 60));
    const curIso = adjustedDate.toISOString();

    // Remove the Z that would denote UTC
    return curIso.substring(0, curIso.length - 1);
  }
}