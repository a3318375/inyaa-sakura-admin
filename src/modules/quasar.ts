// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// Import Quasar css
import 'quasar/src/css/index.sass'
import { LoadingBar, LocalStorage, Notify, Quasar } from 'quasar'
import Plugin from '@quasar/quasar-ui-qmarkdown'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'

const config = {
  plugins: { Notify, LocalStorage, LoadingBar }, // import Quasar plugins and add here
  config: {
    loadingBar: {
      color: 'light-blue-4',
      size: '4px',
      position: 'top',
    },
  },
}

export const install = (app: any) => {
  app.use(Quasar, config)
  app.use(Plugin)
}
