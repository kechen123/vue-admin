import { ElTableColumn, ElTag, ElSwitch } from 'element-plus'
import 'element-plus/es/components/table-column/style/css'
import 'element-plus/es/components/tag/style/css'
import 'element-plus/es/components/switch/style/css'

export default defineComponent({
  props: {
    column: {
      type: Object,
      required: true,
    },
  },
  setup(props, { slots }) {
    const renderCell = (item: any, scope: any) => {
      // 1. 优先检查是否有对应prop的插槽
      if (item.prop && slots[item.prop]) {
        return slots[item.prop]!(scope)
      }

      if (item.type === 'text') {
        if (item.formatter) {
          return item.formatter(scope.row, props.column, scope.row[item.prop], scope.$index)
        }
        return scope.row[props.column.prop]
      }
      if (item.type === 'tag') {
        return <ElTag type={item.tagType || 'primary'}>{scope.row[props.column.prop]}</ElTag>
      }
      if (item.type === 'switch') {
        return (
          <ElSwitch
            v-model={scope.row[props.column.prop]}
            active-color={item.activeColor || '#13ce66'}
            inactive-color={item.inactiveColor || '#ff4949'}
            active-text={item.activeText}
            inactive-text={item.inactiveText}
          />
        )
      }
    }

    return () =>
      props.column.show && (
        <ElTableColumn
          {...props.column}
          v-slots={{
            default: (scope: any) => renderCell(props.column, scope),
            header: () => props.column.headerRender?.() || props.column.label,
          }}
        />
      )
  },
})
