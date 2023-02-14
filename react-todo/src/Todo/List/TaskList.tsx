import React, { useContext } from "react";
import TaskListStyles from "./TaskList.styles";
import { Checkbox, FontIcon, MessageBar, Stack } from "@fluentui/react";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { ITask, ActionTypeEnum } from "../Types";
import { TodoContext } from "../TodoProvider";
import TodoString from "../String.json";
import { mergeStyles } from "@uifabric/merge-styles";
import TaskDescription from "./TaskDescription";

initializeIcons();

type Props = {
  setEditTask: (valueId: string) => void;
};

function TaskList({ setEditTask }: Props) {
  const { activeTasks, dispatch } = useContext(TodoContext);

  const onTaskDelete = (id: string) => {
    if (window.confirm(TodoString.deleteConfirm))
      dispatch({ type: ActionTypeEnum.Delete, data: { id } });
  };

  const onFavoriteClick = (id: string) => {
    dispatch({ type: ActionTypeEnum.ToogleFavorite, data: { id } });
  };

  const checkboxonClickedHandler = (id: string) => {
    dispatch({ type: ActionTypeEnum.Completed, data: { id } });
  };
  const onRenderCell = (value: ITask) => {
    return (
      <Stack horizontal key={value.id} className={TaskListStyles.taskItem}>
        <Stack horizontal style={{ width: "80%" }}>
          <Checkbox
            onChange={() => {
              checkboxonClickedHandler(value.id);
            }}
          />
          {value.title}
        </Stack>
        <Stack horizontal style={{ width: "30%" }}>
          <TaskDescription value={value} />
          <FontIcon
            iconName={value.isFav ? "FavoriteStarFill" : "FavoriteStar"}
            className={
              value.isFav
                ? mergeStyles(TaskListStyles.iconStyle, { color: "#1C82AD" })
                : TaskListStyles.iconStyle
            }
            onClick={() => onFavoriteClick(value.id)}
          />
          <FontIcon
            iconName={"EditNote"}
            className={TaskListStyles.iconStyle}
            onClick={() => {
              setEditTask(value.id);
            }}
          />
          <FontIcon
            iconName={"Delete"}
            className={TaskListStyles.iconStyle}
            onClick={() => onTaskDelete(value.id)}
          />
        </Stack>
      </Stack>
    );
  };
  //Return of the TaskList function
  return (
    <div>
      {activeTasks.length ? activeTasks.map(onRenderCell) : <MessageBar>No active Task</MessageBar>}{" "}
    </div>
  );
}

export default TaskList;
