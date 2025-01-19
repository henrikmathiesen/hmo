import { ApplicationConfig, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeSe from '@angular/common/locales/sv';

import { routes } from './app.routes';

registerLocaleData(localeSe);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withHashLocation()),
    { provide: LOCALE_ID, useValue: 'sv-SE' }
  ]
};
