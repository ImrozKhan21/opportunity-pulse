import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {ConfigService} from "../config.service";
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {IChangeHistory, IException} from "../models/common.model";

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {
  cachedHistory: IChangeHistory[];
  cachedExceptions: IException[];

  constructor(private configService: ConfigService, private http: HttpClient) {
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

  getSalesPerson() {
    const url = `/API/Zero-Integration%20App%20Factory/Get%20Salesperson%20for%20Pulse`;
    return this.getResponse(url);
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
