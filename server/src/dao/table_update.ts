import BaseDao from '../db/baseDao';

export default class Users extends BaseDao {
  constructor(table: string) {
    super(table);
  }
  async retrieve(params, fields = [], session = { userid: '' }): Promise<any> {
    return G.jsResponse(
      G.STCODES.NOTFOUNDERR,
      'the url you request is not found.'
    );
  }
  async create(params, fields = [], session = { userid: '' }): Promise<any> {
    // let vs = [
    //   { id: 'qqqwww', name: '洋洋', age: 25 },
    //   { id: 'aaasss', name: '咳咳', age: 28 }
    // ];
    // return await super.insertBatch('table', vs);
    return G.jsResponse(
      G.STCODES.NOTFOUNDERR,
      'the url you request is not found.'
    );
  }
  async update(params, fields = [], session = { userid: '' }): Promise<any> {
    return G.jsResponse(
      G.STCODES.NOTFOUNDERR,
      'the url you request is not found.'
    );
  }
  async delete(params, fields = [], session = { userid: '' }): Promise<any> {
    const {id} = params
    if(!id) return G.jsResponse(G.STCODES.PARAMERR, '参数错误')
    const trs = id.split(',').map(id=>{
      return {
        table: 'table',
        method: 'Delete',
        params: {
          id: id,
        }
      }
    })
    return await new BaseDao().transGo(trs, true)          //true，异步执行；false,同步执行
  }
}
