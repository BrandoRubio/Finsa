
import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink,
  IonToggle, IonAccordion, IonAccordionGroup, IonPopover, IonFooter, IonToolbar,
  IonButton,
  IonHeader,
  IonTitle,
  IonAvatar,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, cubeOutline, businessOutline, ellipsisVerticalOutline, powerOutline, settingsOutline, peopleOutline, eyeOutline } from 'ionicons/icons';
import { ApiService } from './services/api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet,
    IonToggle, IonAccordion, IonAccordionGroup, CommonModule, IonPopover, IonFooter, IonToolbar,
    IonButton,
    IonHeader,
    IonTitle,
    IonAvatar,
    IonText, FormsModule
  ],
})
export class AppComponent {

  darkMode: boolean = false
  username = "Inicie sesión"
  user: any = {}
  showMenu = false;
  ParksArray: any = []
  openAccordions: any = []
  currentUser = JSON.parse(localStorage.getItem('userData') || '{}');
  constructor(
    private api: ApiService,
    private router: Router,
    private navCtrl: NavController,
    private changeDetector: ChangeDetectorRef,) {
    addIcons({
      mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, peopleOutline,
      warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, cubeOutline, businessOutline, ellipsisVerticalOutline, powerOutline, settingsOutline, eyeOutline
    });
    const isLogged = localStorage.getItem('isLogged') == 'true' ? true : false
    isLogged && this.GetParks()
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showMenu = !event.url.includes('login');
      }
    });
    const theme = localStorage.getItem('theme');

    if (theme == null) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: light)');
      this.darkMode = prefersDark.matches;
      this.ApplyTheme(this.darkMode);
    } else {
      this.darkMode = theme == 'true' ? true : false;
      this.ApplyTheme(this.darkMode);
    }
  }

  // ─── ROLES ──────────────────────────────────────────────────
  isMaster() { return this.currentUser?.is_master; }
  isAdmin() { return this.currentUser?.role === 'admin'; }
  isViewer() { return this.currentUser?.role === 'viewer'; }
  canEdit() { return this.isMaster() || this.isAdmin(); }

  SaveLogin(user: any, username: any) {//login
    this.user = user
    this.username = username
    this.router.navigate(['/parks']);
    this.currentUser = JSON.parse(localStorage.getItem('userData') || '{}');
    this.GetParks()
  }
  GetParks() {
    this.api.GetRequestRender('parks-plants', false).then((response: any) => {
      this.ParksArray = response.data;
      setTimeout(() => {
        this.openAccordions = this.ParksArray.map(
          (p: any) => 'park-' + p.park_id
        );
      });
    })
  }

  LogOut() {//cierra sesión, resetea la ruta y reasiga el nombre de usuario
    this.username = "Inicie sesión"
    localStorage.setItem("isLogged", "false")
    this.navCtrl.navigateRoot('/login');
    this.changeDetector.detectChanges()
  }
  ChangeColorMode() {
    console.log(this.darkMode);
    this.ApplyTheme(this.darkMode);

    localStorage.setItem('theme', String(this.darkMode));
  }

  ApplyTheme(isDark: boolean) {
    document.body.classList.toggle('dark', isDark);
    // Para PrimeNG
    const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark', isDark);
  }
  goToPlant(plant: any) {
    this.router.navigate(['/plant', plant.plant_id]);
  }

}
