import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallListRoutingModule } from './call-list-routing.module';
import { CallListComponent } from './call-list.component';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { TimePipe } from '../pipe/time.pipe';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    CallListComponent,
    PageHeaderComponent,
    TimePipe
  ],
  imports: [
    CommonModule,
    CallListRoutingModule,
    NgbModule
  ]
})
export class CallListModule { }
