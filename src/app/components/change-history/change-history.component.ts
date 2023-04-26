import {Component, OnInit} from '@angular/core';
import {ApiCallsService} from "../../services/api-calls.service";
import {lastValueFrom} from "rxjs";
import {IChangeHistory, IFilter, PayloadMap, PulseTypeImageMap} from "../../models/common.model";
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'app-change-history',
  templateUrl: './change-history.component.html',
  styleUrls: ['./change-history.component.scss']
})
export class ChangeHistoryComponent implements OnInit {
  history: IChangeHistory[];
  filteredHistory: IChangeHistory[];
  showLoader = false;
  newHistoryMap: Map<any, IChangeHistory[]>;
  filters: { [key: string]: IFilter[] };
  filterKeys: any[];
  selectedFilters: { [key: string]: string[] } = {};
  totalCount: number;
  showFilterModal: boolean;
  sortBy: string;
  pulseTypeImageMap = PulseTypeImageMap;

  constructor(private apiCallsService: ApiCallsService, private utilService: UtilService) {
  }

  async ngOnInit() {
    this.showLoader = true;
    this.setFilters();
    this.history = await lastValueFrom(this.apiCallsService.getChangeHistory('', ''));
    this.filteredHistory = [...this.history];
    this.showLoader = false;
    this.setHistoryMap(this.filteredHistory);
  }

  async setFilters() {
    const filters = await lastValueFrom(this.apiCallsService.getFilters());
    this.filters = filters.reduce((lookUpObj: any, filter: IFilter) => {
      if (lookUpObj[filter.section]) {
        lookUpObj[filter.section].push(filter);
      } else {
        lookUpObj[filter.section] = [filter]
      }
      return {...lookUpObj, [filter.section]: lookUpObj[filter.section]}
    }, {});
    this.filterKeys = Object.keys(this.filters);
  }

  setHistoryMap(history: IChangeHistory[]) {
    this.totalCount = history?.length;
    this.newHistoryMap = new Map();
    history.forEach((curr: IChangeHistory) => {
      curr.updatedDateStr = curr.isToday === 'Yes' ? 'TODAY' : curr.dateStr;
      const currentVal = this.newHistoryMap.get(curr.updatedDateStr);
      if (currentVal?.length) {
        currentVal.push(curr);
        this.newHistoryMap.set(curr.updatedDateStr, currentVal);
      } else {
        this.newHistoryMap.set(curr.updatedDateStr, [curr]);
      }
    });
    console.log('1111 HISTORY', this.newHistoryMap, this.newHistoryMap.entries())
  }

  log(value: IFilter[]): void {
    this.filterKeys.forEach(key => {
      this.selectedFilters[key] = this.filters[key].reduce((result: string[], filter) => {
        if (filter.checked) {
          return result.concat([filter.value]);
        }
        return result;
      }, []);
    });
  }

  handleCancel() {
    this.showFilterModal = false;
  }

  async handleOk() {
    const typeId = this.selectedFilters['Opp Type'].join(',');
    const pulseId = this.selectedFilters['Pulse Type'].join(',');
    this.showLoader = true;
    this.filteredHistory = await lastValueFrom(this.apiCallsService.getChangeHistory(typeId, pulseId));
    this.filteredHistory = this.sortBy === 'OLDEST' ? this.filteredHistory.reverse() : this.filteredHistory;
    this.setHistoryMap(this.filteredHistory)
    this.showFilterModal = false;
    this.showLoader = false;
  }

  asIsOrder(a: any, b: any) {
    return 1;
  }


}
