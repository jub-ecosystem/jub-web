
<template>
  <v-container max-width="1200" class="py-8">

    <v-btn
      variant="text"
      prepend-icon="mdi-arrow-left"
      class="text-none font-weight-bold mb-4 px-0"
      @click="goBack"
    >
      Volver a Catálogos
    </v-btn>

    <!-- Tour replay button -->
    <v-tooltip text="Ver tutorial" location="left">
      <template #activator="{ props: tp }">
        <v-btn v-bind="tp" icon="mdi-help-circle-outline" variant="tonal" color="primary" size="small"
               style="position:fixed;bottom:24px;right:24px;z-index:200;" @click="replayTour" />
      </template>
    </v-tooltip>

    <!-- Loading -->
    <template v-if="loading">
      <v-skeleton-loader type="heading" class="mb-8" />
      <v-skeleton-loader type="table" rounded="xl" />
    </template>

    <!-- Error -->
    <v-alert v-else-if="error" type="error" rounded="xl" :text="error" class="mb-6" />

    <template v-else-if="catalog">

      <!-- Header -->
      <v-card rounded="xl" elevation="1" class="mb-8 border-s-lg" style="border-left-color: rgb(var(--v-theme-primary)) !important;" data-tour="catd-header">
        <v-card-text class="d-flex align-center justify-space-between flex-wrap ga-4 pa-6">
          <div>
            <div class="d-flex align-center ga-3 mb-1">
              <h1 class="text-h4 font-weight-black">{{ catalog.name }}</h1>
              <v-chip color="primary" variant="flat" size="small" class="font-monospace font-weight-bold">
                {{ catalog.value }}
              </v-chip>
            </div>
            <p class="text-body-1 text-grey-darken-1 mb-0">
              Gestiona los elementos, códigos y alias de esta dimensión.
            </p>
          </div>
          <div class="d-flex ga-2">
            <v-chip prepend-icon="mdi-tag-outline" color="secondary-blue" variant="tonal" class="font-weight-bold">
              {{ catalog.catalog_type }}
            </v-chip>
          </div>
        </v-card-text>
      </v-card>

      <!-- Search & actions -->
      <v-row class="mb-2" align="center">
        <v-col cols="12" md="6" data-tour="catd-search">
          <v-text-field
            v-model="searchItem"
            variant="outlined"
            density="comfortable"
            rounded="lg"
            prepend-inner-icon="mdi-magnify"
            placeholder="Buscar elemento por nombre, código o alias..."
            hide-details
            clearable
            bg-color="surface"
          />
        </v-col>
        <v-col cols="12" md="6" />
      </v-row>

      <!-- Table -->
      <v-card rounded="xl" elevation="2" class="overflow-hidden border" data-tour="catd-table">
        <v-table hover>
          <thead class="bg-grey-lighten-4">
            <tr>
              <th class="text-left font-weight-bold text-uppercase text-caption">Código</th>
              <th class="text-left font-weight-bold text-uppercase text-caption">Valor</th>
              <th class="text-left font-weight-bold text-uppercase text-caption">Nombre / Descripción</th>
              <th class="text-left font-weight-bold text-uppercase text-caption">Tipo de Dato</th>
              <th class="text-left font-weight-bold text-uppercase text-caption">Alias Conocidos</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.catalog_item_id">
              <td class="font-weight-medium text-grey-darken-2">{{ item.code }}</td>
              <td>
                <v-chip size="small" variant="tonal" color="primary-darken-1" class="font-monospace font-weight-bold">
                  {{ item.value }}
                </v-chip>
              </td>
              <td class="font-weight-bold">{{ item.name }}</td>
              <td>
                <v-chip size="x-small" variant="outlined" color="grey-darken-2" class="font-weight-bold">
                  {{ item.value_type }}
                </v-chip>
              </td>
              <td>
                <div class="d-flex flex-wrap ga-1 py-2">
                  <v-chip
                    v-for="alias in item.aliases"
                    :key="alias.catalog_item_alias_id"
                    size="x-small"
                    color="grey-lighten-2"
                    variant="flat"
                    class="text-grey-darken-3 font-weight-medium"
                  >
                    {{ alias.value }}
                  </v-chip>
                  <span v-if="item.aliases.length === 0" class="text-caption text-grey-lighten-1">
                    Sin alias
                  </span>
                </div>
              </td>
              <td />
            </tr>
          </tbody>
        </v-table>

        <div v-if="filteredItems.length === 0" class="pa-8 text-center">
          <v-icon size="48" color="grey-lighten-1" class="mb-2">mdi-text-box-search-outline</v-icon>
          <div class="text-body-1 text-grey-darken-1">No se encontraron ítems que coincidan con la búsqueda.</div>
        </div>
      </v-card>

    </template>

  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useTour } from '@/composables/useTour';
import { useRouter, useRoute } from 'vue-router';
import { useJubStore } from '@/stores/jub';
import { type CatalogItemDTO, type CatalogResponseDTO } from '@/types/index.types';
// import { useCatalogDetailsStore } from '@/stores/catalog-details.store';

definePage({
  name: 'CatalogDetails',
  meta: { requiresAuth: true, layout: 'dashboard' },
});

const router    = useRouter();
const route     = useRoute('CatalogDetails');
const store     = useJubStore();
const searchItem = ref('');

const catalog = ref<CatalogResponseDTO | null>(null);
const loading = ref(false);
const error   = ref<string | null>(null);

let controller: AbortController | null = null;

async function loadCatalog(catalogId: string) {
  controller?.abort();
  const ctrl = new AbortController();
  controller = ctrl;
  loading.value = true;
  error.value   = null;
  catalog.value = null;
  try {
    catalog.value = await store.fetchCatalog(catalogId, ctrl.signal);
  } catch (e: any) {
    if (e?.name === 'AbortError') return;
    error.value = e?.status === 404 ? 'El catálogo no existe' : (e?.detail || 'Error al cargar el catálogo');
  } finally {
    if (controller === ctrl) loading.value = false;
  }
}

// Flatten items + all descendants for the table (handles children recursively)
function flattenItems(items: CatalogItemDTO[]): CatalogItemDTO[] {
  return items.flatMap(item => [item, ...flattenItems(item.children ?? [])]);
}

const filteredItems = computed(() => {
  const flat = flattenItems(catalog.value?.items ?? []);
  if (!searchItem.value) return flat;
  const q = searchItem.value.toLowerCase();
  return flat.filter(item =>
    item.name.toLowerCase().includes(q) ||
    item.value.toLowerCase().includes(q) ||
    item.code.toString().includes(q) ||
    item.aliases.some(a => a.value.toLowerCase().includes(q))
  );
});

const goBack = () => router.push({ name: 'Catalogs' });

const catalogDetailTourSteps = [
  { element: '[data-tour="catd-header"]', popover: { title: 'Detalle del catálogo',  description: 'Nombre, tipo e identificador del catálogo. El tipo indica si pertenece a la dimensión espacial, temporal o de interés.', side: 'bottom' as const } },
  { element: '[data-tour="catd-search"]', popover: { title: 'Buscar elemento',           description: 'Filtra la tabla por nombre, código numérico, valor DSL o alias del elemento.', side: 'bottom' as const } },
  { element: '[data-tour="catd-table"]',  popover: { title: 'Tabla de elementos',        description: 'Cada fila es un valor válido con su código, valor DSL, nombre, tipo de dato y alias conocidos. El valor DSL es el que usas en las búsquedas.', side: 'top' as const } },
];

const { startTour, replayTour } = useTour(catalogDetailTourSteps, { pageKey: 'catalog-detail' });

onMounted(async () => {
  await loadCatalog(route.params.catalogId as string);
  await nextTick();
  startTour();
});

// Same component is reused when navigating between catalogs.
watch(() => route.params.catalogId, (id, prev) => {
  if (id && id !== prev) {
    searchItem.value = '';
    loadCatalog(id as string);
  }
});

onBeforeUnmount(() => controller?.abort());
</script>