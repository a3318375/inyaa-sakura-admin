<script setup>
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
      <q-avatar icon="account_circle">
      </q-avatar>
      <q-tooltip>账号</q-tooltip>
    </q-btn>
  </div>
</template>
