import { FontIcon, TeachingBubble } from "@fluentui/react";
import TaskListStyles from "./TaskList.styles";
import { ITask } from "../Types";
import { useId, useBoolean } from "@fluentui/react-hooks";
import { mergeStyles } from '@uifabric/merge-styles';

type Props = {
  value: ITask;
};
const TaskDescription = ({ value }: Props) => {
  const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] = useBoolean(false);
  const buttonId = useId("targetButton");

  return (
    <>
      <FontIcon
        id={buttonId}
        iconName="Info"
        className={value.description ? TaskListStyles.iconStyle : mergeStyles(TaskListStyles.iconStyle, TaskListStyles.disabled)}
        onClick={value.description ? toggleTeachingBubbleVisible : () => {}}
      />

      {teachingBubbleVisible && (
        <TeachingBubble target={`#${buttonId}`} headline={value.title} onDismiss={toggleTeachingBubbleVisible}>
            {value.description}
        </TeachingBubble>
      )}
    </>
  );
};

export default TaskDescription;
