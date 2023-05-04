import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChangeHistoryComponent} from "./components/change-history/change-history.component";
import {SalespersonComponent} from "./components/salesperson/salesperson.component";
import {ExceptionsComponent} from "./components/exceptions/exceptions.component";

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
    path: "opportunities",
    component: ChangeHistoryComponent
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
