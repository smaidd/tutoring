import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'isoToDate'})
export class IsoToDatePipe implements PipeTransform {
  transform(value: string | null | undefined): Date | null {
    return value ? new Date(value) : null;
  }
}
