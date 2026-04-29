<template>
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
        />
      </v-col>
    </v-row>

    <!-- Loading -->
    <v-row v-if="store.isLoading">
      <v-col v-for="n in 6" :key="n" cols="12" sm="6" md="4">
        <v-skeleton-loader type="card" rounded="xl" />
      </v-col>
    </v-row>

    <!-- Error -->
    <v-row v-else-if="store.error" justify="center">
      <v-col cols="12" md="6" class="text-center">
        <v-alert type="error" rounded="xl" :text="store.error" />
      </v-col>
    </v-row>

    <!-- Cards -->
    <v-row v-else>
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
                Ver Ítems
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <!-- Empty state -->
    <v-row v-if="!store.isLoading && filteredCatalogs.length === 0" justify="center" class="mt-10">
      <v-col cols="12" class="text-center">
        <v-empty-state
          icon="mdi-database-search-outline"
          title="No se encontraron catálogos"
          text="Intenta con otro término de búsqueda o crea un nuevo catálogo."
        />
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useJubStore } from '@/stores/jub';
import { type CatalogSummaryDTO } from '@/types/index.types';
// import { useCatalogsStore, type CatalogSummaryDTO } from '@/stor';

definePage({
  name: 'Catalogs',
  meta: { requiresAuth: true, layout: 'dashboard' },
});

const router     = useRouter();
const store      = useJubStore();
const searchQuery = ref('');

const filteredCatalogs = computed(() => {
  if (!searchQuery.value) return store.catalogs;
  const q = searchQuery.value.toLowerCase();
  return store.catalogs.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.value.toLowerCase().includes(q) ||
    c.catalog_type.toLowerCase().includes(q)
  );
});

const goToCatalog = (catalog: CatalogSummaryDTO) => {
  router.push({ name: 'CatalogDetails', params: { catalogId: catalog.catalog_id } });
};

onMounted(() => {
  // Only fetch if the store is empty (avoids redundant calls on back-navigation)
  if (store.catalogs.length === 0) store.fetchCatalogs();
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