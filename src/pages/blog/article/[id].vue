<script setup>
import { blogApi } from '~/api/blog'
const route = useRoute()
const router = useRouter()
const { tagList, removeTagView } = useTagStore()
const id = route.params.id
const blogInfo = ref({
  isHot: false,
  isComment: true,
  status: true,
  article: {
    context: '',
  },
})
const typeOptions = ref([])
const tagOptions = ref([])
const tagFilterOptions = ref([])

async function initData() {
  if (id && id !== 0 && id !== '0') {
    const blogResp = await blogApi.getBlogInfo({ id })
    blogInfo.value = blogResp.data
  }
  const typeList = await blogApi.findTypeList()
  typeOptions.value = typeList.data
  const tagList = await blogApi.findTagList()
  tagOptions.value = tagList.data
  tagFilterOptions.value = tagList.data
}
initData()

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
  await blogApi.saveBlog(blogInfo.value)
  if (tagList.length > 1) {
    tagList.forEach((item, index) => {
      if (item.fullPath === `/blog/article/${id}`) {
        removeTagView(index)
        console.log(3333, tagList[index - 1])
        router.push(tagList[index - 1].fullPath)
      }
    })
  }
  router.push('/')
}
</script>

<template>
  <BaseContent>
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
          <v-md-editor v-model="blogInfo.article.context" height="400px" />
        </div>
        <q-btn v-close-popup flat label="取消" color="primary" />
        <q-btn v-close-popup flat label="保存" color="primary" @click="toUpdate" />
      </div>
    </div>
  </BaseContent>
</template>

<route lang="yaml">
meta:
  layout: quasar
  title: 编写博客
</route>
