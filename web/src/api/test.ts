import axios from '@/utils/http/axios'

export const getList = (params: any) => {
  console.log(params)
  return axios.get('/rs/list', { params })
}
