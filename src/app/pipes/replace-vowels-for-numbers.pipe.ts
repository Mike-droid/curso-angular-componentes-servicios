import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceVowelsForNumbers'
})
export class ReplaceVowelsForNumbersPipe implements PipeTransform {

  transform(value: string): string {
    let newValue: string = value;

    newValue = newValue.replace(/a/i, '4');
    newValue = newValue.replace(/e/i, '3');
    newValue = newValue.replace(/i/i, '1');
    newValue = newValue.replace(/o/i, '0');
    newValue = newValue.replace(/u/i, 'w-w');

    return newValue;
  }

}
