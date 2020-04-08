export class FloatingTimestamp extends Date {
  toString(): string {
    const cur = new Date(super.valueOf());
    cur.setUTCHours(0,0,0,0);
    const curIso = cur.toISOString();
    return curIso.substring(0, curIso.length - 1);
  }
}