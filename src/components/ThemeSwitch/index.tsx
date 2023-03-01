/*
 * @Author: Tianxing.Qin
 * @Date: 2021-11-25 10:27:59
 * @LastEditors: Tianxing.Qin
 * @LastEditTime: 2021-11-25 17:19:33
 * @Description:
 */
import { Switch } from 'antd'
import React, { useEffect, useState } from 'react'

import { dark, light } from '@/theme'
import { ThemeEnum } from '@@/components/style/context'
import { loadTheme } from '@@/components/style/themes'

const ThemeSwitch = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | undefined>()
  const changeTheme = (content: string) => {
    const head = document.getElementsByTagName('head')[0]
    const getStyle = head.getElementsByTagName('style')
    // 查找style是否存在，存在的话需要删除dom
    if (getStyle.length > 0) {
      for (let i = 0, l = getStyle.length; i < l; i++) {
        if (getStyle[i] && getStyle[i].getAttribute('data-type') === 'theme') {
          getStyle[i].remove()
        }
      }
    }
    // 最后加入对应的主题和加载less的js文件
    const styleDom = document.createElement('style')
    styleDom.dataset.type = 'theme'
    styleDom.innerHTML = content
    head.appendChild(styleDom)
  }

  // 当设置要根据系统主题自动切换模式，执行以下代码
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    if (media.matches) {
      // 当前为深色模式
      changeTheme(dark)
      loadTheme(ThemeEnum.dark)
      setTheme('dark')
    } else {
      // 当前为浅色模式
      changeTheme(light)
      loadTheme(ThemeEnum.light)
      setTheme('light')
    }
    media.onchange = function (evt) {
      if (evt.matches) {
        // 当前为深色模式
        changeTheme(dark)
        loadTheme(ThemeEnum.dark)
        setTheme('dark')
      } else {
        // 当前为浅色模式
        changeTheme(light)
        loadTheme(ThemeEnum.light)
        setTheme('light')
      }
    }
  }, [])

  const onChangeTheme = (checked: boolean) => {
    if (checked) {
      changeTheme(dark)
      loadTheme(ThemeEnum.dark)
      setTheme('dark')
    } else {
      changeTheme(light)
      loadTheme(ThemeEnum.light)
      setTheme('light')
    }
  }

  return (
    <Switch
      checked={theme === 'dark' ? true : false}
      checkedChildren="🌜"
      unCheckedChildren="🌞"
      onChange={onChangeTheme}
    />
  )
}

export default ThemeSwitch
