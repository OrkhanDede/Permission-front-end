import { PermissionService } from '../../services/permission-service';

import {
  FilterEnum,
  FilterResponse,
  IRole,
  IRoleFilterRequest,
} from '../../interfaces/models';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PaginationValue } from '../pagination/pagination.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit, OnChanges {
  @Input() groupId: string | undefined = undefined;
  @Output() onChecked: EventEmitter<string> = new EventEmitter();
  search: string = '';
  filterSelect: FilterEnum = FilterEnum.All;
  pagination = { page: 1, pageSize: 10 };
  roles: FilterResponse<IRole> = {
    items: [],
    total: 0,
  };
  filterRequest: IRoleFilterRequest = {
    filter: FilterEnum.All,
    groupId: '',
    page: 1,
    pageSize: 10,
    search: '',
  };
  constructor(private permissionService: PermissionService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['groupId']) {
      this.filterRequest.groupId = changes['groupId'].currentValue;
      this.getData();
    }
  }
  getData() {
    this.roles = this.permissionService.getRoles(this.filterRequest);
  }

  ngOnInit(): void {
    if (this.groupId) {
      this.filterRequest.groupId = this.groupId;
      this.getData();
    }
  }
  onCheck(id: string) {
    this.permissionService.setCheckedRole(this.filterRequest.groupId, id);
  }
  searchKey() {
    if (this.groupId) {
      this.filterRequest.search = this.search;
      this.getData();
    }
  }
  onFilterSelect(event: any) {
    this.filterRequest.filter = event;
    this.getData();
  }
  public onPageChange(pagination: PaginationValue): void {
    if (this.groupId) {
      this.filterRequest.page = pagination.page;
      this.getData();
    }
  }
}
