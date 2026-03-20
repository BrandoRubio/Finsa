import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinsaUsersPage } from './finsa-users.page';

describe('FinsaUsersPage', () => {
  let component: FinsaUsersPage;
  let fixture: ComponentFixture<FinsaUsersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FinsaUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
