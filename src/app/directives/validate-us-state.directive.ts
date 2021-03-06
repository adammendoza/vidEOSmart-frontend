import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[vsValidateUsState][formControlName],[vsValidateUsState][formControl],[vsValidateUsState][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidateUsStateDirective), multi: true }]
})
export class ValidateUsStateDirective implements Validator {
  stateList = new Array(
    'ak',
    'al',
    'ar',
    'az',
    'ca',
    'co',
    'ct',
    'dc',
    'de',
    'fl',
    'ga',
    'gu',
    'hi',
    'ia',
    'id',
    'il',
    'in',
    'ks',
    'ky',
    'la',
    'ma',
    'md',
    'me',
    'mh',
    'mi',
    'mn',
    'mo',
    'ms',
    'mt',
    'nc',
    'nd',
    'ne',
    'nh',
    'nj',
    'nm',
    'nv',
    'ny',
    'oh',
    'ok',
    'or',
    'pa',
    'pr',
    'pw',
    'ri',
    'sc',
    'sd',
    'tn',
    'tx',
    'ut',
    'va',
    'vi',
    'vt',
    'wa',
    'wi',
    'wv',
    'wy',
    'alabama',
    'alaska',
    'arizona',
    'arkansas',
    'california',
    'colorado',
    'connecticut',
    'delaware',
    'florida',
    'georgia',
    'hawaii',
    'idaho',
    'illinois',
    'indiana',
    'iowa',
    'kansas',
    'kentucky',
    'louisiana',
    'maine',
    'maryland',
    'massachusetts',
    'michigan',
    'minnesota',
    'mississippi',
    'missouri',
    'montana',
    'nebraska',
    'nevada',
    'new hampshire',
    'new jersey',
    'new mexico',
    'new york',
    'north carolina',
    'north dakota',
    'ohio',
    'oklahoma',
    'oregon',
    'pennsylvania',
    'rhode island',
    'south carolina',
    'south dakota',
    'tennessee',
    'texas',
    'utah',
    'vermont',
    'virginia',
    'washington',
    'west virginia',
    'wisconsin',
    'wyoming',
    'district of columbia',
    'puerto rico',
    'guam'
  );

  constructor(@Attribute('vsValidateUsState') public vsValidateUsState: string) {}

  validate(c: AbstractControl): { [key: string]: any } {
    const v = c.value;
    if (v && !(this.stateList.indexOf(v.toString().toLowerCase()) > -1)) {
      return {
        vsValidateUsState: false
      };
    }

    return null;
  }
}
