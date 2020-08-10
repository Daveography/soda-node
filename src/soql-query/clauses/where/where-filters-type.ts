import { WhereFilter, WhereGroup, WhereOperator } from '.';
import { ColumnType } from '../column-types';

export type WhereFilterType = WhereGroup | WhereFilter<ColumnType> | WhereOperator;
