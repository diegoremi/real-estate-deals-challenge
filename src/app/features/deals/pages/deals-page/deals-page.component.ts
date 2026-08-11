import { AsyncPipe, CurrencyPipe, PercentPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DealsStore } from '../../services/deals.store';

@Component({
  selector: 'app-deals-page',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, PercentPipe],
  templateUrl: './deals-page.component.html',
  styleUrl: './deals-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealsPageComponent {
  private readonly dealsStore = inject(DealsStore);

  readonly deals$ = this.dealsStore.filteredDeals$;
}
