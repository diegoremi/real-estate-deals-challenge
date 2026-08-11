import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { CreateDeal, Deal } from '../models/deal.model';
import { MOCK_DEALS } from '../data/mock-deals';
import {
  DealFilters,
  PurchasePriceOperator,
} from '../models/deal-filters.model';

const INITIAL_FILTERS: DealFilters = {
  name: '',
  purchasePrice: {
    operator: null,
    value: null,
  },
};

@Injectable({
  providedIn: 'root',
})
export class DealsStore {
  private readonly dealsSubject = new BehaviorSubject<readonly Deal[]>(
    MOCK_DEALS,
  );

  private readonly filtersSubject = new BehaviorSubject<DealFilters>(
    INITIAL_FILTERS,
  );

  readonly deals$ = this.dealsSubject.asObservable();
  readonly filters$ = this.filtersSubject.asObservable();

  readonly filteredDeals$ = combineLatest([this.deals$, this.filters$]).pipe(
    map(([deals, filters]) => this.filterDeals(deals, filters)),
  );

  addDeal(deal: CreateDeal): void {
    const newDeal: Deal = {
      ...deal,
      id: crypto.randomUUID(),
    };

    this.dealsSubject.next([...this.dealsSubject.value, newDeal]);
  }

  setNameFilter(name: string): void {
    this.filtersSubject.next({
      ...this.filtersSubject.value,
      name,
    });
  }

  setPurchasePriceFilter(
    operator: PurchasePriceOperator | null,
    value: number | null,
  ): void {
    this.filtersSubject.next({
      ...this.filtersSubject.value,
      purchasePrice: {
        operator,
        value,
      },
    });
  }

  clearFilters(): void {
    this.filtersSubject.next(INITIAL_FILTERS);
  }

  private filterDeals(
    deals: readonly Deal[],
    filters: DealFilters,
  ): readonly Deal[] {
    const normalizedName = filters.name.trim().toLowerCase();

    return deals.filter((deal) => {
      const matchesName =
        !normalizedName || deal.name.toLowerCase().includes(normalizedName);

      const matchesPrice = this.matchesPurchasePrice(deal, filters);

      return matchesName && matchesPrice;
    });
  }

  private matchesPurchasePrice(deal: Deal, filters: DealFilters): boolean {
    const { operator, value } = filters.purchasePrice;

    if (operator === null || value === null || !Number.isFinite(value)) {
      return true;
    }

    return operator === 'greaterThan'
      ? deal.purchasePrice > value
      : deal.purchasePrice < value;
  }
}
