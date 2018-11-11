import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { AlertService } from '../../services/alert.service';
import { EosService } from '../../services/eos.service';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { debounceTime, flatMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { User } from '../../models/user';
import { Profile } from '../../models/profile';
import { error } from 'util';

@Component({
  selector: 'vs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  user: User;
  userProfile: Profile;
  displayCreateSmartContract = false;
  enableCreateSmartContractButton = false;
  createSmartContractForm: FormGroup;
  token: string;
  smartContracts: Array<any>;
  // get from server
  sponsorsArray = ['Maybeline', 'GoPro', 'ZARA'];

  constructor(
    private eosService: EosService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.getDashboardData();
  }

  ngOnDestroy() {}

  private buildForm() {
    this.createSmartContractForm = this.formBuilder.group({
      title: this.formBuilder.control('My Trip to Bali', [Validators.required]),
      description: this.formBuilder.control('This trip was the best', [Validators.required]),
      sponsor: this.formBuilder.control('GoPro', [Validators.required]),
      trigger: this.formBuilder.control('10000', [Validators.required]),
      url: this.formBuilder.control('https://www.youtube.com/watch?v=SW48b1RO-z0', [Validators.required]),
      tag: this.formBuilder.control('trips', [Validators.required]),
      expirationDate: this.formBuilder.control('2018-12-15', [Validators.required])
    });
  }

  onClearForm() {
    this.createSmartContractForm.reset();
  }

  getDashboardData() {
    this.eosService.getSmartContracts().subscribe(
      (data: any) => {
        this.smartContracts = data;
      },
      err => {
        console.log('Dashboard error');
        console.log(err);
        if (environment.production) {
          this.router.navigate(['home']);
        }
      }
    );
  }

  showCreateSmartContract() {
    this.displayCreateSmartContract = !this.displayCreateSmartContract;
  }

  sponsorsArraySelectedValue(selectedItem: any, index: any): void {
    (<FormControl>this.createSmartContractForm.controls['sponsor']).patchValue(selectedItem);
  }

  onSubmitCreateSmartContractForm() {
    console.log('submit');
    const body = this.createSmartContractForm.value;
    this.eosService.createSmartContract(body).subscribe(
      result => {
        this.onClearForm();
        this.displayCreateSmartContract = false;
        setTimeout(() => {
          this.getDashboardData();
        }, 500);
      },
      err => {
        console.log(err);
      }
    );
  }
}
