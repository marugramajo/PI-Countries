import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer/reducer";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) // de esta manera aplico middleware a mi proyectp, o a la store de de redux
);
