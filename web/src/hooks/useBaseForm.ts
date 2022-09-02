import { useFetch } from '@vueuse/core'

export default function () {
  const refetch = ref(false)
  const { isFetching, error, data } = useFetch('https://httpbin.org/get', {
    refetch
  }).get()
  const fetch = reactive({
    isFetching,
    error,
    data
  })

  onMounted(async () => {
    refetch.value = true
    fetch['isFetching'] = isFetching.value
    fetch['error'] = error.value
    fetch['data'] = data.value
    console.log('fetch:', fetch)
  })

  onBeforeUnmount(() => {})

  return [fetch]
}
