import { api } from '~/modules/axios'

export const blogApi = {
  findTypeList: () => api.get('https://api.inyaw.com/inyaa-admin/type/list'),
  findTagList: () => api.get('https://api.inyaw.com/inyaa-admin/tag/list'),
  findBlogListPage: (props: BlogParams) => api.get('https://api.inyaw.com/inyaa-admin/blog/list/page', { params: props }),
  getBlogInfo: (props: BlogParams) => api.get('https://api.inyaw.com/inyaa-admin/blog/info', { params: props }),
  saveBlog: (props: BlogInfo) => api.post('https://api.inyaw.com/inyaa-admin/blog/save', props),
  delBlog: (props: BlogInfo) => api.post('https://api.inyaw.com/inyaa-admin/blog/delete', props),
}

export interface BlogParams {
  page: number
  size: number
  id: number
}
export interface BlogInfo {
  id: number
  title: string
  summary: string
  type: any
  tagList: any
  article: any
  status: boolean
  isHot: boolean
  isComment: boolean
}
