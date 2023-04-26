import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformDate',
  pure: true // immutable (value) inputs & pure fn (function)
})
export class TransformDate implements PipeTransform {

  transform(value: any, fn?: Function): any {
    return value === 'TODAY' ? value : new Date(value).toDateString();
  }
}
