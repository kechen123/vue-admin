import * as bodyParser from 'koa-body'
export default () => {
  return bodyParser({
    multipart: true,
    formidable: {
      maxFieldsSize: G.CONFIGS.uploadMax * 1024 * 1024,
      multiples: true,
    },
  })
}
