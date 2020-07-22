import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import storage from "redux-persist/lib/storage";
import reducers from './store/reducers';
import Home from './container/Home';

const persistConfig = {
  key: 'root',
  storage: storage
}
const persistedReducer = persistReducer(persistConfig, reducers);

function App() {

  const store = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk));
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Route path="/" exact component={Home} />
        </Router>
      </PersistGate>
    </Provider>

  );
}

export default App;
