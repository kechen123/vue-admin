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
