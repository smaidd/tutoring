import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {providePrimeNG} from "primeng/config";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {zincPreset} from "./my-preset";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideToastr} from "ngx-toastr";
import {ConfirmationService} from "primeng/api";
import {authInterceptor, errorHttpInterceptor} from "./security/http.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor, errorHttpInterceptor])
    ),
    provideAnimationsAsync(),
    provideAnimations(),
    provideToastr(),
    providePrimeNG({
      theme: {
        preset: zincPreset
      }
    }),
    ConfirmationService,
  ]
};
