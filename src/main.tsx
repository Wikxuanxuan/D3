/*
 * @Author: Tianxing.Qin
 * @Date: 2021-10-12 14:15:51
 * @LastEditors: Tianxing.Qin
 * @LastEditTime: 2021-11-25 16:01:35
 * @Description:
 */

import 'moment/dist/locale/zh-cn'
import './index.less'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Router>
        <App />
      </Router>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
