<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { MenuInst } from 'naive-ui'
import type { RouteLocationRaw } from 'vue-router'
import { useMenuStore } from '@/store/router'
import { useTabsStore } from '@/store/tabs'

defineProps<{
	collapsed: boolean
}>()
const menuStore = useMenuStore()
const tabsStore = useTabsStore()
const router = useRouter()
const menuInstRef = ref<MenuInst | null>(null)
const { active } = storeToRefs(tabsStore)

const handleUpdateValue = (key: string, item: MenuOption) => {
	const { routePath, routeName } = item
	tabsStore.addTab({
		name: routeName as string,
		path: routePath as string,
		key,
	})

	router.push(routePath as RouteLocationRaw)
}
// @ts-ignore
const menu = ref<GlobalMenuOption[]>(menuStore.state.menus)

</script>

<template>
	<n-menu
		v-model:value="active.key"
		:collapsed="collapsed"
		:collapsed-width="64"
		:collapsed-icon-size="22"
		:options="menu"
		ref="menuInstRef"
		@update:value="handleUpdateValue" />
</template>

<style scoped>

</style>
