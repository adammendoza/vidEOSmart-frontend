import { NgModule } from '@angular/core';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { ConfirmationDialogService } from './confirmation-dialog.service';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ConfirmationDialogComponent],
  entryComponents: [ConfirmationDialogComponent],
  imports: [NgbModalModule],
  exports: [ConfirmationDialogComponent, NgbModalModule]
})
export class ConfirmationDialogModule {}
