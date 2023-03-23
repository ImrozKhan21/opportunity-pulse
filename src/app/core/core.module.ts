import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {NzDividerModule} from "ng-zorro-antd/divider";
import { NavigationComponent } from './navigation/navigation.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent
  ],
    exports: [
        HeaderComponent,
        NavigationComponent
    ],
  imports: [
    CommonModule,
    NzDividerModule,
    FontAwesomeModule
  ]
})
export class CoreModule { }
