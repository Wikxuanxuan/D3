/*
 * @Author: Tianxing.Qin
 * @Date: 2021-10-12 14:15:51
 * @LastEditors: Tianxing.Qin
 * @LastEditTime: 2021-11-25 15:36:20
 * @Description:
 */
import './App.less'

import { Layout, Spin } from 'antd'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { VHeader } from '@/layout'
import routes from '@/router'
import { ThemeEnum } from '@@/components/style/context'
import { loadTheme } from '@@/components/style/themes'
loadTheme(ThemeEnum.light)
const { Content, Footer } = Layout

function App() {
  return (
    <Layout className="layout" style={{ height: '100%' }}>
      <VHeader height={60} routes={routes} defaultSelectedMenus={['About']} />
      <Content style={{ padding: 20 }}>
        <Routes>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <React.Suspense fallback={<Spin />}>
                  <route.component />
                </React.Suspense>
              }
            />
          ))}
        </Routes>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Footer</Footer>
    </Layout>
  )
}

export default App
