import React from "react";
import Space from "./Space";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(...middleware))
);



function App() {
  return (
    <Provider store={store}>
    <Space/>
   </Provider>
  );
}

export default App;
