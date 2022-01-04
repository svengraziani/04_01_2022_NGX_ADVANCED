import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { ClickWithWarningDirective } from './click-with-warning.directive';
import { CityPipe } from './pipes/city.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [CityPipe, ClickWithWarningDirective],
  exports: [CityPipe, ClickWithWarningDirective],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true,
        },
      ],
    };
  }

  static forChild(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
