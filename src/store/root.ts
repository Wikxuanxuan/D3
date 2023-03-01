/*
 * @Author: Tianxing.Qin
 * @Date: 2021-02-25 09:56:17
 * @LastEditors: Tianxing.Qin
 * @LastEditTime: 2021-11-25 15:40:55
 * @Description:
 */
import { autorun, makeAutoObservable } from 'mobx'
import { createContext } from 'react'

const ROOT_STORE = 'DEMO'

class RootStore {
  constructor(props: any) {
    props && Object.assign(this, props)
    makeAutoObservable(this)
  }

  name = 'demo'
}

//save in localStorage
const store = JSON.parse(localStorage.getItem(ROOT_STORE) || '{}')
const root = new RootStore(store)
autorun(() => {
  localStorage.setItem(ROOT_STORE, JSON.stringify(root))
})

//do not save in localStorage
// const root = new RootStore({})

//public
export const rootStore = root
const Context = createContext(root)
export default Context
