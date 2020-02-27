import React from "react";
import ReactDOM from "react-dom";
// @ts-ignore
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { GameContainer } from "./GameContainer";
import { reducer } from "./reducer";
import "./index.css";

const store = createStore(reducer, composeWithDevTools());

// TODO: поддержка мобильных
// FIXME: заполнить манифест, поддержать standalone(проверить что работает без сети)
// TODO: [EPIC] написать автотесты
// TODO: [EPIC] поддержать сетевую игру
// TODO: [EPIC] добавить обучение
// TODO: добавить анимацию прокрутки на грань через ref при выигрыше, сбросе и для сетевой игры
ReactDOM.render(
  <Provider store={store}>
    <GameContainer />
  </Provider>,
  document.getElementById("root")
);
