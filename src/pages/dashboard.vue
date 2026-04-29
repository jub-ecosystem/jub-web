<template>
  <v-container max-width="1400" class="py-8">

    <v-row justify="center" class="mb-8 mt-2">
      <v-col cols="12" lg="10">

        <div class="text-center mb-6">
          <h1 class="text-h3 font-weight-black mb-2">Observatorios</h1>
          <p class="text-body-1 text-grey-darken-1">
            Busca observatorios filtrando por región, período de tiempo y categorías de interés.
          </p>
        </div>

        <!-- Search card -->
        <v-card rounded="xl" elevation="3" class="border">
          <v-card-text class="pa-6">

            <v-row>

              <!-- ── VS: Espacio ── -->
              <v-col cols="12" md="4">
                <div class="d-flex align-center ga-2 mb-3">
                  <v-avatar color="blue" variant="tonal" size="28" rounded="lg">
                    <v-icon size="16">mdi-map-marker-outline</v-icon>
                  </v-avatar>
                  <span class="text-subtitle-2 font-weight-bold">Región geográfica</span>
                  <v-chip size="x-small" color="blue" variant="tonal" class="font-monospace font-weight-black">VS</v-chip>
                  <v-tooltip location="top" max-width="280" text="Filtra por entidad, estado o país. Selecciona una o varias regiones de la lista.">
                    <template #activator="{ props: tp }">
                      <v-icon v-bind="tp" size="16" color="grey-lighten-1" class="cursor-help">mdi-help-circle-outline</v-icon>
                    </template>
                  </v-tooltip>
                </div>

                <v-autocomplete
                  v-model="form.vs"
                  :items="items.VS"
                  :loading="loadingItems"
                  item-title="title"
                  item-value="value"
                  label="Selecciona regiones"
                  placeholder="Todas las regiones"
                  multiple
                  chips
                  closable-chips
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  clearable
                  no-data-text="Sin resultados"
                />

                <!-- Operator panel -->
                <div v-if="form.vs.length > 1" class="mt-2 rounded-lg pa-3 border" style="border-color: rgba(var(--v-theme-blue), .3) !important; background: rgba(var(--v-theme-blue), .04);">
                  <p class="text-caption text-grey-darken-2 mb-2">
                    ¿Cómo deben coincidir las regiones seleccionadas?
                  </p>
                  <v-btn-toggle v-model="operators.vs" mandatory color="blue" variant="outlined" density="compact" rounded="lg" class="w-100 mb-2">
                    <v-btn value="OR" class="flex-grow-1 text-none text-caption font-weight-bold">
                      <v-icon start size="14">mdi-set-none</v-icon>
                      Cualquiera (ó)
                    </v-btn>
                    <v-btn value="AND" class="flex-grow-1 text-none text-caption font-weight-bold">
                      <v-icon start size="14">mdi-set-all</v-icon>
                      Todas (y)
                    </v-btn>
                  </v-btn-toggle>
                  <p class="text-caption text-grey-darken-1 mb-0" v-html="buildSentence(form.vs, operators.vs, 'la región')" />
                </div>
              </v-col>

              <!-- ── VT: Tiempo ── -->
              <v-col cols="12" md="4">
                <div class="d-flex align-center ga-2 mb-3">
                  <v-avatar color="teal" variant="tonal" size="28" rounded="lg">
                    <v-icon size="16">mdi-calendar-outline</v-icon>
                  </v-avatar>
                  <span class="text-subtitle-2 font-weight-bold">Período de tiempo</span>
                  <v-chip size="x-small" color="teal" variant="tonal" class="font-monospace font-weight-black">VT</v-chip>
                  <v-tooltip location="top" max-width="280" text="Filtra por año o período. Se envía el código numérico del período (ej: 2024).">
                    <template #activator="{ props: tp }">
                      <v-icon v-bind="tp" size="16" color="grey-lighten-1" class="cursor-help">mdi-help-circle-outline</v-icon>
                    </template>
                  </v-tooltip>
                </div>

                <v-autocomplete
                  v-model="form.vt"
                  :items="items.VT"
                  :loading="loadingItems"
                  item-title="title"
                  item-value="value"
                  label="Selecciona períodos"
                  placeholder="Todos los períodos"
                  multiple
                  chips
                  closable-chips
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  clearable
                  no-data-text="Sin resultados"
                />

                <div v-if="form.vt.length > 1" class="mt-2 rounded-lg pa-3 border" style="border-color: rgba(var(--v-theme-teal), .3) !important; background: rgba(var(--v-theme-teal), .04);">
                  <p class="text-caption text-grey-darken-2 mb-2">
                    ¿Cómo deben coincidir los períodos seleccionados?
                  </p>
                  <v-btn-toggle v-model="operators.vt" mandatory color="teal" variant="outlined" density="compact" rounded="lg" class="w-100 mb-2">
                    <v-btn value="AND" class="flex-grow-1 text-none text-caption font-weight-bold">
                      <v-icon start size="14">mdi-set-all</v-icon>
                      Todos (y)
                    </v-btn>
                    <v-btn value="OR" class="flex-grow-1 text-none text-caption font-weight-bold">
                      <v-icon start size="14">mdi-set-none</v-icon>
                      Cualquiera (ó)
                    </v-btn>
                  </v-btn-toggle>
                  <p class="text-caption text-grey-darken-1 mb-0" v-html="buildSentence(form.vt, operators.vt, 'el período')" />
                </div>
              </v-col>

              <!-- ── VI: Intereses ── -->
              <v-col cols="12" md="4">
                <div class="d-flex align-center ga-2 mb-3">
                  <v-avatar color="green" variant="tonal" size="28" rounded="lg">
                    <v-icon size="16">mdi-tag-outline</v-icon>
                  </v-avatar>
                  <span class="text-subtitle-2 font-weight-bold">Categoría de interés</span>
                  <v-chip size="x-small" color="green" variant="tonal" class="font-monospace font-weight-black">VI</v-chip>
                  <v-tooltip location="top" max-width="280" text="Variables de clasificación como sexo, grupo de edad, diagnóstico, etc.">
                    <template #activator="{ props: tp }">
                      <v-icon v-bind="tp" size="16" color="grey-lighten-1" class="cursor-help">mdi-help-circle-outline</v-icon>
                    </template>
                  </v-tooltip>
                </div>

                <v-autocomplete
                  v-model="form.vi"
                  :items="items.VI"
                  :loading="loadingItems"
                  item-title="title"
                  item-value="value"
                  label="Selecciona categorías"
                  placeholder="Todas las categorías"
                  multiple
                  chips
                  closable-chips
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  clearable
                  no-data-text="Sin resultados"
                />

                <div v-if="form.vi.length > 1" class="mt-2 rounded-lg pa-3 border" style="border-color: rgba(var(--v-theme-green), .3) !important; background: rgba(var(--v-theme-green), .04);">
                  <p class="text-caption text-grey-darken-2 mb-2">
                    ¿Cómo deben coincidir las categorías seleccionadas?
                  </p>
                  <v-btn-toggle v-model="operators.vi" mandatory color="green" variant="outlined" density="compact" rounded="lg" class="w-100 mb-2">
                    <v-btn value="AND" class="flex-grow-1 text-none text-caption font-weight-bold">
                      <v-icon start size="14">mdi-set-all</v-icon>
                      Todas (y)
                    </v-btn>
                    <v-btn value="OR" class="flex-grow-1 text-none text-caption font-weight-bold">
                      <v-icon start size="14">mdi-set-none</v-icon>
                      Cualquiera (ó)
                    </v-btn>
                  </v-btn-toggle>
                  <p class="text-caption text-grey-darken-1 mb-0" v-html="buildSentence(form.vi, operators.vi, 'la categoría')" />
                </div>
              </v-col>

            </v-row>

            <v-divider class="my-5" />

            <!-- Bottom bar: DSL + actions -->
            <div class="d-flex align-center justify-space-between flex-wrap ga-3">

              <!-- DSL preview -->
              <div class="d-flex align-center ga-2 flex-wrap min-w-0">
                <v-icon size="small" color="grey-darken-1">mdi-code-braces</v-icon>
                <span class="text-caption font-weight-bold text-grey-darken-1 flex-shrink-0">Consulta:</span>
                <code
                  class="text-caption font-monospace px-2 py-1 rounded-lg text-primary text-truncate"
                  style="background: rgba(var(--v-theme-primary), .08); max-width: 380px; display: block;"
                >{{ computedDSL }}</code>
                <v-btn icon="mdi-content-copy" variant="text" size="x-small" color="grey" @click="copyDSL" />
              </div>

              <!-- Actions -->
              <div class="d-flex ga-2 align-center flex-shrink-0">
                <v-btn
                  variant="text"
                  color="grey-darken-1"
                  size="small"
                  prepend-icon="mdi-refresh"
                  class="text-none"
                  :disabled="form.vs.length === 0 && form.vt.length === 0 && form.vi.length === 0"
                  @click="resetForm"
                >
                  Limpiar
                </v-btn>
                <v-btn
                  color="primary"
                  variant="flat"
                  rounded="pill"
                  prepend-icon="mdi-magnify"
                  class="px-6 font-weight-bold"
                  :loading="jubStore.isLoading"
                  @click="executeSearch"
                >
                  Buscar
                </v-btn>
              </div>
            </div>

          </v-card-text>
        </v-card>

        <!-- Guide link -->
        <div class="d-flex justify-center mt-3">
          <v-btn
            variant="text"
            color="grey-darken-1"
            prepend-icon="mdi-help-circle-outline"
            size="small"
            class="text-none"
            :to="{ name: 'QueryGuide' }"
          >
            ¿Cómo realizar búsquedas usando identificadores?
          </v-btn>
        </div>

      </v-col>
    </v-row>

    <!-- Results header -->
    <template v-if="searchCounter > 0">
      <v-row align="center" justify="space-between" class="mb-4">
        <v-col cols="auto">
          <span class="text-body-2 font-weight-bold text-grey-darken-1">
            {{ filteredObservatories.length }}
            observatorio{{ filteredObservatories.length !== 1 ? 's' : '' }}
            encontrado{{ filteredObservatories.length !== 1 ? 's' : '' }}
          </span>
        </v-col>
        <v-col cols="auto">
          <v-btn-toggle
            v-model="viewMode"
            color="primary"
            variant="outlined"
            divided
            rounded="pill"
            density="comfortable"
            mandatory
          >
            <v-btn value="grid"  icon="mdi-view-grid-outline" size="small" />
            <v-btn value="table" icon="mdi-table"             size="small" />
          </v-btn-toggle>
        </v-col>
      </v-row>
      <v-divider class="mb-6" />
    </template>

    <!-- Loading -->
    <v-row v-if="jubStore.isLoading" justify="center" class="mt-6">
      <v-col cols="auto">
        <v-progress-circular indeterminate color="primary" size="48" />
      </v-col>
    </v-row>

    <!-- Grid results -->
    <v-row v-else-if="viewMode === 'grid' && filteredObservatories.length > 0" class="d-flex align-stretch">
      <v-col
        v-for="obs in filteredObservatories"
        :key="obs.observatory_id"
        cols="12" sm="6" md="4"
      >
        <ObservatoryCard :observatory="obs" @show-details="goToDetails" class="h-100" />
      </v-col>
    </v-row>

    <!-- Table results -->
    <v-row v-else-if="viewMode === 'table' && filteredObservatories.length > 0">
      <v-col cols="12">
        <v-card rounded="xl" elevation="2" class="overflow-hidden border">
          <ObservatoryTables :items="filteredObservatories" @show-details="goToDetails" />
        </v-card>
      </v-col>
    </v-row>

    <!-- No results after search -->
    <v-row
      v-else-if="searchCounter > 0 && filteredObservatories.length === 0 && !jubStore.isLoading"
      justify="center"
      class="mt-6"
    >
      <v-col cols="12" md="8">
        <v-card rounded="xl" elevation="0" color="transparent" class="text-center pa-8">
          <v-empty-state
            icon="mdi-package-variant-remove"
            headline="Sin resultados"
            title="No hay observatorios que coincidan con esta consulta."
            text="Intenta con otros identificadores, cambia el operador AND/OR, o deja los campos vacíos para ver todos."
            action-text="Crear Observatorio"
            color="primary"
            action-color="black"
            @click:action="showCreateDialog = true"
          />
        </v-card>
      </v-col>
    </v-row>

    <!-- Initial state -->
    <v-row v-else-if="searchCounter === 0 && !jubStore.isLoading" justify="center" class="mt-4">
      <v-col cols="12" class="text-center">
        <v-icon size="80" color="grey-lighten-2" class="mb-3">mdi-home-city-outline</v-icon>
        <p class="text-body-1 text-grey-darken-1">
          Configura los filtros y presiona <strong>Buscar</strong> para explorar los observatorios.
        </p>
      </v-col>
    </v-row>

    <CreateObservatoryDialog
      :model-value="showCreateDialog"
      @update:model-value="showCreateDialog = $event"
    />

    <v-snackbar v-model="copiedSnack" :timeout="2000" color="success" rounded="pill">
      <v-icon start>mdi-check</v-icon> Consulta copiada
    </v-snackbar>

  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { type ObservatoryDTO } from '@/types/index.types';
import { useJubStore } from '@/stores/jub';
import { useRouter } from 'vue-router';

definePage({
  name: 'Dashboard',
  meta: { requiresAuth: true, layout: 'dashboard' },
});

const router   = useRouter();
const jubStore = useJubStore();

const showCreateDialog      = ref(false);
const filteredObservatories = ref<ObservatoryDTO[]>([]);
const viewMode              = ref<'grid' | 'table'>('grid');
const searchCounter         = ref(0);
const loadingItems          = ref(false);
const copiedSnack           = ref(false);

const items = ref<Record<'VS' | 'VT' | 'VI', Array<{ title: string; value: string }>>>({
  VS: [], VT: [], VI: [],
});

const operators = ref({ vs: 'OR', vt: 'AND', vi: 'AND' });
const form      = ref({ vs: [] as string[], vt: [] as string[], vi: [] as string[] });

// Build readable sentence for the operator preview
function buildSentence(arr: string[], op: string, noun: string): string {
  const conj = op === 'OR' ? ' <b>ó</b> ' : ' <b>y</b> ';
  return `Observatorios donde ${noun} sea ${arr.join(conj)}`;
}

function buildGroup(arr: string[], op: string) {
  return arr.join(` ${op} `);
}

const computedDSL = computed(() => {
  const vs = form.value.vs.length > 0 ? buildGroup(form.value.vs, operators.value.vs) : '*';
  const vt = form.value.vt.length > 0 ? buildGroup(form.value.vt, operators.value.vt) : '*';
  const vi = form.value.vi.length > 0 ? buildGroup(form.value.vi, operators.value.vi) : '*';
  return `jub.v1.VS(${vs}).VT(${vt}).VI(${vi})`;
});

async function copyDSL() {
  await navigator.clipboard.writeText(computedDSL.value);
  copiedSnack.value = true;
}

function resetForm() {
  form.value      = { vs: [], vt: [], vi: [] };
  operators.value = { vs: 'OR', vt: 'AND', vi: 'AND' };
}

async function executeSearch() {
  searchCounter.value++;
  filteredObservatories.value = await jubStore.search_observatories(computedDSL.value);
}

function goToDetails(obs: ObservatoryDTO) {
  router.push({ name: 'ObservatoryDetails', params: { observatory_id: obs.observatory_id } });
}

onMounted(async () => {
  loadingItems.value = true;
  const [VS, VT, VI] = await Promise.all([
    jubStore.fetchCatalogItemsByType('SPATIAL'),
    jubStore.fetchCatalogItemsByType('TEMPORAL'),
    jubStore.fetchCatalogItemsByType('INTEREST'),
  ]);
  items.value    = { VS, VT, VI };
  loadingItems.value = false;
  await executeSearch();
});
</script>

<style scoped>
.cursor-help { cursor: help; }
</style>
