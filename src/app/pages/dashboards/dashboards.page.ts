import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonCardSubtitle, IonCardTitle, IonCard, IonCardContent, IonCardHeader, IonIcon, IonButtons,
  IonGrid, IonCol, IonRow, IonRouterLink, IonMenuButton, IonButton, IonBreadcrumb, IonBreadcrumbs, IonBadge
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { addIcons } from 'ionicons';
import { RouterModule } from '@angular/router';
import { menuOutline, hardwareChipOutline, thermometer, thermometerOutline, flashOutline, pulseOutline, waterOutline, listOutline, gridOutline, pieChartOutline, albumsOutline, timeOutline, calendarOutline, pencilOutline, trashOutline } from 'ionicons/icons';
import { AlertsService } from 'src/app/services/alerts.service';
import { LogoComponent } from 'src/app/components/logo/logo.component';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.page.html',
  styleUrls: ['./dashboards.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardSubtitle, IonCardTitle, IonCardContent, IonCardHeader, IonIcon, IonButtons, RouterModule, IonBadge, LogoComponent,
    IonGrid, IonCol, IonRow, IonRouterLink, IonMenuButton, IonButton, IonBreadcrumb, IonBreadcrumbs, CommonModule, FormsModule]
})
export class DashboardsPage implements OnInit {

  plantId: any = 0
  plantName: any = ""
  parkId = 0
  parkName: any = ""
  dashboards: any = [];
  viewMode: 'list' | 'grid' = 'grid';
  constructor(
    private router: Router,
    private api: ApiService,
    private route: ActivatedRoute,
    private alerts: AlertsService
  ) {
    addIcons({ menuOutline, listOutline, gridOutline, pieChartOutline, albumsOutline, timeOutline, trashOutline, calendarOutline, pencilOutline, hardwareChipOutline, thermometerOutline, flashOutline, pulseOutline, waterOutline, });
  }

  ngOnInit() {
    this.plantId = +this.route.snapshot.params['plant_id'];
    this.plantName = this.router.getCurrentNavigation()?.extras?.state?.['plantName'] || '';
    this.parkId = +this.route.snapshot.params['park_id'];
    this.parkName = this.router.getCurrentNavigation()?.extras?.state?.['parkName'] || '';

    this.GetDashbaords()
  }
  GetDashbaords() {
    this.api.GetRequestRender('plant/' + this.plantId + '/dashboards').then((response: any) => {
      this.dashboards = response.data
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
  GoToDashboard(dash: any) {
    this.router.navigate(
      ['/park', this.parkId, 'plant', this.plantId, 'dashboards', dash.dashboard_id, 'widgets'],
      { state: { parkName: this.parkName, plantName: this.plantName, dashName: dash.name } }
    );
  }

  async DeleteDashboard(event: Event, dash: any) {
    event.stopPropagation();
    event.preventDefault();

    if (await this.alerts.ShowAlert(
      '¿Deseas eliminar este dashboard?',
      'Alerta',
      'Atrás',
      'Eliminar'
    )) {
      this.api.DeleteRequestRender('dashboards/' + dash.dashboard_id).then((response: any) => {
        if (!response.error) {
          this.dashboards = this.dashboards.filter(
            (d: any) => d.dashboard_id !== dash.dashboard_id
          );
          //this.alerts.Success('Dashboard eliminado');
        } else {
          //this.alerts.Info(response.message);
        }
      });
    }
  }
}
