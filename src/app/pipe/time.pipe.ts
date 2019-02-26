import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: number, args?: string): number {
    switch(args) {
      case 'sec':
        return Math.round(value / 60) / 10;
      case 'min':
        return Math.round(value / (60 * 60)) / 10;
      case 'hour':
        return Math.round(value / (60 * 60 * 60)) / 10;
    }
    return value;
  }

}
