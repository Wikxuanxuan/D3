/*
 * @Author: Tianxing.Qin
 * @Date: 2021-07-05 10:38:36
 * @LastEditors: Tianxing.Qin
 * @LastEditTime: 2021-10-12 16:58:29
 * @Description:
 */
/**
 *
 * @author david·cun
 * @date 2021-02-25 16:30:47
 * @since 1.0
 */
import LZString from 'lz-string'
import { observable } from 'mobx'

import { __DEV__ } from '@/config'
import { tokenIns } from '@/utils/tokenUtil'

if (__DEV__) {
  //表示是开发环境
  const mdtUser = LZString.decompressFromEncodedURIComponent('KwDgbATADFBcpgIwE5lA')
  const token = LZString.decompressFromEncodedURIComponent('MwVg7AZgHATAxgRgLQgCwWE1cQFMkCGAbLgEZIAMMRRsYwEAJqaUA')
  const imperUser = LZString.decompressFromEncodedURIComponent('Q')
  const imperToken = LZString.decompressFromEncodedURIComponent('Q')

  tokenIns.set(token || '')
  tokenIns.setMdtUser(mdtUser || '')
  tokenIns.setImperMdtUser(imperUser || '')
  tokenIns.setImperToken(imperToken || '')
}
export class TokenStore {
  @observable token: String | null = ''
  @observable imperToken = ''
  @observable mdtUser = ''
  @observable imperMdtUser = ''

  constructor() {
    //@ts-ignore
    let tk = localStorage.getItem('dm_token_') ? localStorage.getItem('dm_token_') : null
    if (tk) {
      this.token = LZString.decompressFromEncodedURIComponent(tk)
    } else {
      //旧版的取值方式
      this.token = tokenIns.get()
      this.mdtUser = tokenIns.getMdtUser()
      this.imperToken = tokenIns.getImperToken()
      this.imperMdtUser = tokenIns.getImperMdtUser()
    }
  }
}

// @ts-ignore
export const tokenStore = new TokenStore()
