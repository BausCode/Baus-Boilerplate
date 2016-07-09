import { renderToString } from 'react-dom/server';
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';

export default React => (store, renderProps) => {

  return renderToString(
    <Provider store={store}>
      <RouterContext { ...renderProps } />
    </Provider>
  );
};
