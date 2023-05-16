import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChangeHistoryComponent} from "./components/change-history/change-history.component";
import {SalespersonComponent} from "./components/salesperson/salesperson.component";
import {ExceptionsComponent} from "./components/exceptions/exceptions.component";
import {OpportunityComponent} from "./components/opportunity/opportunity.component";
import {OpportunitiesComponent} from "./components/opportunities/opportunities.component";
import {
  SalespersonOpportunitiesComponent
} from "./components/salesperson-opportunities/salesperson-opportunities.component";

const routes: Routes = [
  {
    path: '',
    component: ChangeHistoryComponent
  },
  {
    path: "pulse",
    component: ChangeHistoryComponent
  },
  {
    path: "opportunity",
    component: OpportunityComponent
  },
  {
    path: "opportunity/:id",
    component: OpportunityComponent
  },
  {
    path: "salesperson/:id",
    component: SalespersonOpportunitiesComponent
  },
  {
    path: "opportunities",
    component: OpportunitiesComponent
  },
  {
    path: "person",
    component: SalespersonComponent
  },
  {
    path: "exceptions",
    component: ExceptionsComponent
  },
  {
    path: "dashboard",
    component: ExceptionsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
