<script setup>
const props = defineProps({
  datas: Object,
})
const emit = defineEmits(['api', 'save', 'delete'])
const toRunApi = async () => {
  emit('api')
}

const columns = props.datas.columns
const formColumns = props.datas.formColumns
const visibleColumns = props.datas.visibleColumns

const router = useRouter()
const filter = ref('')
const loading = ref(false)
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 10,
})
const blogTableParams = ref({})

const blogData = async () => {
  if (props.pages) {
    const pageParams = ref({})
    pageParams.page = pagination.value.page
    pageParams.size = pagination.value.rowsPerPage
    emit('api', pageParams)
    pagination.value.rowsNumber = props.datas.pagination.rowsNumber
    pagination.value.rowsPerPage = props.datas.pagination.rowsPerPage
    pagination.value.page = props.datas.pagination.page
  }
  else {
    await toRunApi()
  }
}

const onRequest = (props) => {
  pagination.value = props.pagination
  blogData()
}

function select(columnFromClient) {
  this.visibleColumns = []
  for (let i = 0; i < columns.length; ++i) {
    if (columns[i].name === columnFromClient.name)
      columns[i].check = !columns[i].check

    if (columns[i].check)
      this.visibleColumns[i] = columns[i].name
  }
}

const showQuery = ref(true)
const tableLabel = ref('展开')
function show() {
  showQuery.value = true
  tableLabel.value = '收起'
}
function hide() {
  showQuery.value = false
  tableLabel.value = '展开'
}
function doQuery() {
}
function resetQuery() {
}

function toUpdate(id) {
  router.push(`/blog/article/${id}`)
}
function toCreate() {
  router.push('/blog/article/0')
}
const saveData = async (data) => {
  emit('save', data)
}
const delData = async (id) => {
  emit('delete', id)
}
blogData()
</script>

<template>
  <div class="q-pt-md q-mx-md" style="box-sizing: inherit">
    <q-card square flat class="q-gutter-y-md q-pb-md">
      <q-form>
        <div class="row q-gutter-y-sm q-pt-sm">
          <template v-for="(item, index) in columns">
            <q-item v-if="item.isParams" :key="index" class="col-xl-3 col-sm-6 col-xs-12">
              <q-item-section class="col-2 text-right gt-sm">
                <q-item-label>{{ item.label }}:</q-item-label>
              </q-item-section>
              <q-item-section class="col">
                <q-input
                  v-model="blogTableParams[item.field]"
                  outlined
                  :label="item.label"
                  dense
                  square
                  clearable
                />
              </q-item-section>
            </q-item>
          </template>
          <q-item class="col-xl-3 col-sm-6 col-xs-12 q-pr-sm">
            <q-item-label class="col-12 text-right">
              <q-btn
                outline
                unelevated
                label="重置"
                class="q-mr-sm no-border-radius"
                color="secondary"
                @click="resetQuery"
              />
              <q-btn
                unelevated
                label="查询"
                color="primary"
                class="q-mr-sm no-border-radius"
                :loading="loading"
                @click="doQuery"
              >
                <template #loading>
                  <q-spinner-ios class="on-center" />
                </template>
              </q-btn>
              <q-btn-dropdown
                v-model="showQuery"
                persistent
                dense
                flat
                color="primary"
                :label="tableLabel"
                @before-show="show"
                @before-hide="hide"
              />
            </q-item-label>
          </q-item>
        </div>
      </q-form>
      <q-table
        v-model:pagination="pagination"
        title="Treats"
        :rows="props.datas.datas"
        :columns="columns"
        row-key="name"
        :visible-columns="visibleColumns"
        :loading="loading"
        :filter="filter"
        binary-state-sort
        @request="onRequest"
      >
        <template #top-left>
          <BaseTableEdit :is-create="true" :form-columns="formColumns" @save="saveData" />
        </template>
        <template #top-right="props">
          <div>
            <q-btn rounded flat dense size="md" icon="refresh">
              <q-tooltip>刷新</q-tooltip>
            </q-btn>
            <q-btn rounded flat dense size="md" icon="unfold_less">
              <q-tooltip>密度</q-tooltip>
            </q-btn>
            <q-btn rounded flat dense size="md" icon="settings">
              <q-menu :offset="[0, 12]">
                <q-list dense>
                  <q-item
                    v-for="(item, index) in columns"
                    :key="index"
                    clickable
                    :active="item.check"
                    @click="select(item)"
                  >
                    <q-item-section>{{ item.label }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
            <q-btn
              rounded
              flat
              round
              dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
            >
              <q-tooltip>全屏</q-tooltip>
            </q-btn>
          </div>
        </template>
        <template #body-cell-btn="props">
          <q-td :props="props">
            <div>
              <BaseTableEdit :is-create="false" :datas="props.value" :form-columns="formColumns" @save="saveData" />
              <BaseTableDel @to-del="delData(props.value.id)" />
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </div>
</template>
