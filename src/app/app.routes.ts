import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.page').then(m => m.LoginPage)
  },

  {
    path: 'parks',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/parks/parks.page').then(m => m.ParksPage)
  },

  {
    path: 'park/:park_id',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/park/park.page').then(m => m.ParkPage),
      },

      {
        path: 'parks-users',
        loadComponent: () =>
          import('./pages/parks/parks-users/parks-users.page').then(m => m.ParksUsersPage)
      },

      {
        path: 'plant/:plant_id',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/plants/plants.page').then(m => m.PlantsPage)
          },

          {
            path: 'devices',
            loadComponent: () =>
              import('./pages/devices/devices.page').then(m => m.DevicesPage)
          },
          {
            path: 'dashboards',
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./pages/dashboards/dashboards.page').then(m => m.DashboardsPage)
              },
              {
                path: ':dashboard_id',
                children: [
                  {
                    path: '',
                    redirectTo: 'widgets',
                    pathMatch: 'full'
                  },
                  {
                    path: 'widgets',
                    loadComponent: () =>
                      import('./pages/widgets/widgets.page').then(m => m.WidgetsPage)
                  }
                ]
              }
            ]
          },
          {
            path: 'plant-users', // 🔥 corregido (antes duplicado)
            loadComponent: () =>
              import('./pages/plant/plant-users/plant-users.page').then(m => m.PlantUsersPage)
          },
          {
            path: 'sensors',
            loadComponent: () =>
              import('./pages/sensors/sensors.page').then(m => m.SensorsPage)
          },
          {
            path: 'events',
            loadComponent: () =>
              import('./pages/events/events.page').then(m => m.EventsPage)
          }
        ]
      }
    ]
  },
  {
    path: 'finsa-users',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/finsa/finsa-users/finsa-users.page').then(m => m.FinsaUsersPage)
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];