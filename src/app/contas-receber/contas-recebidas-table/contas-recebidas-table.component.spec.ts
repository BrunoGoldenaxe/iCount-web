import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContasRecebidasTableComponent } from './contas-recebidas-table.component';

describe('ContasRecebidasTableComponent', () => {
  let component: ContasRecebidasTableComponent;
  let fixture: ComponentFixture<ContasRecebidasTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContasRecebidasTableComponent]
    });
    fixture = TestBed.createComponent(ContasRecebidasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
