import { Injectable } from '@angular/core';
import { generateUUID } from '../utils/permission-utils';
import {
  IGroup,
  FilterEnum,
  FilterResponse,
  IRole,
  IRoleFilterRequest,
} from '../interfaces/models';
@Injectable({
  providedIn: 'any',
})
export class PermissionService {
  data: Array<IGroup> = [];
  constructor() {
    this.data = this.initFakeData();
  }
  getGroups(): Array<IGroup> {
    return this.data;
  }
  getGroupById(id: string): IGroup | undefined {
    return this.data.find((x) => x.id == id);
  }
  getRoles(filterRequest: IRoleFilterRequest): FilterResponse<IRole> {
    var roles = this.data.find((x) => x.id == filterRequest.groupId)?.roles;
    if (filterRequest.filter && filterRequest.filter == FilterEnum.mark) {
      roles = roles?.filter((x) => {
        return x.isChecked;
      });
    }
    roles = roles?.filter(
      (v: { title: string }) =>
        v.title.toLowerCase().indexOf(filterRequest.search?.toLowerCase()) > -1
    ) as IRole[];

    const total = roles?.length ?? 0;
    const startIndex = (filterRequest.page - 1) * filterRequest.pageSize;

    roles = roles?.slice(startIndex, startIndex + filterRequest.pageSize);

    return {
      items: roles,
      total: total,
    };
  }
  setGroup(group: IGroup) {
    group.id = generateUUID();
    this.data.push(group);
  }
  update(group: IGroup) {
    const index = this.data.findIndex((x) => x.id == group.id);
    if (index === -1) {
      return;
    }
    const updatedObj = { ...this.data[index], title: group.title };

    const updated = [
      ...this.data.slice(0, index),
      updatedObj,
      ...this.data.slice(index + 1),
    ];
    this.data = updated;
  }

  setRole(id: string, role: IRole) {
    this.data.find((x) => x.id == id)?.roles.push(role);
  }
  setCheckedRole(groupId: string, roleId: string) {
    this.data
      .find((x) => x.id == groupId)
      ?.roles.map((item) => {
        if (item.id == roleId) {
          item.isChecked = !item.isChecked;
        }
        return { ...item };
      });
  }
  initFakeData(): Array<IGroup> {
    const data: Array<IGroup> = [
      {
        id: generateUUID(),
        title: 'Admins',
        roles: [
          {
            id: generateUUID(),
            title: 'Pizza editor',
            isChecked: false,
          },
          {
            id: generateUUID(),
            title: 'Duts sniffer',
            isChecked: false,
          },
          {
            id: generateUUID(),
            title: 'Poker cheater',
            isChecked: false,
          },
          {
            id: generateUUID(),
            title: 'Drug user',
            isChecked: false,
          },
          {
            id: generateUUID(),
            title: 'role r',
            isChecked: false,
          },
          {
            id: generateUUID(),
            title: 'role 6',
            isChecked: false,
          },
          {
            id: generateUUID(),
            title: 'role 7',
            isChecked: false,
          },
          {
            id: generateUUID(),
            title: 'role 8',
            isChecked: false,
          },
          {
            id: generateUUID(),
            title: 'role 9',
            isChecked: false,
          },
          {
            id: generateUUID(),
            title: 'role 10',
            isChecked: false,
          },
          {
            id: generateUUID(),
            title: 'role 11',
            isChecked: false,
          },
          {
            id: generateUUID(),
            title: 'role 12',
            isChecked: false,
          },
          {
            id: generateUUID(),
            title: 'role 13',
            isChecked: false,
          },
          {
            id: generateUUID(),
            title: 'role 14',
            isChecked: false,
          },
          {
            id: generateUUID(),
            title: 'role 15',
            isChecked: false,
          },
          {
            id: generateUUID(),
            title: 'role 16',
            isChecked: false,
          },
          {
            id: generateUUID(),
            title: 'role 17',
            isChecked: false,
          },
          {
            id: generateUUID(),
            title: 'role 18',
            isChecked: false,
          },
          {
            id: generateUUID(),
            title: 'role 19',
            isChecked: false,
          },
          {
            id: generateUUID(),
            title: 'role 120',
            isChecked: false,
          },
          {
            id: generateUUID(),
            title: 'role 121',
            isChecked: false,
          },
        ],
      },
      {
        id: generateUUID(),
        title: 'General Manager',
        roles: [
          {
            id: generateUUID(),
            title: 'CEO',
            isChecked: false,
          },
          {
            id: generateUUID(),
            title: 'CTO',
            isChecked: false,
          },
          {
            id: generateUUID(),
            title: 'Scrum master',
            isChecked: false,
          },
          {
            id: generateUUID(),
            title: 'Product Owner',
            isChecked: false,
          },
        ],
      },
    ];
    return data;
  }
}
