import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import {WindowRefService} from "./services/window-ref.service";
import {ApiCallsService} from "./services/api-calls.service";
import {CinchyService} from "@cinchy-co/angular-sdk";
import {Router} from "@angular/router";
import {lastValueFrom} from "rxjs";
import {INavigation} from "./models/common.model";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'opportunity-pulse';
  isLoggedIn: boolean;
  navigation: INavigation[];

  constructor(private cinchyService: CinchyService,
              private apiCallsService: ApiCallsService, @Inject(PLATFORM_ID) private platformId: any,
              private windowRefService: WindowRefService, private router: Router) {
  }

  async ngOnInit() {
    const url = this.windowRefService.nativeWindow.location.href;
    if (!sessionStorage.getItem('current-url-pulse')) {
      sessionStorage.setItem('current-url-pulse', url);
    }
    this.cinchyService.checkIfSessionValid().toPromise().then((response: any) => {
      if (response.accessTokenIsValid) {
        this.setDetails();
      } else {
        if (isPlatformBrowser(this.platformId)) {
          this.cinchyService.login().then(success => {
            if (success) {
              this.setDetails();
            }
          }, error => {
            console.error('Could not login: ', error)
          });
        }
      }
    })
  }

  async setDetails() {
    this.isLoggedIn = true;
    this.navigation = await lastValueFrom(this.apiCallsService.getNavigation());
    this.setRouting();
    console.log('1111 navihagtion', this.navigation)
  }

  setRouting() {
    const currentUrl: any = sessionStorage.getItem('current-url-pulse');
    console.log('111 IN IF', environment)

    let route: any = '/';
    if (!environment.production) { //OPPOSITE env files that's why reverse check

      route = currentUrl?.split('/dx/opportunity-pulse')[1] || route;
    } else {
      console.log('111 IN ELSE', environment, currentUrl)
      route = currentUrl?.split(':4200')[1] || currentUrl?.split('/dx/opportunity-pulse')[1] || route;
    }
    const routeWithoutQueryParam = route.split('?')[0];
    console.log('1111 routeWithoutQueryParam', routeWithoutQueryParam, route);
    const queryParams: any = {};
    if (route.split('?')[1]) {
      const urlParams = new URLSearchParams(route.split('?')[1]);
      urlParams.forEach((value, key) => {
        queryParams[key] = value;
      });
    }
    this.router.navigate([`${routeWithoutQueryParam}`], {queryParams});
    sessionStorage.removeItem('current-url-pulse')
  }
}
