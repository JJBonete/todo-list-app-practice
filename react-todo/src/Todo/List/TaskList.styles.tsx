import { mergeStyleSets, IStyle, IProcessedStyleSet } from "@uifabric/merge-styles";

interface ITaskListStyle {
  taskItem: IStyle;
  iconStyle: IStyle;
  disabled: IStyle;
}

const TaskListStyles: IProcessedStyleSet<ITaskListStyle> = mergeStyleSets({
  taskItem: {
    maxHeight: "50%",
    minHeight: "50%",
    padding: "5px ",
    width: "100%",
    backgroundColor: "lavander",
    selectors: {
      "&:hover": { background: "rgb(243, 242, 241)" },
    },
    margin: "10px",
    display: "flex",
    // flexDirection: "row",
    alignItems: "center",
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    // boxShadow: "0px 22px 70px 4px rgba(0, 0, 0, .56)",
  },
  iconStyle: {
    fontSize: "25px",
    margin: "0 10px",
    selectors: {
      "&:hover": { cursor: "pointer" },
    },
  },

  disabled:{
  color: "gray",
  seletors: {
    "&:hover" : {cursor: "default"},
  },
  },
});

export default TaskListStyles;
