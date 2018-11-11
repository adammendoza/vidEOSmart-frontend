import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {
  transform(phoneNumber: string, args?: any): string {
    if (!phoneNumber) {
      return '';
    }

    const formattedPhoneNumber =
      '(' + phoneNumber.slice(0, 3) + ') ' + phoneNumber.slice(3, 6) + '-' + phoneNumber.slice(6);
    return formattedPhoneNumber;
  }
}
