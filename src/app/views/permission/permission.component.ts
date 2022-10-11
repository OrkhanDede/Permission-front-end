import { Component, OnInit } from '@angular/core';
import { IGroup } from './interfaces/models';
import { PermissionService } from './services/permission-service';

@Component({
  templateUrl: 'permission.component.html',
  styleUrls: ['permission.component.scss'],
})
export class PermissionComponent implements OnInit {
  groups: Array<IGroup> = [];
  selectedGroup: IGroup | undefined;
  activeTab: string | undefined;
  visible = false;
  editableGroup: IGroup | undefined;

  constructor(private permissionService: PermissionService) {
    this.groups = this.permissionService.getGroups();
    this.selectedGroup = this.groups[0];
  }
  getData() {
    if (this.selectedGroup) {
      this.activeTab = this.selectedGroup?.id;
    }
  }
  ngOnInit() {
    this.getData();
  }
  onTabClick(id: string) {
    this.selectedGroup = this.permissionService.getGroupById(id);
    if (this.selectedGroup) {
      this.activeTab = this.selectedGroup?.id;
    }
  }
  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  onClickEdit(id: string) {
    var data = this.permissionService.getGroupById(id);
    this.editableGroup = data;
    this.toggleLiveDemo();
  }

  closeModal(event: any) {
    this.visible = event;
  }
  save(group: IGroup) {
    this.closeModal(false);
    if (group.id) {
      this.permissionService.update(group);
    } else {
      this.permissionService.setGroup(group);
    }
    this.getData();
  }
}
