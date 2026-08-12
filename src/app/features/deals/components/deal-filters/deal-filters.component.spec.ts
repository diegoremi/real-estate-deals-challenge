import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealFiltersComponent } from './deal-filters.component';

describe('DealFiltersComponent', () => {
  let component: DealFiltersComponent;
  let fixture: ComponentFixture<DealFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DealFiltersComponent);
    component = fixture.componentInstance;

    component.filters = {
      name: '',
      purchasePrice: {
        operator: null,
        value: null,
      },
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the name filter value', () => {
    const emitSpy = spyOn(component.nameFilterChange, 'emit');

    const input = document.createElement('input');
    input.value = 'riverside';

    component.onNameChange({
      target: input,
    } as unknown as Event);

    expect(emitSpy).toHaveBeenCalledOnceWith('riverside');
  });
});
