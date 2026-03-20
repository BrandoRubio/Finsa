import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParkPage } from './park.page';

describe('ParkPage', () => {
  let component: ParkPage;
  let fixture: ComponentFixture<ParkPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
