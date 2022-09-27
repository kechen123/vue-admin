<template>
	<n-layout class="h-screen" embedded>
		<n-layout-header bordered>
			<Header />
		</n-layout-header>
		<n-layout position="absolute" style="top: 50px; bottom: 64px" has-sider>
			<n-layout-sider
				bordered
				collapse-mode="width"
				:collapsed-width="state.siderMinWidth"
				:width="state.siderMaxWidth"
				:collapsed="state.collapse"
				@collapse="systemStore.changeCollapse(true)"
				@expand="systemStore.changeCollapse(false)">
				<Suspense>
					<template #default>
						<Menu :collapsed="state.collapse" />
					</template>
					<template #fallback>
						<div>正在加载...</div>
					</template>
				</Suspense>
			</n-layout-sider>
			<n-layout :native-scrollbar="false" class="bg-light-400 dark:bg-dark-400">
				<Tabs />
				<section class="p-6">
					<router-view v-slot="{ Component }">
						<template v-if="Component">
							<Transition name="fade" mode="out-in">
								<keep-alive>
									<Suspense>
										<component :is="Component" :key="$route.fullPath" />
										<template #fallback>
											正在加载...
										</template>
									</Suspense>
								</keep-alive>
							</Transition>
						</template>
					</router-view>
				</section>
			</n-layout>
		</n-layout>
		<n-layout-footer
			position="absolute"
			style="height: 64px; padding: 24px"
			bordered>
			城府路
		</n-layout-footer>
	</n-layout>
</template>
<script lang="ts" setup>
import { useSystemStore } from '@/store/system'
const systemStore = useSystemStore()
const { state } = storeToRefs(systemStore)
</script>
<style>
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
	opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity .15s ease;
}

.fade-enter-active {
	animation: anim 0.3s ease;
}

.fade-leave-active {
	animation: leaveAnim 0.3s ease;
}

@keyframes anim {
	0% {
		transform: translateX(-20px);
	}

	100% {
		transform: translateX(0px);
	}
}

@keyframes leaveAnim {
	0% {
		transform: translateX(0);
	}

	100% {
		transform: translateX(20px);
	}
}
</style>
