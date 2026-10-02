<template>
  <v-container max-width="1200" class="py-8">

    <v-row class="mb-6" align="center">
      <v-col cols="12" md="7" data-tour="cat-header">
        <h1 class="text-h4 font-weight-black mb-1">Catálogos</h1>
        <p class="text-body-1 text-grey-darken-1">Explora y administra las dimensiones de tus observatorios.</p>
      </v-col>
      <v-col cols="12" md="5" data-tour="cat-search">
        <v-text-field
          v-model="searchQuery"
          variant="solo-filled"
          flat
          rounded="pill"
          prepend-inner-icon="mdi-magnify"
          placeholder="Buscar por nombre o valor..."
          hide-details
          clearable
          bg-color="surface"
        />
      </v-col>
    </v-row>

    <!-- Type filter (none selected = all types) -->
    <div class="d-flex flex-wrap align-center ga-2 mb-6" data-tour="cat-types">
      <span class="text-body-2 text-grey-darken-1 mr-1">Tipo:</span>
      <v-chip-group v-model="selectedTypes" multiple column selected-class="text-primary">
        <v-chip
          v-for="t in CATALOG_TYPES"
          :key="t"
          :value="t"
          filter
          variant="outlined"
          size="small"
          class="font-weight-bold"
        >
          {{ t }}
        </v-chip>
      </v-chip-group>
      <v-btn
        v-if="selectedTypes.length"
        variant="text"
        size="small"
        class="text-none"
        @click="selectedTypes = []"
      >
        Todos
      </v-btn>
    </div>

    <!-- Loading -->
    <v-row v-if="loading && !page">
      <v-col v-for="n in 6" :key="n" cols="12" sm="6" md="4">
        <v-skeleton-loader type="card" rounded="xl" />
      </v-col>
    </v-row>

    <!-- Error -->
    <v-row v-else-if="error" justify="center">
      <v-col cols="12" md="6" class="text-center">
        <v-alert type="error" rounded="xl" :text="error" />
      </v-col>
    </v-row>

    <!-- Cards -->
    <v-row v-else :class="{ 'opacity-60': loading }">
      <v-col v-for="(catalog, index) in catalogs" :key="catalog.catalog_id" cols="12" sm="6" md="4" :data-tour="index === 0 ? 'cat-first-card' : undefined">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :elevation="isHovering ? 6 : 2"
            rounded="xl"
            class="h-100 transition-swing d-flex flex-column"
            @click="goToCatalog(catalog)"
          >
            <v-card-item class="pb-2 pt-5">
              <template #prepend>
                <v-avatar color="primary-lighten-1" variant="tonal" rounded="lg">
                  <v-icon>mdi-database-outline</v-icon>
                </v-avatar>
              </template>
              <v-card-title class="text-h6 font-weight-bold text-wrap" style="line-height: 1.2;">
                {{ catalog.name }}
              </v-card-title>
              <v-card-subtitle class="text-caption font-monospace mt-1 font-weight-bold text-primary">
                {{ catalog.value }}
              </v-card-subtitle>
            </v-card-item>

            <v-card-text class="flex-grow-1">
              <div class="d-flex flex-wrap ga-2 mt-2">
                <v-chip size="small" variant="flat" color="secondary-blue" class="font-weight-bold">
                  {{ catalog.catalog_type }}
                </v-chip>
              </div>
            </v-card-text>

            <v-divider />

            <v-card-actions class="pa-4 bg-grey-lighten-4">
              <v-spacer />
              <v-btn
                :to="{ name: 'CatalogDetails', params: { catalogId: catalog.catalog_id } }"
                color="black"
                variant="text"
                append-icon="mdi-arrow-right"
                class="text-none font-weight-bold"
              >
                Ver elementos
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <!-- Tour replay button -->
    <v-tooltip text="Ver tutorial" location="left">
      <template #activator="{ props: tp }">
        <v-btn v-bind="tp" icon="mdi-help-circle-outline" variant="tonal" color="primary" size="small"
               style="position:fixed;bottom:24px;right:24px;z-index:200;" @click="replayTour" />
      </template>
    </v-tooltip>

    <!-- Pagination -->
    <div
      v-if="!error && page && page.total > 0"
      class="d-flex flex-wrap align-center justify-center ga-4 mt-8"
    >
      <v-btn
        variant="tonal"
        prepend-icon="mdi-chevron-left"
        class="text-none"
        :disabled="pageIndex === 0 || loading"
        @click="pageIndex--"
      >
        Anterior
      </v-btn>
      <span class="text-body-2 text-grey-darken-1">
        Página {{ pageIndex + 1 }} de {{ totalPages }} · {{ page.total }} catálogos
      </span>
      <v-btn
        variant="tonal"
        append-icon="mdi-chevron-right"
        class="text-none"
        :disabled="!page.has_more || loading"
        @click="pageIndex++"
      >
        Siguiente
      </v-btn>
    </div>

    <!-- Empty state -->
    <v-row v-if="!loading && !error && page?.total === 0" justify="center" class="mt-10">
      <v-col cols="12" class="text-center">
        <v-empty-state
          icon="mdi-database-search-outline"
          title="Ningún catálogo coincide con estos filtros"
          :text="hasFilters ? 'Prueba con otro término de búsqueda u otros tipos.' : 'Aún no hay catálogos registrados.'"
        >
          <template v-if="hasFilters" #actions>
            <v-btn color="primary" variant="flat" class="text-none" prepend-icon="mdi-filter-remove-outline" @click="clearFilters">
              Limpiar filtros
            </v-btn>
          </template>
        </v-empty-state>
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useTour } from '@/composables/useTour';
import { useRouter } from 'vue-router';
import { useJubStore } from '@/stores/jub';
import { type CatalogPageDTO, type CatalogSummaryDTO, type CatalogType } from '@/types/index.types';

definePage({
  name: 'Catalogs',
  meta: { requiresAuth: true, layout: 'dashboard' },
});

const CATALOG_TYPES: CatalogType[] = ['INTEREST', 'TEMPORAL', 'SPATIAL', 'OBSERVABLE', 'REFERENCE'];
const PAGE_SIZE = 24;
const SEARCH_DEBOUNCE_MS = 300;

const router = useRouter();
const store  = useJubStore();

const searchQuery   = ref<string | null>('');
const debouncedQ    = ref('');
const selectedTypes = ref<CatalogType[]>([]);
const pageIndex     = ref(0);

const page    = ref<CatalogPageDTO | null>(null);
const loading = ref(false);
const error   = ref<string | null>(null);

const catalogs   = computed<CatalogSummaryDTO[]>(() => page.value?.items ?? []);
const totalPages = computed(() => (page.value ? Math.max(1, Math.ceil(page.value.total / page.value.limit)) : 1));
const hasFilters = computed(() => selectedTypes.value.length > 0 || !!debouncedQ.value);

let controller: AbortController | null = null;

async function loadPage() {
  controller?.abort();
  const ctrl = new AbortController();
  controller = ctrl;
  loading.value = true;
  error.value = null;
  try {
    page.value = await store.fetchCatalogPage({
      catalog_type: selectedTypes.value,
      q: debouncedQ.value,
      skip: pageIndex.value * PAGE_SIZE,
      limit: PAGE_SIZE,
    }, ctrl.signal);
  } catch (e: any) {
    if (e?.name === 'AbortError') return;
    error.value = e?.detail ?? 'Error al cargar los catálogos';
  } finally {
    if (controller === ctrl) loading.value = false;
  }
}

// Debounce typing before it becomes the `q` filter.
let searchTimer: ReturnType<typeof setTimeout> | undefined;
watch(searchQuery, (val) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => { debouncedQ.value = (val ?? '').trim(); }, SEARCH_DEBOUNCE_MS);
});

// Any filter change goes back to the first page.
watch([debouncedQ, selectedTypes], () => {
  if (pageIndex.value !== 0) pageIndex.value = 0; // triggers loadPage via the pageIndex watcher
  else loadPage();
}, { deep: true });

watch(pageIndex, () => loadPage());

function clearFilters() {
  clearTimeout(searchTimer);
  searchQuery.value = '';
  debouncedQ.value = '';
  selectedTypes.value = [];
}

const goToCatalog = (catalog: CatalogSummaryDTO) => {
  router.push({ name: 'CatalogDetails', params: { catalogId: catalog.catalog_id } });
};

const catalogTourSteps = [
  { element: '[data-tour="cat-header"]',     popover: { title: 'Catálogos',             description: 'Los catálogos definen los valores válidos para VS, VT y VI. Aquí puedes explorar cada dimensión de los observatorios.', side: 'bottom' as const } },
  { element: '[data-tour="cat-search"]',     popover: { title: 'Buscar catálogo',        description: 'Filtra la lista por nombre o valor del catálogo.', side: 'bottom' as const } },
  { element: '[data-tour="cat-types"]',      popover: { title: 'Filtrar por tipo',       description: 'Selecciona uno o varios tipos de catálogo. Sin selección se muestran todos.', side: 'bottom' as const } },
  { element: '[data-tour="cat-first-card"]', popover: { title: 'Catálogo',    description: 'Muestra el nombre, identificador y tipo del catálogo (SPATIAL, TEMPORAL, INTEREST). Haz clic en "Ver elementos" para explorar sus valores.', side: 'bottom' as const } },
];

const { startTour, replayTour } = useTour(catalogTourSteps, { pageKey: 'catalogs' });

onMounted(async () => {
  await loadPage();
  await nextTick();
  startTour();
});

onBeforeUnmount(() => {
  clearTimeout(searchTimer);
  controller?.abort();
});
</script>


<!-- <template>
  <v-container max-width="1200" class="py-8">
    
    <v-row class="mb-6" align="center">
      <v-col cols="12" md="7">
        <h1 class="text-h4 font-weight-black mb-1">Catálogos</h1>
        <p class="text-body-1 text-grey-darken-1">Explora y administra las dimensiones de tus observatorios.</p>
      </v-col>
      
      <v-col cols="12" md="5">
        <v-text-field
          v-model="searchQuery"
          variant="solo-filled"
          flat
          rounded="pill"
          prepend-inner-icon="mdi-magnify"
          placeholder="Buscar por nombre o valor..."
          hide-details
          clearable
          bg-color="surface"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="catalog in filteredCatalogs" :key="catalog.catalog_id" cols="12" sm="6" md="4">
        
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :elevation="isHovering ? 6 : 2"
            rounded="xl"
            class="h-100 transition-swing d-flex flex-column"
            @click="goToCatalog(catalog)"
          >
            <v-card-item class="pb-2 pt-5">
              <template v-slot:prepend>
                <v-avatar color="primary-lighten-1" variant="tonal" rounded="lg">
                  <v-icon>mdi-database-outline</v-icon>
                </v-avatar>
              </template>
              <v-card-title class="text-h6 font-weight-bold text-wrap" style="line-height: 1.2;">
                {{ catalog.name }}
              </v-card-title>
              <v-card-subtitle class="text-caption font-monospace mt-1 font-weight-bold text-primary">
                {{ catalog.value }}
              </v-card-subtitle>
            </v-card-item>

            <v-card-text class="flex-grow-1">
              <div class="d-flex flex-wrap ga-2 mt-2">
                <v-chip size="small" variant="flat" color="secondary-blue" class="font-weight-bold">
                  {{ catalog.catalog_type }}
                </v-chip>
                
                <v-chip size="small" variant="tonal" color="grey-darken-2" class="font-weight-medium">
                  Nivel: {{ catalog.level }}
                </v-chip>
                
                <v-chip v-if="catalog.parent_catalog_id" size="small" variant="outlined" color="teal" class="font-weight-medium">
                  <v-icon start size="small">mdi-file-tree</v-icon> Subcatálogo
                </v-chip>
              </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions class="pa-4 bg-grey-lighten-4">
              <v-spacer></v-spacer>
              <v-btn 
                :to="{ name: 'CatalogDetails', params: { catalogId: catalog.catalog_id } }"
                color="black" 
                variant="text" 
                append-icon="mdi-arrow-right" 
                class="text-none font-weight-bold"
              >
                Ver Ítems
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>

      </v-col>
    </v-row>

    <v-row v-if="filteredCatalogs.length === 0" justify="center" class="mt-10">
      <v-col cols="12" class="text-center">
        <v-empty-state
          icon="mdi-database-search-outline"
          title="No se encontraron catálogos"
          text="Intenta con otro término de búsqueda o crea un nuevo catálogo."
        ></v-empty-state>
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

definePage({
  name: 'Catalogs',
  meta: {
    requiresAuth: true,
    layout: 'dashboard',
  },
});

const router = useRouter();
const searchQuery = ref('');

interface CatalogDTO {
  catalog_id: string;
  root_group_id?: string | null;
  name: string;
  value: string; // UpperSnakeStr
  catalog_type: string; // Enum CatalogType
  parent_catalog_id?: string | null;
  level: number;
}

const catalogs = ref<CatalogDTO[]>([
  {
    catalog_id: 'cat_001',
    name: 'Variables de Salud Pública',
    value: 'VAR_SALUD',
    catalog_type: 'SYSTEM',
    level: 0
  },
  {
    catalog_id: 'cat_002',
    name: 'Grupos de Edad Estándar',
    value: 'EDAD_ESTANDAR',
    catalog_type: 'DEMOGRAPHIC',
    level: 0
  },
  {
    catalog_id: 'cat_003',
    name: 'Subclasificación CIE-10',
    value: 'CIE_10_SUB',
    catalog_type: 'MEDICAL',
    parent_catalog_id: 'cat_010',
    level: 1
  },
  {
    catalog_id: 'cat_004',
    name: 'Entidades Federativas (México)',
    value: 'ESTADOS_MX',
    catalog_type: 'GEOGRAPHIC',
    level: 0
  },
  {
    catalog_id: 'cat_005',
    name: 'Sectores Económicos',
    value: 'SECTORES_ECON',
    catalog_type: 'USER_DEFINED',
    level: 0
  }
]);

const filteredCatalogs = computed(() => {
  if (!searchQuery.value) return catalogs.value;
  
  const query = searchQuery.value.toLowerCase();
  return catalogs.value.filter(cat => 
    cat.name.toLowerCase().includes(query) || 
    cat.value.toLowerCase().includes(query) ||
    cat.catalog_type.toLowerCase().includes(query)
  );
});

const goToCatalog = (catalog: CatalogDTO) => {
  console.log('Navegando al catálogo:', catalog.catalog_id);
  router.push({ name: 'CatalogDetails', params: { catalogId: catalog.catalog_id } });
};
</script> -->