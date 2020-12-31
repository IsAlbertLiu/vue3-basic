import { onMounted, onUnmounted, ref } from 'vue'

function useMousePosition () {
  const x = ref()
  const y = ref()
  const getMousePosition = (e: MouseEvent) => {
    x.value = e.pageX
    y.value = e.pageY
  }
  onMounted(() => {
    document.addEventListener('click', getMousePosition)
  })
  onUnmounted(() => {
    document.removeEventListener('click', getMousePosition)
  })
  return { x, y }
}

export default useMousePosition
