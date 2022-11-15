import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: true
})
export class SortPipe implements PipeTransform {

  transform(list: any[], column: string, reset: boolean, reverse: boolean): any[] {
    let sortedArray: any[] = list.sort((a,b)=>{
      if(!reverse) {
        if(a[column] > b[column]) {
          return 1;
        }
        if(a[column] < b[column]) {
          return -1;
        }
      }
      if(reverse) {
        if(a[column] > b[column]) {
          return -1;
        }
        if(a[column] < b[column]) {
          return 1;
        }
      }
      return 0; 
    });
    return sortedArray;
  }

}
