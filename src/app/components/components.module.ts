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
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {FormsModule} from "@angular/forms";
import {NzRadioModule} from "ng-zorro-antd/radio";
import { SalespersonComponent } from './salesperson/salesperson.component';
import {NzInputModule} from "ng-zorro-antd/input";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzAutocompleteModule} from "ng-zorro-antd/auto-complete";


@NgModule({
  declarations: [
    ChangeHistoryComponent,
    SalespersonComponent
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
        FontAwesomeModule,
        NzCollapseModule,
        NzModalModule,
        NzCheckboxModule,
        FormsModule,
        NzRadioModule,
        NzInputModule,
        NzIconModule,
        NzAutocompleteModule
    ]
})
export class ComponentsModule {
}
