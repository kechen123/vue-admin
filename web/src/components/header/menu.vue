<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { iconifyRender } from '@/utils/common/icon'
import { useSystemStore } from '@/store/system'
const systemStore = useSystemStore()
const { state } = storeToRefs(systemStore)
interface Menu {
	key: string
	icon: string
	label: string
}
const menus = reactive<Menu[]>([
	{
		key: '0',
		label: '搜索',
		icon: 'majesticons:search-line'
	},
	{
		key: '1',
		label: '更换主题',
		icon: 'openmoji:sun-with-face'
	},
	{
		key: '2',
		label: '全屏',
		icon: 'mdi:fullscreen'
	},
	{
		key: '3',
		label: '全屏',
		icon: 'mdi:home'
	},
])
const options = ref([
	{
		label: '用户资料',
		key: 'profile',
		icon: iconifyRender('vscode-icons:file-type-config'),
	},
	{
		label: '用户资料',
		key: 'editProfile',
		icon: iconifyRender('vscode-icons:file-type-config'),
	},
	{
		label: '退出登录',
		key: 'logout',
		icon: iconifyRender('vscode-icons:file-type-config'),
	},
])

const userMenuSelect = (key: string | number) => {
	console.log(key)
}
const menuSelect = (item: Menu) => {
	const key = item.key
	if (menuClick.hasOwnProperty(key)) {
		Object.getOwnPropertyDescriptor(menuClick, key)?.value(item)
	}
}
const menuClick = {
	'1': () => {
		systemStore.changeIsDrak()
	}
}
watchEffect(() => {
	if (state.value.isDrak) {
		menus[1].icon = 'openmoji:crescent-moon'
	} else {
		menus[1].icon = 'openmoji:sun-with-face'
	}
})

</script>

<template>
	<div class="flex justify-end h-full">
		<template v-for="item in menus" :key="item.key">
			<n-popover trigger="hover">
				<template #trigger>
					<div
						class="w-11 h-full flex items-center justify-center cursor-pointer hover:bg-[#f6f6f6] dark:hover:bg-[#333]"
						@click="menuSelect(item)">
						<Icon :icon="item.icon" style="font-size: 26px"></Icon>
					</div>
				</template>
				<span>{{item.label}}</span>
			</n-popover>
		</template>

		<div
			class="h-full flex items-center justify-center cursor-pointer hover:bg-[#f6f6f6] dark:hover:bg-[#333]">
			<n-dropdown
				:options="options"
				trigger="click"
				placement="bottom-start"
				@select="userMenuSelect">
				<div class="h-full flex items-center justify-center pl-4 pr-4">
					<n-avatar
						round
						size="small"
						src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
					<span class="pl-2">Admin</span>
				</div>
			</n-dropdown>
		</div>
	</div>
</template>

<style scoped>

</style>
