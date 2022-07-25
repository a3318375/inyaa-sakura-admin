<script setup>
import { useQuasar } from 'quasar'
const messageTab = ref('informs')
const informCount = 4
const notifiesCount = 2
const waitDealCount = 1

const informs = ref([
  {
    icon: 'email',
    title: '你推荐的 曲妮妮 已通过第三轮面试',
    desc: '3年前',
    color: 'orange',
    textColor: 'white',
    disable: false,
  },
  {
    icon: 'bluetooth',
    title: '你收到了 14 份新周报',
    desc: '3年前',
    color: 'primary',
    textColor: 'white',
    disable: true,
  },
  {
    icon: 'email',
    title: '这种模板可以区分多种通知类型',
    desc: '3年前',
    color: 'teal',
    textColor: 'white',
    disable: true,
  },
  {
    icon: 'email',
    title: '左侧图标用于区分不同的类型',
    desc: '3年前',
    color: 'yellow-10',
    textColor: 'white',
    disable: false,
  },
  {
    icon: 'email',
    title: '内容不要超过两行字，超出时自动截断',
    desc: '3年前',
    color: 'orange',
    textColor: 'white',
    disable: false,
  },
])
const notifies = ref([
  {
    icon: 'email',
    title: '你推荐的 曲妮妮 已通过第三轮面试',
    desc: '3年前',
    color: 'orange',
    textColor: 'white',
    disable: false,
  },
  {
    icon: 'bluetooth',
    title: '你收到了 14 份新周报',
    desc: '3年前',
    color: 'primary',
    textColor: 'white',
    disable: false,
  },
  {
    icon: 'email',
    title: '这种模板可以区分多种通知类型',
    desc: '3年前',
    color: 'teal',
    textColor: 'white',
    disable: true,
  },
  {
    icon: 'email',
    title: '左侧图标用于区分不同的类型',
    desc: '3年前',
    color: 'yellow-10',
    textColor: 'white',
    disable: false,
  },
  {
    icon: 'email',
    title: '内容不要超过两行字，超出时自动截断',
    desc: '3年前',
    color: 'orange',
    textColor: 'white',
    disable: false,
  },
  {
    icon: 'email',
    title: '内容不要超过两行字，超出时自动截断222',
    desc: '3年前',
    color: 'blue',
    textColor: 'white',
    disable: false,
  },
])
const waitDeals = ref([
  {
    icon: 'email',
    title: '你推荐的 曲妮妮 已通过第三轮面试',
    desc: '3年前',
    color: 'orange',
    textColor: 'white',
    disable: false,
  },
  {
    icon: 'bluetooth',
    title: '你收到了 14 份新周报',
    desc: '3年前',
    color: 'primary',
    textColor: 'white',
    disable: false,
  },
  {
    icon: 'email',
    title: '这种模板可以区分多种通知类型',
    desc: '3年前',
    color: 'teal',
    textColor: 'white',
    disable: true,
  },
  {
    icon: 'email',
    title: '左侧图标用于区分不同的类型',
    desc: '3年前',
    color: 'yellow-10',
    textColor: 'white',
    disable: false,
  },
  {
    icon: 'email',
    title: '内容不要超过两行字，超出时自动截断',
    desc: '3年前',
    color: 'orange',
    textColor: 'white',
    disable: false,
  },
])
function look(type, index) {
  if (type === 'inform')
    informs.value[index].disable = true
  else if (type === 'notify')
    notifies.value[index].disable = true
  else
    waitDeals.value[index].disable = true
}
function clearMessage(items) {
  if (items === 'informs')
    disable(informs)
  else if (items === 'notifies')
    disable(notifies)
  else
    disable(waitDeals)
}
function disable(items) {
  for (let i = 0; i < items.value.length; ++i)
    items.value[i].disable = true
}
const $q = useQuasar()
function lookMore(message) {
  $q.notify({
    progress: true,
    color: 'primary',
    group: false,
    icon: 'check_circle',
    position: 'top',
    timeout: 2000,
    message,
  })
}
</script>

<template>
  <div class="q-gutter-sm row items-center no-wrap">
    <q-btn v-if="$q.screen.gt.sm" round dense flat icon="message">
      <q-tooltip>消息</q-tooltip>
    </q-btn>
    <q-btn round dense flat icon="notifications">
      <q-badge color="red" text-color="" floating>
        2
      </q-badge>
      <q-tooltip>通知</q-tooltip>
      <q-menu anchor="bottom left" self="top left" transition-show="jump-down" transition-hide="jump-up">
        <q-tabs
          v-model="messageTab"
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="informs">
            <span v-if="informCount > 0">
              通知({{ informCount }})
            </span>
            <span v-else>通知</span>
          </q-tab>
          <q-tab name="notifies">
            <span v-if="notifiesCount > 0">
              消息({{ notifiesCount }})
            </span>
            <span v-else>消息</span>
          </q-tab>
          <q-tab name="waitDeals">
            <span v-if="waitDealCount > 0">
              待办({{ waitDealCount }})
            </span>
            <span v-else>待办</span>
          </q-tab>
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="messageTab" animated>
          <q-tab-panel name="informs" class="q-pa-none">
            <q-list>
              <div
                v-for="(inform, index) in informs"
                :key="index"
                @click="look('inform', index)"
              >
                <q-item
                  class="cursor-pointer q-ma-xs"
                  :class="[inform.disable ? 'disable' : '']"
                  :disable="inform.disable"
                >
                  <q-item-section avatar>
                    <q-avatar
                      :color="inform.color"
                      :text-color="inform.textColor"
                      :icon="inform.icon"
                    />
                  </q-item-section>
                  <q-item-section class="q-gutter-xs">
                    <q-item-label :lines="1">
                      {{ inform.title }}{{ inform.disable }}
                    </q-item-label>
                    <q-item-label caption>
                      {{ inform.desc }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator
                  v-if="index < informs.length - 1"
                  inset="item"
                />
              </div>
              <q-separator />
              <q-item class="row q-pa-none text-center cursor-pointer">
                <q-item-section class="col q-pa-none q-ma-none">
                  <q-btn
                    label="清空通知"
                    flat
                    :ripple="{ color: 'info' }"
                    class="q-ma-none full-width full-height no-border-radius"
                    @click="clearMessage('informs')"
                  />
                </q-item-section>
                <q-separator vertical />
                <q-item-section class="col q-pa-none q-ma-none">
                  <q-btn
                    label="查看更多"
                    flat
                    :ripple="{ color: 'info' }"
                    class="q-ma-none full-width full-height no-border-radius"
                    @click="lookMore('查看通知')"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
          <q-tab-panel name="notifies" class="q-pa-none">
            <q-list>
              <div
                v-for="(notify, index) in notifies"
                :key="index"
                @click="look('notify', index)"
              >
                <q-item
                  class="cursor-pointer q-ma-xs"
                  :disable="notify.disable"
                >
                  <q-item-section avatar>
                    <q-avatar
                      :color="notify.color"
                      :text-color="notify.textColor"
                      :icon="notify.icon"
                    />
                  </q-item-section>
                  <q-item-section class="q-gutter-xs">
                    <q-item-label :lines="1">
                      {{ notify.title }}
                    </q-item-label>
                    <q-item-label caption>
                      {{ notify.desc }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator
                  v-if="index < informs.length - 1"
                  inset="item"
                />
              </div>
              <q-separator />
              <q-item class="row q-pa-none text-center cursor-pointer">
                <q-item-section class="col q-pa-none q-ma-none">
                  <q-btn
                    label="清空通知"
                    flat
                    :ripple="{ color: 'info' }"
                    class="q-ma-none full-width full-height no-border-radius"
                    @click="clearMessage('notifies')"
                  />
                </q-item-section>
                <q-separator vertical />
                <q-item-section class="col q-pa-none q-ma-none">
                  <q-btn
                    label="查看更多"
                    flat
                    :ripple="{ color: 'info' }"
                    class="q-ma-none full-width full-height no-border-radius"
                    @click="lookMore('查看通知')"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
          <q-tab-panel name="waitDeals" class="q-pa-none">
            <q-list>
              <div
                v-for="(waitDeal, index) in waitDeals"
                :key="index"
                @click="look('waitDeal', index)"
              >
                <q-item
                  class="cursor-pointer q-ma-xs"
                  :disable="waitDeal.disable"
                >
                  <q-item-section avatar>
                    <q-avatar
                      :color="waitDeal.color"
                      :text-color="waitDeal.textColor"
                      :icon="waitDeal.icon"
                    />
                  </q-item-section>
                  <q-item-section class="q-gutter-xs">
                    <q-item-label :lines="1">
                      {{ waitDeal.title }}
                    </q-item-label>
                    <q-item-label caption>
                      {{ waitDeal.desc }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator
                  v-if="index < informs.length - 1"
                  inset="item"
                />
              </div>
              <q-separator />
              <q-item class="row q-pa-none text-center cursor-pointer">
                <q-item-section class="col q-pa-none q-ma-none">
                  <q-btn
                    label="清空通知"
                    flat
                    :ripple="{ color: 'info' }"
                    class="q-ma-none full-width full-height no-border-radius"
                    @click="clearMessage('waitDeals')"
                  />
                </q-item-section>
                <q-separator vertical />
                <q-item-section class="col q-pa-none q-ma-none">
                  <q-btn
                    label="查看更多"
                    flat
                    :ripple="{ color: 'info' }"
                    class="q-ma-none full-width full-height no-border-radius"
                    @click="lookMore('查看通知')"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </q-menu>
    </q-btn>
    <q-btn round flat>
      <q-menu anchor="bottom left" self="top left">
        <q-item clickable>
          <q-item-section>个人中心</q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>账号设置</q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>退出登录</q-item-section>
        </q-item>
      </q-menu>
      <q-avatar icon="account_circle" />
      <q-tooltip>账号</q-tooltip>
    </q-btn>
  </div>
</template>
