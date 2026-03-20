import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WidgetsPage } from './widgets.page';

describe('WidgetsPage', () => {
  let component: WidgetsPage;
  let fixture: ComponentFixture<WidgetsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
