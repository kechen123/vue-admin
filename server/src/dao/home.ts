import BaseDao from '../db/baseDao'

const data ={
    totals:[
        {
            name: 'newVisits',
            value: 426425
        },
        {
            name: 'messages',
            value: 25411
        },
        {
            name: 'purchases',
            value: 133511
        },
        {
            name: 'shoppings',
            value: 5123320
        }
    ],
    line:[
        {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
    ],
    radar: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Allocated Budget'
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual Spending'
        }
    ],
    pie:  [
        { value: 40, name: 'rose 1' },
        { value: 38, name: 'rose 2' },
        { value: 32, name: 'rose 3' },
        { value: 30, name: 'rose 4' },
        { value: 28, name: 'rose 5' },
        { value: 26, name: 'rose 6' },
        { value: 22, name: 'rose 7' },
        { value: 18, name: 'rose 8' }
    ],
    bar: [120, 200, 150, 80, 70, 110, 130],
}
export default class Users extends BaseDao {
    constructor(table: string) {
        super(table)
    }
    async create(params = {}, fields = [], session = { userid: '' }): Promise<any> {
        return  G.jsResponse(G.STCODES.SUCCESS, '', { data })
    }
}