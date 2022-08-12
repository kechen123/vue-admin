import * as jwt from 'jsonwebtoken'
import BaseDao from '../db/baseDao'

const config = G.CONFIGS.jwt
const AUTHURL = ['rs']

export default () => {
  return async (ctx, next) => {
    const {
      header: { token },
    } = ctx
    let urlStrs = ctx && ctx.url && ctx.url.split('/')
    let isAuth: boolean = AUTHURL.some((url) => {
      return urlStrs[1] === url
    })
    if (token) {
      try {
        const decoded = jwt.verify(token, config.secret)
        ctx.session = decoded
        await next()
      } catch (err) {
        //所有接口必须登录
        if (!isAuth) {
          return await next()
        }
        // if (ctx.method === 'GET' || !isAuth) {
        //   return await next()
        // }
        if ((err as Error).name === 'TokenExpiredError') {
          ctx.body = G.jsResponse(G.STCODES.JWTAUTHERR, 'Token Expired.')
        } else if ((err as Error).name === 'JsonWebTokenError') {
          ctx.body = G.jsResponse(G.STCODES.JWTAUTHERR, 'Invalid Token.')
        } else {
          ctx.body = G.jsResponse(G.STCODES.JWTAUTHERR, (err as Error).message)
        }
      }
    } else {
      if (ctx.method !== 'GET' && isAuth) {
        ctx.body = G.jsResponse(G.STCODES.JWTAUTHERR, 'Missing Auth Token.')
      } else {
        await next()
      }
    }
  }
}
