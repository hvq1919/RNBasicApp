import 'react-native-gesture-handler';
import { Provider } from 'react-redux'
import React from "react";
import store from './src/redux/Store' //Import the store
import Index from "./src";

export default function App() {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  )
};