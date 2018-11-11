import { Directive, ElementRef, Input, OnInit } from '@angular/core';
declare var jQuery: any;

@Directive({
  selector: '[vsMaskInput]'
})
export class MaskInputDirective implements OnInit {
  @Input()
  maskType: string;

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    switch (this.maskType) {
      case 'phone': {
        jQuery(this.elRef.nativeElement).mask('(000) 000-0000');
        break;
      }
      case 'zip': {
        jQuery(this.elRef.nativeElement).mask('00000');
        break;
      }
      default: {
        break;
      }
    }
  }
}
