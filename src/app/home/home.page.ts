import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonIcon,
  IonGrid, IonCol, IonRow, IonRouterLink, IonMenuButton, IonButton, IonBreadcrumb, IonBreadcrumbs
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { menuOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonIcon,
    IonGrid, IonCol, IonRow, IonRouterLink, IonMenuButton, IonButton, IonBreadcrumb, IonBreadcrumbs
  ]
})
export class HomePage implements OnInit {
  // plant-detail.page.ts

  deviceCount: any = 5
  dashboardCount: any = 8
  userCount: any = 9
  sensorCount: any = 3
  eventCount: any = 1
  plantId: any = 0
  plantName: any = ""
  constructor(private route: ActivatedRoute,
    private api: ApiService,) {
    addIcons({
      menuOutline
    });
  }

  ngOnInit() {
    this.plantId = +this.route.snapshot.params['plant_id'];
    console.log(this.plantId);

    this.api.GetRequestRender('plant/' + this.plantId + '/summary').then((response: any) => {

      this.deviceCount = response.data[0].devices
      this.dashboardCount = response.data[0].dashboards
      this.userCount = response.data[0].users
      this.sensorCount = response.data[0].sensors
      this.eventCount = response.data[0].events
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
