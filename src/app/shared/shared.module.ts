import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import {NzSpinModule} from "ng-zorro-antd/spin";
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
  declarations: [
    SpinnerComponent,
    ScrollTopComponent
  ],
  exports: [
    SpinnerComponent,
    ScrollTopComponent
  ],
  imports: [
    CommonModule,
    NzSpinModule,
    FontAwesomeModule
  ]
})
export class SharedModule { }
