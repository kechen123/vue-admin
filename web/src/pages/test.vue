<script setup lang="ts">
const data = ref()
setTimeout(() => {
	data.value = '111'
}, 3000)
</script>

<template>
	<div>
		{{ data }}
	</div>

</template>
<!-- <route> { meta: { layout: 'custom' } } </route> -->
<style>

</style>
