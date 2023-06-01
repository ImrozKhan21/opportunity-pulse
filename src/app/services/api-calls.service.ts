import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {ConfigService} from "../config.service";
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {IChangeHistory, IException, ISalesperson, IUser} from "../models/common.model";
import {isPlatformBrowser} from "@angular/common";
import {CinchyService} from "@cinchy-co/angular-sdk";

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {
  cachedHistory: IChangeHistory[];
  cachedExceptions: IException[];
  cachedSalesPerson: ISalesperson[];
  userDetails$: BehaviorSubject<string> = new BehaviorSubject<string>(({} as string));
  userDetails: string;

  constructor(private configService: ConfigService, private cinchyService: CinchyService,
              private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any,) {
  }

  getChangeHistory(typeId: string, pulseId: string, opportunityId: string, ownerId: string) {
    const url = `/API/Zero-Integration%20App%20Factory/Opportunity%20Pulse%202?%40opportunityId=${opportunityId}&%40ownerId=${ownerId}&%40pulseId=${pulseId}&%40typeId=${typeId}`;
/*    if (this.cachedHistory) {
      return of(this.cachedHistory)
    }*/
    return this.getResponse(url).pipe(tap(resp => {
      this.cachedHistory = resp;
    }));
  }

  getOpportunities(ownerId: string) {
    const url = `/API/Zero-Integration%20App%20Factory/Get%20Opportunities?%40ownerId=${ownerId}`;
    return this.getResponse(url);
  }
//

  getOpportunityDetails(opportunityId: string) {
    const url = `/API/Zero-Integration%20App%20Factory/Get%20Opportunity%20Details?%40opportunityId=${opportunityId}`;
    return this.getResponse(url);
  }

  getSalesPerson() {
    const url = `/API/Zero-Integration%20App%20Factory/Get%20Salesperson%20for%20Pulse`;
    if (this.cachedSalesPerson) {
      return of(this.cachedSalesPerson)
    }
    return this.getResponse(url).pipe(tap(resp => {
      this.cachedSalesPerson = resp;
    }));
  }

  getExceptions() {
    const url = `/API/Zero-Integration%20App%20Factory/Opportunity%20Pulse%20Exceptions`;
    if (this.cachedExceptions) {
      return of(this.cachedExceptions)
    }
    return this.getResponse(url).pipe(tap(resp => {
      this.cachedExceptions = resp;
    }));
  }

  getNavigation() {
    const url = `/API/Zero-Integration%20App%20Factory/Get%20Opportunity%20Pulse%20Navigation`;
    return this.getResponse(url);
  }

  getFilters() {
    const url = `/API/Zero-Integration%20App%20Factory/Get%20Opportunity%20Pulse%20Filters`;
    return this.getResponse(url);
  }

  getSavedFilters(user: string) {
    const url = `/API/Zero-Integration%20App%20Factory/Get%20User%20Saved%20Filters?%40currentUser=${user}`;
    return this.getResponse(url);
  }

  savedFiltersForUser(filters: string) {
    const url = `/API/Zero-Integration%20App%20Factory/Update%20User%20Saved%20Filters?%40filters=${filters}`;
    return this.getResponse(url);
  }

  setUserInfo() {
    this.setUserDetails().then(val => {
      this.setUserDetailsSub(val);
      const userDetail = localStorage.getItem('hub-user-details') || '';
      //  console.log('In user details', val);
      if (!val && userDetail) {
        //  console.log('In no user details if', userDetail);
        this.userDetails = userDetail ? JSON.parse(userDetail) : null;
        this.setUserDetailsSub(this.userDetails);
      }
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('hub-user-details', JSON.stringify(val));
      }
    }).catch((e: any) => {
      if (isPlatformBrowser(this.platformId)) {
        console.error(e);
        const userDetail = localStorage.getItem('hub-user-details') || '';
        this.userDetails = userDetail ? JSON.parse(userDetail) : null;
        this.setUserDetailsSub(this.userDetails);
        console.error(e);
      }
    });
  }

  async setUserDetails(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let userObjectFromStorageStr;
      if (isPlatformBrowser(this.platformId)) {
        userObjectFromStorageStr = sessionStorage.getItem('id_token_claims_obj');
      }
      //   console.log('IN IF SESSION USER', userObjectFromStorageStr);
      if (userObjectFromStorageStr) {
        const userObjectFromStorage = JSON.parse(userObjectFromStorageStr);
        //   console.log('IN IF 2 SESSION USER', userObjectFromStorageStr);
      //  const userDetails = await this.getLoggedInUserDetails(userObjectFromStorage.id).toPromise() as IUser[];
        //   console.log('IN IF 2 SESSION userDetails', userDetails)
        resolve(userObjectFromStorage.id);
      } else {
        // console.log('IN USER ELSE INSIDE 1', this.cinchyService.getUserIdentity);
        let userDetail = localStorage.getItem('hub-user-details') || '';
        if (isPlatformBrowser(this.platformId)) {
          //     console.log('IN USER ELSE LOCAL');
          userDetail = userDetail ? JSON.parse(userDetail) : null;
          resolve(userDetail);
        }
        if (!userDetail) {
          this.cinchyService.getUserIdentity().subscribe(async (user: any) => {
            //   console.log('IN USER ELSE INSIDE', user);
            if (user?.id) {
              //   console.log('IN USER ELSE INSIDE ID', user);
           //   const userDetailsIdentity = await this.getLoggedInUserDetails(user.id).toPromise() as IUser[];
              // console.log('IN USER ELSE INSIDE ID userDetailsIdentity', userDetailsIdentity);
              resolve(user.id);
            } else {
              // console.log('IN USER ELSE INSIDE ID userDetailsIdentity REJECT');
              reject('No user details');
            }
          }, error => {
            console.log('IN REJECT', error)
            reject('No user details');
          });
        }
      }
    })
  }

  getLoggedInUserDetails(userName: string): Observable<IUser[]> {
    const url = `/API/Website/Get%20User%20Details?%40userName=${userName}`;
    return this.getResponse(url);
  }

  setUserDetailsSub(val: string) {
    this.userDetails$.next(val);
  }

  getUserDetailsSub() {
    return this.userDetails$.asObservable();
  }

  getResponse(url: string): Observable<any> {
    const fullUrl = `${this.configService.enviornmentConfig.cinchyRootUrl}${url}`
    return this.http.get(fullUrl, {
      responseType: 'text'
    }).pipe(
      map(resp => {
        const {data, schema} = JSON.parse(resp);
        return this.toObjectArray(data, schema);
      }))
  }

  toObjectArray(data: any, schema: any): Array<Object> {
    let result: any = [];
    data?.forEach((row: any) => {
      let rowObject: any = {};
      for (let i = 0; i < row.length; i++) {
        rowObject[schema[i].columnName] = row[i];
      }
      result.push(rowObject);
    });
    return result;
  }
}
