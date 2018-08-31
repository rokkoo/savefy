import React from "react";

import reducer from "./redux/reducer";

import { LoginNavigator } from "./navigator";
import { LocaleConfig } from "react-native-calendars";

import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(reducer);
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <LoginNavigator />
      </Provider>
    );
  }
}
