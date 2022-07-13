import { api } from '~/modules/axios'
import type { MenuListType } from '~/store/menu'
import { useMenuStore } from '~/store/menu'

export const sysApi = {
  findMenuList: () => api.get('https://api.inyaw.com/inyaa-admin/permission/findMenuList'),
}

export const initSys = async () => {
  const { setMenuList } = useMenuStore()
  const menuList = await sysApi.findMenuList()
  console.log(1111, menuList.data)
  setMenuList(menuList.data as MenuListType[])
}
