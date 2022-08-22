//https://juejin.cn/post/7049196967770980389

import { defineStore } from 'pinia'

type Tab = {
  active: string
  list: Array<string>
}

export const useTabsStore = defineStore({
  id: 'tabs', // id必填，且需要唯一
  state: () => {
    return <Tab>{
      active: 'home',
      list: []
    }
  },
  getters: {
    fullName: (state) => {
      return state.active + '丰'
    }
  },
  actions: {
    addTab(name: string) {
      this.active = name
      if (this.list.includes(name)) return
      this.list.push(name)
    },
    setActive(name: string) {
      if (!this.list.includes(name)) return
      this.active = name
    },
    delTab(name: string) {
      if (!this.list.includes(name)) return
      let i = this.list.indexOf(name) - 1
      i = i < 0 ? 0 : i
      console.log(this.list)
      this.list = this.list.filter((item) => item !== name)
      console.log(this.list)
      this.active = this.list[i]
    },
    //异步 action
    async login(account: string, pwd: string) {
      // const { data } = await api.login(account, pwd)
      //this.setData(data) // 调用另一个 action 的方法
      // return data
    },
    setData(data: any) {
      console.log(data)
    }
  }
})
