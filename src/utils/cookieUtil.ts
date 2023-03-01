/*
 * @Author: Tianxing.Qin
 * @Date: 2021-10-12 16:05:45
 * @LastEditors: Tianxing.Qin
 * @LastEditTime: 2021-10-12 16:05:54
 * @Description:
 */
export const setCookie = (name: string, value: string, domain?: string, path?: string, expires?: string): void => {
  const days: number = 1
  const exp: Date = new Date()
  exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
  let ck = `${name}=${escape(value)};`
  if (domain) {
    ck += `domain=${domain};`
  }
  if (path) {
    ck += `path=${path};`
  }
  ck += `expires=${expires || exp.toUTCString()}`
  document.cookie = ck
}

export const getCookie = (name: string): string | null => {
  const reg: RegExp = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
  // eslint-disable-next-line no-undef
  const arr: RegExpMatchArray | null = document.cookie.match(reg)

  if (arr) {
    return unescape(arr[2])
  }
  return null
}

export const deleteCookie = (name: string, domain: string, path: string): void => {
  const exp = new Date()
  exp.setTime(exp.getTime() - 1)
  const cval = getCookie(name)
  // tslint:disable-next-line: strict-comparisons
  if (cval !== null) {
    let ck = `${name}=;expires=${exp.toUTCString()};`
    if (domain) {
      ck += `domain=${domain};`
    }
    if (path) {
      ck += `path=${path};`
    }
    document.cookie = ck
  }
}
