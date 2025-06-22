export interface ColumnProps {
  prop?: string
  label: string
  align?: string
  width?: string | number
  show?: boolean
  type?: 'text' | 'tag' | 'switch' | 'image' | 'slot'
  options?: { value: any; label: string; tagType?: string }[]
  formatter?: (row: any, column: any, cellValue: any, index: number) => any
  showOverflowTooltip?: boolean
  children?: ColumnProps[]
  [key: string]: any
}
