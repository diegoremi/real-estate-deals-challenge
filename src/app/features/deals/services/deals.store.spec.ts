import { firstValueFrom } from 'rxjs';

import { MOCK_DEALS } from '../data/mock-deals';
import { CreateDeal } from '../models/deal.model';
import { DealsStore } from './deals.store';

describe('DealsStore', () => {
  let store: DealsStore;

  beforeEach(() => {
    store = new DealsStore();
  });

  it('should expose the initial deals', async () => {
    const deals = await firstValueFrom(store.deals$);

    expect(deals).toEqual(MOCK_DEALS);
  });

  it('should add a deal without mutating the previous collection', async () => {
    const previousDeals = await firstValueFrom(store.deals$);

    const newDeal: CreateDeal = {
      name: 'Pacific Retail Center',
      address: '450 Pacific Ave, Seattle, WA',
      purchasePrice: 7_000_000,
      noi: 560_000,
    };

    store.addDeal(newDeal);

    const deals = await firstValueFrom(store.deals$);

    expect(deals).not.toBe(previousDeals);
    expect(previousDeals.length).toBe(MOCK_DEALS.length);

    expect(deals.length).toBe(MOCK_DEALS.length + 1);

    expect(deals[deals.length - 1]).toEqual(
      jasmine.objectContaining({
        ...newDeal,
      }),
    );

    expect(deals[deals.length - 1].id).toBeTruthy();
  });

  it('should filter deals by name case-insensitively', async () => {
    store.setNameFilter('RIVERSIDE');

    const deals = await firstValueFrom(store.filteredDeals$);

    expect(deals.length).toBe(1);
    expect(deals[0].name).toBe('Riverside Commons');
  });

  it('should ignore surrounding whitespace in the name filter', async () => {
    store.setNameFilter('  riverside  ');

    const deals = await firstValueFrom(store.filteredDeals$);

    expect(deals.length).toBe(1);
    expect(deals[0].name).toBe('Riverside Commons');
  });

  it('should filter deals with a purchase price greater than the selected value', async () => {
    store.setPurchasePriceFilter('greaterThan', 10_000_000);

    const deals = await firstValueFrom(store.filteredDeals$);

    expect(deals.length).toBe(1);
    expect(deals[0].name).toBe('Cedar Point Apartments');
  });

  it('should filter deals with a purchase price less than the selected value', async () => {
    store.setPurchasePriceFilter('lessThan', 4_000_000);

    const deals = await firstValueFrom(store.filteredDeals$);

    expect(deals.length).toBe(1);
    expect(deals[0].name).toBe('Northgate Medical Plaza');
  });

  it('should combine name and purchase price filters', async () => {
    store.setNameFilter('point');

    store.setPurchasePriceFilter('greaterThan', 10_000_000);

    const deals = await firstValueFrom(store.filteredDeals$);

    expect(deals.length).toBe(1);
    expect(deals[0].name).toBe('Cedar Point Apartments');
  });

  it('should clear all filters', async () => {
    store.setNameFilter('river');

    store.setPurchasePriceFilter('greaterThan', 10_000_000);

    store.clearFilters();

    const deals = await firstValueFrom(store.filteredDeals$);

    expect(deals.length).toBe(MOCK_DEALS.length);
  });

  it('should ignore invalid negative purchase price filters', async () => {
    store.setPurchasePriceFilter('greaterThan', -1);

    const deals = await firstValueFrom(store.filteredDeals$);

    expect(deals.length).toBe(MOCK_DEALS.length);
  });
});
