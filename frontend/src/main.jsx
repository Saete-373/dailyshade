import App from "./App";
import ReactDOM from "react-dom/client";
import React from "react";
import { createRoot } from "react-dom/client";
import { Router as BrowserRouter } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./reducers/allReducer";

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
