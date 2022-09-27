import { defineStore } from 'pinia'

interface State {
	collapse: boolean
	siderMinWidth:number
	siderMaxWidth:number
	isDrak: boolean
}

export const useSystemStore = defineStore('system', () => {
	const { isDark, toggleDark } = useDarks()
	const state = reactive<State>({
		collapse: false,
		siderMinWidth:64,
		siderMaxWidth:240,
		isDrak: isDark.value,
	})

	const changeCollapse = (val?:boolean)=>{
		state.collapse=val??!state.collapse
	}

	const changeIsDrak = ()=>{
		toggleDark()
		state.isDrak
	}

	watch(()=>isDark.value,(val)=>{
		state.isDrak = val
	})

	return { state,changeCollapse,changeIsDrak }
})

//use

// import { storeToRefs } from 'pinia'
// import { useMainStore } from '@/store/index'

// // hooks一样来使用
// const useMainStore = useMainStore()
// const { count, increment } = storeToRefs(useMainStore)
