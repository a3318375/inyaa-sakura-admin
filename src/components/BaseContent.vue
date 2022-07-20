<script setup>
const route = useRoute()
const basePath = ref('')
const scrollArea = ref(null)
const thumbStyle = {
  right: '5px',
  borderRadius: '5px',
  backgroundColor: '#616161',
  width: '5px',
}
/**
 * 当组件被 keep-alive 缓存时，切回路由会触发 activated 方法
 * 此时从 sessionStorage 中获取滚动位置
 */
onActivated(() => {
  // console.log(`切换（to）：${this.$route.path}`)
  const t = window.sessionStorage.getItem(route.path)
  if (t) {
    const toPosition = JSON.parse(t)
    scrollToPosition(toPosition.listScrollTop)
  }
})
/**
 * 当组件被 keep-alive 缓存时，切出路由会触发 deactivated 方法
 * 此时 this.BasePath 作为 key ，将滚动位置保存的 sessionStorage 中
 */
onDeactivated(() => {
  // console.log(`切换（from）：${this.BasePath}`)
  window.sessionStorage.setItem(basePath.value, JSON.stringify({ listScrollTop: scrollArea.value.getScrollPosition() }))
})
/**
 * 如果组件被关闭，则清除对应的 sessionStorage
 */
onUnmounted(() => {
  sessionStorage.removeItem(basePath)
})
onMounted(() => {
  basePath.value = route.path

  // 确保每个 BaseContent 有唯一的 BasePath
  Object.freeze(basePath.value)

  // console.log(`创建：${this.BasePath}`)

  // 如果页面被刷新，则从 sessionStorage 读取当前页面的滚动位置，
  // 可以打开浏览器窗口，看看 sessionStorage 有啥
  const t = window.sessionStorage.getItem(route.path)
  if (t) {
    const toPosition = JSON.parse(t)
    scrollToPosition(toPosition.listScrollTop)
  }
})
function scrollToPosition(listScrollTop) {
  scrollArea.value.setScrollPosition('vertical', listScrollTop.top)
  scrollArea.value.setScrollPosition('horizontal', listScrollTop.left)
}

function onScrollFirst({ verticalPosition }) {
  scrollArea.value.setScrollPosition('vertical', verticalPosition)
}
</script>

<template>
  <div class="main-content">
    <q-scroll-area
      ref="scrollArea"
      visible
      :thumb-style="thumbStyle"
      style="height: calc(100vh - 89px)"
      @scroll="onScrollFirst"
    >
      <slot />
    </q-scroll-area>
  </div>
</template>
