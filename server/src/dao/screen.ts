import BaseDao from '../db/baseDao'

export default class Users extends BaseDao {
  constructor(table: string) {
    super(table)
  }
  async retrieve(params = {}, fields = [], session = { userid: '' }): Promise<any> {
    const { userid } = session
    if (!userid) return G.jsResponse(G.STCODES.AUTHORIZATIONERR)

    return await new BaseDao('screen').retrieve({ ...params, ins: ['user_id', userid, '1'] })
  }

  async create(params = {}, fields = [], session = { userid: '' }): Promise<any> {
    const { userid } = session
    if (!userid) return G.jsResponse(G.STCODES.AUTHORIZATIONERR)
    const p = { ...params, user_id: userid }
    return await super.create(p, fields, session)
  }
}
