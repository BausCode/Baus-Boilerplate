import { renderToString } from 'react-dom/server';
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../app/store/configureStore';

export default React => (renderProps) => {
  const store = configureStore();

  return renderToString(
    <Provider store={store}>
        <RouterContext { ...renderProps } />
    </Provider>
  );
};
