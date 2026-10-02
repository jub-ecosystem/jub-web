<template>
  <v-container max-width="1400" class="py-8">

    <!-- Tour replay button -->
    <v-tooltip text="Ver tutorial" location="left">
      <template #activator="{ props: tp }">
        <v-btn v-bind="tp" icon="mdi-help-circle-outline" variant="tonal" color="primary" size="small"
               style="position:fixed;bottom:24px;right:24px;z-index:200;" @click="replayTour" />
      </template>
    </v-tooltip>

    <!-- Header -->
    <v-row class="mb-4" align="center" data-tour="plot-header">
      <v-col cols="12" md="8">
        <div class="d-flex align-center ga-3 mb-1">
          <h1 class="text-h4 font-weight-black">Generador de gráficas</h1>
          <v-chip
            color="amber-darken-2"
            variant="tonal"
            prepend-icon="mdi-flask-outline"
            size="small"
            class="font-weight-bold"
          >Experimental</v-chip>
        </div>
        <p class="text-body-1 text-grey-darken-1">
          Selecciona una fuente de datos, configura los filtros y genera gráficos interactivos.
        </p>
      </v-col>
      <v-col cols="12" md="4" class="d-flex justify-end">
        <v-btn color="primary" size="large" prepend-icon="mdi-plus" rounded="xl" class="font-weight-bold text-none" @click="openBuilder()">
          Nueva Gráfica
        </v-btn>
      </v-col>
    </v-row>

    <!-- Experimental notice -->
    <v-alert
      type="warning"
      variant="tonal"
      rounded="xl"
      icon="mdi-flask-outline"
      class="mb-6"
      data-tour="plot-notice"
    >
      <div class="font-weight-bold mb-1">Funcionalidad experimental</div>
      Esta herramienta se encuentra en etapa experimental y estará disponible de forma completa en la
      <strong>Etapa 2</strong> del proyecto, para los observatorios:
      <strong>Azomalli, IMA, Kawak, KAexla y Alerta</strong>.
      Algunas funciones pueden no estar disponibles o cambiar sin previo aviso.
    </v-alert>

    <!-- Panels grid -->
    <v-row v-if="panels.length > 0">
      <v-col v-for="(panel, index) in panels" :key="panel.id" cols="12" md="6" xl="4" :data-tour="index === 0 ? 'plot-first-panel' : undefined">
        <v-card rounded="xl" elevation="3" class="h-100 border d-flex flex-column">
          <v-card-title class="d-flex justify-space-between align-center pt-4 px-4">
            <span class="text-h6 font-weight-bold text-truncate">{{ panel.title }}</span>
            <div class="d-flex ga-1">
              <v-btn icon="mdi-pencil-outline" variant="text" size="small" color="grey-darken-1" @click="openBuilder(panel)" />
              <v-btn icon="mdi-close" variant="text" size="small" color="error" @click="removePanel(panel.id)" />
            </div>
          </v-card-title>
          <v-card-subtitle class="px-4 pb-2 d-flex align-center ga-2 flex-wrap">
            <v-chip v-if="panel.sourceName" size="x-small" variant="tonal" color="grey-darken-1" prepend-icon="mdi-database-outline">
              {{ panel.sourceName }}
            </v-chip>
            <v-chip size="x-small" variant="tonal" color="primary" class="font-monospace">{{ panel.dsl }}</v-chip>
          </v-card-subtitle>
          <v-card-text class="flex-grow-1 pa-4">
            <div v-if="panel.loading" class="d-flex justify-center align-center" style="min-height:300px;">
              <v-progress-circular indeterminate color="primary" />
            </div>
            <v-alert v-else-if="panel.error" type="error" variant="tonal" rounded="lg" class="mt-2" :text="panel.error" />
            <v-chart v-else class="w-100" style="min-height:300px;" :option="panel.chartOptions" autoresize />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Empty state -->
    <v-row v-else justify="center" class="mt-8">
      <v-col cols="12" md="6" class="text-center">
        <v-icon size="96" color="grey-lighten-2" class="mb-4">mdi-chart-bar</v-icon>
        <h3 class="text-h5 font-weight-bold mb-2 text-grey-darken-1">Sin gráficas todavía</h3>
        <p class="text-body-2 text-grey mb-6">
          Selecciona una fuente de datos, configura los filtros y genera tu primera visualización.
        </p>
        <div class="d-flex ga-3 justify-center flex-wrap">
          <v-btn color="primary" prepend-icon="mdi-plus" rounded="xl" class="text-none font-weight-bold" @click="openBuilder()">
            Nueva Gráfica
          </v-btn>
          <v-btn variant="tonal" color="grey-darken-1" prepend-icon="mdi-help-circle-outline" rounded="xl" class="text-none" :to="{ name: 'QueryGuide' }">
            Ver guía de consultas
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- ── Builder Dialog ── -->
    <v-dialog v-model="showBuilder" max-width="1020" scrollable>
      <v-card rounded="xl">

        <!-- Dialog header -->
        <v-card-title class="d-flex align-center justify-space-between pa-6 pb-4">
          <div class="d-flex align-center ga-2">
            <v-icon color="primary">{{ editingPanelId ? 'mdi-pencil' : 'mdi-chart-bar-stacked' }}</v-icon>
            <span class="text-h6 font-weight-bold">
              {{ editingPanelId ? 'Editar gráfica' : 'Nueva gráfica' }}
            </span>
          </div>
          <div class="d-flex ga-1 align-center">
            <v-btn variant="text" size="small" prepend-icon="mdi-help-circle-outline" class="text-none text-grey-darken-1" :to="{ name: 'QueryGuide' }" @click="showBuilder = false">
              Guía DSL
            </v-btn>
            <v-btn icon="mdi-close" variant="text" size="small" @click="showBuilder = false" />
          </div>
        </v-card-title>

        <v-divider />

        <v-card-text class="pa-6">

          <!-- Chart title -->
          <v-text-field
            v-model="form.title"
            label="Título de la gráfica"
            variant="outlined"
            density="comfortable"
            placeholder="Ej: Promedio de edad por sexo en México 2024"
            prepend-inner-icon="mdi-format-title"
            hide-details
            class="mb-6"
          />

          <!-- ════════════════════════════════════════════
               STEP 1 — Fuente de datos
               ════════════════════════════════════════════ -->
          <div class="d-flex align-center ga-3 mb-3">
            <v-avatar color="primary" variant="flat" size="30" class="text-white font-weight-black text-body-2 flex-shrink-0">1</v-avatar>
            <div>
              <span class="text-subtitle-2 font-weight-bold">Fuente de datos</span>
              <span class="text-caption text-grey-darken-1 ml-2">Selecciona el conjunto de datos a explorar</span>
            </div>
          </div>

          <v-autocomplete
            v-model="form.sourceId"
            :items="dataSources"
            :loading="loadingDataSources"
            item-title="name"
            item-value="source_id"
            label="Selecciona una fuente de datos"
            variant="outlined"
            density="comfortable"
            hide-details
            clearable
            no-data-text="Sin fuentes disponibles"
            class="mb-2"
            @update:model-value="onSourceChange"
          >
            <template #item="{ item, props: itemProps }">
              <v-list-item v-bind="itemProps">
                <template #prepend>
                  <v-avatar :color="formatColor(item.raw.format)" variant="tonal" rounded="lg" size="32">
                    <v-icon size="16">{{ formatIcon(item.raw.format) }}</v-icon>
                  </v-avatar>
                </template>
                <template #append>
                  <v-chip size="x-small" :color="formatColor(item.raw.format)" variant="tonal" class="font-monospace text-uppercase">
                    {{ item.raw.format }}
                  </v-chip>
                </template>
              </v-list-item>
            </template>
          </v-autocomplete>

          <v-divider class="my-5" />

          <!-- ════════════════════════════════════════════
               STEP 2 — Filtros VS / VT / VI
               ════════════════════════════════════════════ -->
          <div class="d-flex align-center ga-3 mb-4">
            <v-avatar color="blue" variant="flat" size="30" class="text-white font-weight-black text-body-2 flex-shrink-0">2</v-avatar>
            <div>
              <span class="text-subtitle-2 font-weight-bold">Filtros dimensionales</span>
              <span class="text-caption text-grey-darken-1 ml-2">Acota los registros de la fuente seleccionada</span>
            </div>
          </div>

          <v-row dense>
            <!-- VS -->
            <v-col cols="12" md="4">
              <div class="d-flex align-center ga-1 mb-1">
                <v-icon size="14" color="blue">mdi-map-marker-outline</v-icon>
                <span class="text-caption font-weight-bold text-grey-darken-1 text-uppercase">Región (VS)</span>
                <v-tooltip location="top" max-width="240" text="Filtra por región geográfica. OR = cualquier región seleccionada.">
                  <template #activator="{ props: tp }">
                    <v-icon v-bind="tp" size="14" color="grey-lighten-1" class="cursor-help">mdi-help-circle-outline</v-icon>
                  </template>
                </v-tooltip>
              </div>
              <v-autocomplete
                v-model="form.vs"
                :items="catalogItems.VS"
                :loading="loadingCatalogs"
                item-title="title"
                item-value="value"
                label="Selecciona regiones"
                multiple chips closable-chips
                variant="outlined" density="compact"
                hide-details
                no-data-text="Sin resultados"
              />
              <!-- VS operator -->
              <div v-if="form.vs.length > 1" class="mt-1 rounded-lg pa-2" style="background:rgba(var(--v-theme-blue),.06);border:1px solid rgba(var(--v-theme-blue),.2);">
                <div class="d-flex align-center ga-2 flex-wrap mb-1">
                  <span class="text-caption font-weight-bold text-grey-darken-2">Los seleccionados deben cumplir:</span>
                  <v-btn-toggle v-model="operators.vs" mandatory density="compact" rounded="pill" color="blue">
                    <v-btn value="OR"  size="x-small" class="text-none font-weight-bold px-2"><v-icon size="11" start>mdi-set-none</v-icon>Cualquiera (ó)</v-btn>
                    <v-btn value="AND" size="x-small" class="text-none font-weight-bold px-2"><v-icon size="11" start>mdi-set-all</v-icon>Todos (y)</v-btn>
                  </v-btn-toggle>
                </div>
                <div class="text-caption text-grey-darken-1 d-flex align-center ga-1">
                  <v-icon size="11" color="blue">mdi-arrow-right-thin</v-icon>
                  <span v-html="opSentence(form.vs, operators.vs, 'la región')" />
                </div>
              </div>
            </v-col>

            <!-- VT -->
            <v-col cols="12" md="4">
              <div class="d-flex align-center ga-1 mb-1">
                <v-icon size="14" color="teal">mdi-calendar-outline</v-icon>
                <span class="text-caption font-weight-bold text-grey-darken-1 text-uppercase">Período (VT)</span>
                <v-tooltip location="top" max-width="240" text="Filtra por año o período. Se usa el código numérico (ej: 2024).">
                  <template #activator="{ props: tp }">
                    <v-icon v-bind="tp" size="14" color="grey-lighten-1" class="cursor-help">mdi-help-circle-outline</v-icon>
                  </template>
                </v-tooltip>
              </div>
              <v-autocomplete
                v-model="form.vt"
                :items="catalogItems.VT"
                :loading="loadingCatalogs"
                item-title="title"
                item-value="value"
                label="Selecciona períodos"
                multiple chips closable-chips
                variant="outlined" density="compact"
                hide-details
                no-data-text="Sin resultados"
              />
              <!-- VT operator -->
              <div v-if="form.vt.length > 1" class="mt-1 rounded-lg pa-2" style="background:rgba(var(--v-theme-teal),.06);border:1px solid rgba(var(--v-theme-teal),.2);">
                <div class="d-flex align-center ga-2 flex-wrap mb-1">
                  <span class="text-caption font-weight-bold text-grey-darken-2">Los seleccionados deben cumplir:</span>
                  <v-btn-toggle v-model="operators.vt" mandatory density="compact" rounded="pill" color="teal">
                    <v-btn value="AND" size="x-small" class="text-none font-weight-bold px-2"><v-icon size="11" start>mdi-set-all</v-icon>Todos (y)</v-btn>
                    <v-btn value="OR"  size="x-small" class="text-none font-weight-bold px-2"><v-icon size="11" start>mdi-set-none</v-icon>Cualquiera (ó)</v-btn>
                  </v-btn-toggle>
                </div>
                <div class="text-caption text-grey-darken-1 d-flex align-center ga-1">
                  <v-icon size="11" color="teal">mdi-arrow-right-thin</v-icon>
                  <span v-html="opSentence(form.vt, operators.vt, 'el período')" />
                </div>
              </div>
            </v-col>

            <!-- VI -->
            <v-col cols="12" md="4">
              <div class="d-flex align-center ga-1 mb-1">
                <v-icon size="14" color="green">mdi-tag-outline</v-icon>
                <span class="text-caption font-weight-bold text-grey-darken-1 text-uppercase">Intereses (VI)</span>
                <v-tooltip location="top" max-width="240" text="Categorías de interés. AND = el registro debe cumplir TODAS.">
                  <template #activator="{ props: tp }">
                    <v-icon v-bind="tp" size="14" color="grey-lighten-1" class="cursor-help">mdi-help-circle-outline</v-icon>
                  </template>
                </v-tooltip>
              </div>
              <v-autocomplete
                v-model="form.vi"
                :items="catalogItems.VI"
                :loading="loadingCatalogs"
                item-title="title"
                item-value="value"
                label="Selecciona categorías"
                multiple chips closable-chips
                variant="outlined" density="compact"
                hide-details
                no-data-text="Sin resultados"
              />
              <!-- VI operator -->
              <div v-if="form.vi.length > 1" class="mt-1 rounded-lg pa-2" style="background:rgba(var(--v-theme-green),.06);border:1px solid rgba(var(--v-theme-green),.2);">
                <div class="d-flex align-center ga-2 flex-wrap mb-1">
                  <span class="text-caption font-weight-bold text-grey-darken-2">Los seleccionados deben cumplir:</span>
                  <v-btn-toggle v-model="operators.vi" mandatory density="compact" rounded="pill" color="green">
                    <v-btn value="AND" size="x-small" class="text-none font-weight-bold px-2"><v-icon size="11" start>mdi-set-all</v-icon>Todos (y)</v-btn>
                    <v-btn value="OR"  size="x-small" class="text-none font-weight-bold px-2"><v-icon size="11" start>mdi-set-none</v-icon>Cualquiera (ó)</v-btn>
                  </v-btn-toggle>
                </div>
                <div class="text-caption text-grey-darken-1 d-flex align-center ga-1">
                  <v-icon size="11" color="green">mdi-arrow-right-thin</v-icon>
                  <span v-html="opSentence(form.vi, operators.vi, 'la categoría')" />
                </div>
              </div>
            </v-col>
          </v-row>

          <!-- Discover numeric variables -->
          <v-card
            rounded="xl"
            class="mt-4"
            :color="voarSuggestions.length > 0 ? 'success-lighten-5' : 'grey-lighten-5'"
            elevation="0"
          >
            <v-card-text class="pa-4">
              <div class="d-flex align-center justify-space-between flex-wrap ga-3">
                <div class="d-flex align-center ga-2">
                  <v-icon
                    :color="voarSuggestions.length > 0 ? 'success' : 'grey-darken-1'"
                    size="20"
                  >
                    {{ voarSuggestions.length > 0 ? 'mdi-check-circle' : 'mdi-magnify-scan' }}
                  </v-icon>
                  <div>
                    <div class="text-body-2 font-weight-bold">
                      {{ voarSuggestions.length > 0
                          ? `${voarSuggestions.length} variable${voarSuggestions.length !== 1 ? 's' : ''} numérica${voarSuggestions.length !== 1 ? 's' : ''} encontrada${voarSuggestions.length !== 1 ? 's' : ''}`
                          : 'Descubrir variables numéricas disponibles' }}
                    </div>
                    <div class="text-caption text-grey-darken-1">
                      {{ voarSuggestions.length > 0
                          ? 'Selecciona una como variable observable (VO) en el paso siguiente'
                          : 'Consulta la fuente de datos con los filtros actuales para ver qué variables numéricas están disponibles' }}
                    </div>
                  </div>
                </div>
                <v-btn
                  :color="voarSuggestions.length > 0 ? 'success' : 'primary'"
                  :variant="voarSuggestions.length > 0 ? 'tonal' : 'flat'"
                  :loading="loadingVoars"
                  :disabled="!form.sourceId"
                  prepend-icon="mdi-database-search"
                  class="text-none font-weight-bold"
                  rounded="lg"
                  @click="extractNumericVars"
                >
                  {{ voarSuggestions.length > 0 ? 'Actualizar' : 'Extraer variables' }}
                </v-btn>
              </div>

              <!-- Found variables as chips -->
              <div v-if="voarSuggestions.length > 0" class="mt-3 d-flex flex-wrap ga-2">
                <v-chip
                  v-for="v in voarSuggestions"
                  :key="v"
                  size="small"
                  color="success"
                  class="font-monospace font-weight-bold cursor-pointer"
                  :variant="form.voVar === v ? 'flat' : 'tonal'"
                  @click="form.voVar = v"
                >
                  {{ v }}
                </v-chip>
              </div>

              <v-alert
                v-if="!form.sourceId"
                density="compact"
                type="info"
                variant="text"
                class="mt-2 pa-0"
                text="Selecciona una fuente de datos en el paso 1 para habilitar esta función."
              />
            </v-card-text>
          </v-card>

          <v-divider class="my-5" />

          <!-- ════════════════════════════════════════════
               STEP 3 — Cálculo y visualización
               ════════════════════════════════════════════ -->
          <div class="d-flex align-center ga-3 mb-4">
            <v-avatar color="orange" variant="flat" size="30" class="text-white font-weight-black text-body-2 flex-shrink-0">3</v-avatar>
            <div>
              <span class="text-subtitle-2 font-weight-bold">Cálculo y visualización</span>
              <span class="text-caption text-grey-darken-1 ml-2">Define la operación, la agrupación y el tipo de gráfico</span>
            </div>
          </div>

          <v-row>
            <!-- Left: VO -->
            <v-col cols="12" md="6">
              <p class="text-caption font-weight-bold text-grey-darken-1 text-uppercase mb-2">
                <v-icon size="14" color="orange" class="mr-1">mdi-function</v-icon>
                Variable observable (VO) <span class="text-error">*</span>
              </p>

              <div class="d-flex ga-2 mb-2">
                <v-select
                  v-model="form.voOp"
                  :items="voOperations"
                  item-title="label"
                  item-value="value"
                  label="Operación"
                  variant="outlined"
                  density="compact"
                  hide-details
                  style="max-width: 160px;"
                />
                <v-combobox
                  v-model="form.voVar"
                  :items="voarSuggestions"
                  label="Variable numérica"
                  variant="outlined"
                  density="compact"
                  hide-details
                  :hint="voarSuggestions.length > 0 ? 'Selecciona una sugerencia o escribe' : 'Escribe el nombre de la variable'"
                  :placeholder="voarSuggestions.length > 0 ? 'Selecciona o escribe...' : 'Ej: EDAD, COSTO'"
                  no-data-text="Escribe el nombre de la variable"
                  class="flex-grow-1"
                />
              </div>

              <!-- VO preview -->
              <div
                v-if="resolveStr(form.voVar)"
                class="rounded-lg pa-2 text-caption text-orange-darken-2 d-flex align-center ga-1"
                style="background:rgba(255,152,0,.08);border:1px solid rgba(255,152,0,.2);"
              >
                <v-icon size="14" color="orange">mdi-function</v-icon>
                Calculará <strong>{{ form.voOp }}({{ resolveStr(form.voVar) }})</strong> sobre los registros filtrados
              </div>
              <div v-else class="text-caption text-grey pa-2">
                <v-icon size="14" class="mr-1">mdi-alert-outline</v-icon>
                VO es requerido para generar la gráfica
              </div>
            </v-col>

            <!-- Right: BY + Chart type -->
            <v-col cols="12" md="6">
              <p class="text-caption font-weight-bold text-grey-darken-1 text-uppercase mb-2">
                <v-icon size="14" color="deep-purple" class="mr-1">mdi-group</v-icon>
                Agrupar por (BY)
              </p>
              <v-combobox
                v-model="form.by"
                :items="byOptions"
                item-title="title"
                item-value="value"
                label="Catálogo de interés para el eje X"
                variant="outlined"
                density="compact"
                hide-details
                clearable
                no-data-text="Escribe el nombre del catálogo"
                class="mb-1"
              />
              <div v-if="resolveStr(form.by)" class="text-caption text-deep-purple-darken-1 d-flex align-center ga-1 mb-4">
                <v-icon size="12" color="deep-purple">mdi-arrow-right-thin</v-icon>
                Un punto por cada valor de <strong>{{ resolveStr(form.by) }}</strong> en el eje X
              </div>
              <div v-else class="mb-4" />

              <p class="text-caption font-weight-bold text-grey-darken-1 text-uppercase mb-2">
                <v-icon size="14" color="primary" class="mr-1">mdi-chart-bar</v-icon>
                Tipo de gráfico
              </p>
              <v-btn-toggle v-model="form.chartType" mandatory color="primary" variant="outlined" rounded="xl" class="w-100">
                <v-btn value="bar"  class="flex-grow-1 text-none text-caption"><v-icon start size="16">mdi-chart-bar</v-icon>Barras</v-btn>
                <v-btn value="line" class="flex-grow-1 text-none text-caption"><v-icon start size="16">mdi-chart-line</v-icon>Línea</v-btn>
                <v-btn value="pie"  class="flex-grow-1 text-none text-caption"><v-icon start size="16">mdi-chart-pie</v-icon>Pastel</v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>

          <v-divider class="my-5" />

          <!-- DSL Preview -->
          <div class="rounded-xl pa-4 d-flex align-center justify-space-between flex-wrap ga-3" style="background:#1e1e2e;">
            <div class="flex-grow-1 mr-3">
              <div class="text-caption font-weight-bold mb-1" style="color:#6c7086;">DSL generado</div>
              <code class="text-body-2 font-monospace font-weight-bold" style="color:#cdd6f4;word-break:break-all;">{{ computedDSL }}</code>
            </div>
            <div class="d-flex ga-2 align-center">
              <v-btn icon="mdi-content-copy" variant="text" size="small" color="grey" @click="copyDSL" />
              <v-chip v-if="!isValid" color="warning" variant="tonal" size="small" prepend-icon="mdi-alert-outline" class="font-weight-bold">VO requerido</v-chip>
              <v-chip v-else color="success" variant="tonal" size="small" prepend-icon="mdi-check-circle-outline" class="font-weight-bold">Lista</v-chip>
            </div>
          </div>

        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-5 justify-end ga-2">
          <v-btn variant="text" color="grey-darken-1" class="text-none" @click="showBuilder = false">Cancelar</v-btn>
          <v-btn
            color="primary"
            variant="flat"
            rounded="pill"
            class="px-6 font-weight-bold text-none"
            :prepend-icon="editingPanelId ? 'mdi-refresh' : 'mdi-chart-bar'"
            :disabled="!isValid"
            @click="savePanel"
          >
            {{ editingPanelId ? 'Actualizar gráfica' : 'Generar gráfica' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="copiedSnack" :timeout="2000" color="success" rounded="pill">
      <v-icon start>mdi-check</v-icon> DSL copiado
    </v-snackbar>

  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import { useTour } from '@/composables/useTour';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, BarChart, PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import { useJubStore } from '@/stores/jub';
import type { DataSourceDTO } from '@/types/index.types';

use([CanvasRenderer, LineChart, BarChart, PieChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent]);

definePage({ 
  name: 'Charts', 
  meta: { layout: 'dashboard',    requiresAuth: true,
 } 
});

const jubStore = useJubStore();

// ── Types ─────────────────────────────────────────────────────────────────────
interface PanelConfig {
  sourceId: string; vs: string[]; vt: string[]; vi: string[];
  voOp: string; voVar: string; by: string;
  operators: { vs: string; vt: string; vi: string };
  chartType: string;
}
interface Panel {
  id: string; title: string; sourceName: string; dsl: string; chartType: string;
  chartOptions: any; loading: boolean; error: string | null; config: PanelConfig;
}

// ── State ─────────────────────────────────────────────────────────────────────
const panels         = ref<Panel[]>([]);
const showBuilder    = ref(false);
const editingPanelId = ref<string | null>(null);
const copiedSnack    = ref(false);

const dataSources        = ref<DataSourceDTO[]>([]);
const loadingDataSources = ref(false);
const loadingCatalogs    = ref(false);
const loadingVoars       = ref(false);
const voarSuggestions    = ref<string[]>([]);

const catalogItems = ref<Record<'VS'|'VT'|'VI', Array<{title:string;value:string}>>>({
  VS: [], VT: [], VI: [],
});

const voOperations = [
  { label: 'Promedio (AVG)', value: 'AVG' },
  { label: 'Suma (SUM)',     value: 'SUM' },
  { label: 'Conteo (COUNT)', value: 'COUNT' },
];

// BY uses interest catalog names (not items)
const byOptions = computed(() =>
  jubStore.catalogs
    .filter(c => c.catalog_type === 'INTEREST')
    .map(c => ({ title: `${c.name} (${c.value})`, value: c.value }))
);

// ── Form ──────────────────────────────────────────────────────────────────────
const defaultForm = (): PanelConfig & { title: string } => ({
  title: '', sourceId: '', vs: [], vt: [], vi: [],
  voOp: 'AVG', voVar: '', by: '',
  operators: { vs: 'OR', vt: 'AND', vi: 'AND' },
  chartType: 'bar',
});

const form      = ref(defaultForm());
const operators = ref({ vs: 'OR', vt: 'AND', vi: 'AND' });

// ── Helpers ───────────────────────────────────────────────────────────────────
function opSentence(arr: string[], op: string, noun: string): string {
  const conj = op === 'OR' ? ' <b>ó</b> ' : ' <b>y</b> ';
  return `Registros donde ${noun} sea ${arr.join(conj)}`;
}

function resolveStr(val: string | { value: string } | null | undefined): string {
  if (!val) return '';
  return typeof val === 'string' ? val : val.value;
}

function buildGroup(arr: string[], op: string) { return arr.join(` ${op} `); }

function buildFilterDSL(): string {
  const vs = form.value.vs.length > 0 ? buildGroup(form.value.vs, operators.value.vs) : '*';
  const vt = form.value.vt.length > 0 ? buildGroup(form.value.vt, operators.value.vt) : '*';
  const vi = form.value.vi.length > 0 ? buildGroup(form.value.vi, operators.value.vi) : '*';
  return `jub.v1.VS(${vs}).VT(${vt}).VI(${vi})`;
}

// ── DSL ───────────────────────────────────────────────────────────────────────
const computedDSL = computed(() => {
  let dsl = buildFilterDSL();
  const voVar = resolveStr(form.value.voVar);
  const by = resolveStr(form.value.by);
  if (voVar) dsl += `.VO(${form.value.voOp}(${voVar}))`;
  if (by) dsl += `.BY(${by})`;
  return dsl;
});

const isValid = computed(() => resolveStr(form.value.voVar).length > 0);

async function copyDSL() {
  await navigator.clipboard.writeText(computedDSL.value);
  copiedSnack.value = true;
}

// ── Source helpers ────────────────────────────────────────────────────────────
function formatIcon(fmt: string) {
  const m: Record<string,string> = { csv:'mdi-file-delimited-outline', json:'mdi-code-json', postgres:'mdi-elephant', mysql:'mdi-database', mongodb:'mdi-leaf' };
  return m[fmt] ?? 'mdi-database-outline';
}

function formatColor(fmt: string) {
  const m: Record<string,string> = { csv:'green', json:'orange', postgres:'blue-darken-2', mysql:'orange-darken-2', mongodb:'green-darken-2' };
  return m[fmt] ?? 'grey';
}

function onSourceChange() {
  // Clear discovered variables when source changes
  voarSuggestions.value = [];
  form.value.voVar = '';
}

// ── Extract numeric variables from datasource records ─────────────────────────
async function extractNumericVars() {
  if (!form.value.sourceId) return;
  loadingVoars.value = true;
  voarSuggestions.value = [];

  const dsl     = buildFilterDSL();
  const records = await jubStore.queryDataSource(form.value.sourceId, dsl, 200, 0);
  console.log('Records for VO extraction:', records);
  const seen = new Set<string>();
  for (const record of records) {
    for (const key of Object.keys(record.numerical_interest_ids)) {
      seen.add(key);
    }
  }

  voarSuggestions.value = [...seen].sort();
  loadingVoars.value    = false;
}

// ── Builder open ──────────────────────────────────────────────────────────────
function openBuilder(panel?: Panel) {
  if (panel) {
    editingPanelId.value = panel.id;
    const c = panel.config;
    form.value = {
      title:     panel.title,
      sourceId:  c.sourceId,
      vs: [...c.vs], vt: [...c.vt], vi: [...c.vi],
      voOp:      c.voOp, voVar: c.voVar, by: c.by,
      operators: { ...c.operators }, chartType: c.chartType,
    };
    operators.value = { ...c.operators };
    // Restore suggestions hint if voVar was set
    if (c.voVar) voarSuggestions.value = [c.voVar];
  } else {
    editingPanelId.value  = null;
    form.value            = defaultForm();
    operators.value       = { vs: 'OR', vt: 'AND', vi: 'AND' };
    voarSuggestions.value = [];
  }
  showBuilder.value = true;
}

// ── Save panel (create or update) ─────────────────────────────────────────────
async function savePanel() {
  const sourceName = dataSources.value.find(s => s.source_id === form.value.sourceId)?.name ?? '';

  const config: PanelConfig = {
    sourceId:  form.value.sourceId,
    vs: [...form.value.vs], vt: [...form.value.vt], vi: [...form.value.vi],
    voOp:      form.value.voOp,
    voVar:     resolveStr(form.value.voVar),
    by:        resolveStr(form.value.by),
    operators: { ...operators.value },
    chartType: form.value.chartType,
  };

  const runPlot = async (dsl: string, chartType: string) =>
    jubStore.generatePlot(dsl, chartType);

  if (editingPanelId.value) {
    const target = panels.value.find(p => p.id === editingPanelId.value);
    if (!target) return;
    target.title      = form.value.title || 'Gráfico sin título';
    target.sourceName = sourceName;
    target.dsl        = computedDSL.value;
    target.chartType  = form.value.chartType;
    target.config     = config;
    target.loading    = true;
    target.error      = null;
    target.chartOptions = {};
    showBuilder.value = false;
    const data = await runPlot(target.dsl, target.chartType);
    target.loading = false;
    if (!data) target.error = jubStore.error ?? 'Error al regenerar la gráfica.';
    else       target.chartOptions = data;
  } else {
    const panel: Panel = {
      id: `panel_${Date.now()}`,
      title:      form.value.title || 'Gráfico sin título',
      sourceName,
      dsl:        computedDSL.value,
      chartType:  form.value.chartType,
      chartOptions: {}, loading: true, error: null, config,
    };
    panels.value.push(panel);
    showBuilder.value = false;
    const data = await runPlot(panel.dsl, panel.chartType);
    const found = panels.value.find(p => p.id === panel.id);
    if (!found) return;
    found.loading = false;
    if (!data) found.error = jubStore.error ?? 'Error al generar la gráfica.';
    else       found.chartOptions = data;
  }
}

function removePanel(id: string) { panels.value = panels.value.filter(p => p.id !== id); }

const plotTourSteps = [
  { element: '[data-tour="plot-header"]',      popover: { title: 'Generador de gráficas',   description: 'Crea visualizaciones interactivas a partir de fuentes de datos usando consultas DSL. Haz clic en "Nueva Gráfica" para comenzar.', side: 'bottom' as const } },
  { element: '[data-tour="plot-notice"]',       popover: { title: 'Funcionalidad experimental', description: 'Esta herramienta está en fase experimental. Estará completamente disponible en la Etapa 2 del proyecto para los observatorios principales.', side: 'bottom' as const } },
];

const { startTour, replayTour } = useTour(plotTourSteps, { pageKey: 'plot' });

// ── Init ──────────────────────────────────────────────────────────────────────
onMounted(async () => {
  loadingDataSources.value = true;
  dataSources.value = await jubStore.fetchDataSources();
  loadingDataSources.value = false;

  loadingCatalogs.value = true;
  const [VS, VT, VI] = await Promise.all([
    jubStore.fetchCatalogItemsByType('SPATIAL'),
    jubStore.fetchCatalogItemsByType('TEMPORAL'),
    jubStore.fetchCatalogItemsByType('INTEREST'),
  ]);
  catalogItems.value = { VS, VT, VI };
  loadingCatalogs.value = false;
  await nextTick();
  startTour();
});
</script>

<style scoped>
.cursor-help { cursor: help; }
</style>
