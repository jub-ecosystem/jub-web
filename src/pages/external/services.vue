<template>
  <v-container max-width="1400" class="py-8">

    <!-- Tour replay button -->
    <v-tooltip text="Ver tutorial" location="left">
      <template #activator="{ props: tp }">
        <v-btn v-bind="tp" icon="mdi-help-circle-outline" variant="tonal" color="primary" size="small"
               style="position:fixed;bottom:24px;right:24px;z-index:200;" @click="replayTour" />
      </template>
    </v-tooltip>

    <!-- ── Header ── -->
    <v-row justify="center" class="mb-8 mt-2">
      <v-col cols="12">

        <div class="text-center mb-6" data-tour="svc-header">
          <h1 class="text-h3 font-weight-black mb-2">Servicios externos</h1>
          <p class="text-body-1 text-grey-darken-1">
            Descubre y explora los servicios del ecosistema JUB por nombre o visibilidad.
          </p>
        </div>

        <!-- ── Search card ── -->
        <v-card rounded="xl" elevation="3" class="border">
          <v-card-text class="pa-6">

            <v-row align="start" class="ga-0">

              <!-- Keyword input -->
              <v-col cols="12" md="6" data-tour="svc-search">
                <div class="d-flex align-center ga-2 mb-3">
                  <v-avatar color="primary" variant="tonal" size="28" rounded="lg">
                    <v-icon size="16">mdi-magnify</v-icon>
                  </v-avatar>
                  <span class="text-subtitle-2 font-weight-bold">Nombre o palabra clave</span>
                  <v-tooltip location="top" max-width="260" text="Filtra por nombre del servicio.">
                    <template #activator="{ props: tp }">
                      <v-icon v-bind="tp" size="16" color="grey-lighten-1" class="cursor-help">mdi-help-circle-outline</v-icon>
                    </template>
                  </v-tooltip>
                </div>

                <v-text-field
                  v-model="form.keyword"
                  label="Buscar servicio"
                  placeholder="Ej: MictlanX, inferencia..."
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  clearable
                  prepend-inner-icon="mdi-text-search"
                  @keyup.enter="executeSearch"
                />
              </v-col>

              <!-- Provider filter -->
              <v-col cols="12" md="3">
                <div class="d-flex align-center ga-2 mb-3">
                  <v-avatar color="deep-purple" variant="tonal" size="28" rounded="lg">
                    <v-icon size="16">mdi-server-outline</v-icon>
                  </v-avatar>
                  <span class="text-subtitle-2 font-weight-bold">Proveedor</span>
                </div>
                <v-select
                  v-model="form.provider"
                  :items="providerOptions"
                  item-title="label"
                  item-value="value"
                  label="Todos"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  clearable
                >
                  <template #item="{ item, props: itemProps }">
                    <v-list-item v-bind="itemProps">
                      <template #prepend>
                        <v-avatar size="20" rounded="0" class="mr-2">
                          <v-img v-if="providerLogo[item.value as ServiceProvider]" :src="providerLogo[item.value as ServiceProvider]!" contain />
                          <v-icon v-else size="16" color="grey">mdi-cog-outline</v-icon>
                        </v-avatar>
                      </template>
                    </v-list-item>
                  </template>
                </v-select>
              </v-col>

              <!-- Visibility filter -->
              <v-col cols="12" md="3">
                <div class="d-flex align-center ga-2 mb-3">
                  <v-avatar color="blue-grey" variant="tonal" size="28" rounded="lg">
                    <v-icon size="16">mdi-eye-outline</v-icon>
                  </v-avatar>
                  <span class="text-subtitle-2 font-weight-bold">Visibilidad</span>
                </div>
                <v-select
                  v-model="form.isPublic"
                  :items="visibilityOptions"
                  item-title="label"
                  item-value="value"
                  label="Todos"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  clearable
                />
              </v-col>

            </v-row>

            <v-divider class="my-5" />

            <!-- Bottom bar: DSL preview + actions -->
            <div class="d-flex flex-column flex-md-row align-md-center justify-md-space-between ga-3">

              <div class="d-flex align-center ga-2 flex-wrap min-w-0">
                <v-icon size="small" color="grey-darken-1">mdi-code-braces</v-icon>
                <span class="text-caption font-weight-bold text-grey-darken-1 flex-shrink-0">Consulta:</span>
                <code
                  class="text-caption font-monospace px-2 py-1 rounded-lg text-primary"
                  style="background: rgba(var(--v-theme-primary), .08); max-width: 420px; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
                >{{ computedDSL }}</code>
                <v-btn icon="mdi-content-copy" variant="text" size="x-small" color="grey" @click="copyDSL" />
              </div>


              <div class="d-flex ga-2 align-center flex-shrink-0 flex-wrap" data-tour="svc-controls">
                <div class="d-flex align-center ga-1">
                  <v-switch
                    v-model="strict"
                    label="Búsqueda estricta"
                    density="compact"
                    hide-details
                    color="primary"
                    inset
                    class="flex-shrink-0"
                  />
                  <v-tooltip location="top" max-width="300" text="En modo estricto todos los términos deben coincidir exactamente con el nombre o descripción del servicio.">
                    <template #activator="{ props: tp }">
                      <v-icon v-bind="tp" size="16" color="grey-lighten-1" class="cursor-help">mdi-help-circle-outline</v-icon>
                    </template>
                  </v-tooltip>
                </div>
                <v-btn
                  variant="text"
                  color="grey-darken-1"
                  size="small"
                  prepend-icon="mdi-refresh"
                  class="text-none"
                  :disabled="!form.keyword && form.isPublic === null && form.provider === null"
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

      </v-col>
    </v-row>

    <!-- ── Results header ── -->
    <template v-if="searchCounter > 0">
      <v-row align="center" justify="space-between" class="mb-4">
        <v-col cols="auto">
          <span class="text-body-2 font-weight-bold text-grey-darken-1">
            {{ services.length }} servicio{{ services.length !== 1 ? 's' : '' }} encontrado{{ services.length !== 1 ? 's' : '' }}
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
            <v-btn value="list"  icon="mdi-view-list-outline"  size="small" />
          </v-btn-toggle>
        </v-col>
      </v-row>
      <v-divider class="mb-6" />
    </template>

    <!-- ── Loading ── -->
    <v-row v-if="jubStore.isLoading" justify="center" class="mt-6">
      <v-col cols="auto">
        <v-progress-circular indeterminate color="primary" size="48" />
      </v-col>
    </v-row>

    <!-- ── Grid view ── -->
    <v-row v-else-if="viewMode === 'grid' && services.length > 0" class="d-flex align-stretch">
      <v-col
        v-for="(svc, index) in services"
        :key="svc.service_id"
        cols="12" sm="6" lg="4"
        :data-tour="index === 0 ? 'svc-first-card' : undefined"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :elevation="isHovering ? 8 : 2"
            rounded="xl"
            class="h-100 transition-swing cursor-pointer d-flex flex-column"
            @click="openDetail(svc)"
          >
            <!-- Top strip -->
            <div class="pa-5 pb-3" style="border-bottom: 3px solid #00ABDC;">
              <div class="d-flex align-center justify-space-between mb-3">
                <!-- Provider logo or fallback icon -->
                <v-avatar color="primary" variant="tonal" size="44" rounded="lg">
                  <v-img
                    v-if="providerLogo[svc.provider]"
                    :src="providerLogo[svc.provider]!"
                    :alt="providerLabel[svc.provider]"
                    contain
                  />
                  <v-icon v-else size="22" color="primary">mdi-cog-outline</v-icon>
                </v-avatar>

                <div class="d-flex align-center ga-1">
                  <v-chip
                    v-if="svc.provider === 'NEZ' || svc.provider === 'XELHUA'"
                    size="x-small"
                    variant="tonal"
                    color="primary"
                    class="font-weight-bold"
                  >{{ providerLabel[svc.provider] }}</v-chip>
                  <v-chip
                    :color="svc.public ? 'success' : 'warning'"
                    variant="flat"
                    size="small"
                    class="text-white font-weight-bold"
                  >
                    <v-icon start size="13">{{ svc.public ? 'mdi-earth' : 'mdi-lock-outline' }}</v-icon>
                    {{ svc.public ? 'Público' : 'Privado' }}
                  </v-chip>
                </div>
              </div>

              <div class="text-h6 font-weight-bold mb-1">{{ svc.name }}</div>
            </div>

            <v-card-text class="flex-grow-1 pt-3">
              <p class="text-body-2 text-grey-darken-2 mb-3" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                {{ svc.description || 'Sin descripción.' }}
              </p>
            </v-card-text>

            <v-divider />

            <v-card-actions class="pa-3 d-flex ga-3 text-caption text-grey-darken-1">
              <div class="d-flex align-center ga-1">
                <v-icon size="14">mdi-transit-connection-horizontal</v-icon>
                {{ svc.workflow ? svc.workflow.name : 'Sin flujo' }}
              </div>
              <div class="d-flex align-center ga-1">
                <v-icon size="14">mdi-timeline-outline</v-icon>
                {{ stageCount(svc) }} etapas
              </div>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <!-- ── List view ── -->
    <v-card v-else-if="viewMode === 'list' && services.length > 0" rounded="xl" elevation="2" class="overflow-hidden border">
      <v-list lines="two" bg-color="surface">
        <template v-for="(svc, i) in services" :key="svc.service_id">
          <v-list-item class="pa-4 cursor-pointer" @click="openDetail(svc)">
            <template #prepend>
              <v-avatar color="primary" variant="tonal" size="48" rounded="lg" class="mr-3">
                <v-img
                  v-if="providerLogo[svc.provider]"
                  :src="providerLogo[svc.provider]!"
                  :alt="providerLabel[svc.provider]"
                  contain
                />
                <v-icon v-else color="primary">mdi-cog-outline</v-icon>
              </v-avatar>
            </template>

            <v-list-item-title class="text-subtitle-1 font-weight-bold mb-1">
              {{ svc.name }}
            </v-list-item-title>

            <v-list-item-subtitle class="text-body-2 text-grey-darken-2">
              {{ svc.description || 'Sin descripción.' }}
            </v-list-item-subtitle>

            <div class="mt-2 d-flex align-center flex-wrap ga-1">
              <v-chip :color="svc.public ? 'success' : 'warning'" variant="flat" size="x-small" class="text-white font-weight-bold">
                <v-icon start size="12">{{ svc.public ? 'mdi-earth' : 'mdi-lock-outline' }}</v-icon>
                {{ svc.public ? 'Público' : 'Privado' }}
              </v-chip>
              <v-chip
                v-if="svc.provider === 'NEZ' || svc.provider === 'XELHUA'"
                size="x-small"
                variant="tonal"
                color="primary"
                class="font-weight-bold"
              >
                <v-avatar start size="16" rounded="0" class="mr-1">
                  <v-img :src="providerLogo[svc.provider]!" :alt="providerLabel[svc.provider]" contain />
                </v-avatar>
                {{ providerLabel[svc.provider] }}
              </v-chip>
              <v-chip v-if="svc.workflow" size="x-small" variant="tonal" color="primary">
                <v-icon start size="12">mdi-transit-connection-horizontal</v-icon>
                {{ svc.workflow.name }}
              </v-chip>
              <v-chip size="x-small" variant="tonal" color="grey-darken-1">
                {{ stageCount(svc) }} etapas
              </v-chip>
            </div>

            <template #append>
              <v-icon color="grey-lighten-1">mdi-chevron-right</v-icon>
            </template>
          </v-list-item>
          <v-divider v-if="i < services.length - 1" inset />
        </template>
      </v-list>
    </v-card>

    <!-- ── Load more ── -->
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

    <!-- ── No results ── -->
    <v-row
      v-else-if="searchCounter > 0 && services.length === 0 && !jubStore.isLoading"
      justify="center"
      class="mt-6"
    >
      <v-col cols="12" md="8">
        <v-empty-state
          icon="mdi-cog-off-outline"
          headline="Sin resultados"
          title="No hay servicios que coincidan con esta consulta."
          text="Prueba con otros términos o deja los filtros vacíos para ver todos los servicios."
          color="primary"
        />
      </v-col>
    </v-row>

    <!-- ── Initial state ── -->
    <v-row v-else-if="searchCounter === 0 && !jubStore.isLoading" justify="center" class="mt-4">
      <v-col cols="12" class="text-center">
        <v-icon size="80" color="grey-lighten-2" class="mb-3">mdi-cog-outline</v-icon>
        <p class="text-body-1 text-grey-darken-1">
          Configura los filtros y presiona <strong>Buscar</strong> para explorar los servicios.
        </p>
      </v-col>
    </v-row>

    <!-- ══════════════════════════════════════════════════════════════
         Detail dialog
    ══════════════════════════════════════════════════════════════ -->
    <v-dialog v-model="showDetail" max-width="900" scrollable>
      <v-card v-if="selectedService" rounded="xl">

        <!-- Dialog header -->
        <v-toolbar color="primary" density="comfortable">
          <template #prepend>
            <v-avatar color="white" variant="flat" size="36" rounded="lg" class="ml-2">
              <v-img
                v-if="providerLogo[selectedService.provider]"
                :src="providerLogo[selectedService.provider]!"
                :alt="providerLabel[selectedService.provider]"
                contain
              />
              <v-icon v-else color="primary">mdi-cog-outline</v-icon>
            </v-avatar>
          </template>
          <v-toolbar-title class="text-subtitle-1 font-weight-bold text-white">
            {{ selectedService.name }}
          </v-toolbar-title>
          <template #append>
            <v-chip
              v-if="selectedService.provider === 'NEZ' || selectedService.provider === 'XELHUA'"
              variant="flat"
              size="small"
              color="white"
              class="font-weight-bold mr-1"
              style="color: #00ABDC"
            >{{ providerLabel[selectedService.provider] }}</v-chip>
            <v-chip
              :color="selectedService.public ? 'success' : 'warning'"
              variant="flat"
              size="small"
              class="text-white font-weight-bold mr-2"
            >
              <v-icon start size="13">{{ selectedService.public ? 'mdi-earth' : 'mdi-lock-outline' }}</v-icon>
              {{ selectedService.public ? 'Público' : 'Privado' }}
            </v-chip>
            <v-btn icon="mdi-close" variant="text" color="white" @click="showDetail = false" />
          </template>
        </v-toolbar>

        <!-- Description -->
        <div class="pa-5 pb-2 bg-grey-lighten-5 border-b">
          <p class="text-body-2 text-grey-darken-2">{{ selectedService.description || 'Sin descripción.' }}</p>
        </div>

        <!-- Tabs -->
        <v-tabs v-model="detailTab" color="primary" bg-color="surface" grow>
          <v-tab value="workflow" class="text-none font-weight-bold">
            <v-icon start size="18">mdi-transit-connection-horizontal</v-icon>
            Flujo de trabajo
          </v-tab>
          <v-tab value="stages" class="text-none font-weight-bold">
            <v-icon start size="18">mdi-timeline-check-outline</v-icon>
            Etapas ({{ stageCount(selectedService) }})
          </v-tab>
          <v-tab value="patterns" class="text-none font-weight-bold">
            <v-icon start size="18">mdi-shape-outline</v-icon>
            Patrones ({{ allPatterns.length }})
          </v-tab>
          <v-tab value="blocks" class="text-none font-weight-bold">
            <v-icon start size="18">mdi-puzzle-outline</v-icon>
            Bloques ({{ allBlocks.length }})
          </v-tab>
        </v-tabs>

        <v-divider />

        <v-card-text class="pa-0" style="min-height: 380px;">

          <v-window v-model="detailTab">

            <!-- ── Workflow overview ── -->
            <v-window-item value="workflow">
              <div class="pa-6">
                <v-empty-state
                  v-if="!selectedService.workflow"
                  icon="mdi-transit-connection-horizontal"
                  title="Sin flujo de trabajo asociado"
                />
                <template v-else>
                  <div class="d-flex align-center ga-3 mb-6">
                    <v-avatar color="primary" variant="tonal" size="44" rounded="lg">
                      <v-icon color="primary">mdi-transit-connection-horizontal</v-icon>
                    </v-avatar>
                    <div>
                      <div class="text-subtitle-1 font-weight-bold">{{ selectedService.workflow.name }}</div>
                      <div class="text-caption text-grey-darken-1 font-monospace">{{ selectedService.workflow.workflow_id }}</div>
                    </div>
                  </div>

                  <v-timeline align="start" side="end" truncate-line="both">
                    <v-timeline-item
                      v-for="(stage, idx) in selectedService.workflow.stages"
                      :key="stage.stage_id"
                      dot-color="primary"
                      size="small"
                    >
                      <template #opposite>
                        <span class="text-caption font-weight-black text-grey-darken-1">Etapa {{ idx + 1 }}</span>
                      </template>
                      <v-card rounded="lg" elevation="1" class="mb-2">
                        <v-card-item>
                          <v-card-title class="text-subtitle-2 font-weight-bold">{{ stage.name }}</v-card-title>
                          <v-card-subtitle class="text-caption">
                            <span class="font-monospace">{{ stage.source }}</span>
                            <v-icon size="12" class="mx-1">mdi-arrow-right</v-icon>
                            <span class="font-monospace">{{ stage.sink }}</span>
                          </v-card-subtitle>
                        </v-card-item>
                        <v-card-text v-if="stage.transformation" class="pt-0">
                          <v-chip size="x-small" color="deep-purple" variant="tonal" class="font-weight-bold">
                            <v-icon start size="12">mdi-shape-outline</v-icon>
                            {{ stage.transformation.name }}
                          </v-chip>
                          <v-chip v-if="stage.transformation.building_block" size="x-small" color="orange-darken-1" variant="tonal" class="font-weight-bold ml-1">
                            <v-icon start size="12">mdi-puzzle-outline</v-icon>
                            {{ stage.transformation.building_block.name }}
                          </v-chip>
                        </v-card-text>
                      </v-card>
                    </v-timeline-item>
                  </v-timeline>
                </template>
              </div>
            </v-window-item>

            <!-- ── Stages ── -->
            <v-window-item value="stages">
              <div class="pa-6">
                <v-empty-state v-if="!selectedService.workflow?.stages?.length" icon="mdi-timeline-check-outline" title="Sin etapas disponibles" />
                <v-row v-else dense>
                  <v-col
                    v-for="stage in selectedService.workflow!.stages"
                    :key="stage.stage_id"
                    cols="12" sm="6"
                  >
                    <v-card rounded="xl" elevation="1" class="h-100 border">
                      <v-card-item>
                        <template #prepend>
                          <v-avatar color="primary" variant="tonal" size="40" rounded="lg">
                            <v-icon size="20" color="primary">mdi-timeline-check-outline</v-icon>
                          </v-avatar>
                        </template>
                        <v-card-title class="text-subtitle-2 font-weight-bold">{{ stage.name }}</v-card-title>
                        <v-card-subtitle class="font-monospace text-caption">{{ stage.stage_id }}</v-card-subtitle>
                      </v-card-item>
                      <v-card-text class="pt-0">
                        <div class="d-flex flex-column ga-1 text-body-2 text-grey-darken-2">
                          <div class="d-flex align-center ga-1">
                            <v-icon size="14" color="grey">mdi-import</v-icon>
                            <span class="font-monospace">{{ stage.source }}</span>
                          </div>
                          <div class="d-flex align-center ga-1">
                            <v-icon size="14" color="grey">mdi-export</v-icon>
                            <span class="font-monospace">{{ stage.sink }}</span>
                          </div>
                          <div class="d-flex align-center ga-1">
                            <v-icon size="14" color="grey">mdi-api</v-icon>
                            <span class="font-monospace text-caption">{{ stage.endpoint }}</span>
                          </div>
                        </div>
                        <div v-if="stage.transformation" class="mt-2">
                          <v-chip size="x-small" color="deep-purple" variant="tonal" class="font-weight-bold">
                            {{ stage.transformation.name }}
                          </v-chip>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </v-window-item>

            <!-- ── Patterns ── -->
            <v-window-item value="patterns">
              <div class="pa-6">
                <v-empty-state v-if="!allPatterns.length" icon="mdi-shape-outline" title="Sin patrones disponibles" />
                <v-row v-else dense>
                  <v-col
                    v-for="pattern in allPatterns"
                    :key="pattern.pattern_id"
                    cols="12" sm="6"
                  >
                    <v-card rounded="xl" elevation="1" class="h-100 border">
                      <v-card-item>
                        <template #prepend>
                          <v-avatar color="deep-purple" variant="tonal" size="40" rounded="lg">
                            <v-icon size="20" color="deep-purple">mdi-shape-outline</v-icon>
                          </v-avatar>
                        </template>
                        <v-card-title class="text-subtitle-2 font-weight-bold">{{ pattern.name }}</v-card-title>
                        <v-card-subtitle class="font-monospace text-caption">{{ pattern.pattern }}</v-card-subtitle>
                      </v-card-item>
                      <v-card-text class="pt-0 text-body-2 text-grey-darken-2">
                        <p class="mb-2">{{ pattern.description }}</p>
                        <div class="d-flex flex-wrap ga-1">
                          <v-chip size="x-small" variant="tonal" color="grey-darken-1">
                            <v-icon start size="12">mdi-tag-outline</v-icon>{{ pattern.task }}
                          </v-chip>
                          <v-chip size="x-small" variant="tonal" color="blue-grey">
                            <v-icon start size="12">mdi-account-group-outline</v-icon>{{ pattern.workers }} workers
                          </v-chip>
                          <v-chip size="x-small" variant="tonal" color="teal">{{ pattern.loadbalancer }}</v-chip>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </v-window-item>

            <!-- ── Building blocks ── -->
            <v-window-item value="blocks">
              <div class="pa-6">
                <v-empty-state v-if="!allBlocks.length" icon="mdi-puzzle-outline" title="Sin bloques base disponibles" />
                <v-row v-else dense>
                  <v-col
                    v-for="block in allBlocks"
                    :key="block.building_block_id"
                    cols="12" sm="6"
                  >
                    <v-card rounded="xl" elevation="1" class="border">
                      <v-card-item>
                        <template #prepend>
                          <v-avatar color="orange-darken-1" variant="tonal" size="36" rounded="lg">
                            <v-icon size="18" color="orange-darken-1">mdi-puzzle-outline</v-icon>
                          </v-avatar>
                        </template>
                        <v-card-title class="text-subtitle-2 font-weight-bold">{{ block.name }}</v-card-title>
                        <v-card-subtitle class="font-monospace text-caption">{{ block.image }}</v-card-subtitle>
                      </v-card-item>
                      <v-card-text class="pt-0 text-body-2 text-grey-darken-2">
                        <p class="mb-2">{{ block.description }}</p>
                        <div class="d-flex align-center ga-1 text-caption font-monospace text-grey-darken-1">
                          <v-icon size="14">mdi-console</v-icon>
                          {{ block.command }}
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </v-window-item>

          </v-window>
        </v-card-text>

      </v-card>
    </v-dialog>

    <v-snackbar v-model="copiedSnack" :timeout="2000" color="success" rounded="pill">
      <v-icon start>mdi-check</v-icon> Consulta copiada
    </v-snackbar>

  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useTour } from '@/composables/useTour';
import { useRoute } from 'vue-router';
import { useJubStore } from '@/stores/jub';
import { useAuthStore } from '@/stores/auth';
import type { ServiceDTO, ServiceProvider, PatternDetailDTO, BuildingBlockDetailDTO } from '@/types/index.types';
import nezLogo from '@/assets/nez.png';
import xelhuaLogo from '@/assets/xelhua.png';

definePage({
  name: 'ExternalServices',
  meta: { requiresAuth: true, layout: 'dashboard' },
});

const jubStore  = useJubStore();
const authStore = useAuthStore();
const route     = useRoute();

// ── Provider ──────────────────────────────────────────────────────────────────
const providerLogo: Record<ServiceProvider, string | null> = {
  NEZ:      nezLogo,
  XELHUA:   xelhuaLogo,
  EXTERNAL: null,
  OTHER:    null,
};

const providerLabel: Record<ServiceProvider, string> = {
  NEZ:      'NEZ',
  XELHUA:   'Xelhua',
  EXTERNAL: 'Externo',
  OTHER:    'Otro',
};

// ── Form ──────────────────────────────────────────────────────────────────────
const form = ref({ keyword: '', isPublic: null as boolean | null, provider: null as ServiceProvider | null });

const visibilityOptions = [
  { label: 'Públicos',  value: true  },
  { label: 'Privados',  value: false },
];

const providerOptions: { label: string; value: ServiceProvider }[] = [
  { label: 'NEZ',      value: 'NEZ'      },
  { label: 'Xelhua',   value: 'XELHUA'   },
  { label: 'Externo',  value: 'EXTERNAL' },
  { label: 'Otro',     value: 'OTHER'    },
];

const computedDSL = computed(() => {
  const parts: string[] = [];
  if (form.value.keyword.trim()) parts.push(`name=${form.value.keyword.trim()}`);
  if (form.value.isPublic != null) parts.push(`public=${form.value.isPublic}`);
  if (form.value.provider)        parts.push(`provider=${form.value.provider}`);
  const inner = parts.length > 0 ? parts.join(',') : '*';
  return `jub.v1.SVC(${inner})`;
});

function resetForm() {
  form.value = { keyword: '', isPublic: null, provider: null };
}

const copiedSnack = ref(false);
async function copyDSL() {
  await navigator.clipboard.writeText(computedDSL.value);
  copiedSnack.value = true;
}

// ── Search / results ──────────────────────────────────────────────────────────
const searchCounter = ref(0);
const services      = ref<ServiceDTO[]>([]);
const viewMode      = ref<'grid' | 'list'>('grid');
const strict        = ref(false);
const skip          = ref(0);
const loadingMore   = ref(false);
const canLoadMore   = ref(false);
const pageSize      = computed(() => authStore.settings?.exploration?.items_per_page ?? 24);

async function executeSearch() {
  searchCounter.value++;
  skip.value = 0;
  services.value = await jubStore.searchServices(computedDSL.value, 0, pageSize.value, strict.value);
  canLoadMore.value = services.value.length === pageSize.value;
}

async function loadMore() {
  loadingMore.value = true;
  skip.value += pageSize.value;
  const more = await jubStore.searchServices(computedDSL.value, skip.value, pageSize.value, strict.value);
  services.value.push(...more);
  canLoadMore.value = more.length === pageSize.value;
  loadingMore.value = false;
}

// ── Detail dialog ─────────────────────────────────────────────────────────────
const showDetail      = ref(false);
const selectedService = ref<ServiceDTO | null>(null);
const detailTab       = ref('workflow');

function openDetail(svc: ServiceDTO) {
  selectedService.value = svc;
  detailTab.value       = 'workflow';
  showDetail.value      = true;
}

function stageCount(svc: ServiceDTO): number {
  return svc.workflow?.stages?.length ?? 0;
}

const allPatterns = computed((): PatternDetailDTO[] => {
  const stages = selectedService.value?.workflow?.stages ?? [];
  const seen = new Set<string>();
  const result: PatternDetailDTO[] = [];
  for (const stage of stages) {
    if (stage.transformation && !seen.has(stage.transformation.pattern_id)) {
      seen.add(stage.transformation.pattern_id);
      result.push(stage.transformation);
    }
  }
  return result;
});

const allBlocks = computed((): BuildingBlockDetailDTO[] => {
  const seen = new Set<string>();
  const result: BuildingBlockDetailDTO[] = [];
  for (const pattern of allPatterns.value) {
    if (pattern.building_block && !seen.has(pattern.building_block.building_block_id)) {
      seen.add(pattern.building_block.building_block_id);
      result.push(pattern.building_block);
    }
  }
  return result;
});

// ── Init ──────────────────────────────────────────────────────────────────────
const servicesTourSteps = [
  { element: '[data-tour="svc-header"]',     popover: { title: 'Servicios externos',    description: 'Aquí puedes explorar los servicios del ecosistema JUB: pipelines de procesamiento, modelos de inferencia, y más.', side: 'bottom' as const } },
  { element: '[data-tour="svc-search"]',     popover: { title: 'Buscar por nombre',     description: 'Escribe el nombre o una palabra clave del servicio que buscas y presiona Enter o el botón Buscar.', side: 'bottom' as const } },
  { element: '[data-tour="svc-controls"]',   popover: { title: 'Controles de búsqueda', description: 'Activa "Búsqueda estricta" para coincidir exactamente con el nombre. Usa "Limpiar" para reiniciar los filtros.', side: 'top' as const } },
  { element: '[data-tour="svc-first-card"]', popover: { title: 'Servicio',   description: 'Muestra el proveedor, nombre y visibilidad del servicio. Haz clic en la tarjeta para ver su detalle completo con el flujo de trabajo.', side: 'bottom' as const } },
];

const { startTour, replayTour } = useTour(servicesTourSteps, { pageKey: 'services' });

onMounted(async () => {
  await executeSearch();
  const targetId = route.query.service_id as string | undefined;
  if (targetId) {
    const match = services.value.find(s => s.service_id === targetId);
    if (match) openDetail(match);
  }
  await nextTick();
  startTour();
});
</script>

<style scoped>
.cursor-help { cursor: help; }
</style>
