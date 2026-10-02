<template>
  <v-container max-width="1200" class="py-8">

    <!-- Tour replay button -->
    <v-tooltip text="Ver tutorial" location="left">
      <template #activator="{ props: tp }">
        <v-btn v-bind="tp" icon="mdi-help-circle-outline" variant="tonal" color="primary" size="small"
               style="position:fixed;bottom:24px;right:24px;z-index:200;" @click="replayTour" />
      </template>
    </v-tooltip>

    <v-btn
      variant="text"
      prepend-icon="mdi-arrow-left"
      class="text-none font-weight-bold mb-4 px-0"
      :to="{ name: 'DataSources' }"
    >
      Volver a Fuentes de datos
    </v-btn>

    <!-- Loading header -->
    <template v-if="loadingSource">
      <v-skeleton-loader type="heading" class="mb-6" />
      <v-skeleton-loader type="table" rounded="xl" />
    </template>

    <template v-else-if="source">

      <!-- Header card -->
      <v-card
        rounded="xl"
        elevation="1"
        class="mb-6 border-s-lg"
        data-tour="dsd-header"
        style="border-left-color: rgb(var(--v-theme-primary)) !important;"
      >
        <v-card-text class="d-flex align-center justify-space-between flex-wrap ga-4 pa-6">
          <div>
            <div class="d-flex align-center ga-3 mb-1 flex-wrap">
              <v-avatar :color="formatColor(source.format)" variant="tonal" rounded="lg" size="36">
                <v-icon>{{ formatIcon(source.format) }}</v-icon>
              </v-avatar>
              <h1 class="text-h4 font-weight-black">{{ source.name }}</h1>
              <v-chip color="primary" variant="flat" size="small" class="font-monospace font-weight-bold">
                {{ source.source_id }}
              </v-chip>
            </div>
            <p class="text-body-1 text-grey-darken-1 mb-0 ml-12">
              {{ source.description || 'Sin descripción.' }}
            </p>
          </div>
          <div class="d-flex ga-2 flex-wrap">
            <v-chip :color="formatColor(source.format)" variant="flat" class="font-weight-bold text-uppercase">
              {{ source.format }}
            </v-chip>
            <v-btn
              color="primary"
              variant="tonal"
              prepend-icon="mdi-help-circle-outline"
              class="text-none font-weight-bold"
              size="small"
              :to="{ name: 'QueryGuide' }"
            >
              Cómo consultar
            </v-btn>
          </div>
        </v-card-text>
      </v-card>

      <!-- Tabs -->
      <v-tabs v-model="activeTab" color="primary" class="mb-4" data-tour="dsd-tabs">
        <v-tab value="records" prepend-icon="mdi-table">
          Registros
        </v-tab>
        <v-tab value="query" prepend-icon="mdi-console">
          Consulta DSL
        </v-tab>
      </v-tabs>

      <!-- ── TAB: RECORDS ── -->
      <v-window v-model="activeTab">
        <v-window-item value="records">

          <!-- Filter & search bar -->
          <v-row class="mb-3" align="center" data-tour="dsd-records-bar">
            <v-col cols="12" md="6">
              <v-text-field
                v-model="recordSearch"
                variant="outlined"
                density="comfortable"
                rounded="lg"
                prepend-inner-icon="mdi-magnify"
                placeholder="Filtrar por ID espacial, temporal o de interés..."
                hide-details
                clearable
                bg-color="surface"
              />
            </v-col>
            <v-col cols="12" md="6" class="d-flex justify-end align-center ga-2">
              <v-select
                v-model="recordsPerPage"
                :items="[25, 50, 100]"
                variant="outlined"
                density="compact"
                hide-details
                style="max-width: 110px;"
                prefix="Ver:"
              />
              <v-btn
                color="primary"
                variant="tonal"
                prepend-icon="mdi-refresh"
                :loading="loadingRecords"
                class="text-none font-weight-bold"
                @click="loadRecords"
              >
                Cargar
              </v-btn>
            </v-col>
          </v-row>

          <!-- Records table -->
          <v-card rounded="xl" elevation="2" class="overflow-hidden border" data-tour="dsd-table">
            <v-skeleton-loader v-if="loadingRecords" type="table" />

            <template v-else>
              <v-table v-if="filteredRecords.length > 0" hover>
                <thead class="bg-grey-lighten-4">
                  <tr>
                    <th class="font-weight-bold text-uppercase text-caption">ID Registro</th>
                    <th class="font-weight-bold text-uppercase text-caption">Espacial (VS)</th>
                    <th class="font-weight-bold text-uppercase text-caption">Temporal (VT)</th>
                    <th class="font-weight-bold text-uppercase text-caption">Interés (VI)</th>
                    <th class="font-weight-bold text-uppercase text-caption">Numérico</th>
                    <th class="font-weight-bold text-uppercase text-caption text-right">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="record in pagedRecords" :key="record.record_id">
                    <td class="font-monospace text-caption text-grey-darken-2">
                      {{ record.record_id.slice(0, 12) }}…
                    </td>
                    <td>
                      <v-chip size="x-small" color="blue" variant="tonal" class="font-weight-bold font-monospace">
                        {{ record.spatial_id }}
                      </v-chip>
                    </td>
                    <td class="text-body-2 text-grey-darken-1">
                      {{ formatTemporal(record.temporal_id) }}
                    </td>
                    <td>
                      <div class="d-flex flex-wrap ga-1 py-1">
                        <v-chip
                          v-for="id in record.interest_ids.slice(0, 3)"
                          :key="id"
                          size="x-small"
                          color="teal"
                          variant="tonal"
                          class="font-monospace"
                        >
                          {{ id }}
                        </v-chip>
                        <v-chip
                          v-if="record.interest_ids.length > 3"
                          size="x-small"
                          color="grey"
                          variant="tonal"
                        >
                          +{{ record.interest_ids.length - 3 }}
                        </v-chip>
                        <span v-if="record.interest_ids.length === 0" class="text-caption text-grey-lighten-1">—</span>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex flex-wrap ga-1 py-1">
                        <v-chip
                          v-for="(val, key) in record.numerical_interest_ids"
                          :key="key"
                          size="x-small"
                          color="purple"
                          variant="tonal"
                          class="font-monospace"
                        >
                          {{ key }}: {{ val }}
                        </v-chip>
                        <span v-if="Object.keys(record.numerical_interest_ids).length === 0" class="text-caption text-grey-lighten-1">—</span>
                      </div>
                    </td>
                    <td class="text-right">
                      <v-btn
                        icon="mdi-eye-outline"
                        variant="text"
                        size="small"
                        color="grey-darken-1"
                        @click="openRawPayload(record)"
                      />
                    </td>
                  </tr>
                </tbody>
              </v-table>

              <div v-else class="pa-10 text-center">
                <v-icon size="52" color="grey-lighten-1" class="mb-3">mdi-table-off</v-icon>
                <div class="text-body-1 text-grey-darken-1 mb-2">No hay registros cargados.</div>
                <div class="text-body-2 text-grey">Presiona <strong>Cargar</strong> para obtener los registros de esta fuente.</div>
              </div>
            </template>

            <!-- Pagination -->
            <v-divider v-if="filteredRecords.length > recordsPerPage" />
            <div v-if="filteredRecords.length > recordsPerPage" class="d-flex justify-space-between align-center pa-3 bg-grey-lighten-5">
              <span class="text-caption text-grey-darken-1">
                {{ filteredRecords.length }} registros — página {{ currentPage }} de {{ totalPages }}
              </span>
              <v-pagination
                v-model="currentPage"
                :length="totalPages"
                density="compact"
                rounded="lg"
              />
            </div>
          </v-card>

        </v-window-item>

        <!-- ── TAB: DSL QUERY ── -->
        <v-window-item value="query">

          <v-card rounded="xl" elevation="1" class="mb-4 pa-5" data-tour="dsd-dsl">
            <div class="d-flex align-center ga-2 mb-3">
              <v-icon color="primary">mdi-console</v-icon>
              <span class="text-h6 font-weight-bold">Consulta DSL</span>
              <v-spacer />
              <v-btn
                variant="text"
                size="small"
                prepend-icon="mdi-help-circle-outline"
                class="text-none text-grey-darken-1"
                :to="{ name: 'QueryGuide' }"
              >
                Ver guía completa
              </v-btn>
            </div>

            <!-- Quick reference chips -->
            <div class="d-flex flex-wrap ga-2 mb-4">
              <span class="text-caption font-weight-bold text-grey-darken-2 align-self-center">Ejemplos:</span>
              <v-chip
                v-for="ex in queryExamples"
                :key="ex.query"
                size="small"
                variant="tonal"
                color="primary"
                class="font-monospace cursor-pointer"
                @click="dslQuery = ex.query"
              >
                {{ ex.label }}
              </v-chip>
            </div>

            <v-textarea
              v-model="dslQuery"
              variant="outlined"
              rounded="lg"
              rows="3"
              auto-grow
              placeholder="jub.v1.VS(MX).VT(2024).VI(MASCULINO)"
              class="font-monospace"
              hide-details
              bg-color="surface"
            />

            <div class="d-flex align-center ga-3 mt-4 flex-wrap">
              <v-select
                v-model="queryLimit"
                :items="[25, 50, 100, 250]"
                variant="outlined"
                density="compact"
                hide-details
                style="max-width: 120px;"
                prefix="Límite:"
              />
              <v-btn
                color="primary"
                variant="flat"
                prepend-icon="mdi-play"
                :loading="loadingQuery"
                :disabled="!dslQuery.trim()"
                class="text-none font-weight-bold"
                @click="runQuery"
              >
                Ejecutar
              </v-btn>
              <v-btn
                v-if="queryResults.length > 0"
                variant="text"
                color="grey-darken-1"
                prepend-icon="mdi-close"
                class="text-none"
                @click="queryResults = []"
              >
                Limpiar
              </v-btn>
            </div>

            <!-- Query error -->
            <v-alert
              v-if="queryError"
              type="error"
              variant="tonal"
              rounded="lg"
              class="mt-4"
              :text="queryError"
            />
          </v-card>

          <!-- Query results -->
          <v-card v-if="queryResults.length > 0 || loadingQuery" rounded="xl" elevation="2" class="overflow-hidden border">
            <div class="pa-4 d-flex align-center ga-2 bg-grey-lighten-5">
              <v-icon color="success" size="small">mdi-check-circle</v-icon>
              <span class="text-body-2 font-weight-bold">{{ queryResults.length }} registros encontrados</span>
            </div>
            <v-divider />

            <v-skeleton-loader v-if="loadingQuery" type="table" />

            <v-table v-else hover>
              <thead class="bg-grey-lighten-4">
                <tr>
                  <th class="font-weight-bold text-uppercase text-caption">ID Registro</th>
                  <th class="font-weight-bold text-uppercase text-caption">Espacial (VS)</th>
                  <th class="font-weight-bold text-uppercase text-caption">Temporal (VT)</th>
                  <th class="font-weight-bold text-uppercase text-caption">Interés (VI)</th>
                  <th class="font-weight-bold text-uppercase text-caption">Numérico</th>
                  <th class="font-weight-bold text-uppercase text-caption text-right">Detalle</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="record in queryResults" :key="record.record_id">
                  <td class="font-monospace text-caption text-grey-darken-2">
                    {{ record.record_id.slice(0, 12) }}…
                  </td>
                  <td>
                    <v-chip size="x-small" color="blue" variant="tonal" class="font-weight-bold font-monospace">
                      {{ record.spatial_id }}
                    </v-chip>
                  </td>
                  <td class="text-body-2 text-grey-darken-1">{{ formatTemporal(record.temporal_id) }}</td>
                  <td>
                    <div class="d-flex flex-wrap ga-1 py-1">
                      <v-chip
                        v-for="id in record.interest_ids.slice(0, 3)"
                        :key="id"
                        size="x-small"
                        color="teal"
                        variant="tonal"
                        class="font-monospace"
                      >{{ id }}</v-chip>
                      <v-chip v-if="record.interest_ids.length > 3" size="x-small" color="grey" variant="tonal">
                        +{{ record.interest_ids.length - 3 }}
                      </v-chip>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex flex-wrap ga-1 py-1">
                      <v-chip
                        v-for="(val, key) in record.numerical_interest_ids"
                        :key="key"
                        size="x-small"
                        color="purple"
                        variant="tonal"
                        class="font-monospace"
                      >{{ key }}: {{ val }}</v-chip>
                    </div>
                  </td>
                  <td class="text-right">
                    <v-btn icon="mdi-eye-outline" variant="text" size="small" color="grey-darken-1" @click="openRawPayload(record)" />
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>

          <!-- No results yet -->
          <v-card v-if="!loadingQuery && queryResults.length === 0 && !queryError" rounded="xl" elevation="1" class="pa-10 text-center">
            <v-icon size="52" color="grey-lighten-1" class="mb-3">mdi-database-search-outline</v-icon>
            <div class="text-body-1 text-grey-darken-1 mb-1">Escribe una consulta DSL y presiona <strong>Ejecutar</strong>.</div>
            <div class="text-body-2 text-grey">
              ¿Primera vez? <router-link :to="{ name: 'QueryGuide' }" class="text-primary font-weight-bold">Lee la guía de búsqueda</router-link>.
            </div>
          </v-card>

        </v-window-item>
      </v-window>

    </template>

    <!-- Raw payload dialog -->
    <v-dialog v-model="rawDialog" max-width="700" scrollable>
      <v-card rounded="xl">
        <v-card-title class="pa-5 d-flex align-center ga-2">
          <v-icon color="primary">mdi-code-braces</v-icon>
          Payload original del registro
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-0">
          <pre class="pa-5 text-caption font-monospace" style="white-space: pre-wrap; word-break: break-all; background: #f8f9fa;">{{ JSON.stringify(selectedRecord?.raw_payload, null, 2) }}</pre>
        </v-card-text>
        <v-divider />
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn variant="text" class="text-none" @click="rawDialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useJubStore } from '@/stores/jub';
import { useTour } from '@/composables/useTour';
import type { DataSourceDTO, DataRecord } from '@/types/index.types';

definePage({
  name: 'DataSourceDetail',
  meta: { 
    requiresAuth: true, 
    layout: 'dashboard' 
},
});

const route = useRoute('DataSourceDetail');
const store = useJubStore();

const sourceId = computed(() => route.params.sourceId as string);

const source        = ref<DataSourceDTO | null>(null);
const loadingSource = ref(false);

// Records tab
const records        = ref<DataRecord[]>([]);
const loadingRecords = ref(false);
const recordSearch   = ref('');
const recordsPerPage = ref(25);
const currentPage    = ref(1);

// Query tab
const activeTab     = ref('records');
const dslQuery      = ref('');
const queryLimit    = ref(100);
const queryResults  = ref<DataRecord[]>([]);
const loadingQuery  = ref(false);
const queryError    = ref<string | null>(null);

// Raw payload dialog
const rawDialog     = ref(false);
const selectedRecord = ref<DataRecord | null>(null);

const queryExamples = [
  { label: 'VS(MX)', query: 'jub.v1.VS(MX)' },
  { label: 'VS(MX).VT(2024)', query: 'jub.v1.VS(MX).VT(2024)' },
  { label: 'VS(TAMPS).VI(MASCULINO)', query: 'jub.v1.VS(TAMPS).VI(MASCULINO)' },
  { label: 'VS(MX).VO(AVG(AGE))', query: 'jub.v1.VS(MX).VO(AVG(AGE))' },
];

const filteredRecords = computed(() => {
  if (!recordSearch.value) return records.value;
  const q = recordSearch.value.toLowerCase();
  return records.value.filter(r =>
    r.record_id.toLowerCase().includes(q) ||
    r.spatial_id.toLowerCase().includes(q) ||
    r.temporal_id.toLowerCase().includes(q) ||
    r.interest_ids.some(id => id.toLowerCase().includes(q))
  );
});

const totalPages = computed(() => Math.ceil(filteredRecords.value.length / recordsPerPage.value));

const pagedRecords = computed(() => {
  const start = (currentPage.value - 1) * recordsPerPage.value;
  return filteredRecords.value.slice(start, start + recordsPerPage.value);
});

function formatIcon(fmt: string) {
  const map: Record<string, string> = {
    csv: 'mdi-file-delimited-outline', json: 'mdi-code-json',
    postgres: 'mdi-elephant', mysql: 'mdi-database', mongodb: 'mdi-leaf',
  };
  return map[fmt] ?? 'mdi-database-outline';
}

function formatColor(fmt: string) {
  const map: Record<string, string> = {
    csv: 'green', json: 'orange', postgres: 'blue-darken-2',
    mysql: 'orange-darken-2', mongodb: 'green-darken-2',
  };
  return map[fmt] ?? 'grey';
}

function formatTemporal(iso: string) {
  if (!iso) return '—';
  try {
    return new Intl.DateTimeFormat('es-MX', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function openRawPayload(record: DataRecord) {
  selectedRecord.value = record;
  rawDialog.value = true;
}

async function loadRecords() {
  loadingRecords.value = true;
  currentPage.value    = 1;
  const result = await store.queryDataSource(sourceId.value, 'jub.v1.VS(*)', recordsPerPage.value, 0);
  console.log('Loaded records:', result);
  records.value = result;
  loadingRecords.value = false;
}

async function runQuery() {
  queryError.value   = null;
  queryResults.value = [];
  loadingQuery.value  = true;
  const result = await store.queryDataSource(sourceId.value, dslQuery.value, queryLimit.value, 0);
  if (store.error) {
    queryError.value = store.error;
  } else {
    queryResults.value = result;
  }
  loadingQuery.value = false;
}

const dsdTourSteps = [
  { element: '[data-tour="dsd-header"]',      popover: { title: 'Fuente de datos',     description: 'Nombre, identificador, formato y descripción de esta fuente. Puedes consultar cómo usarla en la guía DSL.', side: 'bottom' as const } },
  { element: '[data-tour="dsd-tabs"]',         popover: { title: 'Pestañas',            description: '"Registros" muestra los datos cargados. "Consulta DSL" permite ejecutar consultas directamente sobre esta fuente.', side: 'bottom' as const } },
  { element: '[data-tour="dsd-records-bar"]',  popover: { title: 'Filtrar registros',   description: 'Filtra los registros por ID espacial, temporal o de interés. Ajusta cuántos ver por página y recarga con el botón Cargar.', side: 'bottom' as const } },
  { element: '[data-tour="dsd-table"]',        popover: { title: 'Tabla de registros',  description: 'Cada fila es un registro con su ID, región (VS), período (VT), intereses (VI) y variables numéricas. Haz clic en el ojo para ver el payload completo.', side: 'top' as const } },
];

const { startTour, replayTour } = useTour(dsdTourSteps, { pageKey: 'datasource-detail' });

onMounted(async () => {
  loadingSource.value = true;
  source.value = await store.fetchDataSource(sourceId.value);
  loadingSource.value = false;
  await loadRecords();
  await nextTick();
  startTour();
});
</script>
