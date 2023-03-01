/*
 * @Author: Tianxing.Qin
 * @Date: 2021-02-26 10:55:12
 * @LastEditors: Tianxing.Qin
 * @LastEditTime: 2021-11-25 15:42:13
 * @Description:
 */
import * as maptalks from 'maptalks'
import { makeAutoObservable, observable } from 'mobx'
import { createContext } from 'react'
class MapStore {
  constructor(props: any) {
    props && Object.assign(this, props)
    makeAutoObservable(this)
  }
  @observable mapIns: maptalks.Map | null = null
  init = (mapIns: maptalks.Map) => {
    this.mapIns = mapIns
  }
}

const map = new MapStore({})
export const mapStore = map
const Context = createContext(map)
export default Context
