import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Output,
  inject,
} from '@angular/core';
import { AsyncPipe, PercentPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest, map, startWith } from 'rxjs';
import { CreateDeal } from '../../models/deal.model';

interface CapRateViewModel {
  readonly value: number;
  readonly status: 'Low' | 'Typical' | 'High';
}

@Component({
  selector: 'app-deal-form',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, PercentPipe],
  templateUrl: './deal-form.component.html',
  styleUrl: './deal-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealFormComponent {
  private readonly fb = inject(FormBuilder);

  @Output()
  readonly dealCreated = new EventEmitter<CreateDeal>();
  @Output()
  readonly cancelled = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.onCancel();
  }

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    address: ['', [Validators.required, Validators.maxLength(200)]],
    purchasePrice: [0, [Validators.required, Validators.min(1)]],
    noi: [0, [Validators.required, Validators.min(0)]],
  });

  readonly capRateVm$ = combineLatest([
    this.form.controls.purchasePrice.valueChanges.pipe(
      startWith(this.form.controls.purchasePrice.value),
    ),
    this.form.controls.noi.valueChanges.pipe(startWith(this.form.controls.noi.value)),
  ]).pipe(
    map(([purchasePrice, noi]): CapRateViewModel => {
      const value = purchasePrice > 0 ? noi / purchasePrice : 0;

      return {
        value,
        status: this.getCapRateStatus(value),
      };
    }),
  );

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dealCreated.emit(this.form.getRawValue());
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }

  private getCapRateStatus(capRate: number): CapRateViewModel['status'] {
    if (capRate < 0.05) {
      return 'Low';
    }

    if (capRate <= 0.12) {
      return 'Typical';
    }

    return 'High';
  }
}
