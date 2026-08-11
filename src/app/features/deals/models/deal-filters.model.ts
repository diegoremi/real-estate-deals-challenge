export type PurchasePriceOperator = 'greaterThan' | 'lessThan';

export interface PurchasePriceFilter {
  readonly operator: PurchasePriceOperator | null;
  readonly value: number | null;
}

export interface DealFilters {
  readonly name: string;
  readonly purchasePrice: PurchasePriceFilter;
}
