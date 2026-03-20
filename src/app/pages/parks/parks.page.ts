import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonMenuButton, IonBreadcrumb, IonBreadcrumbs, IonAccordion, IonAccordionGroup, IonItem, IonButton, IonButtons, IonRouterLink } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { menuOutline, hardwareChipOutline, thermometer, thermometerOutline, flashOutline, pulseOutline, waterOutline, listOutline, gridOutline, pieChartOutline, albumsOutline, timeOutline, calendarOutline, pencilOutline, businessOutline, cubeOutline, peopleOutline, settingsOutline } from 'ionicons/icons';
import { ApiService } from 'src/app/services/api.service';
import { LogoComponent } from 'src/app/components/logo/logo.component';

@Component({
  selector: 'app-parks',
  templateUrl: './parks.page.html',
  styleUrls: ['./parks.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonMenuButton, IonBreadcrumb, IonBreadcrumbs, CommonModule, FormsModule, RouterModule,
    IonAccordion, IonAccordionGroup, IonItem, IonButton, IonButtons, IonRouterLink, LogoComponent]
})
export class ParksPage implements OnInit {

  parksArray: any = []
  viewMode: 'list' | 'grid' = 'grid';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,) {
    addIcons({menuOutline,peopleOutline,settingsOutline,businessOutline,cubeOutline,listOutline,gridOutline,pieChartOutline,albumsOutline,timeOutline,calendarOutline,pencilOutline,hardwareChipOutline,thermometerOutline,flashOutline,pulseOutline,waterOutline});
  }
  ngOnInit() {
    this.GetDevices();
  }

  GetDevices() {
    this.api.GetRequestRender('parks-plants').then((response: any) => {
      this.parksArray = response.data;
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
