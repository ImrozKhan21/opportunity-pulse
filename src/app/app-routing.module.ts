import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChangeHistoryComponent} from "./components/change-history/change-history.component";

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
    component: ChangeHistoryComponent
  },
  {
    path: "dashboard",
    component: ChangeHistoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
