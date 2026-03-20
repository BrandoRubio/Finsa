import { Injectable } from '@angular/core';
import { Capacitor, CapacitorHttp, HttpResponse } from '@capacitor/core';
import { NavController } from '@ionic/angular';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private credentials: string = '';
  private urlFusion: string = '';
  //private urlRender: string = 'https://demopinsaapis.onrender.com/api';
  private urlRender: string = 'http://localhost:3000/api';

  constructor(public alerts: AlertsService, private navCtrl: NavController) {
    //const remoteServer = localStorage.getItem('remoteServer') == 'false' ? false : true
    //console.log(remoteServer);

    //this.urlRender = 'https://demopinsaapis.onrender.com/api';
    this.urlRender = 'http://localhost:3000/api'
  }

  async GetRequestRender(endPoint: string, show: boolean = true) {
    try {
      if (show) await this.alerts.ShowLoading()
      const token = localStorage.getItem('tk')
      const options = {
        url: `${this.urlRender}/${endPoint}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }
      };
      const response: HttpResponse = await CapacitorHttp.get(options);
      this.RequestStatusCode(response.status);
      return response.data;
    } catch (error: any) {
      console.log('Error (PG):', error);
      //await this.alerts.Error(`Error de conexión render: ${error.message || error}`);
      return null;
    } finally {
      if (show) await this.alerts.HideLoading()
    }
  }

  async PostRequestRender(endPoint: string, payload: any, show: boolean = true) {
    try {
      if (show) await this.alerts.ShowLoading()
      const token = localStorage.getItem('tk')
      const options = {
        url: `${this.urlRender}/${endPoint}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        data: payload
      };
      const response: HttpResponse = await CapacitorHttp.post(options);
      this.RequestStatusCode(response.status);
      return response.data;

    } catch (error: any) {
      console.log('Error (PG):', error);
      //await this.alerts.Error(`Error de conexión render: ${error.message || error}`);
      return null;
    } finally {
      if (show) await this.alerts.HideLoading()
    }
  }

  async PutRequestRender(endPoint: string, payload: any, show: boolean = true) {
    try {
      if (show) await this.alerts.ShowLoading()
      const token = localStorage.getItem('tk')
      const options = {
        url: `${this.urlRender}/${endPoint}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        data: payload
      };
      const response: HttpResponse = await CapacitorHttp.put(options);
      this.RequestStatusCode(response.status);
      return response.data;
    } catch (error: any) {
      console.log('Error (PG):', error);
      //await this.alerts.Error(`Error de conexión render: ${error.message || error}`);
      return null;
    } finally {
      if (show) await this.alerts.HideLoading()
    }
  }

  async DeleteRequestRender(endPoint: string) {
    await this.alerts.ShowLoading();
    const token = localStorage.getItem('tk')
    try {
      const options = {
        url: `${this.urlRender}/${endPoint}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }
      };
      const response: HttpResponse = await CapacitorHttp.delete(options);
      this.RequestStatusCode(response.status);
      return response.data;

    } catch (error: any) {
      console.log('Error (PG):', error);
      //await this.alerts.Error(`Error de conexión render: ${error.message || error}`);
      return null;
    } finally {
      await this.alerts.HideLoading();
    }
  }
  async AuthRequestDatabase(url: string, user: string, password: string) {
    await this.alerts.ShowLoading("Autenticando...");
    password = btoa(password)    
    try {
      const options = {
        url: `${this.urlRender}/${url}`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          "email": user,
          "password": password
        }
      };
      const response: HttpResponse = await CapacitorHttp.post(options);
      //this.RequestStatusCode(response.status);
      return response.data;

    } catch (error: any) {
      console.log('Error (PG):', error);
      //await this.alerts.Error(`Error de conexión (PG): ${error.message || error}`);
      return null;
    } finally {
      await this.alerts.HideLoading();
    }
  }
  RequestStatusCode(statusCode: number) {
    if (statusCode >= 200 && statusCode <= 202) {
      return;
    }
    else if (statusCode == 400) {
      //this.alerts.Error("Solicitud incorrecta del cliente", "Error 400");
    }
    else if (statusCode == 401) {
      //this.LogOut()
      //this.alerts.Error("No autorizado", "Error 401");
    }
    else if (statusCode == 403) {
      //this.alerts.Warning("Autorizado pero sin acceso a datos", "Error 403");
    }
    else if (statusCode == 404) {
      //this.alerts.Error("Solicitud no encontrada", "Error 404");
    }
    else if (statusCode == 405) {
      //this.alerts.Error("Método de la solicitud no admitido", "Error 405");
    }
    else if (statusCode == 440) {
      //this.LogOut()
      //this.alerts.Error("Sesión expirada", "Error 440");
    }
    else if (statusCode == 500) {
      //this.alerts.Error("Error interno del servidor", "Error 500");
    }
    else {
      //this.alerts.Error(`Error al procesar la solicitud (${statusCode})`, "Error");
    }
  }
}
