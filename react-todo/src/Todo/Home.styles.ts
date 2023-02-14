import { IStyle, mergeStyleSets, IProcessedStyleSet } from "@uifabric/merge-styles";

interface IHomeStyle {
  todoContainer: IStyle;
  headerStyle: IStyle;
  pivotRoot: IStyle;
  pivotContainer: IStyle;
}

const HomeStyle: IProcessedStyleSet<IHomeStyle> = mergeStyleSets({
  todoContainer: {
    width: "50%",
    height: "80%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0px 22px 70px 4px rgba(0, 0, 0, .56)",
  },

  headerStyle: {
    height: 80,
    backgroundColor: "cadetblue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },

  pivotRoot: {
    display: "flex",
    justifyContent: "center",
  },

  pivotContainer: {
    margin: 20,
  },
});

export default HomeStyle;
