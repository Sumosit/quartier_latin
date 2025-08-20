import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideAngularSvgIcon} from 'angular-svg-icon';
import {provideHttpClient} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),
    provideAngularSvgIcon(),
    provideHttpClient(),
    provideRouter(
    routes,
    withInMemoryScrolling({
      scrollPositionRestoration: 'enabled', // на новых переходах - к верху, на возвращение - восстановление скролла
      anchorScrolling: 'enabled',           // прокрутка к #якорям
    })
  ),]
};
