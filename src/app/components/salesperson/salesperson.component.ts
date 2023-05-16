import {Component, OnInit} from '@angular/core';
import {ApiCallsService} from "../../services/api-calls.service";
import {lastValueFrom} from "rxjs";
import {IOpportunity, ISalesperson} from "../../models/common.model";
import {UtilService} from "../../services/util.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-salesperson',
  templateUrl: './salesperson.component.html',
  styleUrls: ['./salesperson.component.scss']
})
export class SalespersonComponent implements OnInit{
  salesperson: ISalesperson[];
  showLoader = false;
  inputValue?: string;
  filteredOptions: ISalesperson[] = [];
  filteredSalesperson: ISalesperson[] = [];
  constructor(private apiCallsService: ApiCallsService, private router: Router) {
  }

  async ngOnInit() {
    this.showLoader = true;
    this.salesperson = await lastValueFrom(this.apiCallsService.getSalesPerson());
    this.filteredOptions = [...this.salesperson];
    this.filteredSalesperson = [...this.salesperson];
    this.showLoader = false;
  }

  optionSelected(person: ISalesperson) {
    this.filteredSalesperson = this.salesperson.filter(option => option?.person.toLowerCase() === person.person.toLowerCase());
  }

  onChange(value: any): void {
    const actualValue = value?.person ? value.person : value;
    this.filteredOptions = this.salesperson.filter(option => option?.person.toLowerCase().indexOf(actualValue.toLowerCase()) !== -1);
  }

  clearSelection() {
    this.filteredSalesperson = [...this.salesperson];
    this.filteredOptions = [...this.salesperson];
    this.inputValue = ''
  }

  goToOpportunity(person: ISalesperson) {
    this.router.navigate([`/salesperson/${person.ownerId}`])
  }

}
