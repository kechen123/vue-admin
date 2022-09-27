<script setup lang="ts">
const { isDark, toggleDark } = useDarks()

const { t, toggleLocale, language } = useLanguage()

const theme = computed(() => (isDark.value ? 'dark' : 'light'))
</script>

<template>
	<div>
		<div class="m-6">Hello，This is the tov template！！</div>
		<div class="cursor-pointer m-6" @click="toggleDark()">theme: {{ theme }}</div>
		<div class="cursor-pointer mt-6 ml-6" @click="toggleLocale()">
			<div>language: {{ language }}</div>
			<div>base: {{ t('about') }}</div>
			<div>nesting: {{ t('nesting.sir') }} {{ t('nesting.lady') }}</div>
		</div>
	</div>
</template>
<!-- 添加自定义块 👇 -->
<!-- <route> { meta: { layout: 'custom' } } </route> -->
