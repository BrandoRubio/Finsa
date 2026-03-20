import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonMenuButton, IonBreadcrumb, IonBreadcrumbs, IonAccordion, IonAccordionGroup, IonItem, IonButton, IonSegment,
  IonSegmentButton, IonBadge, IonList, IonLabel
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { menuOutline, hardwareChipOutline, thermometer, thermometerOutline, flashOutline, pulseOutline, waterOutline, listOutline, gridOutline, pieChartOutline, albumsOutline, timeOutline, calendarOutline, pencilOutline, cubeOutline, settingsOutline, chevronForwardOutline, locationOutline, peopleOutline, businessOutline, mapOutline } from 'ionicons/icons';
import { ApiService } from 'src/app/services/api.service';
import { LogoComponent } from 'src/app/components/logo/logo.component';

@Component({
  selector: 'app-park',
  templateUrl: './park.page.html',
  styleUrls: ['./park.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonMenuButton, IonBreadcrumb, IonBreadcrumbs, CommonModule, FormsModule, RouterModule, IonSegment, IonSegmentButton, IonBadge,
    IonAccordion, IonAccordionGroup, IonItem, IonButton, IonList, IonLabel, LogoComponent
  ]
})
export class ParkPage implements OnInit {
  parkId = 0
  parkName: any = ""
  park: any = null;
  plants: any[] = [];
  segment: string = 'plants';
  viewMode: 'list' | 'grid' = 'grid';
  constructor(
    private router: Router,
    private api: ApiService,
    private route: ActivatedRoute,) {
    addIcons({ menuOutline, cubeOutline, settingsOutline, listOutline, gridOutline, chevronForwardOutline, locationOutline, peopleOutline, businessOutline, timeOutline, mapOutline });
  }

  currentUser = JSON.parse(localStorage.getItem('userData') || '{}');
  // ─── ROLES ──────────────────────────────────────────────────
  isMaster() { return this.currentUser?.is_master; }
  isAdmin() { return this.currentUser?.role === 'admin'; }
  isViewer() { return this.currentUser?.role === 'viewer'; }
  canEdit() { return this.isMaster() || this.isAdmin(); }
  ngOnInit() {
    this.parkId = +this.route.snapshot.params['park_id'];
    this.parkName = this.router.getCurrentNavigation()?.extras?.state?.['parkName'] || '';
    console.log(this.parkId, this.parkName);
    this.LoadPark();
  }

  LoadPark() {
    this.api.GetRequestRender('parks/' + this.parkId).then((response: any) => {
      if (!response.error) {
        this.park = response.data[0];
        this.parkName = this.park.name;
        this.plants = this.park.plants || [];
      }
    });
  }

  OpenSettings() {
    // lógica de settings pendiente
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

  SegmentChanged() { }
}
