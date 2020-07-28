import { WhereGroup, WhereFilter, WhereOperator } from '.';

export type WhereFilterType = WhereGroup | WhereFilter<unknown> | WhereOperator;
