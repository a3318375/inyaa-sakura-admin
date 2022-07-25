export const visibleColumns = ref(['name', 'remark', 'createTime', 'btn'])

export const columns = [
  { name: 'name', align: 'left', label: '分类名称', field: 'name', check: true, isParams: true, paramsType: 0 },
  { name: 'remark', align: 'center', label: '备注', field: 'remark', check: true },
  { name: 'createTime', align: 'center', label: '发布时间', field: 'createTime', check: true, sortable: true },
  { name: 'btn', align: 'center', label: '操作', check: true, field: row => row },
]

export const formColumns = [
  {
    field: 'name',
    label: '分类名称',
    fieldType: 0,
    ruleType: 0,
  },
  {
    field: 'remark',
    label: '备注',
    fieldType: 0,
    ruleType: 0,
  },
  // {样例
  //   field: 'type',
  //   label: '分类',
  //   fieldType: 2,
  //   apiConfig: {
  //     url: '/type/list',
  //     method: 'get',
  //     valueField: 'id',
  //     labelField: 'name',
  //   },
  // },
]
