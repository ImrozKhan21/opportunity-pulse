import {Component, OnInit} from '@angular/core';
import {ApiCallsService} from "../../services/api-calls.service";
import {lastValueFrom} from "rxjs";
import {IException} from "../../models/common.model";

@Component({
  selector: 'app-exceptions',
  templateUrl: './exceptions.component.html',
  styleUrls: ['./exceptions.component.scss']
})
export class ExceptionsComponent implements OnInit {
  showLoader: boolean;
  exceptions: IException[];

  constructor(private apiCallsService: ApiCallsService) {
  }

  async ngOnInit() {
    this.showLoader = true;
    this.exceptions = await lastValueFrom(this.apiCallsService.getExceptions());
    console.log('1111 this.exceptions', this.exceptions);
    this.showLoader = false;
  }

  goToUrl(exception: IException) {
    window.open(exception.url,  '_blank');
  }
}
