import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParksPage } from './parks.page';

describe('ParksPage', () => {
  let component: ParksPage;
  let fixture: ComponentFixture<ParksPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ParksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
