export const visibleColumns = ref(['title', 'desc', 'status', 'views', 'comments', 'type', 'calcium', 'createTime', 'btn'])

export const columns = [
  { name: 'title', align: 'left', label: '标题', field: 'title', check: true, isParams: true, paramsType: 0 },
  { name: 'status', align: 'center', label: '发布状态', field: 'status', check: true, sortable: true, format: val => `${val ? '成功' : '草稿'}` },
  { name: 'views', align: 'center', label: '访问量', field: 'views', check: true },
  { name: 'comments', align: 'center', label: '评论量', field: 'comments', check: true },
  { name: 'type', align: 'center', label: '分类', field: 'type', check: true, format: val => `${val ? val.name : ''}` },
  { name: 'calcium', align: 'center', label: '标签', field: 'calcium', check: true },
  { name: 'createTime', align: 'center', label: '发布时间', field: 'createTime', check: true, sortable: true },
  { name: 'btn', align: 'center', label: '操作', check: true, field: row => row.id },
]
