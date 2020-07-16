import { SodaResourceId } from './soda-resource-id';
import 'reflect-metadata';

export const resourceMetadataKey = Symbol('resourceId');

export function SodaDataset(resourceId: string): ClassDecorator {
  return Reflect.metadata(resourceMetadataKey, new SodaResourceId(resourceId));
}
