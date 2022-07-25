<script setup>
const emit = defineEmits(['toDel'])
const confirm = ref(false)
const toRunApi = () => {
  emit('toDel')
}
</script>

<template>
  <div>
    <q-btn flat icon="delete" color="primary" @click="confirm = true" />
    <q-dialog v-model="confirm">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">删除的数据无法恢复，请确认是否删除.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup flat label="否" color="primary" />
          <q-btn v-close-popup flat label="是" color="primary" @click="toRunApi" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
