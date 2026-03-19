<template>
  <v-dialog v-model="internalModel" max-width="500">
    <v-card rounded="xl" class="pa-4">
      <v-row justify="center" class="mt-2">
        <v-img :src="observatory?.image_url" cover class="align-end ma-2 rounded-lg" style="border: 5px solid #0297FA">
            <div class="d-flex align-center justify-center px-4 pb-6 w-100">
                <v-rating :model-value="5" color="amber" density="compact" half-increments readonly size="medium"></v-rating>
                <span class="text-white text-caption ml-2">( 100 reviews)</span>
            </div>
        </v-img>
      </v-row>

      <v-card-text class="text-center">
        
        <v-row justify="center" class="mt-n8 mb-4 position-relative" style="z-index: 10;">
          <v-avatar size="50" color="transparent" rounded="0" class="logo-svg-container">
            <v-img src="@/assets/logo.svg" contain></v-img>
          </v-avatar>
        </v-row> 

        <h2 class="text-h4 font-weight-bold">{{ observatory?.title }}</h2>
        <div class="d-flex justify-center flex-wrap ga-2 mb-4">
        <v-chip v-for="catalog in observatory?.catalogs" :key="catalog" size="small" color="grey-darken-1">
          {{ catalog }}
        </v-chip>
      </div>

        <p class="text-body-1 text-justify px-4  mb-4">
          {{ observatory?.description }}
        </p>

        <div class="font-weight-bold text-grey-darken-1" style="line-height: 1;">GRÁFICAS</div>
        <div class="text-h5 font-weight-bold"> 100+</div>

      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps(['modelValue', 'observatory'])
const emit = defineEmits(['update:modelValue'])

const internalModel = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>