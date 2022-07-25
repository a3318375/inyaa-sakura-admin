import { api } from '~/modules/axios'
import type { MenuListType } from '~/store/menu'
import { useMenuStore } from '~/store/menu'

export const sysApi = {
  findMenuList: () => api.get('https://api.inyaw.com/inyaa-admin/permission/findMenuList'),
  getByUrl: (url: string) => api.get(`https://api.inyaw.com/inyaa-admin/${url}`),
  postByUrl: (url: string) => api.post(`https://api.inyaw.com/inyaa-admin/${url}`),
}

export const initSys = async () => {
  const { setMenuList } = useMenuStore()
  const menuList = await sysApi.findMenuList()
  setMenuList(menuList.data as MenuListType[])
}
