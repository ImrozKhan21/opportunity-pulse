import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformDate',
  pure: true // immutable (value) inputs & pure fn (function)
})
export class TransformDate implements PipeTransform {

  transform(value: any, fn?: Function): any {
    console.log('111 calue', value, new Date(value).toDateString(), new Date(value))
    return new Date(value).toDateString();
  }
}
