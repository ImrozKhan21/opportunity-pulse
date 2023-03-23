import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import {WindowRefService} from "./services/window-ref.service";
import {ApiCallsService} from "./services/api-calls.service";
import {CinchyService} from "@cinchy-co/angular-sdk";
import {Router} from "@angular/router";
import {lastValueFrom} from "rxjs";
import {INavigation} from "./models/common.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'opportunity-pulse';
  isLoggedIn: boolean;
  navigation: INavigation[];
  constructor(private cinchyService: CinchyService,
              private apiCallsService: ApiCallsService, @Inject(PLATFORM_ID) private platformId: any,
              private windowRefService: WindowRefService, private router: Router) {
  }

  async ngOnInit() {
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
    console.log('1111 navihagtion', this.navigation)
  }
}
