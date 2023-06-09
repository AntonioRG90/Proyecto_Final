import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isActive'
})
export class IsActivePipe implements PipeTransform {

  /**
   * @Author Antonio Ruiz Galvez
   * @description cambia valores booleanos por string true = active y false = inactive.
   */
  transform(value: unknown, ...args: unknown[]): unknown {
    return value? "Active" : "Inactive";
  }

}
