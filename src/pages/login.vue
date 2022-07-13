<script setup lang="ts">
import { sysApi } from '~/api/sys'
import type { MenuListType } from '~/store/menu'
import { useMenuStore } from '~/store/menu'
const route = useRoute()
const router = useRouter()
const code = route.query.code
const { setMenuList } = useMenuStore()
if (code) {
  window.localStorage.setItem('TOKEN_KEY', code)
  const redirect = route.query.redirect
  if (redirect)
    router.push(redirect)

  else
    router.push('/')

  const menuList = await sysApi.findMenuList()
  console.log(1111, menuList.data)
  setMenuList(menuList.data as MenuListType[])
}
</script>

<template>
  <h1>欢迎登录</h1>
</template>

<route lang="yaml">
meta:
  layout: quasar
</route>
