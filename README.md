GitBaus
------
Client side app for GitBaus

### Requirements
* [Node.js v5](https://nodejs.org/en/download/)


### Quick Start
* `npm install`
* `npm run dev`


### Production
* `npm install`
* `npm run dist`
* `npm run prod`


### Structure

```bash
.
├── App/                              # Main Application
|   ├── Components/                   
|   |   ├── Component Group/          # Application Main Components ie. Homepage, Global Nav
|   |   |   ├── Index.jsx             # Componet Entry Point
|   |   |   ├── Component.jsx         # Child Component Incorporated in Index.jsx 
|   |   ├── Component.jsx             # Single Component
|   |
|   ├── Stylesheets/                  # Base Styles to be imported where needed
|   |   ├── Animations/               # Animation mixins and easing functions
|   |   ├── Defaults/                 # Default Global styles
|   |   ├── Fonts/                    # Font Families
|   |   ├── Mixins/                   # Mixin functions
|   |   ├── Modules/                  # Module Styles for Different Components 
|   |   |   ├── Component.scss        # Specific styles imported for a component 
|   |   ├── Utilities/                # Utility sytles - ie. clearfix
|   |   ├── Variables.scss            # Global variables
|   |
|   ├── Templates                     # Handlebars Templates for base page rendering
|   ├── app.js                        # Main App Entry Point for React Application for page content
|   ├── routes.js                     # Application Routes used by App.js with React-Router
|
├── Public                            # Public folder for output and static content
|   ├── Dist                          # Output folder for generated application
|   ├── Fonts                         # Font Files
|   ├── Images                        # Image Location
|
├── Server                            # Express Server Files
|   ├── Dev.Server.js                 # Todo: Seperate Dev server requirements from main server
|   ├── Server.js                     # Main Server to render and return page
|
├── Webpack                           # Webpack Config Files
|   ├── Dev.Config.js                 # Dev Config for Dev Server and Hot Loading
|   ├── Production.Config.js          # Production Output config to generate final files
|
├── Index.js                          # Express App Entry Point
```

### Webpack

Webpack is used as commonjs module bundler, css builder (using sass-loader) and assets loader (images and svg files).

The [development config](./webpack/dev.config.js) enables source maps, the [Hot Module Replacement](http://webpack.github.io/docs/hot-module-replacement.html) and [react-hot-loader](http://gaearon.github.io/react-hot-loader/). It loads CSS styles with `<style>`, to enable styles live reload). This config is used by the [webpack-dev-server](webpack/server.js), serving the files bundled by Webpack.

> This config uses the [webpack-error-notification](https://github.com/vsolovyov/webpack-error-notification)
> plugin. To get notified on errors while compiling the code, on Mac you must `brew install terminal-notifier`.

The [production config](./webpack/prod.config.js) builds the client-side production bundle from `npm run build`.

Both configs set a `process.env.BROWSER` global variable, useful to require CSS from the components, e.g:

```js
// MyComponent
if (process.env.BROWSER) {
  require('../style/MyComponent.scss');
}
```

### TODO
- Incorporate Redux for handling state
- Decouple Dev server setup for Server.js
- Split code into chunks for different pages with webpack and include through [react router](https://github.com/rackt/react-router/blob/master/docs/guides/advanced/DynamicRouting.md)
- Evaluate the CSS/SCSS setup and handling / consider [Michael Chan - Inline Styles](https://www.youtube.com/watch?v=ERB1TJBn32c) / explore [CSS-Modules](https://github.com/css-modules/css-modules) / [Radium](https://github.com/FormidableLabs/radium) / [React-Style](https://github.com/js-next/react-style)
- Add testing


### Built with Inspiration from: 
- [Isomorphic500](https://github.com/gpbl/isomorphic500)
- [The Ultimate Webpack Setup](http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup)
