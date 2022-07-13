import { api } from '~/modules/axios'

export const blogApi = {
  findTypeList: () => api.get('https://api.inyaw.com/inyaa-admin/type/list'),
  findTagList: () => api.get('https://api.inyaw.com/inyaa-admin/tag/list'),
}
