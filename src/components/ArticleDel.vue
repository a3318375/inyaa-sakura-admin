<script setup>
const confirm = ref(false)
</script>

<template>
  <div>
    <q-btn flat icon="delete" @click="confirm = true" />
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">You are currently not connected to any network.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup flat label="Cancel" color="primary" />
          <q-btn v-close-popup flat label="Turn on Wifi" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
