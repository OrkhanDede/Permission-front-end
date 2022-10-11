export interface FilterResponse<T> {
  items: T[];
  total: number;
}
export enum FilterEnum {
  All = 1,
  mark,
}

export interface IRoleFilterRequest {
  groupId: string;
  search: string;
  page: number;
  pageSize: number;
  filter: FilterEnum;
}
export interface IGroup {
  id: string;
  title: string;
  roles: Array<IRole>;
}
export interface IRole {
  id: string;
  title: string;
  isChecked: boolean;
}
