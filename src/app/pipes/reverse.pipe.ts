import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse' //* el valor que usaremos en el HTML
})
export class ReversePipe implements PipeTransform {

  transform(value: string): string {
    return value.split('').reverse().join('');
    //* Tomar el string, convertirlo en array, darla la vuelta y convertirlo en string
  }

}
