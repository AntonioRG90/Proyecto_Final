import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

   /**
   * @Author Antonio Ruiz Galvez
   * @description cambia valores booleanos por string true = Admin y false = Member.
   */
  transform(value: unknown, ...args: unknown[]): unknown {
    return value? "Admin" : "Member";
  }

}
