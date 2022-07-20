import { defineStore } from 'pinia'
import routes from '~pages'

export const useKeepAliveStore = defineStore('keepAliveList', () => {
  /**
   * Current named of the user.
   */
  const keepAliveList: string[] = reactive([])
  routes.forEach((item) => {
    if (item.meta && item.name && item.meta.keepAlive)
      keepAliveList.push(<string>item.name)
  })

  return {
    keepAliveList,
  }
})
