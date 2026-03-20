import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantsPage } from './plants.page';

describe('PlantsPage', () => {
  let component: PlantsPage;
  let fixture: ComponentFixture<PlantsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
