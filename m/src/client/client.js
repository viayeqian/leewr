import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { getUserInfo } from './../store/reducers/user'
import { StaticRouter, matchPath } from 'react-router'
import Loadable from 'react-loadable'
import routes from '../router'

import configureStore from '../store'
import createRouter from '../router/index.js'

// 引入全局样式
import '../pages/Home/Home.scss'

// 从页面中获取服务端生产redux数据，作为客户端redux初始值
const store = configureStore(window.__initState__)

// import { getUserInfo } from './../store/reducers/user'

let userinfo = getUserInfo(store.getState())

if (!userinfo || !userinfo.id) userinfo = null

const run = async () => {
  const router = createRouter(userinfo)
  const RouterDom = router.dom

  let _route = null

  router.list.some(route => {
    let match = matchPath(window.location.pathname, route)
    if (match && match.path) {
      _route = route
      return true
    }
  })

  // 预先加载首屏的js（否则会出现，loading 一闪的情况）
  // if (_route && _route.component && _route.component.preload && _route.loadData) {
  await _route.component.preload()
  // }

  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <RouterDom />
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
  )

  // if (process.env.NODE_ENV !== 'development') {
  //   if (module.hot) {
  //     module.hot.accept()
  //   }
  // }
}

run()
