import { Game } from "./components/Game";
// @ts-ignore
import { connect } from "react-redux";
import { Dispatch } from "redux";

const mapStateToProps = (state: any) => {
  return {
    faceStates: state.get("faceStates"),
    isHelpModalOpened: state.get("isHelpModalOpened"),
    isWinnerModalOpened: state.get("isWinnerModalOpened"),
    winner: state.get("winner")
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onFaceClick: (faceNumber: number) => {
    dispatch({ type: "FACE_CLICK", faceNumber });
    dispatch({ type: "CHECK_WIN" });
  },
  onResetClick: () => {
    dispatch({ type: "RESET_CLICK" });
  },
  onWinnerModalClose: () => {
    dispatch({ type: "WINNER_CLOSE" });
  },
  onHelpModalClose: () => {
    dispatch({ type: "HELP_CLOSE" });
  },
  onHelpClick: () => {
    dispatch({ type: "HELP_OPEN" });
  }
});

export const GameContainer = connect(mapStateToProps, mapDispatchToProps)(Game);
