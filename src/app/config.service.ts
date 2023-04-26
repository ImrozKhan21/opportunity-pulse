import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {forkJoin} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {IEnv} from "./models/common.model";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  enviornmentConfig: IEnv;
  fullScreenHeight: any;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    window.addEventListener('message', this.receiveMessage, false);
   // this.setRowAndFormId();
  }

  get envConfig(): IEnv {
    return this.enviornmentConfig;
  }

  loadConfig() {
    return forkJoin(this.getEnvUrl());
  }

  getEnvUrl() {
    console.log('1111 en', environment)
    const whichConfig = environment.production ? 'config_local.json' : 'config_prod.json';
    const url = `${this.baseUrl}assets/${whichConfig}`;
    return this.http
      .get<any>(url).pipe(
        tap(config => {
          this.enviornmentConfig = config
        }));
  }

  receiveMessage(event: any) {
    if (event.data.toString().startsWith('[Cinchy][innerHeight]')) {
      this.fullScreenHeight = parseInt(event.data.toString().substring(21), 10) + 4;
      console.log('receiveMessage  IF', this.fullScreenHeight)
      localStorage.setItem('fullScreenHeight', this.fullScreenHeight.toString());
      const elements = document.getElementsByClassName('full-height-element');
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < elements.length; i++) {
        setTimeout(() => {
          if(window.location !== window.parent.location){
            // @ts-ignore
            elements[i]['style'].height = this.fullScreenHeight + 'px';
          }
        }, 500)
      }
    }
  }
}
