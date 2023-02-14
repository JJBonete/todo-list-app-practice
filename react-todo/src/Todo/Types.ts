import { Dispatch } from "react";

export enum PivotKeysEnum {
  // Enums for the Pivot
  Tasks = "Tasks",
  TaskForm = "TaskForm",
  Completed = "CompletedTasks",
}

export interface ITask {
  id: string;
  title: string;
  description?: string;
  isFav: boolean;
}

export interface ITodoContext {
  activeTasks: ITask[];
  completedTasks: ITask[];
  dispatch: Dispatch<any>;
}

export interface ITodoState {
  activeTasks: ITask[];
  completedTasks: ITask[];
}

export enum ActionTypeEnum {
  Add,
  Delete,
  ToogleFavorite,
  Update,
  Completed,
  DeleteCompletedTask,
}

export type IReducerAction =
  | IAddAction
  | IDeleteAction
  | IToogleFavoriteAction
  | IUpdateAction
  | ICompletedAction;

export interface IAddAction {
  type: ActionTypeEnum.Add;
  data: ITask;
}

export interface IDeleteAction {
  type: ActionTypeEnum.Delete | ActionTypeEnum.DeleteCompletedTask;
  data: { id: string };
}

export interface IToogleFavoriteAction {
  type: ActionTypeEnum.ToogleFavorite;
  data: { id: string };
}

export interface IUpdateAction {
  type: ActionTypeEnum.Update;
  data: ITask;
}

export interface ICompletedAction {
  type: ActionTypeEnum.Completed;
  data: { id: string };
}
