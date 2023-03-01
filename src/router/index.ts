/*
 * @Author: Tianxing.Qin
 * @Date: 2021-11-23 17:11:23
 * @LastEditors: Tianxing.Qin
 * @LastEditTime: 2021-11-24 16:53:19
 * @Description:
 */
import React from 'react'

const routes = [
  {
    title: 'Home',
    path: '/',
    component: React.lazy(() => import('../pages/Home'))
  },
  {
    title: 'About',
    path: '/about',
    component: React.lazy(() => import('../pages/About'))
  }
]

export default routes
