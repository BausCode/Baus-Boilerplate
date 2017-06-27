import { renderToString } from 'react-dom/server';
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';

export default React => (store, renderProps = {}, err = null) => {
  const isProd = process.env.NODE_ENV === 'production';
  let styles = '';
  let scripts = `
    <script src="/dist/vendor.js"></script>
    <script src="/dist/app.js"></script>
  `;
  let initialState = store.getState();

  if (err) {
    initialState.err = err;
  }

  if (isProd) {
    const manifest = require('../public/dist/manifest.json');
    styles = `<link rel="stylesheet" type="text/css" href="/dist/${ manifest["app.css"] }" />`;
    scripts = `
      <script>window.webpackManifest = ${ JSON.stringify(require('../public/dist/chunk-manifest.json') ) };</script>
      <script src="/dist/${ manifest["manifest.js"] }"></script>
      <script src="/dist/${ manifest["vendor.js"] }"></script>
      <script src="/dist/${ manifest["app.js"] }"></script>
    `;
  }

  const content = renderToString(
    <Provider store={ store }>
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
        ${ styles }
      </head>
      <body>
        <div id="root">${ content }</div>
        <script>window.__initial_state__ = ${ JSON.stringify(initialState) };</script>
        ${ scripts }
      </body>
    </html>`;
};
