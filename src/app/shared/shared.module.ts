import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SelectModule } from 'ng2-select';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { TabsModule } from 'ngx-tabs';
import { BsModalModule } from 'ng2-bs3-modal';

import { ConfirmationDialogModule } from '../components/confirmation-dialog/confirmation-dialog.module';
import { MaskInputDirective } from '../directives/mask-input.directive';
import { ValidateUsStateDirective } from '../directives/validate-us-state.directive';
import { ValidateEmailDirective } from '../directives/validate-email.directive';
import { PhoneNumberPipe } from '../pipes/phone-number.pipe';

@NgModule({
  declarations: [MaskInputDirective, ValidateUsStateDirective, ValidateEmailDirective, PhoneNumberPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule,
    BsModalModule,
    SelectModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger',
      placement: 'top'
    }),
    ConfirmationDialogModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule,
    BsModalModule,
    SelectModule,
    ConfirmationPopoverModule,
    ConfirmationDialogModule,
    MaskInputDirective,
    ValidateUsStateDirective,
    ValidateEmailDirective,
    PhoneNumberPipe
  ]
})
export class SharedModule {}
