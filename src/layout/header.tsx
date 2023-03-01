import './header.less'

import { Col, Layout, Menu, Row } from 'antd'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ThemeSwitch } from '@/components'

interface HeaderProps {
  routes: { path: string; title: string }[]
  height?: number
  defaultSelectedMenus?: string[]
}

const { Header } = Layout

const VHeader = ({ routes, height, defaultSelectedMenus }: HeaderProps) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!defaultSelectedMenus) return
    const route = routes.find(r => r.title === defaultSelectedMenus[0]) || routes[0]
    navigate(route.path)
  }, [defaultSelectedMenus])

  return (
    <Header
      className="ant-menu"
      style={{
        height: height ? height : 'auto',
        lineHeight: height ? height + 'px' : 'auto'
      }}
    >
      <Row>
        <Col span={2}>
          <div className="logo">logo</div>
        </Col>
        <Col span={20}>
          <Menu
            inlineCollapsed={false}
            mode="horizontal"
            defaultSelectedKeys={defaultSelectedMenus ? defaultSelectedMenus : [routes[0].title]}
          >
            {routes.map(route => (
              <Menu.Item key={route.title}>
                <Link to={route.path}>{route.title}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Col>
        <Col span={2}>
          <div className="theme-switch">
            <ThemeSwitch />
          </div>
        </Col>
      </Row>
    </Header>
  )
}

export default VHeader
