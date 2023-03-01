import * as LZString from 'lz-string'
import { parseDomain, ParseResultType } from 'parse-domain'

import { getCookie, setCookie } from './cookieUtil'
// import { emitObj } from './eventEmit';

// export const TOKEN_SET_EVENT = 'TOKEN_SET_EVENT';
/**
 * 获取domain主域名
 */
function getDomainName(hostName: string): string {
  // const hostName = host.split(':')[0];
  const parseResult = parseDomain(
    // This should be a string with basic latin characters only.
    // More information below.
    hostName
  )
  if (parseResult.type === ParseResultType.Listed) {
    const { domain: dm, topLevelDomains } = parseResult
    return [dm].concat(topLevelDomains).join('.')
  }
  if (hostName.indexOf('localhost') !== -1) {
    return 'localhost'
  }
  return ''
}

const domain = window.location && window.location.host && getDomainName(window.location.host)

const DM_TOKEN = '__DM_TOKEN__' // 当前用户token | 被模拟用户
const DM_IMPER_TOKEN = '__DM_IMPER_TOKEN__' // 当前模拟操作用户token
const DM_MDT_USER = '__DM_MDT_USER__' // 当前用户mdt-user： '$user_id:$app_id' | 被模拟用户
const DM_IMPER_MDT_USER = '__DM_IMPER_MDT_USER__' // 当前模拟操作用户mdt-user: '$user_id:$app_id'

const parseFromCookie = (key: string) => {
  const cookieToken = getCookie(key)
  const p12Asn1 = cookieToken ? LZString.decompressFromEncodedURIComponent(cookieToken) : ''
  return p12Asn1
}

const setToCookie = (key: string, val: string) => {
  const days: number = 1
  const exp: Date = new Date()
  exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
  const p12Asn1 = LZString.compressToEncodedURIComponent(val)
  setCookie(key, p12Asn1, domain, '/', exp.toUTCString())
}

/**
 * Token
 */
export class Token {
  private path: string = ''
  private token: string = ''
  private imperToken: string = ''
  private mdtUser: string = ''
  private imperMdtUser: string = ''

  public constructor(path: string = '') {
    this.setPath(path)
  }

  /**
   * Sets path
   * @param path string
   */
  public setPath(path: string): void {
    this.path = path
    this.token = parseFromCookie(DM_TOKEN + this.path) || ''
    this.imperToken = parseFromCookie(DM_IMPER_TOKEN + this.path) || ''
    this.mdtUser = parseFromCookie(DM_MDT_USER + this.path) || ''
    this.imperMdtUser = parseFromCookie(DM_IMPER_MDT_USER + this.path) || ''
  }

  /**
   * Gets token
   * @returns get
   */
  public get(): string {
    return this.token
  }

  /**
   * Gets impersonate token
   * @returns impersonate token
   */
  public getImperToken(): string {
    return this.imperToken
  }

  /**
   * Gets mdt user
   * @returns mdt user
   */
  public getMdtUser(): string {
    return this.mdtUser
  }

  /**
   * Gets impersonate mdt user
   * @returns impersonate mdt user
   */
  public getImperMdtUser(): string {
    return this.imperMdtUser
  }

  /**
   * Sets token
   * @param token string
   * @param [saveCookie] boolean
   */
  public set(token: string, saveCookie: boolean = true): void {
    this.token = token
    if (saveCookie) {
      setToCookie(DM_TOKEN + this.path, token)
    }
    // emitObj.emit(TOKEN_SET_EVENT, this.token);
  }

  /**
   * Sets token
   * @param token string
   * @param [saveCookie] boolean
   */
  public setImperToken(token: string, saveCookie: boolean = true): void {
    this.imperToken = token
    if (saveCookie) {
      setToCookie(DM_IMPER_TOKEN + this.path, token)
    }
  }

  /**
   * Sets mdt user
   * @param mdtUser string
   */
  public setMdtUser(mdtUser: string): void {
    this.mdtUser = mdtUser
    setToCookie(DM_MDT_USER + this.path, mdtUser)
  }

  /**
   * Sets mdt user
   * @param mdtUser string
   */
  public setImperMdtUser(mdtUser: string): void {
    this.imperMdtUser = mdtUser
    setToCookie(DM_IMPER_MDT_USER + this.path, mdtUser)
  }

  /**
   * get headers
   */
  public getHeaders(): {
    'X-Impersonate-Token'?: string
    'Mdt-User'?: string
    Authorization?: string
  } {
    const headers: {
      'X-Impersonate-Token'?: string
      'Mdt-User'?: string
      Authorization?: string
    } = {}
    if (this.token) {
      headers.Authorization = this.token
    }
    if (this.mdtUser) {
      headers['Mdt-User'] = this.mdtUser
    }
    if (this.imperToken) {
      headers['X-Impersonate-Token'] = this.imperToken
    }
    return headers
  }

  /**
   * Logouts token
   */
  public logout(): void {
    this.set('')
    this.setImperToken('')
    this.setMdtUser('')
    this.setImperMdtUser('')
  }

  /**
   * Logouts mock
   */
  public logoutMock(): void {
    this.set(this.imperToken)
    this.setImperToken('')
    this.setMdtUser(this.imperMdtUser)
    this.setImperMdtUser('')
  }
}

export const tokenIns = new Token()
