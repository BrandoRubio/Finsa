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
import { LogoComponent } from 'src/app/components/logo/logo.component';
import {
  menuOutline, hardwareChipOutline, thermometer, thermometerOutline, flashOutline, pulseOutline, waterOutline, listOutline, gridOutline,
  pieChartOutline, albumsOutline, timeOutline, calendarOutline, pencilOutline, personAddOutline, cubeOutline, personRemoveOutline, closeOutline, businessOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-plant-users',
  templateUrl: './plant-users.page.html',
  styleUrls: ['./plant-users.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonIcon, IonButtons, RouterModule, IonSearchbar, IonModal, IonItem, IonInput, IonSelect, IonSelectOption, LogoComponent,
    IonGrid, IonCol, IonRow, IonRouterLink, IonMenuButton, IonButton, IonBreadcrumb, IonBreadcrumbs, CommonModule, FormsModule, IonToggle, IonBadge
  ]
})
export class PlantUsersPage implements OnInit {

  parkId: number = 0;
  plantId: number = 0;
  parkName: string = '';
  plantName: string = '';
  users: any[] = [];
  filteredUsers: any[] = [];
  existingUsers: any[] = [];
  searchTerm: string = '';
  userSearch: string = '';
  modalOpen: boolean = false;
  selectedUser: any = null;

  currentUser = JSON.parse(localStorage.getItem('userData') || '{}');

  form: any = {
    name: '', email: '', password: '',
    role: 'viewer', existing_user_id: null
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,) {
    addIcons({ menuOutline, personAddOutline, businessOutline, pencilOutline, personRemoveOutline, closeOutline, cubeOutline, listOutline, gridOutline, pieChartOutline, albumsOutline, timeOutline, calendarOutline, hardwareChipOutline, thermometerOutline, flashOutline, pulseOutline, waterOutline });
  }

  ngOnInit() {
    this.plantId = +this.route.snapshot.params['plant_id'];
    this.plantName = this.router.getCurrentNavigation()?.extras?.state?.['plantName'] || '';
    this.parkId = +this.route.snapshot.params['park_id'];
    this.parkName = this.router.getCurrentNavigation()?.extras?.state?.['parkName'] || '';
    this.GetUsers();

  }
  // ─── ROLES ──────────────────────────────────────────────────
  isMaster() { return this.currentUser?.is_master; }
  isAdmin() { return this.currentUser?.role === 'admin'; }
  isViewer() { return this.currentUser?.role === 'viewer'; }
  canEdit() { return this.isMaster() || this.isAdmin(); }

  GetRoleColor(role: string) {
    const map: any = { superadmin: 'danger', admin: 'primary', viewer: 'medium' };
    return map[role] || 'medium';
  }

  GetInitials(name: string) {
    return name?.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() || '?';
  }

  // ─── FILTRADO ────────────────────────────────────────────────
  FilterUsers() {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter((u: any) =>
      u.name.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term)
    );
  }

  // ─── API ─────────────────────────────────────────────────────
  GetUsers() {
    this.api.GetRequestRender('plants/' + this.plantId + '/users').then((response: any) => {
      this.users = response.data;
      this.filteredUsers = response.data;
      console.log('plants/' + this.plantId + '/users');
    });
  }

  SearchExistingUsers() {
    if (!this.userSearch || this.userSearch.length < 2) {
      this.existingUsers = [];
      return;
    }
    this.api.GetRequestRender('users?search=' + this.userSearch).then((response: any) => {
      this.existingUsers = response.data;
    });
  }

  SelectExistingUser(user: any) {
    this.form.existing_user_id = user.user_id;
    this.form.name = user.name;
    this.form.email = user.email;
    this.existingUsers = [];
    this.userSearch = user.name;
  }

  ToggleStatus(user: any) {
    this.api.PutRequestRender('users/' + user.user_id + '/status', { is_active: user.is_active })
      .then((response: any) => {
        if (response.error) user.is_active = !user.is_active;
      });
  }

  SaveUser() {
    if (this.selectedUser) {
      // Editar rol del usuario en la planta
      this.api.PostRequestRender('plants/' + this.plantId + '/users', {
        user_id: this.selectedUser.user_id,
        role: this.form.role
      }).then((response: any) => {
        if (!response.error) { this.CloseModal(); this.GetUsers(); }
      });
    } else if (this.form.existing_user_id) {
      // Asignar usuario existente a la planta
      this.api.PostRequestRender('plants/' + this.plantId + '/users', {
        user_id: this.form.existing_user_id,
        role: this.form.role
      }).then((response: any) => {
        if (!response.error) { this.CloseModal(); this.GetUsers(); }
      });
    } else {
      // Crear usuario nuevo y asignarlo a la planta
      const body = {
        name: this.form.name,
        email: this.form.email,
        password: btoa(this.form.password),
        role: this.form.role
      };
      this.api.PostRequestRender('users', body).then((newUser: any) => {
        if (!newUser.error) {
          this.api.PostRequestRender('plants/' + this.plantId + '/users', {
            user_id: newUser.user_id,
            role: this.form.role
          }).then((response: any) => {
            if (!response.error) { this.CloseModal(); this.GetUsers(); }
          });
        }
      });
    }
  }

  RevokeAccess(user: any) {
    const confirmed = confirm(`¿Quitar acceso de ${user.name} a esta planta?`);
    if (!confirmed) return;
    this.api.DeleteRequestRender('plants/' + this.plantId + '/users/' + user.user_id)
      .then((response: any) => {
        if (!response.error) this.GetUsers();
      });
  }

  OpenModal(user: any) {
    this.selectedUser = user;
    this.existingUsers = [];
    this.userSearch = '';
    this.form = user
      ? { name: user.name, email: user.email, password: '', role: user.plant_role || 'viewer', existing_user_id: user.user_id }
      : { name: '', email: '', password: '', role: 'viewer', existing_user_id: null };
    this.modalOpen = true;
  }

  CloseModal() {
    this.modalOpen = false;
    this.selectedUser = null;
    this.userSearch = '';
    this.existingUsers = [];
  }

  ToggleMenu() {
    const SIZE_TO_MEDIA: any = {
      'xs': '(min-width: 0px)',
      'sm': '(min-width: 576px)',
      'md': '(min-width: 768px)',
      'lg': '(min-width: 992px)',
      'xl': '(min-width: 1200px)'
    };
    const splitPane: any = document.querySelector('ion-split-pane') as HTMLIonSplitPaneElement;
    if (!splitPane) return;

    const media = SIZE_TO_MEDIA[splitPane.when] || splitPane.when;

    if (window.matchMedia(media).matches) {
      splitPane.classList.toggle('split-pane-visible');
    }
  }
}
