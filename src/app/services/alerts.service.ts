import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { addIcons } from "ionicons";
import { checkmarkCircle, closeCircle, warning, informationCircle } from "ionicons/icons";

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    public loadController: LoadingController,
    private alertController: AlertController) {

    addIcons({ checkmarkCircle, closeCircle, warning, informationCircle })
  }

  private loader: HTMLIonLoadingElement | null = null;

  async ShowLoading(message: string = 'Por favor espere...') {
    await this.HideLoading(); // Asegurarse de que cualquier loader previo sea cerrado
    this.loader = await this.loadController.create({
      message: message,
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-loading'
    });

    await this.loader.present();
  }

  async HideLoading() {
    if (this.loader) {
      await this.loader.dismiss();
      this.loader = null;
    }
  }


  ToastZIndex() {
    setTimeout(() => {
      const toast = document.querySelector('.p-toast') as HTMLElement;
      if (toast) {
        toast.style.zIndex = '999999';
      }
    }, 50);
  }

  async ShowAlert(message: string, title: string = "Alerta", cancel: string = "Cancelar", confirm: string = "Aceptar") {//Alerta genérica para toma de desiciones
    const alert = await this.alertController.create({
      header: title,
      message: message,
      cssClass: "custom-alert",
      buttons: [
        {
          text: cancel,
          role: 'cancel',
        },
        {
          text: confirm,
          role: 'confirm',
        }
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();

    return role === 'confirm'
  }
}
