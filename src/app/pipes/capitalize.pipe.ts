import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value[0].toUpperCase() + value.slice(1, value.length);
  }

}
