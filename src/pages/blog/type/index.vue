<script setup>
import { columns, formColumns, visibleColumns } from './type.data'
import { blogApi } from '~/api/blog'
const tableDatas = ref([])
async function findDatas(pageParams) {
  const resp = await blogApi.findTypeList(pageParams)
  if (resp.code === 200)
    tableDatas.value = resp.data
}
function saveData(data) {
  console.log(2222, data)
}
function deleteData(id) {
  console.log(4444, id)
}
const tableParams = ref({
  columns,
  formColumns,
  visibleColumns,
  datas: tableDatas,
  pages: false,
  pagination: {
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 10,
  },
})
</script>

<template>
  <BaseContent>
    <BaseTable
      :datas="tableParams"
      @api="findDatas"
      @save="saveData"
      @delete="deleteData"
    />
  </BaseContent>
</template>

<route lang="yaml">
meta:
  layout: quasar
  title: 博客分类
  keepAlive: true
</route>
