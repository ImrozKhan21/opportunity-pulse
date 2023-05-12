import {Component, Input, OnInit} from '@angular/core';
import {lastValueFrom, take} from "rxjs";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ApiCallsService} from "../../services/api-calls.service";
import {IChangeHistory, IOpportunity} from "../../models/common.model";
import {UtilService} from "../../services/util.service";

@Component({
  selector: 'app-opportunities',
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.scss']
})
export class OpportunitiesComponent implements OnInit {
  @Input() hideHeader: boolean;
  showLoader = false;
  ownerId: string;
  opportunities: IOpportunity[];
  inputValue?: string;
  filteredOptions: IOpportunity[];
  filteredOpportunities: IOpportunity[];

  constructor(private activatedRoute: ActivatedRoute, private apiCallsService: ApiCallsService,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe(async (params: ParamMap) => {
      this.ownerId = params.get('ownerId') || '';
      this.setOpportunities(this.ownerId);
    });
  }

  async setOpportunities(ownerId: string) {
    this.showLoader = true;
    this.opportunities = await lastValueFrom(this.apiCallsService.getOpportunities(ownerId));
    this.filteredOptions = [...this.opportunities];
    this.filteredOpportunities = [...this.opportunities];
    console.log('111 OPP ID', this.ownerId, this.opportunities);
    this.showLoader = false;
  }

  onChange(value: any): void {
    const actualValue = value?.pulseHeader ? value.pulseHeader : value;
    this.filteredOptions = this.opportunities.filter(option => option?.pulseHeader.toLowerCase().indexOf(actualValue.toLowerCase()) !== -1);
  }

  clearSelection() {
    this.filteredOpportunities = [...this.opportunities];
    this.filteredOptions = [...this.opportunities];
    this.inputValue = ''
  }

  optionSelected(person: IOpportunity) {
    this.filteredOpportunities = this.opportunities.filter(option => option?.pulseHeader.toLowerCase() === person.pulseHeader.toLowerCase());
  }

  goToOpportunity(opportunity: IOpportunity) {
    console.log('111 PULSE', opportunity);
    this.router.navigate([`/opportunity/${opportunity.id}`])
  }

}
