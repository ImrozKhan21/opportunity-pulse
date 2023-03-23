import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TransformDate} from "./transformDate";



@NgModule({
  declarations: [
    TransformDate
  ],
  exports: [
    TransformDate
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
