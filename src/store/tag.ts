import { defineStore } from 'pinia'
import type { RouteLocationNormalized, RouteRecordName } from 'vue-router'

export interface TagListType {
  fullPath: string
  name?: RouteRecordName | unknown
  title?: string | unknown
  icon?: string | unknown
  keepAlive?: boolean | unknown
}

export const useTagStore = defineStore('tag', () => {
  /**
   * Current named of the user.
   */
  const tagList: TagListType[] = reactive([])
  function setTagList(tagList: TagListType[]) {
    tagList.length = 0
    tagList.forEach((item) => {
      tagList.push(item)
    })
  }

  /**
   * 移除 tagView
   * case 'undefined' : 移除所有 tagView
   * case 'object' : 移除某一侧 tagView
   * default '要删除元素的下标 i ' : 移除某一个 tagView
   *          如果移除的是第一个 tagView，则跳转到当前的第一个 tagView
   *          如果移除的是最后一个 tagView，则跳转到当前的最后一个 tagView
   * @constructor
   * @param params
   */
  function removeTagView(params?: any) {
    switch (typeof params) {
      case 'undefined':
        tagList.length = 0
        router.push('/')
        break
      case 'object':
        removeOneSide(params)
        break
      default:
        removeATagView(params)
    }
  }

  function removeOneSide(params: { side: string; index: number }) {
    switch (params.side) {
      case 'right':
        tagList = tagList.slice(0, params.index + 1)
        // if (tagList.length === 1)
        //   router.push(tagList[0].fullPath)
        //
        // if (tagList.length === params.index + 1)
        //   router.push(tagList[params.index].fullPath)

        break
      case 'left':
        tagList = tagList.slice(params.index, tagList.length)
        // if (tagList.length === 1)
        //   router.push(tagList[0].fullPath)
        //
        // if (tagList.length <= params.index)
        //   router.push(tagList[0].fullPath)

        break
      case 'others':
        tagList = tagList.splice(params.index, 1)
        // router.push(tagList[0].fullPath)
        break
      default:
        break
    }
  }

  function removeATagView(params: number) {
    tagList.splice(params, 1)
    // 如果移除后， tagView 为空
    if (tagList.length === 0)
      window.sessionStorage.setItem('tagView', '[]')
  }

  function addTagView(to: RouteLocationNormalized) {
    const tagObj = {
      fullPath: to.fullPath,
      name: to.name,
      title: to.meta.title,
      icon: to.meta.icon,
      keepAlive: to.meta.keepAlive || false,
    }
    const size = tagList.length
    // 首次进入或刷新页面时，当前路由不是根路由
    if (!size && tagObj.fullPath !== '/') {
      tagList.push(tagObj)
      return
    }
    // 为了避免 tagView 重复添加。 构建一个以 fullPath 为标识的数组 t[]
    const t = []
    for (let i = 0; i < size; i++)
      t.push(tagList[i].fullPath)

    if (!t.includes(tagObj.fullPath))
      tagList.push(tagObj)
  }

  return {
    tagList,
    setTagList,
    addTagView,
    removeTagView,
  }
})
