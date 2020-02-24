import { List, Record } from "immutable";

// Задано, чтобы не было путаницы при передаче по сети
export enum FaceState {
  NONE = 0,
  PLAYER1 = 1,
  PLAYER2 = 2
}

// FIXME: перейти на mesh вместо icosahedronGeometry, чтобы при обновлении three не слетели захардкоженные грани
const winningTriplets = [
  [4, 1, 6],
  [0, 2, 5],
  [9, 1, 3],
  [8, 2, 4],
  [3, 0, 7],
  [15, 1, 19],
  [16, 0, 15],
  [17, 4, 16],
  [18, 3, 17],
  [19, 2, 18],
  [15, 14, 11],
  [16, 10, 12],
  [13, 17, 11],
  [14, 18, 12],
  [10, 19, 13],
  [5, 10, 6],
  [7, 6, 11],
  [8, 7, 12],
  [9, 8, 13],
  [5, 9, 14]
];

const State = Record({
  playerId: FaceState.PLAYER1,
  faceStates: List(new Array(20).fill(FaceState.NONE)),
  winner: FaceState.NONE,
  isHelpModalOpened: false,
  isWinnerModalOpened: false
});

// FIXME: разделить редюсеры, чтобы не мешать логику игры и UI
export function reducer(state = State(), action: any) {
  switch (action.type) {
    case "FACE_CLICK": {
      if (state.get("winner") !== FaceState.NONE) {
        return state;
      }

      const faceStates = state.get("faceStates");
      const { faceNumber } = action;

      if (faceStates.get(faceNumber) !== FaceState.NONE) {
        return state;
      }

      const playerId = state.get("playerId");

      return state
        .set("faceStates", faceStates.set(faceNumber, playerId))
        .set(
          "playerId",
          playerId === FaceState.PLAYER1 ? FaceState.PLAYER2 : FaceState.PLAYER1
        );
    }
    // FIXME: научиться определять ничью
    case "CHECK_WIN": {
      if (state.get("winner") !== FaceState.NONE) {
        return state;
      }

      const faceStates = state.get("faceStates").toJS();
      const winningTriplet = winningTriplets.find(
        ([a, b, c]) =>
          faceStates[a] !== FaceState.NONE &&
          faceStates[a] === faceStates[b] &&
          faceStates[b] === faceStates[c]
      );
      if (winningTriplet !== undefined) {
        return state
          .set("winner", faceStates[winningTriplet[0]])
          .set("isWinnerModalOpened", true);
      } else {
        return state;
      }
    }
    case "WINNER_CLOSE":
    case "RESET_CLICK": {
      return State();
    }
    case "HELP_CLOSE": {
      return state.set("isHelpModalOpened", false);
    }
    case "HELP_OPEN": {
      return state.set("isHelpModalOpened", true);
    }
    default: {
      return state;
    }
  }
}
