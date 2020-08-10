import { Between } from './between';
import { BetweenFunctionType } from './between-function-types';

export class NotBetween<TValue extends BetweenFunctionType> extends Between<TValue> {
  public toString(): string {
    return `${this.Column} not between ${this.From} and ${this.To}`;
  }
}
