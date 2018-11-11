import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
declare var jQuery: any;

@Component({
  selector: 'vs-register-email-alert',
  templateUrl: './register-email-alert.component.html',
  styleUrls: ['./register-email-alert.component.css']
})
export class RegisterEmailAlertComponent implements OnInit {
  @ViewChild('registerModal')
  registerModal: BsModalComponent;

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.registerModal.open();
    }, 500);
  }
}
