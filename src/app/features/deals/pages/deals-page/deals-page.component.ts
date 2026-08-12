import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { combineLatest } from 'rxjs';

import { DealFiltersComponent } from '../../components/deal-filters/deal-filters.component';
import { DealFormComponent } from '../../components/deal-form/deal-form.component';
import { DealsTableComponent } from '../../components/deals-table/deals-table.component';

import { CreateDeal } from '../../models/deal.model';
import { PurchasePriceFilter } from '../../models/deal-filters.model';
import { DealsStore } from '../../services/deals.store';

import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-deals-page',
  standalone: true,
  imports: [AsyncPipe, DealFiltersComponent, DealsTableComponent, DealFormComponent],
  templateUrl: './deals-page.component.html',
  styleUrl: './deals-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealsPageComponent {
  private readonly dealsStore = inject(DealsStore);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  isAddDealOpen = false;

  readonly vm$ = combineLatest({
    deals: this.dealsStore.filteredDeals$,
    filters: this.dealsStore.filters$,
  });

  openAddDeal(): void {
    this.isAddDealOpen = true;
  }

  closeAddDeal(): void {
    this.isAddDealOpen = false;
  }

  onDealCreated(deal: CreateDeal): void {
    this.dealsStore.addDeal(deal);
    this.closeAddDeal();
  }

  onNameFilterChange(name: string): void {
    this.dealsStore.setNameFilter(name);
  }

  onPurchasePriceFilterChange(filter: PurchasePriceFilter): void {
    this.dealsStore.setPurchasePriceFilter(filter.operator, filter.value);
  }

  onClearFilters(): void {
    this.dealsStore.clearFilters();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
