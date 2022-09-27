<script setup lang="ts">
import { useSystemStore } from '@/store/system'
const systemStore = useSystemStore()
const { state } = storeToRefs(systemStore)
</script>

<template>
	<div class="flex items-center h-full flex-1 overflow-hidden">
		<div class="flex items-center justify-center w-11 h-full  cursor-pointer hover:bg-[#f6f6f6] dark:hover:bg-[#333]"
			@click="systemStore.changeCollapse()">
			<n-icon v-if="state.collapse" size="22">
				<i-mdi:format-indent-increase />
			</n-icon>
			<n-icon v-else size="22">
				<i-mdi:format-indent-decrease />
			</n-icon>
		</div>
		<n-breadcrumb>
			<n-breadcrumb-item>
				<n-icon>
					<i-mdi:account-edit-outline />
				</n-icon>
				<span>北京总行</span>
			</n-breadcrumb-item>
			<n-breadcrumb-item>
				<n-icon>
					<i-mdi:account-edit-outline />
				</n-icon>
				<span>天津分行</span>
			</n-breadcrumb-item>
			<n-breadcrumb-item>
				<n-icon>
					<i-mdi:account-edit-outline />
				</n-icon>
				<span>平山道支行</span>
			</n-breadcrumb-item>
		</n-breadcrumb>
	</div>
</template>

<style scoped>

</style>
