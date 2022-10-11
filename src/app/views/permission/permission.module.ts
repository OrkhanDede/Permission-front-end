import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  TableModule,
} from '@coreui/angular';

import { DashboardRoutingModule } from './permission-routing.module';
import { PermissionComponent } from './permission.component';

import { RoleComponent } from './components/role/role.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { GroupModalComponent } from './components/group-modal/group-modal.component';

@NgModule({
  imports: [
    DashboardRoutingModule,
    ModalModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    FormModule,
    CardModule,
    GridModule,
    ButtonModule,
    ButtonGroupModule,
    TableModule,
    CommonModule,
  ],
  declarations: [
    PermissionComponent,
    RoleComponent,
    PaginationComponent,
    GroupModalComponent,
  ],
})
export class PermissionModule {}
