import { Column, IClause, LimitClause, OffsetClause, SelectClause, WhereClause } from './clauses';
import { OrderClause } from './clauses/order';
import { WhereFilterType } from './clauses/where/where-filters-type';
import { SoqlQuery } from './soql-query';

export class SoqlQueryBuilder {

  private limitClause: LimitClause;
  private offsetClause: OffsetClause;
  private selectClause: SelectClause;
  private whereClause: WhereClause;
  private orderClause: OrderClause;

  public get LimitClause(): LimitClause { return this.limitClause };
  public get OffsetClause(): OffsetClause { return this.offsetClause };
  public get SelectClause(): SelectClause { return this.selectClause };
  public get WhereClause(): WhereClause { return this.whereClause };
  public get OrderClause(): OrderClause { return this.orderClause };

  public limit(maxRows: number): this {
    this.limitClause = new LimitClause(maxRows);
    return this;
  }

  public clearLimit(): void {
    this.limitClause = undefined;
  }

  public offset(rows: number): this {
    this.offsetClause = new OffsetClause(rows);
    return this;
  }

  public clearOffset(): void {
    this.offsetClause = undefined;
  }

  public select(...columns: Column[]): this {
    const existingColumns = this.selectClause ? this.selectClause.Columns : [];
    this.selectClause = new SelectClause(...existingColumns, ...columns);
    return this;
  }

  public clearSelect(): void {
    this.selectClause = undefined;
  }

  public filter(...filters: WhereFilterType[]): this {
    const existingFilters = this.whereClause ? this.whereClause.Components : [];
    this.whereClause = new WhereClause(...existingFilters, ...filters)
    return this;
  }

  public orderBy(...columns: Column[]): this {
    const existingOrder = this.orderClause ? this.orderClause.Columns : [];
    this.orderClause = new OrderClause(...existingOrder, ...columns);
    return this;
  }

  public clearOrder(): void {
    this.orderClause = undefined;
  }

  public clearFilters(): void {
    this.whereClause = undefined;
  }

  public getQuery(): SoqlQuery {
    const clauses = new Array<IClause>();

    if (this.whereClause) {
      clauses.push(this.whereClause)
    }
    if (this.selectClause) {
      clauses.push(this.selectClause)
    }
    if (this.limitClause) {
      clauses.push(this.limitClause)
    }
    if (this.offsetClause) {
      clauses.push(this.offsetClause)
    }
    if (this.orderClause) {
      clauses.push(this.orderClause)
    }
    
    return new SoqlQuery(...clauses);
  }

  public clone(): SoqlQueryBuilder {
    const newBuilder = new SoqlQueryBuilder();
    newBuilder.whereClause = this.whereClause;
    newBuilder.selectClause = this.selectClause;
    newBuilder.limitClause = this.limitClause;
    newBuilder.offsetClause = this.offsetClause;
    newBuilder.orderClause = this.orderClause;
    return newBuilder;
  }
}
