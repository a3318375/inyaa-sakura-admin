<script setup>
const breadcrumbs = ref([])
</script>

<template>
  <q-breadcrumbs class="flex items-center" active-color="none" style="transform: translateX(10px);">
    <transition-group name="breadcrumb">
      <template v-for="(v, i) in breadcrumbs">
        <q-breadcrumbs-el
          v-if="v.title" :key="i + v.title" class="items-center"
          style="vertical-align: middle"
          :label="v.title"
          :icon="v.icon === '' ? undefined : v.icon"
        >
          <template #default>
            <div v-if="breadcrumbs.length !== i + 1" style="margin:0px 8px 0px 8px">
              /
            </div>
          </template>
        </q-breadcrumbs-el>
      </template>
    </transition-group>
  </q-breadcrumbs>
</template>
