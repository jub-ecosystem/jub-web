<template>
  <v-data-table
    :headers="headers"
    :items="items"
    item-value="observatory_id"
    hide-default-footer
    :items-per-page="-1"
    hover
  >
    <!-- Image -->
    <template #item.image="{ item }">
      <v-avatar size="36" rounded="lg" class="my-1">
        <v-img v-if="item.image_url" :src="item.image_url" cover />
        <v-icon v-else color="grey-lighten-1" size="20">mdi-telescope</v-icon>
      </v-avatar>
    </template>

    <!-- Nombre -->
    <template #item.title="{ item }">
      <span class="text-body-2 font-weight-medium">{{ item.title || 'Sin nombre' }}</span>
    </template>

    <!-- Descripción -->
    <template #item.description="{ item }">
      <span class="text-body-2 text-grey-darken-1">
        {{ item.description && item.description.length > 80 ? item.description.slice(0, 80) + '…' : (item.description || '–') }}
      </span>
    </template>

    <!-- Metadata -->
    <template #item.metadata="{ item }">
      <div class="d-flex flex-wrap ga-1 py-1">
        <template v-if="item.metadata && Object.keys(item.metadata).length">
          <v-chip
            v-for="([k, v]) in Object.entries(item.metadata).slice(0, 3)"
            :key="k"
            size="x-small"
            variant="tonal"
            color="grey-darken-1"
            class="font-weight-medium"
          >{{ v }}</v-chip>
          <span
            v-if="Object.keys(item.metadata).length > 3"
            class="text-caption text-grey-darken-1 align-self-center"
          >+{{ Object.keys(item.metadata).length - 3 }}</span>
        </template>
        <span v-else class="text-caption text-grey">–</span>
      </div>
    </template>

    <!-- Vistas -->
    <template #item.view_count="{ item }">
      <div class="d-flex align-center ga-1">
        <v-icon size="16" color="grey-darken-1">mdi-eye-outline</v-icon>
        <span class="text-body-2 font-weight-medium">{{ item.view_count ?? 0 }}</span>
      </div>
    </template>

    <!-- Fecha -->
    <template #item.created_at="{ item }">
      <span class="text-caption text-grey-darken-1">{{ getRelativeTime(item.created_at) }}</span>
    </template>

    <!-- Acciones -->
    <template #item.actions="{ item }">
      <v-btn
        size="small"
        color="primary"
        variant="tonal"
        class="text-none font-weight-bold"
        append-icon="mdi-arrow-right"
        @click="$emit('show-details', item)"
      >Ver</v-btn>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type ObservatoryDTO } from '@/types/index.types';
import { getRelativeTime } from '@/utils/date';

defineProps<{ items: ObservatoryDTO[] }>();
defineEmits(['show-details']);

const headers = computed(() => [
  { title: '',             key: 'image',       sortable: false, width: '60px'  },
  { title: 'Nombre',       key: 'title',       sortable: true                  },
  { title: 'Descripción',  key: 'description', sortable: false                 },
  { title: 'Metadata',     key: 'metadata',    sortable: false                 },
  { title: 'Vistas',       key: 'view_count',  sortable: true,  width: '90px'  },
  { title: 'Fecha',        key: 'created_at',  sortable: true,  width: '120px' },
  { title: '',             key: 'actions',     sortable: false, align: 'end' as const },
]);
</script>
