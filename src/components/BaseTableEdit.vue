<script setup>
import { sysApi } from '~/api/sys'
const props = defineProps({
  isCreate: Boolean,
  formColumns: Array,
  datas: Object,
})
const emit = defineEmits(['save'])
const maximizedToggle = ref(false)
const dialog = ref(false)
const blogInfo = ref({})
const splitterModel = ref(50)

async function initData() {
  if (props && !props.isCreate)
    blogInfo.value = props.datas
  dialog.value = true
  for (const item of props.formColumns) {
    if (item.fieldType === 2) {
      if (item.apiConfig.method && item.apiConfig.method === 'post') {
        const fieldApiResp = await sysApi.postByUrl(item.url)
        if (fieldApiResp && fieldApiResp.code === 200)
          item.apiData = fieldApiResp.data
      }
      else {
        const fieldApiResp = await sysApi.getByUrl(item.apiConfig.url)
        if (fieldApiResp && fieldApiResp.code === 200)
          item.apiData = fieldApiResp.data
      }
    }
  }
}
const saveData = async () => {
  emit('save', blogInfo.value)
}
</script>

<template>
  <div>
    <q-btn
      v-if="props.isCreate"
      label="新建"
      color="primary"
      class="q-mr-sm no-border-radius"
      icon="add"
      unelevated
      @click="initData"
    />
    <q-btn v-else flat icon="mode" color="primary" @click="initData" />
    <q-dialog
      v-model="dialog"
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="w-2/3">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" :disable="!maximizedToggle" @click="maximizedToggle = false">
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">
              Minimize
            </q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" :disable="maximizedToggle" @click="maximizedToggle = true">
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">
              Maximize
            </q-tooltip>
          </q-btn>
          <q-btn v-close-popup dense flat icon="close">
            <q-tooltip class="bg-white text-primary">
              Close
            </q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section :style="[maximizedToggle ? '' : 'max-height: 50vh;']" class="scroll">
          <div class="q-pa-md">
            <div class="q-gutter-md">
              <template v-for="(item, index) in props.formColumns" :key="index">
                <q-input
                  v-if="item.fieldType === 0" v-model="blogInfo[item.field]" square outlined :label="item.label"
                  :rules="[val => !!val || `${item.label}不能为空`]"
                />
                <q-select v-if="item.fieldType === 2" v-model="blogInfo[item.field]" filled :options="item.apiData" :label="item.label" :option-value="item.apiConfig.valueField" :option-label="item.apiConfig.labelField" />
                <q-toggle
                  v-if="item.fieldType === 3"
                  v-model="blogInfo[item.field]"
                  :label="item.label"
                  :icon="item.icon"
                />
              </template>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup flat label="取消" color="primary" />
          <q-btn v-close-popup flat label="保存" color="primary" @click="saveData" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
