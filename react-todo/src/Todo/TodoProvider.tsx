import React, { createContext, useReducer } from "react";

import {
  IDeleteAction,
  IToogleFavoriteAction,
  ActionTypeEnum,
  ITask,
  ITodoContext,
  ITodoState,
  IAddAction,
  IReducerAction,
  IUpdateAction,
} from "./Types";
import { clone } from "./utility";
import { ICompletedAction } from "./Types";

export const TodoContext = createContext<ITodoContext>({
  activeTasks: [],
  completedTasks: [],
  dispatch: () => {},
});

type Props = {
  children: React.ReactNode;
};

const addTaskAction = (state: ITodoState, action: IAddAction) => {
  const { data } = action;
  data.id = new Date().toJSON();
  return [action.data, ...state.activeTasks];
};

const toogleFavoriteAction = (state: ITodoState, action: IToogleFavoriteAction) => {
  const cloneActivityTask: ITask[] = clone(state.activeTasks);
  const index = cloneActivityTask.findIndex((x) => x.id === action.data.id);

  if (index >= 0) {
    cloneActivityTask[index].isFav = !cloneActivityTask[index].isFav;
  }
  return cloneActivityTask;
};

const updateTaskAction = (state: ITodoState, action: IUpdateAction) => {
  //taskes index
  // update data
  // return new state

  const cloneActivityTask: ITask[] = clone(state.activeTasks);
  const index = cloneActivityTask.findIndex((x) => x.id === action.data.id);

  if (index >= 0) {
    cloneActivityTask[index] = action.data;
  }
  return cloneActivityTask;
};
const deleteTaskAction = (state: ITodoState, action: IDeleteAction) => {
  const activeTasks: ITask[] = clone(state.activeTasks);
  const filteredData = activeTasks.filter((value) => value.id !== action.data.id);
  return filteredData;
};

const deleteCompletedTaskAction = (state: ITodoState, action: IDeleteAction) => {
  const completedTasks: ITask[] = clone(state.completedTasks);
  const filteredData = completedTasks.filter((value) => value.id !== action.data.id);
  return filteredData;
};

const completeTaskAction = (state: ITodoState, action: ICompletedAction) => {
  const activeTasks: ITask[] = clone(state.activeTasks);
  const completedTaskData = activeTasks.find((value) => value.id === action.data.id);
  const filteredData = activeTasks.filter((value) => value.id !== action.data.id);
  const completedTask = completedTaskData
    ? [completedTaskData, ...state.completedTasks]
    : [...state.completedTasks];
  return {
    activeTasks: filteredData,
    completedTask,
  };
};

const reducer = (state: ITodoState, action: IReducerAction) => {
  switch (action.type) {
    //BUTTON ACTIONS
    case ActionTypeEnum.Add:
      return { ...state, activeTasks: addTaskAction(state, action) };
    case ActionTypeEnum.Delete:
      return { ...state, activeTasks: deleteTaskAction(state, action) };
    case ActionTypeEnum.DeleteCompletedTask:
      return { ...state, CompletedTaskAction: deleteCompletedTaskAction(state, action) };
    case ActionTypeEnum.ToogleFavorite:
      return { ...state, activeTasks: toogleFavoriteAction(state, action) };
    case ActionTypeEnum.Update:
      return { ...state, activeTasks: updateTaskAction(state, action) };
    case ActionTypeEnum.Completed:
      const data = completeTaskAction(state, action);
      return { ...state, activeTasks: data.activeTasks, completedTasks: data.completedTask };
  }

  return { ...state };
};

function TodoProvider(props: Props) {
  const tasks: ITask[] = [
    {
      id: "0",
      title: "Title 1",
      isFav: true,
    },
    {
      id: "1",
      title: "Title 2",
      isFav: false,
    },
    {
      id: "2",
      title: "Title 3",
      isFav: true,
    },
  ];

  const data: ITodoState = { activeTasks: tasks, completedTasks: [] };
  const [state, dispatch] = useReducer(reducer, data);

  return (
    <TodoContext.Provider
      value={{ activeTasks: state.activeTasks, completedTasks: state.completedTasks, dispatch }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

export default TodoProvider;
