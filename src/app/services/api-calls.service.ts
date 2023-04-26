import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ConfigService} from "../config.service";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  constructor(private configService: ConfigService, private http: HttpClient) {
  }

  getChangeHistory(typeId: string, pulseId: string) {
    const url = `/API/Sales/Opportunity%20Pulse?%40pulseId=${pulseId}&%40typeId=${typeId}`;
    return this.getResponse(url);
  }

  getSalesPerson() {
    const url = `/API/Zero-Integration%20App%20Factory/Get%20Salesperson%20for%20Pulse`;
    return this.getResponse(url);
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
