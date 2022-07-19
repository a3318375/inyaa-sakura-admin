<script setup>
import { blogApi } from '~/api/blog'
const props = defineProps({ id: Number })
const maximizedToggle = ref(false)
const dialog = ref(false)
const blogInfo = ref({
  isHot: false,
  isComment: true,
  status: true,
  article: {
    context: '',
  },
  type: {},
})
const typeOptions = ref([])
const tagOptions = ref([])
const tagFilterOptions = ref([])
const splitterModel = ref(50)

async function initData() {
  if (props && props.id) {
    const blogResp = await blogApi.getBlogInfo({ id: props.id })
    blogInfo.value = blogResp.data
  }
  dialog.value = true
  const typeList = await blogApi.findTypeList()
  typeOptions.value = typeList.data
  const tagList = await blogApi.findTagList()
  tagOptions.value = tagList.data
  tagFilterOptions.value = tagList.data
}

async function createValue(val, done) {
  const valObj = {
    name: val,
  }
  if (val.length > 0) {
    if (!tagOptions.value.some(item => item.name === val))
      tagOptions.value.push(valObj)

    done(valObj, 'toggle')
  }
}
async function filterFn(val, update) {
  update(() => {
    if (val === '') {
      tagFilterOptions.value = tagOptions.value
    }
    else {
      const needle = val.toLowerCase()
      tagFilterOptions.value = tagOptions.value.filter(
        v => v.name.toLowerCase().includes(needle),
      )
    }
  })
}
const toUpdate = async () => {
  console.log(111, blogInfo.value)
  await blogApi.saveBlog(blogInfo.value)
}
</script>

<template>
  <div>
    <q-btn
      label="新建"
      color="primary"
      class="q-mr-sm no-border-radius"
      icon="add"
      unelevated
      @click="initData"
    />
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

        <q-card-section>
          <div class="text-h6">
            Alert
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section :style="[maximizedToggle ? '' : 'max-height: 50vh;']" class="scroll">
          <div class="q-pa-md">
            <div class="q-gutter-md">
              <q-input
                v-model="blogInfo.title" square outlined label="标题"
                :rules="[val => !!val || '标题不能为空']"
              />
              <q-input v-model="blogInfo.summary" square outlined label="摘要" :rules="[val => !!val || '摘要不能为空']" />
              <q-select v-model="blogInfo.type" filled :options="typeOptions" label="分类" option-value="id" option-label="name" />
              <q-select
                v-model="blogInfo.tagList"
                filled
                label="标签"
                use-input
                use-chips
                multiple
                input-debounce="0"
                option-value="id"
                option-label="name"
                :options="tagFilterOptions"
                @new-value="createValue"
                @filter="filterFn"
              />
              <q-toggle
                v-model="blogInfo.status"
                label="是否发布"
                icon="alarm"
              />
              <q-toggle
                v-model="blogInfo.isHot"
                label="是否推荐"
                icon="alarm"
              />
              <q-toggle
                v-model="blogInfo.isComment"
                label="是否开启评论"
                icon="alarm"
              />
              <div class="q-pa-md q-gutter-sm fit">
                <q-splitter
                  v-model="splitterModel"
                >
                  <template #separator>
                    <q-avatar color="primary" text-color="white" size="28px" icon="fas fa-arrows-alt-h" />
                  </template>

                  <template #before>
                    <div class="q-pa-md">
                      <textarea
                        v-model="blogInfo.article.context"
                        rows="40"
                        :class="{ 'text-white bg-dark': $q.dark.isActive }"
                        class="fit q-pa-sm"
                      />
                    </div>
                  </template>
                  <template #after>
                    <div class="q-pa-md">
                      <q-markdown
                        :src="blogInfo.article.context"
                        class="fit bordered q-pa-sm"
                      />
                    </div>
                  </template>
                </q-splitter>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup flat label="取消" color="primary" />
          <q-btn v-close-popup flat label="保存" color="primary" @click="toUpdate" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
