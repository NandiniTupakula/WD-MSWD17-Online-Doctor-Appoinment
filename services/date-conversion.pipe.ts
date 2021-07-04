import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateConversion'
})
export class DateConversionPipe implements PipeTransform {

  transform(value: Date) :String {
    let changedTIme = moment.parseZone(value).format('hh:mm A');
    return changedTIme;
  }

}
