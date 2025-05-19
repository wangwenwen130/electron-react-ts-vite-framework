declare module Request {
  export interface Response<T = unknown> {
    /** 状态码 */
    meta: {
      code?: 200 | number
      message: string
      moreInfo?: any
    }
    /** 数据 */
    data: T
  }
}
