import { defineStore } from 'pinia'
import routes from '~pages'

export interface MenuListType {
  name: string
  path: string
  icon: string
  type: number
}

export const useMenuStore = defineStore('menu', () => {
  /**
   * Current named of the user.
   */
  const menuList: MenuListType[] = reactive([])
  routes.forEach((item) => {
    const menuBean = {} as MenuListType
    menuBean.name = item.name as string
    menuBean.path = item.path
    menuBean.icon = ''
    menuBean.type = 1
    menuList.push(menuBean)
  })

  function setMenuList(menuDataList: MenuListType[]) {
    menuList.length = 0
    menuDataList.forEach((item) => {
      menuList.push(item)
    })
  }

  return {
    menuList,
    setMenuList,
  }
})
