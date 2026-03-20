import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParksUsersPage } from './parks-users.page';

describe('ParksUsersPage', () => {
  let component: ParksUsersPage;
  let fixture: ComponentFixture<ParksUsersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ParksUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
