import { renderToString } from 'react-dom/server';
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';

export default React => (store, renderProps) => {
  const styles = process.env.NODE_ENV !== 'production' ? '' : '<link rel="stylesheet" type="text/css" href="/dist/styles.css" />';
  const initialState = JSON.stringify( store.getState() );
  const content = renderToString(
    <Provider store={store}>
      <RouterContext { ...renderProps } />
    </Provider>
  );

  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="description" content="">
        <title>Baus Boilerplate</title>
        ${styles}
      </head>
      <body>
        <div id="root">${content}</div>
        <script>window.__initial_state__ = ${initialState};</script>
        <script src="/dist/modernizr-custom.js"></script>
        <script src="/dist/vendor.js"></script>
        <script src="/dist/app.js"></script>
      </body>
    </html>`;
};
