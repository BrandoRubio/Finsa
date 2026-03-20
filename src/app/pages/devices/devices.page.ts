import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonMenuButton, IonBreadcrumb, IonBreadcrumbs, IonAccordion, IonAccordionGroup, IonItem, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { menuOutline, hardwareChipOutline, thermometer, thermometerOutline, flashOutline, pulseOutline, waterOutline, listOutline, gridOutline, pieChartOutline, albumsOutline, timeOutline, calendarOutline, pencilOutline, helpOutline, helpCircleOutline } from 'ionicons/icons';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonMenuButton, IonBreadcrumb, IonBreadcrumbs, CommonModule, FormsModule, RouterModule, LogoComponent,
    IonAccordion, IonAccordionGroup, IonItem, IonButton]
})
export class DevicesPage implements OnInit {

  plantId: number = 0;
  plantName: string = '';
  parkId = 0
  parkName: any = ""
  devices: any[] = [];
  viewMode: 'list' | 'grid' = 'grid';
  constructor(private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
  ) {
    addIcons({ menuOutline, listOutline, gridOutline, pieChartOutline, albumsOutline, timeOutline, calendarOutline, pencilOutline, hardwareChipOutline, thermometerOutline, flashOutline, pulseOutline, waterOutline, helpCircleOutline });
  }

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
}