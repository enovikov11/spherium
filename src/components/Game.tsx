import React from "react";
import { GameCanvas } from "./GameCanvas";
import { List } from "immutable";
import { FaceState } from "../reducer";
import { Modal } from "./Modal";

export function Game({
  faceStates,
  onFaceClick,
  onResetClick,
  isWinnerModalOpened,
  onWinnerModalClose,
  winner,
  isHelpModalOpened,
  onHelpModalClose,
  onHelpClick
}: {
  faceStates: List<FaceState>;
  onFaceClick: Function;
  onResetClick: () => void;
  isWinnerModalOpened: boolean;
  onWinnerModalClose: () => void;
  winner: FaceState;
  isHelpModalOpened: boolean;
  onHelpModalClose: () => void;
  onHelpClick: () => void;
}) {
  return (
    <>
      {/* FIXME: фон и иконки как в старой версии */}
      <div className="game__buttons">
        <button onClick={onResetClick}>Сброс</button>
        <button onClick={onHelpClick}>Справка</button>
      </div>
      <GameCanvas faceStates={faceStates} onFaceClick={onFaceClick} />
      <Modal isOpen={isWinnerModalOpened} onClose={onWinnerModalClose}>
        {winner === FaceState.PLAYER1 ? "Выиграли красные" : "Выиграли синие"}
      </Modal>
      <Modal isOpen={isHelpModalOpened} onClose={onHelpModalClose}>
        Играют 2 человека, красными и синими. Нужно по очереди нажимать на
        грани, они будут менять цвет. Выигрывает тот, кто соберет вокруг
        какой-то грани 3 своего цвета. Чтобы вращать, нужно водить по экрану.
      </Modal>
    </>
  );
}
