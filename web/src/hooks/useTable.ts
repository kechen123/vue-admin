import axios from '@/utils/http/axios'

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>> // 使某些属性可选

export interface TableType {
  id: string
  name: string
  type: string
  email: string
  status: string
  address: string
  age: number
  create_user: string
  update_time: string
  create_time: string
}

export type TableDataType = TableType & {
  type_id: string
  status_id: string
  type_name: string
  user_status: string
}

export interface Pagination {
  page: number
  size: number
  total: number
}

export interface Search {
  name: string
  type: string
  status: string
  create_time: string[]
}

export interface Option {
  value: string
  label: string
}

export type Form = Optional<TableType, 'id' | 'create_user' | 'create_time' | 'update_time'>

export function useTable(
  tableData: Ref<TableDataType[]>,
  typeList: Ref<Option[]>,
  statusList: Ref<Option[]>,
  pagination: Pagination
) {
  const getPageData = (search?: Search) => {
    let params: any = {
      page: pagination.page,
      size: pagination.size
    }
    if (search) {
      params.page = 1
      if (search.name) {
        params = Object.assign(params, { name: search.name })
      }
      if (search.type) {
        params['type_id'] = search.type
      }
      if (search.status) {
        params['status_id'] = search.status
      }
      if (search.create_time.length > 0) {
        params['create_time'] = `>=,${search.create_time[0]},<=,${search.create_time[1]}`
      }
    }
    axios.get('/rs/table_list', { params }).then((res: any) => {
      if (res.status === 200) {
        tableData.value = res.data
        pagination.total = Number(res.records)
      } else {
        console.log('error /rs/table!')
      }
    })
  }
  const getTypeList = () => {
    axios.get('/rs/user_type').then((res: any) => {
      if (res.status === 200) {
        typeList.value = res.data.map((item: any) => {
          return {
            value: item.id,
            label: item.name
          }
        })
      } else {
        console.log('error /rs/type_list!')
      }
    })
  }

  const getStatusList = () => {
    axios.get('/rs/user_status').then((res: any) => {
      if (res.status === 200) {
        statusList.value = res.data.map((item: any) => {
          return {
            value: item.id,
            label: item.status
          }
        })
      } else {
        console.log('error /rs/status_list!')
      }
    })
  }

  const addTableData = async (row: Form) => {
    const res = await axios.post('/rs/table', row)
    if (res.status === 200) {
      return true
    }
    return false
  }

  const editTableData = async (id: string, row: Form) => {
    const res = await axios.put('/rs/table/' + id, row)
    if (res.status === 200) {
      return true
    }
    return false
  }

  const deleteTableData = async (id: string) => {
    const res = await axios.delete('/rs/table/' + id)
    if (res.status === 200) {
      return true
    }
    return false
  }

  const deleteTableByIds = async (ids: string) => {
    const res = await axios.delete('/rs/table_update', { params:{ id:ids } })
    if (res.status === 200) {
      return true
    }
    return false
  }

  return {
    tableData,
    getPageData,
    getTypeList,
    getStatusList,
    addTableData,
    editTableData,
    deleteTableData,
    deleteTableByIds
  }
}

export function usePagination(getPageData: (search?: Search) => void, pagination: Pagination) {
  const pageSizes = [10, 20, 30, 40]
  const currentChange = (val: number) => {
    pagination.page = val
    getPageData()
  }

  const handleSizeChange = (val: number) => {
    pagination.size = val
    getPageData()
  }

  return {
    pageSizes,
    currentChange,
    handleSizeChange
  }
}

export function useSearch() {
  const searchData = reactive<Search>({
    name: '',
    type: '',
    status: '',
    create_time: []
  })

  return {
    searchData
  }
}
