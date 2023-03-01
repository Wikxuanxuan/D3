/*
 * @Author: Tianxing.Qin
 * @Date: 2021-10-12 14:31:27
 * @LastEditors: Tianxing.Qin
 * @LastEditTime: 2021-11-25 16:01:59
 * @Description:
 */
import { Button, ConfigProvider } from 'antd'
import { observer } from 'mobx-react'
import React, { useContext } from 'react'

import RootStore from '@/store/root'
import DatlasButton from '@@/components/button'

const Home = observer(() => {
  const root = useContext(RootStore)

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          // root.name += 1
          ConfigProvider.config({
            theme: { primaryColor: '#1890ff' }
          })
        }}
      >
        Index
      </Button>
      <DatlasButton
        type="primary"
        onClick={() => {
          // root.name += 1

          ConfigProvider.config({
            theme: { primaryColor: '#1890ff' }
          })
        }}
      >
        Index
      </DatlasButton>
      {root.name}
    </>
  )
})

export default Home
