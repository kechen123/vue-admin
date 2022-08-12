import BaseDao from '../db/baseDao'

export default class Users extends BaseDao {
  constructor(table: string) {
    super(table)
  }
  async retrieve(params, fields = [], session = { userid: '' }): Promise<any> {
    let { id } = params
    if (!id) return G.jsResponse(G.STCODES.PARAMERR)
    let user = await new BaseDao('users').retrieve({ id, sort: 'id desc', page: 1, size: 1 })
    if (user.status === G.STCODES.SUCCESS) {
      let u = user.data[0]
      return G.jsResponse(G.STCODES.SUCCESS, '', { data: u })
    } else {
      return G.jsResponse(G.STCODES.AUTHORIZATIONERR)
    }
  }
  async create(params, fields = [], session = { userid: '' }): Promise<any> {
    return G.jsResponse(G.STCODES.NOTFOUNDERR, 'the url you request is not found.')
  }
  async update(params, fields = [], session = { userid: '' }): Promise<any> {
    return G.jsResponse(G.STCODES.NOTFOUNDERR, 'the url you request is not found.')
  }
  async delete(params, fields = [], session = { userid: '' }): Promise<any> {
    return G.jsResponse(G.STCODES.NOTFOUNDERR, 'the url you request is not found.')
  }
}
