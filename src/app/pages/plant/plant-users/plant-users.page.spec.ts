import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantUsersPage } from './plant-users.page';

describe('PlantUsersPage', () => {
  let component: PlantUsersPage;
  let fixture: ComponentFixture<PlantUsersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
