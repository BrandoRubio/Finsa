import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonIcon, IonButtons,
  IonGrid, IonCol, IonRow, IonRouterLink, IonMenuButton, IonButton, IonBreadcrumb, IonBreadcrumbs
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { addIcons } from 'ionicons';
import { RouterModule } from '@angular/router';
import { menuOutline, hardwareChipOutline, thermometer, thermometerOutline, flashOutline, pulseOutline, waterOutline, listOutline, gridOutline, pieChartOutline, albumsOutline, timeOutline, calendarOutline, pencilOutline } from 'ionicons/icons';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.page.html',
  styleUrls: ['./dashboards.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonIcon, IonButtons, RouterModule,
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
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,) {
    addIcons({ menuOutline, listOutline, gridOutline, pieChartOutline, albumsOutline, timeOutline, calendarOutline, pencilOutline, hardwareChipOutline, thermometerOutline, flashOutline, pulseOutline, waterOutline });
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
}
