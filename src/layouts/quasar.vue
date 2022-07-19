<script setup>
import { initSys } from '~/api/sys'
const { tagList } = useTagStore()
const left = ref(false)
const router = useRouter()
initSys()
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      class="q-py-xs bg-white text-grey-8" height-hint="48"
      style="box-shadow: rgba(0, 0, 0, 0.1) 0 2px 12px 0; padding-bottom: 2px;"
    >
      <q-toolbar style="margin-top: -4px;">
        <q-btn flat dense round aria-label="Menu" :icon="left === true ? 'menu_open' : 'menu'" @click="left = !left" />
        <q-btn v-if="$q.screen.gt.xs" flat no-caps no-wrap class="q-ml-xs">
          <q-toolbar-title shrink class="text-weight-bold">
            Title
          </q-toolbar-title>
        </q-btn>
        <!-- 面包屑 -->
        <Breadcrumbs v-if="$q.screen.gt.sm" />
        <q-space/>
        <!-- 右侧元素 -->
        <ToolBarRight />
      </q-toolbar>
      <q-separator color="grey-3" />
      <TagView />
    </q-header>
    <q-drawer
      v-model="left"
      show-if-above
      content-class="bg-white"
      :width="240"
    >
      <template #default>
        <BaseMenu />
      </template>
    </q-drawer>
    <q-page-container class="app-main full-height">
      <RouterView v-slot="{ Component }">
        <transition>
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </RouterView>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
  @import '../styles/transition.scss';
  .slide-fade-enter {
    transform: translateX(10px);
    opacity: 0;
  }

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.2s ease;
  }

  .slide-fade-leave-to {
    transform: translateX(-10px);
    opacity: 0;
  }
</style>
