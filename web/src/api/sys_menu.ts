import axios from '@/utils/http/axios'

export const getMenuList = (params: any) => {
  return axios.get('/rs/sys_menu', { params: { ...params, sort: 'order_num asc' } })
}

export const getMenuTree = (params: any) => {
  return axios.post('/rs/menu', params)
}

export const getMenu = (id: string) => {
  return axios.get(`/rs/sys_menu/${id}`)
}

export const addMenu = (data: any) => {
  return axios.post('/rs/sys_menu', data)
}

export const updateMenu = (id: string, data: any) => {
  return axios.put(`/rs/sys_menu/${id}`, data)
}

export const deleteMenu = (id: string) => {
  return axios.delete(`/rs/sys_menu/${id}`)
}
