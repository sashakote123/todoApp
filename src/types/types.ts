export interface ITask {
  id: number;
  name: string;
  info: string;
  isImportant: boolean;
  isCompleted: boolean;
}

export interface TaskFormData {
  name: string;
  info: string;
  isImportant: boolean;
  isCompleted: boolean;
}

export interface IAuthData {
  name: string;
  mail: string;
  isAuthenticated: boolean;
}

export enum FilterType {
  ALL = 1,
  INCOMPLETE = 2,
  COMPLETED = 3,
  IMPORTANT = 4,
}

export enum ViewType {
  LIST = 1,
  BOARD = 2,
}
