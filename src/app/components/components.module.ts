import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChangeHistoryComponent} from './change-history/change-history.component';
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzTimelineModule} from "ng-zorro-antd/timeline";
import {SharedModule} from "../shared/shared.module";
import {PipesModule} from "../pipes/pipes.module";
import {CoreModule} from "../core/core.module";
import {NzCardModule} from "ng-zorro-antd/card";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    ChangeHistoryComponent
  ],
  exports: [
    ChangeHistoryComponent
  ],
  imports: [
    CommonModule,
    NzDividerModule,
    NzTimelineModule,
    SharedModule,
    PipesModule,
    CoreModule,
    NzCardModule,
    FontAwesomeModule
  ]
})
export class ComponentsModule {
}
