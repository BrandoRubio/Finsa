import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonIcon, IonButtons,
  IonGrid, IonCol, IonRow, IonRouterLink, IonMenuButton, IonButton, IonBreadcrumb, IonBreadcrumbs, IonSearchbar,
  IonModal, IonItem, IonInput, IonSelect, IonSelectOption, IonToggle, IonBadge

} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { addIcons } from 'ionicons';
import { RouterModule } from '@angular/router';
import {
  menuOutline, hardwareChipOutline, thermometer, thermometerOutline, flashOutline, pulseOutline, waterOutline, listOutline, gridOutline,
  pieChartOutline, albumsOutline, timeOutline, calendarOutline, pencilOutline, personAddOutline, cubeOutline, personRemoveOutline, closeOutline, businessOutline, trashOutline, shieldOutline } from 'ionicons/icons';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonIcon, IonButtons, RouterModule, IonSearchbar, IonModal, IonItem, IonInput, IonSelect, IonSelectOption,
    IonGrid, IonCol, IonRow, IonRouterLink, IonMenuButton, IonButton, IonBreadcrumb, IonBreadcrumbs, CommonModule, FormsModule, IonToggle, IonBadge
  ]
})
export class UsersPage implements OnInit {

  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  modalOpen: boolean = false;
  selectedUser: any = null;

  currentUser = JSON.parse(localStorage.getItem('userData') || '{}');

  form: any = {
    name: '', email: '', password: '', role: 'admin'
  };

  constructor(private api: ApiService) {
    addIcons({menuOutline,personAddOutline,shieldOutline,pencilOutline,trashOutline,closeOutline,businessOutline,personRemoveOutline,cubeOutline,listOutline,gridOutline,pieChartOutline,albumsOutline,timeOutline,calendarOutline,hardwareChipOutline,thermometerOutline,flashOutline,pulseOutline,waterOutline});

  }

  ngOnInit() { this.GetUsers(); }

  // ─── HELPERS ────────────────────────────────────────────────
  GetRoleColor(role: string) {
    const map: any = { superadmin: 'danger', admin: 'primary', viewer: 'medium' };
    return map[role] || 'medium';
  }

  GetInitials(name: string) {
    return name?.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() || '?';
  }

  FilterUsers() {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter((u: any) =>
      u.name.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term)
    );
  }

  // ─── API ─────────────────────────────────────────────────────
  GetUsers() {
    this.api.GetRequestRender('users/master').then((response: any) => {
      this.users = response.data;
      this.filteredUsers = response.data;
    });
  }

  ToggleStatus(user: any) {
    this.api.PutRequestRender('users/' + user.user_id + '/status', { is_active: user.is_active })
      .then((response: any) => {
        if (response.error) user.is_active = !user.is_active;
      });
  }

  SaveUser() {
    if (this.selectedUser) {
      this.api.PutRequestRender('users/' + this.selectedUser.user_id, {
        name: this.form.name,
        role: this.form.role
      }).then((response: any) => {
        if (!response.error) { this.CloseModal(); this.GetUsers(); }
      });
    } else {
      this.api.PostRequestRender('users/master', {
        name: this.form.name,
        email: this.form.email,
        password: btoa(this.form.password),
        role: this.form.role
      }).then((response: any) => {
        if (!response.error) { this.CloseModal(); this.GetUsers(); }
      });
    }
  }

  ConfirmDelete(user: any) {
    const confirmed = confirm(`¿Eliminar a ${user.name}?`);
    if (!confirmed) return;
    this.api.DeleteRequestRender('users/' + user.user_id).then((response: any) => {
      if (!response.error) this.GetUsers();
    });
  }

  OpenModal(user: any) {
    this.selectedUser = user;
    this.form = user
      ? { name: user.name, email: user.email, password: '', role: user.role }
      : { name: '', email: '', password: '', role: 'admin' };
    this.modalOpen = true;
  }

  CloseModal() {
    this.modalOpen = false;
    this.selectedUser = null;
  }
}