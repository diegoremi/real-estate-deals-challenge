import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { combineLatest } from 'rxjs';

import { DealFiltersComponent } from '../../components/deal-filters/deal-filters.component';
import { DealsTableComponent } from '../../components/deals-table/deals-table.component';
import { PurchasePriceFilter } from '../../models/deal-filters.model';
import { DealsStore } from '../../services/deals.store';

@Component({
  selector: 'app-deals-page',
  standalone: true,
  imports: [AsyncPipe, DealFiltersComponent, DealsTableComponent],
  templateUrl: './deals-page.component.html',
  styleUrl: './deals-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealsPageComponent {
  private readonly dealsStore = inject(DealsStore);

  readonly vm$ = combineLatest({
    deals: this.dealsStore.filteredDeals$,
    filters: this.dealsStore.filters$,
  });

  onNameFilterChange(name: string): void {
    this.dealsStore.setNameFilter(name);
  }

  onPurchasePriceFilterChange(filter: PurchasePriceFilter): void {
    this.dealsStore.setPurchasePriceFilter(filter.operator, filter.value);
  }

  onClearFilters(): void {
    this.dealsStore.clearFilters();
  }
}
