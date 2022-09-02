// 文本输入 数字输入 下拉选择 时间  时间范围
export type Type = 'inputText' | 'custom' | 'select' | 'dateTime' | 'dataTime2'

export interface Search {
  id: string
  label: string
  type: Type
  placeholder?: string
  option?: string | Array<any>
  slot?: string
}
