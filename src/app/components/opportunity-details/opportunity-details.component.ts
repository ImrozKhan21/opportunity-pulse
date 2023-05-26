import {Component, Input, OnInit} from '@angular/core';
import {ApiCallsService} from "../../services/api-calls.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-opportunity-details',
  templateUrl: './opportunity-details.component.html',
  styleUrls: ['./opportunity-details.component.scss']
})
export class OpportunityDetailsComponent implements OnInit{
  @Input() opportunityId: string;
  opportunityDetails: any;
  labelValuePairs: { label: string, value: any }[] = [];
  expansionLabelValuePairs: { label: string, value: any }[] = [];
  isExpanded = false;

  constructor(private apiCallsService: ApiCallsService) {
  }

  async ngOnInit() {
    this.opportunityDetails = await lastValueFrom(this.apiCallsService.getOpportunityDetails(this.opportunityId));
    console.log('111 OP DE', this.opportunityDetails);
    const data = this.opportunityDetails[0]
    this.labelValuePairs = Object.keys(data)
      .filter(key => key.startsWith('textLabel-'))
      .map(key => ({
        label: data[key],
        value: data[key.replace('textLabel-', 'text-')]
      }));

    this.expansionLabelValuePairs = Object.keys(data)
      .filter(key => key.startsWith('text2Label-'))
      .map(key => ({
        label: data[key],
        value: data[key.replace('text2Label-', 'text2-')]
      }));
  }

  panelToggled(isExpanded: boolean) {
    this.isExpanded = isExpanded;
    console.log('111 E');
  }
}
