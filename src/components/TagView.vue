<script setup>
import { useTagStore } from '~/store/tag'
const { tagList, removeTagView } = useTagStore()
const router = useRouter()

function isWeChart() {
  return navigator.userAgent.toLowerCase().includes('micromessenger')
}

function removeAllTagView() {
  removeTagView()
}

function toJump() {
  if (tagList.length === 0)
    router.push('/')
  else
    router.push(tagList[0].fullPath)
}

function removeAtagView(i) {
  removeTagView(i)
  toJump()
}

function removeLeftTagView(i) {
  removeTagView({ side: 'left', index: i })
  toJump()
}

function removeRightTagView(i) {
  removeTagView({ side: 'right', index: i })
  toJump()
}

function removeOthersTagView(i) {
  removeTagView({ side: 'others', index: i })
  toJump()
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
              {{ v.title }}
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

<style lang="css" scoped>
.tagView {
    margin: 1.5px 3px 0 3px;
    min-height: 20px;
    padding: 0 8px;
    background: white;
    transition: all .5s;
    border-radius: 0;
    height: 31px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tagView-remove-icon {
    font-size: 1.0rem;
    border-radius: .2rem;
    opacity: 0.58;
    transition: all .3s;
  }

  .tagView-remove-icon:hover {
    opacity: 1;
  }

  .line-limit-length {
    margin: 0px 5px 0px 7px;
    overflow: hidden;
    max-width: 180px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
