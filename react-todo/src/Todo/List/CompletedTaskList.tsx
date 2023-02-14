import { Stack, Checkbox, FontIcon, MessageBar } from "@fluentui/react";
import { mergeStyles } from "@uifabric/merge-styles";
import { useContext } from "react";
import { TodoContext } from "../TodoProvider";
import { ActionTypeEnum, ITask } from "../Types";
import TaskDescription from "./TaskDescription";
import TaskListStyles from "./TaskList.styles";
import TodoString from "../String.json";

const CompletedTaskList = () => {
  const { completedTasks } = useContext(TodoContext);

  const onTaskDelete = (id: string) => {
    if (window.confirm(TodoString.deleteConfirm))
      dispatch({ type: ActionTypeEnum.DeleteCompletedTask, data: { id } });
  };
  const onRenderCell = (value: ITask) => {
    return (
      <Stack horizontal key={value.id} className={TaskListStyles.taskItem}>
        <Stack horizontal style={{ width: "80%" }} className={TaskListStyles.disabled}>
          <Checkbox disabled />
          <span> {value.title}</span>
        </Stack>
        <Stack horizontal style={{ width: "30%" }}>
          <TaskDescription value={value} />
          <FontIcon
            iconName={value.isFav ? "FavoriteStarFill" : "FavoriteStar"}
            className={mergeStyles(TaskListStyles.iconStyle, TaskListStyles.disabled)}
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
  return (
    <div>
      {completedTasks.length ? (
        completedTasks.map(onRenderCell)
      ) : (
        <MessageBar>No completed Task</MessageBar>
      )}{" "}
    </div>
  );
};

export default CompletedTaskList;
function dispatch(arg0: {}) {
  throw new Error("Function not implemented.");
}
