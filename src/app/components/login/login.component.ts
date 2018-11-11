import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

import { BsModalComponent } from 'ng2-bs3-modal';
import { CookieService } from 'ngx-cookie-service';

import { AlertService } from '../../services/alert.service';
import { EosService } from '../../services/eos.service';

declare var jQuery: any;

@Component({
  selector: 'vs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginModal')
  loginModal: BsModalComponent;

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private router: Router,
    private eosService: EosService,
    private alertService: AlertService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.eosService.logout();
    this.model.username = this.cookieService.get('username');
    const bytes = CryptoJS.AES.decrypt(this.cookieService.get('password').toString(), environment.HASH_KEY);
    this.model.password = bytes.toString(CryptoJS.enc.Utf8);
  }

  login() {
    this.loading = true;

    if (this.model.remember) {
      this.cookieService.set('username', this.model.username);
      this.cookieService.set('password', CryptoJS.AES.encrypt(this.model.password, environment.HASH_KEY));
    }

    this.eosService
      .login(this.model.username, this.model.password)
      .pipe(
        flatMap(data => {
          return this.eosService.getSession();
        })
      )
      .subscribe(
        data => {
          jQuery('#modal-login').modal('hide');
          this.eosService.pushNavUsername(this.model.username);

          setTimeout(() => {
            this.router.navigate(['/profile']);
          }, 500);
        },
        error => {
          this.alertService.error('Please verify your username and password');
          this.loading = false;
        }
      );
  }

  register() {
    jQuery('#modal-login').modal('hide');

    setTimeout(() => {
      this.router.navigate(['/register']);
    }, 500);
  }
}
