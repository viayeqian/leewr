import express from 'express'
import path from 'path'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import routes from './src/routes'
import createStore, { initializeSession } from './src/store/index'
import Layout from './src/comp/layout'
import App from './src/App'

const app = express()

app.use(express.static(path.resolve(__dirname, './dist')))

app.get('/*', (req, res) => {
  const context = {}
  const store = createStore()

  store.dispatch(initializeSession())

  // const dataRequirements =
  //   routes
  //     .filter(route => matchPath(req.url, route))
  //     .map(route => route.component)
  //     .filter(comp => comp.serverFetch)
  //     .map(comp => store.dispatch(comp.serverFetch()))

  const dataRequirements = routes
    .filter(route => matchPath(req.url, route)) // filter matching paths
    .map(route => route.component) // map to components
    .filter(comp => comp.serverFetch) // check if components have data requirement
    .map(comp => store.dispatch(comp.serverFetch())) // dispatch data requirement

  Promise.all(dataRequirements).then(() => {
    const jsx = (
      <ReduxProvider store={store}>
        <StaticRouter context={context} location={req.url}>
          <Layout />
        </StaticRouter>
      </ReduxProvider>
    )
    console.log('asdfasd')
    const html = renderToString(jsx)
    console.log(html)
    const reduxState = store.getState()
    console.log('reduxState', reduxState)
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(htmlTemplate(html, reduxState))
  })
})

app.listen(3000, () => {
  console.log('server runned')
})

function htmlTemplate(reactDom, reduxState) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>React SSR</title>
    </head>
    <body>
        <div id="app">${reactDom}</div>
        <script>
          window.REDUX_DATA = ${JSON.stringify(reduxState)}
      </script>
      <script src="./app.bundle.js"></script>
    </body>
    </html>
  `
}
