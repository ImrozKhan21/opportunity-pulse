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
import {SalespersonComponent} from './salesperson/salesperson.component';
import {NzInputModule} from "ng-zorro-antd/input";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzAutocompleteModule} from "ng-zorro-antd/auto-complete";
import {ExceptionsComponent} from './exceptions/exceptions.component';
import {OpportunityComponent} from './opportunity/opportunity.component';
import {NzButtonModule} from "ng-zorro-antd/button";
import {OpportunitiesComponent} from './opportunities/opportunities.component';
import {SalespersonOpportunitiesComponent} from './salesperson-opportunities/salesperson-opportunities.component';
import {OpportunityDetailsComponent} from './opportunity-details/opportunity-details.component';
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";


@NgModule({
  declarations: [
    ChangeHistoryComponent,
    SalespersonComponent,
    ExceptionsComponent,
    OpportunityComponent,
    OpportunitiesComponent,
    SalespersonOpportunitiesComponent,
    OpportunityDetailsComponent
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
        NzAutocompleteModule,
        NzButtonModule,
        NzDatePickerModule
    ]
})
export class ComponentsModule {
}
