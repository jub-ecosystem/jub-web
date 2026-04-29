<template>
  <v-container max-width="1200" class="py-8">

    <!-- Header -->
    <v-row class="mb-6" align="center">
      <v-col cols="12" md="7">
        <h1 class="text-h4 font-weight-black mb-1">Fuentes de datos</h1>
        <p class="text-body-1 text-grey-darken-1">
          Conjuntos de datos indexados disponibles para consulta y análisis.
        </p>
      </v-col>
      <v-col cols="12" md="5">
        <v-text-field
          v-model="searchQuery"
          variant="solo-filled"
          flat
          rounded="pill"
          prepend-inner-icon="mdi-magnify"
          placeholder="Buscar por nombre o descripción..."
          hide-details
          clearable
          bg-color="surface"
        />
      </v-col>
    </v-row>

    <!-- Format filters -->
    <v-row class="mb-4">
      <v-col cols="12">
        <div class="d-flex flex-wrap ga-2 align-center">
          <span class="text-body-2 font-weight-bold text-grey-darken-2 mr-1">Formato:</span>
          <v-chip
            v-for="fmt in formatOptions"
            :key="fmt.value"
            :color="selectedFormat === fmt.value ? 'primary' : 'default'"
            :variant="selectedFormat === fmt.value ? 'flat' : 'tonal'"
            class="font-weight-bold cursor-pointer"
            size="small"
            @click="toggleFormat(fmt.value)"
          >
            <v-icon start size="small">{{ fmt.icon }}</v-icon>
            {{ fmt.label }}
          </v-chip>
        </div>
      </v-col>
    </v-row>

    <!-- Loading skeletons -->
    <v-row v-if="loading">
      <v-col v-for="n in 6" :key="n" cols="12" sm="6" md="4">
        <v-skeleton-loader type="card" rounded="xl" />
      </v-col>
    </v-row>

    <!-- Error -->
    <v-alert v-else-if="fetchError" type="error" rounded="xl" :text="fetchError" class="mb-4" />

    <!-- Cards grid -->
    <v-row v-else>
      <v-col
        v-for="source in filteredSources"
        :key="source.source_id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :elevation="isHovering ? 6 : 2"
            rounded="xl"
            class="h-100 d-flex flex-column transition-swing cursor-pointer"
            @click="goToSource(source)"
          >
            <v-card-item class="pb-2 pt-5">
              <template #prepend>
                <v-avatar :color="formatColor(source.format)" variant="tonal" rounded="lg">
                  <v-icon>{{ formatIcon(source.format) }}</v-icon>
                </v-avatar>
              </template>
              <v-card-title class="text-h6 font-weight-bold text-wrap" style="line-height: 1.2;">
                {{ source.name }}
              </v-card-title>
              <v-card-subtitle class="text-caption font-monospace mt-1 font-weight-bold text-primary">
                {{ source.source_id }}
              </v-card-subtitle>
            </v-card-item>

            <v-card-text class="flex-grow-1">
              <p class="text-body-2 text-grey-darken-1 mb-3">
                {{ source.description || 'Sin descripción.' }}
              </p>
              <div class="d-flex flex-wrap ga-2">
                <v-chip size="small" variant="flat" :color="formatColor(source.format)" class="font-weight-bold text-uppercase">
                  {{ source.format }}
                </v-chip>
                <v-chip v-if="source.bucket_id" size="small" variant="tonal" color="secondary" class="font-weight-medium">
                  <v-icon start size="small">mdi-bucket-outline</v-icon>
                  {{ source.bucket_id }}
                </v-chip>
              </div>
            </v-card-text>

            <v-divider />
            <v-card-actions class="pa-4">
              <v-spacer />
              <v-btn
                color="black"
                variant="text"
                append-icon="mdi-arrow-right"
                class="text-none font-weight-bold"
                @click.stop="goToSource(source)"
              >
                Ver registros
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <!-- Empty state -->
    <v-row v-if="!loading && filteredSources.length === 0" justify="center" class="mt-10">
      <v-col cols="12" class="text-center">
        <v-empty-state
          icon="mdi-database-search-outline"
          title="No se encontraron fuentes de datos"
          text="Intenta con otro término de búsqueda o cambia el filtro de formato."
        />
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useJubStore } from '@/stores/jub';
import type { DataSourceDTO, DataSourceFormat } from '@/types/index.types';

definePage({
  name: 'DataSources',
  meta: { requiresAuth: true, layout: 'dashboard' },
});

const router = useRouter();
const store  = useJubStore();

const sources     = ref<DataSourceDTO[]>([]);
const loading     = ref(false);
const fetchError  = ref<string | null>(null);
const searchQuery = ref('');
const selectedFormat = ref<DataSourceFormat | null>(null);

const formatOptions = [
  { value: 'csv',      label: 'CSV',      icon: 'mdi-file-delimited-outline' },
  { value: 'json',     label: 'JSON',     icon: 'mdi-code-json' },
  { value: 'postgres', label: 'Postgres', icon: 'mdi-elephant' },
  { value: 'mysql',    label: 'MySQL',    icon: 'mdi-database' },
  { value: 'mongodb',  label: 'MongoDB',  icon: 'mdi-leaf' },
] as const;

function toggleFormat(fmt: DataSourceFormat) {
  selectedFormat.value = selectedFormat.value === fmt ? null : fmt;
}

function formatIcon(fmt: string) {
  const map: Record<string, string> = {
    csv: 'mdi-file-delimited-outline',
    json: 'mdi-code-json',
    postgres: 'mdi-elephant',
    mysql: 'mdi-database',
    mongodb: 'mdi-leaf',
  };
  return map[fmt] ?? 'mdi-database-outline';
}

function formatColor(fmt: string) {
  const map: Record<string, string> = {
    csv:      'green',
    json:     'orange',
    postgres: 'blue-darken-2',
    mysql:    'orange-darken-2',
    mongodb:  'green-darken-2',
  };
  return map[fmt] ?? 'grey';
}

const filteredSources = computed(() => {
  let list = sources.value;
  if (selectedFormat.value) {
    list = list.filter(s => s.format === selectedFormat.value);
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.description?.toLowerCase().includes(q) ||
      s.source_id.toLowerCase().includes(q)
    );
  }
  return list;
});

function goToSource(source: DataSourceDTO) {
  router.push({ name: 'DataSourceDetail', params: { sourceId: source.source_id } });
}

onMounted(async () => {
  loading.value    = true;
  fetchError.value = null;
  const result = await store.fetchDataSources();
  if (result.length === 0 && store.error) {
    fetchError.value = store.error;
  } else {
    sources.value = result;
  }
  loading.value = false;
});
</script>
