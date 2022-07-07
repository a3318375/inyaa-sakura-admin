<script setup>
const maximizedToggle = ref(false)
const dialog = ref(false)
</script>

<template>
  <div>
    <q-btn flat icon="mode" @click="dialog = true" />
    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
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

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
