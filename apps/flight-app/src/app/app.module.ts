import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {FlightLibModule} from "@flight-workspace/flight-lib";
import {LoggerModule} from "@flight-workspace/logger-lib";
import {ReactiveComponentModule} from "@ngrx/component";

import {AppComponent} from "./app.component";
import {APP_ROUTES} from "./app.routes";
import {BasketComponent} from "./basket/basket.component";
import {FlightBookingModule} from "./flight-booking/flight-booking.module";
import {FlightCancellingModule} from "./flight-booking/flight-cancelling/flight-cancelling.module";
import {FlightLookaheadComponent} from "./flight-lookahead/flight-lookahead.component";
import {HomeComponent} from "./home/home.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {CustomLogFormatterService} from "./shared/logging/custom-log-formatter.service";
import {SharedModule} from "./shared/shared.module";
import {SidebarComponent} from "./sidebar/sidebar.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FlightBookingModule,

    BrowserAnimationsModule,
    FlightCancellingModule,

    FlightLibModule.forRoot(),
    SharedModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES),
    LoggerModule.forRoot({
      enableDebug: true,
      logFormatterType: CustomLogFormatterService,
    }),
    FormsModule,
    ReactiveFormsModule,
    ReactiveComponentModule
  ],
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    BasketComponent,
    FlightLookaheadComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
