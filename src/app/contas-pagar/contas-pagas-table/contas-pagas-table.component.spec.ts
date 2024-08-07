import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContasPagasTableComponent } from './contas-pagas-table.component';

describe('ContasPagasTableComponent', () => {
  let component: ContasPagasTableComponent;
  let fixture: ComponentFixture<ContasPagasTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContasPagasTableComponent]
    });
    fixture = TestBed.createComponent(ContasPagasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
