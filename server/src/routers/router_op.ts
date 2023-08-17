import * as Router from 'koa-router'
import * as jwt from 'jsonwebtoken'
import BaseDao from '../db/baseDao'
import AuthDao from '../dao/auth'
import * as fs from 'fs'
import * as path from 'path'
import * as moment from 'moment'
import * as fetch from 'node-fetch'

let router = new Router()
const config = G.CONFIGS.jwt




export default (() => {
  let process = async (ctx, next) => {
    let { command } = ctx.params
    switch (command) {
      case 'login':
        let UserRs = await new BaseDao('users').retrieve({ username: ctx.request.body.username, password: ctx.request.body.password })
        if (UserRs.status === G.STCODES.SUCCESS) {
          let user = UserRs.data[0]
          let ars = await new AuthDao('').create({ id: user.id })
          if(ars.status === G.STCODES.SUCCESS) {
            let roles = ars.data
            let token = jwt.sign(
              {
                userid: user.id,
                username: user.username,
              },
              config.secret,
              {
                expiresIn: config.expires_max,
              }
            )
            ctx.body = G.jsResponse(G.STCODES.SUCCESS, 'login success.', { token, u_id: user.id, u_name: user.username,roles })
          }else {
            ctx.body = G.jsResponse(G.STCODES.QUERYEMPTY, 'The AuthDao is missing.')
          }
        } else {
          ctx.body = G.jsResponse(G.STCODES.QUERYEMPTY, 'The user is missing.')
        }
        break
      case 'upload':
        try {
          let files = ctx.request.files
          if (files) {
            files = [].concat(Object.values(files)[0])
            return (ctx.body = uploadFilePublic(files))
          } else {
            return (ctx.body = G.jsResponse(G.STCODES.UPLOADERR, 'file upload fail. no file found.'))
          }
        } catch (err) {
          return (ctx.body = G.jsResponse(G.STCODES.EXCEPTIONERR, 'file upload fail. error: ' + err))
        }
      case 'fetch':
        const res = await fetch(ctx.request.body.url)
        const data = await res.json()
        ctx.body = data
        break
      default:
        ctx.body = G.jsResponse(G.STCODES.NOTFOUNDERR, 'command is not found.')
        break
    }
  }
  return router.post('/op/:command', process)
})()
const uploadFilePublic = function (files) {
  const filePath = path.join(G.ROOT_PATH, '/public', G.CONFIGS.uploaDir)

  const fileFunc = function (file) {
    let fileReader = fs.createReadStream(file.filepath)
    file.newName = `${moment().format('YYYYMMDD')}_${G.tools.uuid()}.${file.originalFilename.split('.')[1]}`
    let fileResource = filePath + `/${file.newName}`
    let writeStream = fs.createWriteStream(fileResource)
    fileReader.pipe(writeStream)
  }
  const returnFunc = function () {
    let url = '',
      oldName = ''
    for (let i = 0; i < files.length; i++) {
      url += `${G.CONFIGS.uploaDir}/${files[i].newName},`
      oldName += `${files[i].originalFilename},`
    }
    url = url.replace(/,$/gi, '')
    oldName = oldName.replace(/,$/gi, '')
    return G.jsResponse(G.STCODES.SUCCESS, 'file upload success', { url, oldName })
  }
  for (let i = 0; i < files.length; i++) {
    const f1 = files[i]
    fileFunc(f1)
  }

  if (!fs.existsSync(filePath)) {
    fs.mkdir(filePath, (err) => {
      if (err) {
        throw new Error(err.message)
      } else {
        return returnFunc()
      }
    })
  } else {
    return returnFunc()
  }
}
