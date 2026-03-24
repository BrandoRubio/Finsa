import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonMenuButton, IonBreadcrumb, IonBreadcrumbs, IonAccordion, IonAccordionGroup, IonItem, IonButton,
  IonModal, IonToggle, IonInput, IonLabel
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { menuOutline, hardwareChipOutline, thermometer, thermometerOutline, flashOutline, pulseOutline, waterOutline, listOutline, gridOutline, pieChartOutline, albumsOutline, timeOutline, calendarOutline, pencilOutline, helpOutline, helpCircleOutline, trashOutline, closeOutline, refreshOutline, addOutline, copyOutline } from 'ionicons/icons';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { ApiService } from 'src/app/services/api.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonMenuButton, IonBreadcrumb, IonBreadcrumbs, CommonModule, FormsModule, RouterModule, LogoComponent,
    IonAccordion, IonAccordionGroup, IonItem, IonButton, IonModal, IonToggle, IonInput, IonLabel]
})
export class DevicesPage implements OnInit {

  plantId: number = 0;
  plantName: string = '';
  parkId = 0
  parkName: any = ""
  devices: any[] = [];
  viewMode: 'list' | 'grid' = 'grid';
  modalOpen: boolean = false;
  selectedDevice: any = null;

  form: any = {
    name: '', type: '', description: '', token: '', is_active: true
  };

  currentUser = JSON.parse(localStorage.getItem('userData') || '{}');
  constructor(private route: ActivatedRoute,
    private router: Router,
    private alerts: AlertsService,
    private api: ApiService,
  ) {
    addIcons({ menuOutline, listOutline, gridOutline, addOutline, hardwareChipOutline, pencilOutline, trashOutline, closeOutline, copyOutline, refreshOutline, pieChartOutline, albumsOutline, timeOutline, calendarOutline, thermometerOutline, flashOutline, pulseOutline, waterOutline, helpCircleOutline });
  }

  // ─── ROLES ──────────────────────────────────────────────────
  isMaster() { return this.currentUser?.is_master; }
  isAdmin() { return this.currentUser?.role === 'admin'; }
  isViewer() { return this.currentUser?.role === 'viewer'; }
  canEdit() { return this.isMaster() || this.isAdmin(); }

  ngOnInit() {
    this.plantId = +this.route.snapshot.params['plant_id'];
    this.plantName = this.router.getCurrentNavigation()?.extras?.state?.['plantName'] || '';
    this.parkId = +this.route.snapshot.params['park_id'];
    this.parkName = this.router.getCurrentNavigation()?.extras?.state?.['parkName'] || '';

    this.GetDevices();
  }

  GetDevices() {
    this.api.GetRequestRender('plant/' + this.plantId + '/devices-sensors').then((response: any) => {
      this.devices = response.data
    })
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


  // ─── TOKEN ───────────────────────────────────────────────────
  GenerateToken(): string {
    let d = new Date().getTime();
    let d2 = (performance && performance.now && (performance.now() * 1000)) || 0;

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16;
      if (d > 0) {
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  SaveDevice() {
    if (!this.form.name) {
      //this.alerts.Info('El nombre es requerido');
      return;
    }

    if (this.selectedDevice) {
      // Actualizar
      this.api.PutRequestRender('devices/' + this.selectedDevice.device_id, {
        plant_id: this.plantId,
        name: this.form.name,
        type: this.form.type,
        description: this.form.description,
        token: this.form.token,
        is_active: this.form.is_active
      }).then((response: any) => {
        if (!response.error) {
          //this.alerts.Success('Dispositivo actualizado');
          this.CloseModal();
          this.GetDevices();
        } else {
          //this.alerts.Info(response.message);
        }
      });

    } else {
      // Crear
      this.api.PostRequestRender('devices', {
        plant_id: this.plantId,
        name: this.form.name,
        type: this.form.type,
        description: this.form.description,
        token: this.form.token
      }).then((response: any) => {
        if (!response.error) {
          //this.alerts.Success('Dispositivo creado');
          this.CloseModal();
          this.GetDevices();
        } else {
          //this.alerts.Info(response.message);
        }
      });
    }
  }

  async DeleteDevice(event: Event, device: any) {
    event.stopPropagation();

    if (await this.alerts.ShowAlert(
      '¿Deseas eliminar este dispositivo?',
      'Alerta',
      'Atrás',
      'Eliminar'
    )) {
      this.api.DeleteRequestRender('devices/' + device.device_id)
        .then((response: any) => {
          if (!response.error) {
            this.devices = this.devices.filter(
              (d: any) => d.device_id !== device.device_id
            );
            //this.alerts.Success('Dispositivo eliminado');
          } else {
            //this.alerts.Info(response.message);
          }
        });
    }
  }

  // ─── MODAL ───────────────────────────────────────────────────
  OpenModal(device: any) {
    this.selectedDevice = device;
    this.form = device ? {
      name: device.name,
      type: device.type || '',
      description: device.description || '',
      token: device.token,
      is_active: device.is_active
    } : {
      name: '',
      type: '',
      description: '',
      token: this.GenerateToken(),
      is_active: true
    };
    this.modalOpen = true;
  }

  CloseModal() {
    this.modalOpen = false;
    this.selectedDevice = null;
  }

  RegenerateToken() {
    this.form.token = this.GenerateToken();
  }

  async copyFromInputToken() {
    await Clipboard.write({
      string: this.form.token
    });
  }

  async copyFromDev(dev: any) {
    await Clipboard.write({
      string: dev.token
    });
  }
}