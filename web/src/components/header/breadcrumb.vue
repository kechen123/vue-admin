

<template>
	<div class="flex items-center h-full flex-1 overflow-hidden">
		<div class="flex items-center justify-center w-11 h-full  cursor-pointer hover:bg-[#f6f6f6] dark:hover:bg-[#333]"
			@click="systemStore.changeCollapse()">
			<n-icon v-if="state.collapse" size="22">
				<i-system-uicons:expand-width />
			</n-icon>
			<n-icon v-else size="22">
				<i-system-uicons:expand-width />
			</n-icon>
		</div>
		<n-breadcrumb>
			<n-breadcrumb-item v-for="item in menuStore.state.breadcrumb" :key="item.id">
				<n-icon>
					<Icon :icon="item.icon" style="font-size: 18px"></Icon>
				</n-icon>
				<span style="margin-left:2px;">{{ item.name }}</span>
			</n-breadcrumb-item>

		</n-breadcrumb>
	</div>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useMenuStore } from '@/store/router'
import { useSystemStore } from '@/store/system'
const menuStore = useMenuStore()
const systemStore = useSystemStore()
const { state } = storeToRefs(systemStore)

</script>
<style scoped>

</style>
