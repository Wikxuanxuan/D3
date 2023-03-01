/*
 * @Author: Tianxing.Qin
 * @Date: 2021-10-12 14:32:06
 * @LastEditors: Tianxing.Qin
 * @LastEditTime: 2021-11-25 16:56:46
 * @Description:
 */
import { DatePicker } from 'antd'
import React from 'react'

import DatlasButton from '@@/components/button'
// import { DateFilter } from '@@/components/create-filter'

const About: React.FC = () => (
  <div>
    <DatePicker />
    {/* <DateFilter loading={false}> */}
    <DatlasButton>open</DatlasButton>
    {/* </DateFilter> */}
  </div>
)

export default About
