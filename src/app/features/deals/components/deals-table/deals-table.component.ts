import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CurrencyPipe, PercentPipe } from '@angular/common';

import { Deal } from '../../models/deal.model';
import { HighlightPipe } from '../../../../shared/pipes/highlight.pipe';

@Component({
  selector: 'app-deals-table',
  standalone: true,
  imports: [CurrencyPipe, PercentPipe, HighlightPipe],
  templateUrl: './deals-table.component.html',
  styleUrl: './deals-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealsTableComponent {
  @Input({ required: true })
  deals!: readonly Deal[];

  @Input()
  searchTerm = '';
}
