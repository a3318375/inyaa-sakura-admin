import { LoadingBar } from 'quasar'
import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import { router } from './routes'

import './styles/main.css'
import './styles/cimo.css'

const head = createHead()
const app = createApp(App)
const modules = import.meta.globEager('/src/modules/*.ts')
// install all modules under `modules/`
Object.values(modules).forEach(module => module.install?.(app))
app.use(router)
app.use(head)
app.mount('#app')

router.afterEach(() => {
  LoadingBar.stop()
})
const { addTagView } = useTagStore()
router.beforeEach(async (to, from, next) => {
  LoadingBar.start()
  if (to.fullPath !== '/')
    addTagView(to)
  next()
})

