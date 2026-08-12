import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealFormComponent } from './deal-form.component';

describe('DealFormComponent', () => {
  let component: DealFormComponent;
  let fixture: ComponentFixture<DealFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DealFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be invalid when required fields are missing', () => {
    expect(component.form.invalid).toBeTrue();
  });

  it('should reject a purchase price lower than one', () => {
    component.form.patchValue({
      name: 'Test Deal',
      address: '123 Test Street',
      purchasePrice: 0,
      noi: 100_000,
    });

    expect(component.form.controls.purchasePrice.hasError('min')).toBeTrue();

    expect(component.form.invalid).toBeTrue();
  });

  it('should calculate the cap rate from NOI and purchase price', () => {
    let latestCapRate:
      | {
          value: number;
          status: 'Low' | 'Typical' | 'High';
        }
      | undefined;

    const subscription = component.capRateVm$.subscribe((capRate) => {
      latestCapRate = capRate;
    });

    component.form.patchValue({
      purchasePrice: 5_000_000,
      noi: 400_000,
    });

    expect(latestCapRate?.value).toBeCloseTo(0.08, 5);
    expect(latestCapRate?.status).toBe('Typical');

    subscription.unsubscribe();
  });

  it('should emit a valid deal on submit', () => {
    const dealCreatedSpy = spyOn(component.dealCreated, 'emit');

    component.form.setValue({
      name: 'Pacific Retail Center',
      address: '450 Pacific Ave, Seattle, WA',
      purchasePrice: 7_000_000,
      noi: 560_000,
    });

    component.onSubmit();

    expect(dealCreatedSpy).toHaveBeenCalledOnceWith({
      name: 'Pacific Retail Center',
      address: '450 Pacific Ave, Seattle, WA',
      purchasePrice: 7_000_000,
      noi: 560_000,
    });
  });

  it('should not emit when the form is invalid', () => {
    const dealCreatedSpy = spyOn(component.dealCreated, 'emit');

    component.onSubmit();

    expect(dealCreatedSpy).not.toHaveBeenCalled();
  });

  it('should classify cap rates below 5% as low', () => {
    let latestCapRate:
      | {
          value: number;
          status: 'Low' | 'Typical' | 'High';
        }
      | undefined;

    const subscription = component.capRateVm$.subscribe((capRate) => {
      latestCapRate = capRate;
    });

    component.form.patchValue({
      purchasePrice: 10_000_000,
      noi: 400_000,
    });

    expect(latestCapRate?.value).toBeCloseTo(0.04, 5);
    expect(latestCapRate?.status).toBe('Low');

    subscription.unsubscribe();
  });

  it('should classify cap rates above 12% as high', () => {
    let latestCapRate:
      | {
          value: number;
          status: 'Low' | 'Typical' | 'High';
        }
      | undefined;

    const subscription = component.capRateVm$.subscribe((capRate) => {
      latestCapRate = capRate;
    });

    component.form.patchValue({
      purchasePrice: 5_000_000,
      noi: 750_000,
    });

    expect(latestCapRate?.value).toBeCloseTo(0.15, 5);
    expect(latestCapRate?.status).toBe('High');

    subscription.unsubscribe();
  });
});
