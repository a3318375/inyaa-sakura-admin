<script setup>
import { useTagStore } from '~/store/tag'
const { tagList, removeTagView } = useTagStore()

function isWeChart() {
  return navigator.userAgent.toLowerCase().includes('micromessenger')
}

function removeAllTagView() {
  removeTagView()
}

function removeAtagView(i) {
  removeTagView(i)
}

function removeLeftTagView(i) {
  removeTagView({ side: 'left', index: i })
}

function removeRightTagView(i) {
  removeTagView({ side: 'right', index: i })
}

function removeOthersTagView(i) {
  removeTagView({ side: 'others', index: i })
}
function navDelay(v) {
}
</script>

<template>
  <div class="row" :style="{ margin: (!$q.screen.gt.sm ? '' : '0px 15px 0px 15px') }">
    <q-tabs
      align="left"
      active-color="primary"
      class="bg-white col-12"
      dense
      swipeable
      inline-label
      indicator-color="transparent"
      :outside-arrows="$q.platform.is.electron"
      :breakpoint="0"
    >
      <q-route-tab
        class="tagView"
        to="/"
        no-caps
        content-class="tagView-q-router-tab"
        :style="isWeChart ? ' line-height: normal' : ''"
      >
        <template #default>
          <q-icon size="1.3rem" name="home" />
          <div class="line-limit-length" style="margin: 0 5px 0 5px;">
            主页
          </div>
        </template>
      </q-route-tab>

      <template v-for="(v, i) in tagList" :key="v.fullPath + i">
        <q-route-tab
          class="tagView"
          :to="v.fullPath"
          no-caps
          content-class="tagView-q-router-tab"
          :style="isWeChart ? ' line-height: normal' : ''"
          @click="navDelay(v)"
        >
          <template #default>
            <q-icon v-if="v.icon" size="1.3rem" :name="v.icon" />
            <div class="line-limit-length">
              {{ v.name }}
            </div>
            <q-icon
              class="tagView-remove-icon" style="display: inline-flex" name="close"
              @click.prevent.stop="removeAtagView(i)"
            />
            <q-menu
              touch-position
              context-menu
            >
              <q-list dense>
                <q-item v-close-popup clickable>
                  <q-item-section @click="removeOthersTagView(i)">
                    关闭其他
                  </q-item-section>
                </q-item>
                <q-item v-close-popup clickable>
                  <q-item-section @click="removeRightTagView(i)">
                    关闭右侧
                  </q-item-section>
                </q-item>
                <q-item v-close-popup clickable>
                  <q-item-section @click="removeLeftTagView(i)">
                    关闭左侧
                  </q-item-section>
                </q-item>
                <q-item v-close-popup clickable>
                  <q-item-section @click="removeAllTagView">
                    关闭所有
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </template>
        </q-route-tab>
      </template>
    </q-tabs>
  </div>
</template>
