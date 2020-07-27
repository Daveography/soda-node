import { ColumnType } from '../soql-query/clauses/column-types';

export type DataSetColumn<TEntity, TValue extends ColumnType> = (type: TEntity) => TValue;
