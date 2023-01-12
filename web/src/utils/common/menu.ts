import { iconifyRender } from './icon'

/** 给菜单添加可选属性 */
function addPartialProps(config: {
  menu: GlobalMenuOption
  icon?: string
  children?: GlobalMenuOption[]
}) {
  const item = { ...config.menu }
  if (config.icon) {
    Object.assign(item, { icon: iconifyRender(config.icon) })
  }

  if (config.children) {
    Object.assign(item, { children: config.children })
  }
  return item
}

/**
 * 将权限路由转换成菜单
 * @param routes - 路由
 */
export function transformAuthRouteToMenu(
  routes: AuthRoute.Route[]
): GlobalMenuOption[] {
  const globalMenu: GlobalMenuOption[] = []
  routes.forEach((route) => {
    const { id, name, path, icon } = route

    const routeName = name as string
    let menuChildren: GlobalMenuOption[] | undefined
    if (route.children) {
      menuChildren = transformAuthRouteToMenu(route.children)
    }
    const menuItem: GlobalMenuOption = addPartialProps({
      menu: {
        key: id,
        label: routeName,
        routeName,
        routePath: path
      },
      icon: icon,
      children: menuChildren
    })

    globalMenu.push(menuItem)
  })

  return globalMenu
}

export const getMenus = (mens: AuthRoute.Route[], curKey: string) => {
  let result: AuthRoute.Route[] = [] // 记录路径结果
  let traverse = (
    curKey: string,
    path: Array<any>,
    mens: AuthRoute.Route[]
  ) => {
    if (mens.length === 0) {
      return
    }
    for (let item of mens) {
      path.push(item)
      if (item.path === curKey) {
        result = JSON.parse(JSON.stringify(path))
        return
      }
      const children = Array.isArray(item.children) ? item.children : []
      traverse(curKey, path, children) // 遍历
      path.pop() // 回溯
    }
  }
  traverse(curKey, [], mens)
  return result
}
