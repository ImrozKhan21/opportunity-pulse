import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ComponentsModule} from "./components/components.module";
import {ConfigService} from "./config.service";
import {CinchyConfig, CinchyModule, CinchyService} from "@cinchy-co/angular-sdk";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {far} from "@fortawesome/free-regular-svg-icons";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {faFacebookSquare, faLinkedinIn, faTwitterSquare} from "@fortawesome/free-brands-svg-icons";


registerLocaleData(en);

const icons = [
  // ... other icons
  faFacebookSquare, faTwitterSquare, faLinkedinIn
];


export function appLoadFactory(config: ConfigService) {
  return () => config.loadConfig().toPromise();
}

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ComponentsModule,
    CinchyModule.forRoot(),
    SharedModule,
    CoreModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: APP_INITIALIZER,
      useFactory: appLoadFactory,
      deps: [ConfigService],
      multi: true
    },
    CinchyModule,
    CinchyService,
    {
      provide: CinchyConfig,
      useFactory: (config: ConfigService) => {
        return config.envConfig;
      },
      deps: [ConfigService]
    },
    {provide: 'BASE_URL', useFactory: getBaseUrl}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor(iconLibrary: FaIconLibrary) {
    // @ts-ignore
    iconLibrary.addIcons(...icons);
    iconLibrary.addIconPacks(far, fas);
  }
}
