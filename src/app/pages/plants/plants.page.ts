import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonIcon, IonButtons,
  IonGrid, IonCol, IonRow, IonRouterLink, IonMenuButton, IonButton, IonBreadcrumb, IonBreadcrumbs
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { menuOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { LogoComponent } from 'src/app/components/logo/logo.component';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.page.html',
  styleUrls: ['./plants.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonIcon, IonButtons, LogoComponent,
    IonGrid, IonCol, IonRow, IonRouterLink, IonMenuButton, IonButton, IonBreadcrumb, IonBreadcrumbs, RouterModule
  ]
})
export class PlantsPage implements OnInit {
  // plant-detail.page.ts

  deviceCount: any = 0
  dashboardCount: any = 0
  userCount: any = 0
  sensorCount: any = 0
  eventCount: any = 0
  plantId: any = 0
  plantName: any = ""
  parkId = 0
  parkName: any = ""
  constructor(
    private router: Router,
    private api: ApiService,
    private route: ActivatedRoute,
  ) {
    addIcons({
      menuOutline
    });
  }

  ngOnInit() {
    this.plantId = +this.route.snapshot.params['plant_id'];
    this.plantName = this.router.getCurrentNavigation()?.extras?.state?.['plantName'] || '';
    this.parkId = +this.route.snapshot.params['park_id'];
    this.parkName = this.router.getCurrentNavigation()?.extras?.state?.['parkName'] || '';
    this.GetPlants()
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
  GetPlants() {
    this.api.GetRequestRender('plant/' + this.plantId + '/summary').then((response: any) => {
      this.deviceCount = response.data[0].devices
      this.dashboardCount = response.data[0].dashboards
      this.userCount = response.data[0].users
      this.sensorCount = response.data[0].sensors
      this.eventCount = response.data[0].events
    })
  }
}
