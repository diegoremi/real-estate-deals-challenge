export interface Deal {
  readonly id: string;
  readonly name: string;
  readonly purchasePrice: number;
  readonly address: string;
  readonly noi: number;
}

export type CreateDeal = Omit<Deal, 'id'>;
