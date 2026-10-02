<template>
  <v-container max-width="1400" class="py-8">

    <v-row justify="center" class="mb-8 mt-2">
      <v-col cols="12" >

        <div class="text-center mb-6" data-tour="dash-header">
          <h1 class="text-h3 font-weight-black mb-2">Observatorios</h1>
          <p class="text-body-1 text-grey-darken-1">
            Busca observatorios filtrando por región, período de tiempo y categorías de interés.
          </p>
        </div>

        <!-- Search card -->
        <v-card rounded="xl" elevation="3" class="border">
          <v-card-text class="pa-6">

            <v-row v-if="!advancedMode">

              <!-- ── VS: Espacio ── -->
              <v-col cols="12" md="4" data-tour="dash-vs">
                <div class="d-flex align-center ga-2 mb-3">
                  <v-avatar color="blue" variant="tonal" size="28" rounded="lg">
                    <v-icon size="16">mdi-map-marker-outline</v-icon>
                  </v-avatar>
                  <span class="text-subtitle-2 font-weight-bold">Variable Espacial</span>
                  <v-chip size="x-small" color="blue" variant="tonal" class="font-monospace font-weight-black">VS</v-chip>
                  <v-tooltip location="top" text="Actualizar">
                    <template #activator="{ props: rp }">
                      <v-icon v-bind="rp" size="16" :color="reloadingType === 'VS' ? 'blue' : 'grey-lighten-1'" :class="reloadingType === 'VS' ? 'mdi-spin cursor-pointer' : 'cursor-pointer'" @click="reloadItems('VS')">mdi-refresh</v-icon>
                    </template>
                  </v-tooltip>
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
              <v-col cols="12" md="4" data-tour="dash-vt">
                <div class="d-flex align-center ga-2 mb-3">
                  <v-avatar color="teal" variant="tonal" size="28" rounded="lg">
                    <v-icon size="16">mdi-calendar-outline</v-icon>
                  </v-avatar>
                  <span class="text-subtitle-2 font-weight-bold">Variable Temporal</span>
                  <v-chip size="x-small" color="teal" variant="tonal" class="font-monospace font-weight-black">VT</v-chip>
                  <v-tooltip location="top" text="Actualizar">
                    <template #activator="{ props: rp }">
                      <v-icon v-bind="rp" size="16" :color="reloadingType === 'VT' ? 'teal' : 'grey-lighten-1'" :class="reloadingType === 'VT' ? 'mdi-spin cursor-pointer' : 'cursor-pointer'" @click="reloadItems('VT')">mdi-refresh</v-icon>
                    </template>
                  </v-tooltip>
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
              <v-col cols="12" md="4" data-tour="dash-vi">
                <div class="d-flex align-center ga-2 mb-3">
                  <v-avatar color="green" variant="tonal" size="28" rounded="lg">
                    <v-icon size="16">mdi-tag-outline</v-icon>
                  </v-avatar>
                  <span class="text-subtitle-2 font-weight-bold">Variable de Interés</span>
                  <v-chip size="x-small" color="green" variant="tonal" class="font-monospace font-weight-black">VI</v-chip>
                  <v-tooltip location="top" text="Actualizar">
                    <template #activator="{ props: rp }">
                      <v-icon v-bind="rp" size="16" :color="reloadingType === 'VI' ? 'green' : 'grey-lighten-1'" :class="reloadingType === 'VI' ? 'mdi-spin cursor-pointer' : 'cursor-pointer'" @click="reloadItems('VI')">mdi-refresh</v-icon>
                    </template>
                  </v-tooltip>
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

            <v-textarea
              v-else
              v-model="advancedQuery"
              label="Consulta DSL"
              placeholder="jub.v1.VS(*).VT(*).VI(*)"
              variant="outlined"
              density="comfortable"
              rows="3"
              hide-details
              class="font-monospace"
              hint="Escribe directamente la consulta DSL."
            />

            <v-divider class="my-5" />

            <!-- Bottom bar: DSL + actions -->
            <div class="d-flex flex-column flex-md-row align-md-center justify-md-space-between ga-3">

              <!-- DSL preview -->
              <div class="d-flex align-center ga-2 flex-wrap min-w-0 w-100 w-md-auto" data-tour="dash-dsl">
                <v-icon size="small" color="grey-darken-1">mdi-code-braces</v-icon>
                <span class="text-caption font-weight-bold text-grey-darken-1 flex-shrink-0">Consulta:</span>
                <code
                  class="text-caption font-monospace px-2 py-1 rounded-lg text-primary text-truncate"
                  style="background: rgba(var(--v-theme-primary), .08); max-width: 100%; display: block;"
                >{{ advancedMode ? advancedQuery : computedDSL }}</code>
                <v-btn icon="mdi-content-copy" variant="text" size="x-small" color="grey" @click="copyDSL" />
              </div>

              <!-- Actions -->
              <div class="d-flex ga-2 ga-md-4 align-center flex-wrap" data-tour="dash-controls">
                <v-switch
                  v-model="advancedMode"
                  label="Modo avanzado"
                  density="compact"
                  hide-details
                  color="primary"
                  inset
                  class="flex-shrink-0"
                  @update:model-value="onToggleAdvanced"
                />
                <v-tooltip location="top" max-width="300" text="En modo estricto todos los términos de la consulta deben coincidir exactamente con los datos del observatorio.">
                  <template #activator="{ props: tp }">
                    <v-switch
                      v-bind="tp"
                      v-model="strict"
                      label="Búsqueda estricta"
                      density="compact"
                      hide-details
                      color="deep-purple"
                      inset
                      class="flex-shrink-0"
                    />
                  </template>
                </v-tooltip>
                <v-tooltip location="top" max-width="300" text="Omite el caché del servidor y fuerza una consulta fresca a la base de datos.">
                  <template #activator="{ props: tp }">
                    <v-switch
                      v-bind="tp"
                      v-model="noCache"
                      label="Sin caché"
                      density="compact"
                      hide-details
                      color="amber-darken-2"
                      inset
                      class="flex-shrink-0"
                    />
                  </template>
                </v-tooltip>
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
                  class="px-6 font-weight-bold w-100 w-md-auto"
                  :loading="jubStore.isLoading"
                  :disabled="searchCooldown > 0"
                  @click="handleSearchClick"
                >
                  {{ searchCooldown > 0 ? `Espera (${searchCooldown}s)` : 'Buscar' }}
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

    <!-- ── Búsquedas populares ── -->
    <v-row v-if="loadingObsSuggestions || obsSuggestions.length > 0" class="mt-2 mb-2">
      <v-col cols="12" lg="10" class="mx-auto" data-tour="dash-suggestions">
        <div class="d-flex align-center ga-2 mb-3">
          <v-icon size="18" color="grey-darken-2">mdi-trending-up</v-icon>
          <span class="text-caption font-weight-bold text-grey-darken-2 text-uppercase" style="letter-spacing: .06em;">Búsquedas populares</span>
        </div>

        <div v-if="loadingObsSuggestions && obsSuggestions.length === 0" class="d-flex flex-wrap ga-2">
          <v-skeleton-loader v-for="n in 4" :key="n" type="chip" width="180" />
        </div>

        <div v-else class="d-flex flex-wrap ga-2">
          <v-chip
            v-for="s in obsSuggestions"
            :key="s.query"
            variant="tonal"
            color="primary"
            size="default"
            class="font-monospace text-caption cursor-pointer"
            style="max-width: 340px;"
            @click="applyObsSuggestion(s.query)"
          >
            <span class="text-truncate">{{ s.query.length > 42 ? s.query.slice(0, 42) + '…' : s.query }}</span>
            <template #append>
              <v-chip size="x-small" color="primary" variant="flat" class="ml-2 font-weight-bold">{{ s.hit_count }}</v-chip>
            </template>
          </v-chip>
        </div>
      </v-col>
    </v-row>

    <!-- Results header -->
    <template v-if="searchCounter > 0">
      <v-row align="center" justify="space-between" class="mb-4" data-tour="dash-results-header">
        <v-col cols="auto" class="d-flex align-center ga-2">
          <span class="text-body-2 font-weight-bold text-grey-darken-1">
            {{ filteredObservatories.length }}
            observatorio{{ filteredObservatories.length !== 1 ? 's' : '' }}
            encontrado{{ filteredObservatories.length !== 1 ? 's' : '' }}
          </span>
          <v-chip v-if="advancedMode" size="x-small" color="primary" variant="tonal" prepend-icon="mdi-code-braces" class="font-weight-bold">
            Modo avanzado
          </v-chip>
          <v-chip v-if="strict" size="x-small" color="deep-purple" variant="tonal" prepend-icon="mdi-format-letter-case-upper" class="font-weight-bold">
            Búsqueda estricta
          </v-chip>
          <v-chip v-if="noCache" size="x-small" color="amber-darken-2" variant="tonal" prepend-icon="mdi-cached" class="font-weight-bold">
            Sin caché
          </v-chip>
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
        v-for="(obs, index) in filteredObservatories"
        :key="obs.observatory_id"
        cols="12" sm="6" md="4"
        :data-tour="index === 0 ? 'dash-first-card' : undefined"
      >
        <ObservatoryCard
          :observatory="obs"
          :stats="statsMap.get(obs.observatory_id)"
          :stats-loading="statsLoading"
          @show-details="goToDetails"
          class="h-100"
        />
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

    <!-- Load more -->
    <v-row v-if="canLoadMore && !jubStore.isLoading" justify="center" class="mt-6">
      <v-col cols="auto">
        <v-btn
          variant="tonal"
          color="primary"
          rounded="pill"
          :loading="loadingMore"
          prepend-icon="mdi-chevron-down"
          class="px-8 font-weight-bold text-none"
          @click="loadMore"
        >Cargar más</v-btn>
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

    <!-- Tour replay button -->
    <v-tooltip text="Ver tutorial" location="left">
      <template #activator="{ props: tp }">
        <v-btn v-bind="tp" icon="mdi-help-circle-outline" variant="tonal" color="primary" size="small"
               style="position:fixed;bottom:24px;right:24px;z-index:200;" @click="replayTour" />
      </template>
    </v-tooltip>

  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useTour } from '@/composables/useTour';
import { type ObservatoryDTO, type ObservatoryStatsDTO } from '@/types/index.types';
import { useJubStore } from '@/stores/jub';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

definePage({
  name: 'Dashboard',
  meta: { requiresAuth: true, layout: 'dashboard' },
});

const router    = useRouter();
const jubStore  = useJubStore();
const authStore = useAuthStore();

const showCreateDialog      = ref(false);
const filteredObservatories = ref<ObservatoryDTO[]>([]);
const viewMode              = ref<'grid' | 'table'>('grid');
const searchCounter         = ref(0);
const loadingItems          = ref(false);
const reloadingType         = ref<string | null>(null);
const typeMap               = { VS: 'SPATIAL', VT: 'TEMPORAL', VI: 'INTEREST' } as const;
const reloadItems           = async (key: 'VS' | 'VT' | 'VI') => {
  reloadingType.value = key;
  items.value[key] = await jubStore.fetchCatalogItemsByType(typeMap[key], true);
  reloadingType.value = null;
};
const copiedSnack           = ref(false);
const strict                = ref(false);
const noCache               = ref(false);
const advancedMode          = ref(false);
const advancedQuery         = ref('');
const statsLoading          = ref(false);
const statsMap              = ref(new Map<string, ObservatoryStatsDTO>());
const skip                  = ref(0);
const loadingMore           = ref(false);
const canLoadMore           = ref(false);
const pageSize              = computed(() => authStore.settings?.exploration?.items_per_page ?? 12);
const items = ref<Record<'VS' | 'VT' | 'VI', Array<{ title: string; value: string }>>>({
  VS: [], VT: [], VI: [],
});

const operators = ref({ vs: 'OR', vt: 'AND', vi: 'AND' });
const form      = ref({ vs: [] as string[], vt: [] as string[], vi: [] as string[] });

// ── Observatory suggestions ───────────────────────────────────────────────────
const OBS_SUGGESTIONS_KEY   = 'jub:suggestions:observatories';
const obsSuggestions        = ref<Array<{ query: string; hit_count: number }>>([]);
const loadingObsSuggestions = ref(false);

const loadObsSuggestions = async () => {
  const cached = localStorage.getItem(OBS_SUGGESTIONS_KEY);
  if (cached) {
    try { obsSuggestions.value = JSON.parse(cached); } catch { /* ignore */ }
  }
  loadingObsSuggestions.value = true;
  const res = await jubStore.fetchObservatorySuggestions();
  loadingObsSuggestions.value = false;
  if (res?.suggestions?.length) {
    obsSuggestions.value = res.suggestions;
    localStorage.setItem(OBS_SUGGESTIONS_KEY, JSON.stringify(res.suggestions));
  }
};

const applyObsSuggestion = (query: string) => {
  advancedMode.value  = true;
  advancedQuery.value = query;
  executeSearch();
};

const searchCooldown = ref(0);
let _searchTimer: ReturnType<typeof setInterval> | null = null;
const handleSearchClick = () => {
  if (searchCooldown.value > 0) return;
  searchCooldown.value = 3;
  _searchTimer = setInterval(() => {
    searchCooldown.value--;
    if (searchCooldown.value <= 0) { clearInterval(_searchTimer!); _searchTimer = null; }
  }, 1000);
  executeSearch();
};

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
  await navigator.clipboard.writeText(advancedMode.value ? advancedQuery.value : computedDSL.value);
  copiedSnack.value = true;
}

function parseDSL(dsl: string) {
  const m = dsl.match(/jub\.v1\.VS\(([^)]*)\)\.VT\(([^)]*)\)\.VI\(([^)]*)\)/);
  if (!m) return null;
  const seg = (s: string | null | undefined): { values: string[]; op: 'OR' | 'AND' } => {
    if (s === '*' || s === null || s === undefined) return { values: [], op: 'OR' };
    if (s.includes(' AND ')) return { values: s.split(' AND ').map(v => v.trim()), op: 'AND' };
    if (s.includes(' OR '))  return { values: s.split(' OR ').map(v => v.trim()),  op: 'OR'  };
    return { values: [s.trim()], op: 'OR' };
  };
  const vs = seg(m[1]), vt = seg(m[2]), vi = seg(m[3]);
  return { vs: vs.values, vt: vt.values, vi: vi.values, vsOp: vs.op, vtOp: vt.op, viOp: vi.op };
}

function onToggleAdvanced(val: boolean | null) {
  if (val) {
    advancedQuery.value = computedDSL.value;
  } else {
    const parsed = parseDSL(advancedQuery.value);
    if (parsed) {
      form.value      = { vs: parsed.vs, vt: parsed.vt, vi: parsed.vi };
      operators.value = { vs: parsed.vsOp, vt: parsed.vtOp, vi: parsed.viOp };
    }
  }
}

function resetForm() {
  form.value      = { vs: [], vt: [], vi: [] };
  operators.value = { vs: 'OR', vt: 'AND', vi: 'AND' };
}

async function executeSearch() {
  searchCounter.value++;
  skip.value = 0;
  statsMap.value = new Map();
  const query = advancedMode.value ? advancedQuery.value : computedDSL.value;
  const results = await jubStore.search_observatories(query, strict.value, 0, pageSize.value, noCache.value);
  filteredObservatories.value = results.slice().sort((a, b) => (b.view_count ?? 0) - (a.view_count ?? 0));
  canLoadMore.value = results.length === pageSize.value;
  if (filteredObservatories.value.length > 0) {
    statsLoading.value = true;
    const ids = filteredObservatories.value.map(o => o.observatory_id);
    const list = await jubStore.fetchObservatoryStats(ids);
    const m = new Map<string, ObservatoryStatsDTO>();
    for (const s of list) m.set(s.observatory_id, s);
    statsMap.value = m;
    statsLoading.value = false;
  }
}

async function loadMore() {
  loadingMore.value = true;
  skip.value += pageSize.value;
  const query = advancedMode.value ? advancedQuery.value : computedDSL.value;
  const more = await jubStore.search_observatories(query, strict.value, skip.value, pageSize.value, noCache.value);
  const sorted = more.slice().sort((a, b) => (b.view_count ?? 0) - (a.view_count ?? 0));
  filteredObservatories.value.push(...sorted);
  canLoadMore.value = more.length === pageSize.value;
  if (more.length > 0) {
    const ids = more.map(o => o.observatory_id);
    const list = await jubStore.fetchObservatoryStats(ids);
    const m = new Map(statsMap.value);
    for (const s of list) m.set(s.observatory_id, s);
    statsMap.value = m;
  }
  loadingMore.value = false;
}

function goToDetails(obs: ObservatoryDTO) {
  router.push({ name: 'ObservatoryDetails', params: { observatory_id: obs.observatory_id } });
}

const dashboardTourSteps = [
  { element: '[data-tour="dash-header"]',   popover: { title: 'Explora observatorios',      description: 'Desde aquí puedes buscar y explorar los observatorios disponibles en la plataforma.', side: 'bottom' as const } },
  { element: '[data-tour="dash-vs"]',        popover: { title: 'Variable Espacial (VS)',        description: 'Filtra observatorios por región geográfica: estado, municipio o país. Puedes elegir una o varias y combinarlas.', side: 'bottom' as const } },
  { element: '[data-tour="dash-vt"]',        popover: { title: 'Variable Temporal (VT)',        description: 'Filtra por año o período de tiempo. Combina varios períodos con el operador "Todos" o "Cualquiera".', side: 'bottom' as const } },
  { element: '[data-tour="dash-vi"]',        popover: { title: 'Variable de Interés (VI)',      description: 'Categorías temáticas como salud, demografía, economía, etc. Agrúpalas como necesites.', side: 'bottom' as const } },
  { element: '[data-tour="dash-dsl"]',       popover: { title: 'Vista previa de la consulta',              description: 'Aquí se muestra la consulta generada automáticamente con los filtros activos.', side: 'top' as const } },
  { element: '[data-tour="dash-controls"]',  popover: { title: 'Controles de búsqueda',         description: 'Activa "Modo avanzado" para escribir DSL directamente o "Búsqueda estricta" para coincidencias exactas. Usa "Buscar" para ejecutar.', side: 'top' as const } },
  { element: '[data-tour="dash-suggestions"]', popover: { title: 'Búsquedas populares',         description: 'Consultas frecuentes de otros usuarios. Haz clic en una para aplicarla directamente al formulario.', side: 'bottom' as const } },
];

const { startTour, replayTour } = useTour(dashboardTourSteps, { pageKey: 'dashboard' });

onMounted(async () => {
  loadObsSuggestions();
  loadingItems.value = true;
  const [VS, VT, VI] = await Promise.all([
    jubStore.fetchCatalogItemsByType('SPATIAL'),
    jubStore.fetchCatalogItemsByType('TEMPORAL'),
    jubStore.fetchCatalogItemsByType('INTEREST'),
  ]);
  items.value    = { VS, VT, VI };
  loadingItems.value = false;
  await executeSearch();
  await nextTick();
  startTour();
});
</script>

<style scoped>
.cursor-help { cursor: help; }
</style>
