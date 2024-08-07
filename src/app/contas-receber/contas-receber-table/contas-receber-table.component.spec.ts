import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContasReceberTableComponent } from './contas-receber-table.component';

describe('ContasReceberTableComponent', () => {
  let component: ContasReceberTableComponent;
  let fixture: ComponentFixture<ContasReceberTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContasReceberTableComponent]
    });
    fixture = TestBed.createComponent(ContasReceberTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
