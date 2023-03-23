import {Component, OnInit} from '@angular/core';
import {ApiCallsService} from "../../services/api-calls.service";
import {lastValueFrom} from "rxjs";
import {IChangeHistory} from "../../models/common.model";
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'app-change-history',
  templateUrl: './change-history.component.html',
  styleUrls: ['./change-history.component.scss']
})
export class ChangeHistoryComponent implements OnInit {
  history: IChangeHistory[];
  showLoader = false;
  newHistoryMap: Map<any, IChangeHistory[]>;
  constructor(private apiCallsService: ApiCallsService, private utilService: UtilService) { }

  async ngOnInit() {
    this.showLoader = true;
    this.history = await lastValueFrom(this.apiCallsService.getChangeHistory());
    this.showLoader = false;
    this.newHistoryMap = new Map();
    this.history.forEach((curr: IChangeHistory) => {
      curr.TimeStr = curr.TimeStr.split('.')[0];
      curr.updatedDateStr = new Date(curr.DateStr).toLocaleDateString();
      const currentVal = this.newHistoryMap.get(curr.DateStr);
      if (currentVal?.length) {
        currentVal.push(curr);
        this.newHistoryMap.set(curr.DateStr, currentVal);
      } else {
        this.newHistoryMap.set(curr.DateStr, [curr]);
      }
    });

    console.log('1111 HISTORY', this.newHistoryMap, this.newHistoryMap.entries())
  }

  asIsOrder(a: any, b: any) {
    return 1;
  }


}
