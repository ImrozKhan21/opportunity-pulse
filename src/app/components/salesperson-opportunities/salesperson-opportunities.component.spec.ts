import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalespersonOpportunitiesComponent } from './salesperson-opportunities.component';

describe('SalespersonOpportunitiesComponent', () => {
  let component: SalespersonOpportunitiesComponent;
  let fixture: ComponentFixture<SalespersonOpportunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalespersonOpportunitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalespersonOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
