<script setup>
const router = useRouter()
const { menuList } = useMenuStore()
const { tagList } = useTagStore()
const nowPath = ref('')
const thumbStyleOfMenu = {
  borderRadius: '5px',
  backgroundColor: 'rgba(144,147,153,0.9)',
  padding: '10px;',
  margin: '10px;',
  width: '3px',
}
console.log(333333, menuList)
function isWeChart() {
  return navigator.userAgent.toLowerCase().includes('micromessenger')
}
function addTagView(path, name) {
  nowPath.value = path
  if (!tagList.includes(path)) {
    tagList.push({
      fullPath: path,
      name,
    })
  }
  router.push(path)
}
</script>

<template>
  <q-scroll-area :visible="false" class="fit" :thumb-style="thumbStyleOfMenu">
    <div>
      <!-- 动态菜单 -->
      <q-list>
        <template v-for="(item, index) in menuList">
          <!-- 没有孩子 -->
          <q-item
            v-if="!item.children"
            :key="index"
            v-ripple
            clickable
            :exact="item.path === '/'"
            class="bg-white-1 base-menu-item"
            :style="isWeChart ? ' line-height: normal' : ''"
            active-class="baseItemActive"
            @click="addTagView(item.path, item.name)"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              {{ item.name }}
            </q-item-section>
          </q-item>

          <!-- 有孩子 -->
          <q-expansion-item
            v-else
            duration="300"
            :class="router === nowPath ? 'baseRootItemActive bg-white-2 base-menu-item' : 'bg-white-2 base-menu-item'"
            :icon="item.icon"
            :label="item.name"
            :style="isWeChart ? ' line-height: normal' : ''"
          >
            <!-- 菜单项缩进 + 0.2 ; 背景色深度 + 1 ; 如果上级菜单路径存在，则拼接上级菜单路径 -->
            <template v-for="(child, childIndex) in item.children" :key="childIndex">
              <!-- 没有孩子 -->
              <q-item
                v-ripple
                clickable
                :exact="item.path === '/'"
                class="bg-white-1 base-menu-item"
                :style="isWeChart ? ' line-height: normal' : ''"
                active-class="baseItemActive"
                @click="addTagView(child.path, child.name)"
              >
                <q-item-section avatar>
                  <q-icon :name="child.icon" />
                </q-item-section>
                <q-item-section>
                  {{ child.name }}
                </q-item-section>
              </q-item>
            </template>
          </q-expansion-item>
        </template>
      </q-list>
    </div>
  </q-scroll-area>
</template>

<style lang="sass">
/* item 颜色 */
$ITEM_COLOR: #2c3e50

/* item 激活时颜色 */
$ACTIVE_COLOR: #1976d2
$ACTIVE_BACKGROUND: rgba(25, 118, 210, 0.0618)

.base-menu-item
  color: $ITEM_COLOR !important

/* item 被激活时父菜单的样式 */
.baseRootItemActive
  color: $ACTIVE_COLOR !important

/* item 被激活时的样式 */
.baseItemActive
  color: $ACTIVE_COLOR !important
  background: $ACTIVE_BACKGROUND
  transition: all .618s
  &:after
    content: ''
    position: absolute
    width: 3px
    height: 100%
    background: $ACTIVE_COLOR !important
    top: 0
    right: 0
</style>
