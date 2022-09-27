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
				routePath: path,
			},
			icon: icon,
			children: menuChildren,
		})

		globalMenu.push(menuItem)
	})

	return globalMenu
}
