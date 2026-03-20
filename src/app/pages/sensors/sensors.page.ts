import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonMenuButton, IonBreadcrumb, IonBreadcrumbs, IonAccordion, IonAccordionGroup, IonItem } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { addIcons } from 'ionicons';
import { RouterModule } from '@angular/router';
import { menuOutline, hardwareChipOutline, thermometer, thermometerOutline, flashOutline, pulseOutline, waterOutline, listOutline, gridOutline } from 'ionicons/icons';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.page.html',
  styleUrls: ['./sensors.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonMenuButton, IonBreadcrumb, IonBreadcrumbs, IonAccordion, IonAccordionGroup, IonItem, CommonModule, FormsModule, RouterModule]
})
export class SensorsPage implements OnInit {

  plantId: any = 0
  plantName: any = ""
  parkId = 0
  parkName: any = ""
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,) {
    addIcons({ menuOutline, listOutline, gridOutline, hardwareChipOutline, thermometerOutline, flashOutline, pulseOutline, waterOutline });
  }

  ngOnInit() {
    this.plantId = +this.route.snapshot.params['plant_id'];
    this.plantName = this.router.getCurrentNavigation()?.extras?.state?.['plantName'] || '';
    this.parkId = +this.route.snapshot.params['park_id'];
    this.parkName = this.router.getCurrentNavigation()?.extras?.state?.['parkName'] || '';
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
