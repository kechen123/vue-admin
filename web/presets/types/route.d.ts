declare namespace AuthRoute {
	interface Route{
		id:string
		name:string
		path?:string
		disabled?:boolean
		/** 路由重定向 */
		redirect?: /*unresolved*/ any;
		/** 子路由 */
		children?: Route[];
		icon:string
	}
}
