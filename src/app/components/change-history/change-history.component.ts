import {Component, Input, OnInit} from '@angular/core';
import {ApiCallsService} from "../../services/api-calls.service";
import {lastValueFrom, take} from "rxjs";
import {IChangeHistory, IFilter, ISalesperson, IUser, PayloadMap, PulseTypeImageMap} from "../../models/common.model";
import {UtilService} from "../../services/util.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {WindowRefService} from "../../services/window-ref.service";

@Component({
  selector: 'app-change-history',
  templateUrl: './change-history.component.html',
  styleUrls: ['./change-history.component.scss']
})
export class ChangeHistoryComponent implements OnInit {
  @Input() hideHeader: boolean;
  @Input() hideCompanyInfo: boolean;
  @Input() showSalespersonView: boolean;
  history: IChangeHistory[];
  filteredHistory: IChangeHistory[];
  showLoader = false;
  newHistoryMap: Map<any, IChangeHistory[]>;
  filters: { [key: string]: IFilter[] };
  filterKeys: any[];
  selectedFilters: { [key: string]: string[] } = {};
  allSelectedFilters: IFilter[];
  totalCount: number;
  showFilterModal: boolean;
  sortBy: string;
  pulseTypeImageMap = PulseTypeImageMap;
  opportunityId = '';
  salespersonId = '';
  currentSalesperson: ISalesperson;
  userDetails: string;
  size: 'large' | 'small' | 'default' = 'default';
  fromDate: Date;
  toDate: Date;
// new Date(fromDate).toLocaleDateString()
  constructor(private apiCallsService: ApiCallsService, private utilService: UtilService,
              private router: Router, private activatedRoute: ActivatedRoute, private windowRefService: WindowRefService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe(async (params: ParamMap) => {
      const url = this.windowRefService.nativeWindow.location.href;

      const id = params.get('id') || '';
      const isSalesPersonView = url.includes('salesperson');
      this.opportunityId = !isSalesPersonView ? id : this.opportunityId;
      this.salespersonId = isSalesPersonView ? id : this.salespersonId;
      console.log('111 OPP ID', this.opportunityId, url, isSalesPersonView)
      if (this.opportunityId || this.salespersonId) {
        this.selectedFilters = {};
        this.setFiltersAndHistory(true);
      } else {
        this.setFiltersAndHistory();
      }
    });
  }

  async setFiltersAndHistory(dontPreSelect = false) {
    this.showLoader = true;
    let filters = await lastValueFrom(this.apiCallsService.getFilters());
    this.apiCallsService.getUserDetailsSub().subscribe(async (user) => {
      const preSelectedFilter = await lastValueFrom(this.apiCallsService.getSavedFilters(user));
      if (preSelectedFilter?.length && preSelectedFilter[0].id) {
        filters = filters.map((f: IFilter) => {
          const isSelected = preSelectedFilter[0].id.includes(f.id);
          return {...f, checked: dontPreSelect ? false : !!isSelected};
        });
        this.setFilterKeys(filters);
        this.setSelectedFilterWithKey();
        this.setHistory(true);
      } else {
        this.setFilterKeys(filters);
        this.setHistory();
      }
    });
  }

  setFilterKeys(filters: IFilter[]) {
    this.filters = filters.reduce((lookUpObj: any, filter: IFilter) => {
      if (lookUpObj[filter.section]) {
        lookUpObj[filter.section].push(filter);
      } else {
        lookUpObj[filter.section] = [filter]
      }
      return {...lookUpObj, [filter.section]: lookUpObj[filter.section]}
    }, {});
    this.allSelectedFilters = filters.filter(fil => fil.checked);
    this.filterKeys = Object.keys(this.filters);
  }

  async setHistory(preSelectFilter = false) {
    const typeId = preSelectFilter ? this.selectedFilters['Opp Type'].join(',') : '';
    const pulseId = preSelectFilter ? this.selectedFilters['Pulse Type'].join(',') : '';
    console.log('111 FROM ADTAE', this.fromDate, this.toDate);
    this.history = await lastValueFrom(this.apiCallsService.getChangeHistory(typeId, pulseId, this.opportunityId, this.salespersonId));
    this.filteredHistory = [...this.history];
    const salesperson = await lastValueFrom(this.apiCallsService.getSalesPerson());
    if (this.salespersonId) {
      this.currentSalesperson = salesperson.find((person: ISalesperson) => person.person === this.salespersonId);
    }
    this.showLoader = false;
    this.setHistoryMap(this.filteredHistory);
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
    this.allSelectedFilters = value.filter(fil => fil.checked);
    this.setSelectedFilterWithKey();
  }

  setSelectedFilterWithKey() {
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

  async handleOk(dontSave = false) {
    const typeId = this.selectedFilters['Opp Type'] ? this.selectedFilters['Opp Type'].join(',') : '';
    const pulseId = this.selectedFilters['Pulse Type'] ? this.selectedFilters['Pulse Type'].join(',') : '';
    this.showLoader = true;
    const toDate = this.toDate ? this.toDate.toLocaleDateString() : '';
    const fromDate = this.fromDate ? this.fromDate.toLocaleDateString() : '';
    this.filteredHistory = await lastValueFrom(this.apiCallsService.getChangeHistory(typeId, pulseId,
      this.opportunityId, this.salespersonId, toDate, fromDate));
    this.filteredHistory = this.sortBy === 'OLDEST' ? this.filteredHistory.reverse() : this.filteredHistory;
    this.setHistoryMap(this.filteredHistory)
    this.showFilterModal = false;
    if (!dontSave && Object.keys(this.selectedFilters).length) {
      this.saveFilterForUser();
    }
    this.showLoader = false;
  }

  asIsOrder(a: any, b: any) {
    return 1;
  }

  goToOpportunity(history: IChangeHistory) {
    this.selectedFilters = {};
    this.router.navigate([`/opportunity/${history.id}`])
  }

  goToSalespersonView(history: IChangeHistory) {
    this.router.navigate([`/salesperson/${history.owner}`])
  }

  async saveFilterForUser() {
    const allFilterIdParam = this.allSelectedFilters?.map(filter => filter.id).join();
    console.log('111 SE FILTER', this.allSelectedFilters, allFilterIdParam);

    await lastValueFrom(this.apiCallsService.savedFiltersForUser(allFilterIdParam));
    this.apiCallsService.getUserDetailsSub().subscribe((user: string) => {

    })

  }

}
