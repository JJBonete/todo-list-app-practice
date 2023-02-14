import React, { useContext, useEffect } from "react";
import { MessageBar, MessageBarType, PrimaryButton, Stack, TextField } from "@fluentui/react";
import { useState } from "react";
import { TodoContext } from "../TodoProvider";
import { ITask, ActionTypeEnum } from "../Types";
import UserInput from "./userInput";
import TodoString from "../String.json";

type Props = {
  editTaskId: string | null;
};

const TaskForm = ({ editTaskId }: Props) => {
  const title = UserInput("");
  const description = UserInput("");
  const { activeTasks, dispatch } = useContext(TodoContext);

  useEffect(() => {
    if (editTaskId) {
      const taskData = activeTasks.find((value) => value.id === editTaskId);

      title.set(taskData?.title || "");
      description.set(taskData?.description || "");
    }
  });

  const [showMessage, setShowMessage] = useState<{ type: MessageBarType; message: string }>({
    type: MessageBarType.success,
    message: "",
  });

  useEffect(() => {
    if (showMessage.message) {
      setTimeout(() => {
        setShowMessage({ type: MessageBarType.success, message: "Task Added" });
      });
    }
  });

  const addTaskAction = () => {
    const data: ITask = {
      id: "",
      title: title.value,
      description: description.value,
      isFav: false,
    };

    dispatch({ type: ActionTypeEnum.Add, data });
    setShowMessage({ type: MessageBarType.success, message: "Task Added" });
    title.set("");
    description.set("");
  };

  const updateTaskAction = () => {
    const taskData = activeTasks.find((value) => value.id === editTaskId);

    if (taskData) {
      const data: ITask = {
        id: taskData.id || "",
        title: title.value,
        description: description.value,
        isFav: taskData.isFav || false,
      };
      dispatch({ type: ActionTypeEnum.Update, data });
      setShowMessage({ type: MessageBarType.success, message: "Task Updated" });
    } else {
      setShowMessage({ type: MessageBarType.error, message: "Error while updating Task" });
    }
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    editTaskId ? updateTaskAction() : addTaskAction();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <TextField label="Title" required {...title} />
      <TextField label="Description" multiline rows={10} {...description} />

      <Stack horizontal style={{ marginTop: 20 }} tokens={{ childrenGap: 20 }}>
        <Stack style={{ width: "80%" }}>
          {showMessage.message && (
            <MessageBar messageBarType={MessageBarType.success}>{showMessage.message}</MessageBar>
          )}
        </Stack>

        <Stack>
          <PrimaryButton
            text={editTaskId ? TodoString.updateTaskBtn : TodoString.addTaskBtn}
            type="submit"
          ></PrimaryButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default TaskForm;
