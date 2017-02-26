import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import DevTools from '../components/DevTools';
import createLogger from 'redux-logger';

const logger = createLogger();
const finalCreateStore = compose(
  applyMiddleware(thunk, logger),
  DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers/index', () =>
      store.replaceReducer(require('reducers/index'))
    );
  }

  return store;
}
