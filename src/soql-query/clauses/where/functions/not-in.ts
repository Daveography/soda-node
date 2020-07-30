import { In } from './in';
import { InFunctionType } from './in-function-types';

export class NotIn<TValue extends InFunctionType> extends In<TValue> {
  public toString(): string {
    const valuesList = this.Values.map(v => v.toString()).join(', ');
    return `${this.Column} not in (${valuesList})`;
  }
}