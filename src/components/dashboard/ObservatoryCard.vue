<template>
  <v-card class="mx-auto d-flex flex-column" elevation="2" rounded="xl" max-width="450">

    <v-img
      :src="observatory?.image_url || 'https://placehold.co/600x400/eeeeee/999999?text=NO+IMAGE'"
      height="230"
      cover
      class="align-end ma-2 rounded-lg flex-shrink-0"
    >
      <div class="d-flex align-center justify-center px-4 pb-6 w-100">
        <template v-if="statsLoading">
          <v-progress-circular indeterminate color="white" size="16" width="2" class="mr-2" />
          <span class="text-white text-caption">Cargando...</span>
        </template>
        <template v-else>
          <v-rating
            :model-value="stats?.avg_rating ?? 0"
            color="amber"
            density="compact"
            half-increments
            readonly
            size="medium"
          />
          <span class="text-white text-caption ml-2">({{ stats?.review_count ?? 0 }} reseñas)</span>
        </template>
      </div>
    </v-img>

    <v-card-item class="text-left pt-2 pb-0">
      <div class="text-h5 font-weight-bold text-capitalize">{{ observatory.title }}</div>

      <div class="d-flex justify-start flex-wrap ga-1 mt-2">
        <v-chip
          v-for="role in observatory?.metadata"
          :key="role"
          size="small"
          color="grey-lighten-2"
          variant="flat"
          class="text-grey-darken-3 font-weight-bold"
        >
          {{ role }}
        </v-chip>
      </div>

      <!-- Stats chips: skeleton while loading, real data when ready -->
      <template v-if="statsLoading">
        <div class="d-flex ga-1 mt-2">
          <v-skeleton-loader type="chip" width="80" />
          <v-skeleton-loader type="chip" width="80" />
        </div>
      </template>
      <template v-else>
        <div v-if="stats?.services?.length" class="d-flex flex-wrap ga-1 mt-2">
          <v-chip
            v-for="svc in stats.services.slice(0, 3)"
            :key="svc.service_id"
            size="x-small"
            color="primary"
            variant="tonal"
            class="font-weight-medium"
            prepend-icon="mdi-cog-outline"
          >{{ svc.name }}</v-chip>
        </div>
        <div v-if="stats?.data_sources?.length" class="d-flex flex-wrap ga-1 mt-1">
          <v-chip
            size="x-small"
            color="teal"
            variant="tonal"
            class="font-weight-medium"
            prepend-icon="mdi-database-outline"
          >{{ stats?.data_sources?.[0]?.name }}</v-chip>
        </div>
      </template>
    </v-card-item>

    <v-card-text class="text-body-2 text-grey-darken-1 text-justify flex-grow-1">
      {{ observatory?.description }}
    </v-card-text>

    <v-card class="px-4 pb-4 d-flex justify-space-between align-center flex-shrink-0">
      <div class="text-left">
        <div class="text-caption font-weight-bold text-grey-darken-1" style="line-height: 1;">VISTAS</div>
        <div class="text-h5 font-weight-bold">{{ observatory.view_count ?? 0 }}</div>
      </div>

      <v-btn
        @click="$emit('show-details', observatory)"
        color="secondary-blue"
        rounded="lg"
        size="large"
        class="text-white font-weight-bold text-none px-10"
        height="55"
      >
        Ver Más
      </v-btn>
    </v-card>

  </v-card>
</template>

<script setup lang="ts">
import { type ObservatoryDTO, type ObservatoryStatsDTO } from '@/types/index.types';

defineProps<{
  observatory: ObservatoryDTO;
  stats?: ObservatoryStatsDTO;
  statsLoading: boolean;
}>();

defineEmits(['show-details']);
</script>
