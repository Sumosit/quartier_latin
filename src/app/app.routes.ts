import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  // {
  //   path: 'services',
  //   loadChildren: () => import('./pages/services/services.module').then(m => m.ServicesModule)
  // },
  // {
  //   path: 'education',
  //   loadChildren: () => import('./pages/education/education.module').then(m => m.EducationModule)
  // },
  // {
  //   path: 'accommodation',
  //   loadChildren: () => import('./pages/accommodation/accommodation.module').then(m => m.AccommodationModule)
  // },
  // {
  //   path: 'about',
  //   loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)
  // },
  // {
  //   path: 'contact',
  //   loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
  // },
  {
    path: '**',
    redirectTo: ''
  }
];
