/*
 * @Author: Tianxing.Qin
 * @Date: 2021-10-12 16:07:33
 * @LastEditors: Tianxing.Qin
 * @LastEditTime: 2021-10-15 18:15:12
 * @Description:
 */
export const DM_API = import.meta.env.VITE_DM_API || ''
const { MODE } = import.meta.env
export const __DEV__ = MODE === 'dev'
export const __PROD__ = MODE === 'prod'
