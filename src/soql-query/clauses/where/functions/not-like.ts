import { Like } from './like';

export class NotLike extends Like {
  public toString(): string {
    return `${this.Column} not like '${this.Value}'`;
  }
}