import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import {
  DealFilters,
  PurchasePriceFilter,
  PurchasePriceOperator,
} from '../../models/deal-filters.model';

@Component({
  selector: 'app-deal-filters',
  standalone: true,
  imports: [],
  templateUrl: './deal-filters.component.html',
  styleUrl: './deal-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealFiltersComponent {
  @Input({ required: true })
  filters!: DealFilters;

  @Output()
  readonly nameFilterChange = new EventEmitter<string>();
  @Output()
  readonly purchasePriceFilterChange = new EventEmitter<PurchasePriceFilter>();
  @Output()
  readonly clearFilters = new EventEmitter<void>();

  onNameChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.nameFilterChange.emit(input.value);
  }

  onOperatorChange(event: Event): void {
    const select = event.target as HTMLSelectElement;

    const operator = select.value === '' ? null : (select.value as PurchasePriceOperator);

    this.purchasePriceFilterChange.emit({
      operator,
      value: operator ? this.filters.purchasePrice.value : null,
    });
  }

  onPriceChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    const value = input.value === '' ? null : Number(input.value);

    this.purchasePriceFilterChange.emit({
      operator: this.filters.purchasePrice.operator,
      value,
    });
  }
}
