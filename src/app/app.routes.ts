import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ServicesComponent} from './pages/services/services.component';
import {EducationComponent} from './pages/education/education.component';
import {AccommodationComponent} from './pages/accommodation/accommodation.component';
import {AboutComponent} from './pages/about/about.component';
import {UserAgreementComponent} from './pages/user-agreement/user-agreement.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'services',
    component: ServicesComponent
  },
  {
    path: 'education',
    component: EducationComponent
  },
  {
    path: 'accommodation',
    component: AccommodationComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'user-agreement',
    component: UserAgreementComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
