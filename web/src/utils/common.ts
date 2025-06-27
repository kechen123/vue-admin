export const isValueExistsInTree = (tree, key: string, value: string) => {
  if (Array.isArray(tree)) {
    return tree.some((node) => isValueExistsInTree(node, key, value))
  }

  if (tree && typeof tree === 'object') {
    if (tree[key] === value) {
      return true
    }

    if (Array.isArray(tree.children)) {
      return tree.children.some((child) => isValueExistsInTree(child, key, value))
    }
  }

  return false
}

type AnyObject = Record<string, any>
/**
 * 将数组转换为树结构
 * @param data 扁平数组
 * @param idKey 唯一 ID 字段名（默认 "id"）
 * @param parentKey 父级字段名（默认 "parent_id"）
 * @param childrenKey 子节点字段名（默认 "children"）
 * @returns 树形结构数组
 */
export function arrayToTree(
  data: AnyObject[],
  idKey: string = 'id',
  parentKey: string = 'parent_id',
  childrenKey: string = 'children',
): AnyObject[] {
  const result: AnyObject[] = []
  const map = new Map<string, AnyObject>()

  // 创建副本并初始化 map
  data.forEach((item) => {
    const node = { ...item, [childrenKey]: [] }
    map.set(item[idKey], node)
  })

  // 构建树
  data.forEach((item) => {
    const id = item[idKey]
    const parentId = item[parentKey]
    const node = map.get(id)!

    if (parentId && map.has(parentId)) {
      const parent = map.get(parentId)!
      parent[childrenKey].push(node)
    } else {
      result.push(node)
    }
  })
  return result
}
