<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import type { RouteLocationRaw } from 'vue-router'
import { useMenuStore } from '@/store/router'
import { useTabsStore } from '@/store/tabs'

defineProps<{
	collapsed: boolean
}>()
const menuStore = useMenuStore()
const tabsStore = useTabsStore()
const router = useRouter()

const handleUpdateValue = (key: string, item: MenuOption) => {
	const { routePath, routeName } = item
	tabsStore.addTab({
		name: routeName as string,
		path: routePath as string
	})
	router.push(routePath as RouteLocationRaw)
}
// @ts-ignore
const menu = ref<GlobalMenuOption[]>(menuStore.state.menus)
</script>

<template>
	<n-menu
		:collapsed="collapsed"
		:collapsed-width="64"
		:collapsed-icon-size="22"
		:options="menu"
		@update:value="handleUpdateValue" />
</template>

<style scoped>

</style>
