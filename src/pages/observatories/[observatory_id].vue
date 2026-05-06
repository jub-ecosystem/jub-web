<template>
  <v-container max-width="1400" class="py-8">

    <!-- ── Search form ── -->
    <v-row justify="center" class="mb-8 mt-2">
      <v-col cols="12">

        <div class="text-center mb-6">
          <h1 class="text-h3 font-weight-black mb-2">Productos</h1>
          <p class="text-body-1 text-grey-darken-1">
            Explora las visualizaciones y datos generados en este observatorio.
          </p>
          <v-btn
            v-if="observatory"
            variant="outlined"
            color="primary"
            size="small"
            prepend-icon="mdi-information-outline"
            class="text-none mt-2"
            @click="infoDrawer = true"
          >Ver detalles del observatorio</v-btn>
        </div>

        <v-card rounded="xl" elevation="3" class="border">
          <v-card-text class="pa-6">

            <v-row v-if="!advancedMode">

              <!-- ── VS: Espacio ── -->
              <v-col cols="12" md="4">
                <div class="d-flex align-center ga-2 mb-3">
                  <v-avatar color="blue" variant="tonal" size="28" rounded="lg">
                    <v-icon size="16">mdi-map-marker-outline</v-icon>
                  </v-avatar>
                  <span class="text-subtitle-2 font-weight-bold">Variable Espacial</span>
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
                  <span class="text-subtitle-2 font-weight-bold">Variable Temporal</span>
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
                  <span class="text-subtitle-2 font-weight-bold">Variable de Interés</span>
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
            />

            <v-divider class="my-5" />

            <!-- Bottom bar: DSL preview + actions -->
            <div class="d-flex align-center justify-space-between flex-wrap ga-3">

              <div class="d-flex align-center ga-2 flex-wrap min-w-0">
                <v-icon size="small" color="grey-darken-1">mdi-code-braces</v-icon>
                <span class="text-caption font-weight-bold text-grey-darken-1 flex-shrink-0">Consulta:</span>
                <code
                  class="text-caption font-monospace px-2 py-1 rounded-lg text-primary text-truncate"
                  style="background: rgba(var(--v-theme-primary), .08); max-width: 380px; display: block;"
                >{{ advancedMode ? advancedQuery : computedDSL }}</code>
                <v-btn icon="mdi-content-copy" variant="text" size="x-small" color="grey" @click="copyDSL" />
              </div>

              <div class="d-flex ga-2 align-center flex-shrink-0 flex-wrap">
                <v-switch
                  v-model="advancedMode"
                  label="Modo avanzado"
                  density="compact"
                  hide-details
                  color="primary"
                  class="flex-shrink-0"
                  @update:model-value="onToggleAdvanced"
                />
                <div class="d-flex align-center ga-1">
                  <v-checkbox
                    v-model="strict"
                    label="Búsqueda estricta"
                    density="compact"
                    hide-details
                    color="primary"
                    class="flex-shrink-0"
                  />
                  <v-tooltip location="top" max-width="300" text="En modo estricto todos los términos deben coincidir exactamente con los datos del producto.">
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

    <!-- ── Results header ── -->
    <v-row align="center" justify="space-between" class="mb-4" v-if="filteredProducts.length > 0 || searchCounter > 0">
      <v-col cols="auto">
        <span class="text-body-2 font-weight-bold text-grey-darken-1">
          {{ filteredProducts.length }} producto{{ filteredProducts.length !== 1 ? 's' : '' }}
        </span>
      </v-col>

      <v-col cols="auto" class="d-flex align-center ga-4">
        <v-btn-toggle
          v-model="viewMode"
          color="primary"
          variant="outlined"
          divided
          rounded="pill"
          density="comfortable"
          mandatory
        >
          <v-btn value="grid" icon="mdi-view-grid-outline" size="small" />
          <v-btn value="table" icon="mdi-table" size="small" />
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-divider class="mb-6" v-if="filteredProducts.length > 0 || searchCounter > 0" />

    <!-- ── Loading ── -->
    <v-row v-if="jubStore.isLoading" justify="center" class="mt-6">
      <v-col cols="auto">
        <v-progress-circular indeterminate color="primary" size="48" />
      </v-col>
    </v-row>

    <!-- ── Grid results ── -->
    <v-row v-else-if="viewMode === 'grid' && filteredProducts.length > 0" class="d-flex align-stretch">
      <v-col v-for="product in filteredProducts" :key="product.product_id" cols="12" sm="6" md="4" lg="3">

        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :elevation="isHovering ? 8 : 2"
            rounded="xl"
            class="h-100 transition-swing cursor-pointer d-flex flex-column"
            @click="openDetails(product)"
          >
            <!-- Extension icon placeholder -->
            <div
              class="d-flex flex-column align-center justify-center bg-grey-lighten-4 border-bottom"
              style="height: 160px;"
            >
              <v-icon size="48" color="grey-darken-1">{{ extensionIcon(product.metadata?.extension) }}</v-icon>
              <span v-if="product.metadata?.extension" class="text-caption text-grey-darken-1 mt-1 font-monospace">.{{ product.metadata.extension }}</span>
            </div>

            <v-card-item class="pt-4 pb-2">
              <v-card-title class="text-subtitle-1 font-weight-bold text-wrap" style="line-height: 1.2;">
                {{ product.name || 'Producto sin nombre' }}
              </v-card-title>
              <v-card-subtitle class="text-caption mt-1 font-monospace text-primary">
                {{ product.product_id }}
              </v-card-subtitle>
            </v-card-item>

            <v-card-text class="flex-grow-1">
              <div class="d-flex flex-wrap ga-1">
                <v-chip
                  v-for="tag in product.tags?.slice(0, 3) || []"
                  :key="tag"
                  size="x-small"
                  variant="tonal"
                  color="secondary-blue"
                  class="font-weight-medium"
                >
                  {{ tagNameMap.get(tag) ?? tag }}
                </v-chip>
                <span v-if="(product.tags?.length || 0) > 3" class="text-caption text-grey-darken-1 ml-1 align-self-center">
                  +{{ product.tags!.length - 3 }}
                </span>
              </div>
            </v-card-text>
          </v-card>
        </v-hover>

      </v-col>
    </v-row>

    <!-- ── Load more ── -->
    <v-row v-if="canLoadMore && !jubStore.isLoading && viewMode === 'grid'" justify="center" class="mt-6">
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

    <!-- ── Table placeholder ── -->
    <v-row v-else-if="viewMode === 'table' && filteredProducts.length > 0">
      <v-col cols="12">
        <v-card rounded="xl" elevation="2" class="pa-8 text-center bg-grey-lighten-4 border">
          <p class="text-grey-darken-1 mb-0">Vista de tabla en construcción</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- ── No results ── -->
    <v-row class="d-flex justify-center mt-8" v-else-if="searchCounter > 0 && filteredProducts.length === 0 && !jubStore.isLoading">
      <v-col cols="12" md="8">
        <v-empty-state
          icon="mdi-chart-box-outline"
          image="https://vuetifyjs.b-cdn.net/docs/images/components/v-empty-state/astro-cat.svg"
          headline="Sin productos asociados"
          title="No hay productos que coincidan con esta consulta."
          @click:action="showCreateDialog = true"
          color="primary"
          action-color="black"
        />
      </v-col>
    </v-row>

    <!-- ── Create product dialog ── -->
    <v-dialog v-model="showCreateDialog" max-width="550" persistent>
      <v-card rounded="lg" elevation="10">
        <v-toolbar color="black" density="comfortable" flat>
          <v-toolbar-title class="text-body-1">Configurar Nuevo Producto</v-toolbar-title>
          <v-btn icon="mdi-close" @click="showCreateDialog = false" />
        </v-toolbar>

        <v-card-text class="pa-6">
          <v-form ref="taskForm">
            <v-text-field v-model="newTask.name" label="Nombre" variant="outlined" density="comfortable" class="mb-2" />
            <v-select v-model="newTask.privacy" :items="['Privado', 'Público']" label="Privacidad" variant="outlined" density="comfortable" class="mb-2" />
            <v-select v-model="newTask.dataSource" :items="['Datasource1', 'Datasource2', 'DatasourceN']" label="Fuente de datos" variant="outlined" density="comfortable" class="mb-2" />
            <v-select
              v-if="newTask.dataSource"
              v-model="newTask.catalogs"
              :items="catalogData[newTask.dataSource.toUpperCase() as keyof typeof catalogData] || []"
              label="Seleccionar Catálogos"
              multiple
              chips
              variant="outlined"
              density="comfortable"
            />
          </v-form>
        </v-card-text>

        <v-divider />
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn variant="text" @click="showCreateDialog = false">Cancelar</v-btn>
          <v-btn color="black" class="px-6" @click="handleCreateTask">Crear</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- ── Product detail overlay ── -->
    <v-dialog v-model="showOverlay" fullscreen transition="dialog-bottom-transition">
      <v-card class="bg-surface">

        <v-toolbar color="primary-blue" class="text-white" density="compact">
          <v-toolbar-title class="text-subtitle-1 font-weight-bold">
            {{ filteredProducts[currentIndex]?.name || 'Visualizador de Productos' }}
          </v-toolbar-title>
          <v-spacer />
          <v-btn
            v-if="loadedData[currentIndex]?.type?.includes('html') && activeTab === 'visual'"
            icon="mdi-fullscreen"
            @click="toggleFullScreen"
          />
          <v-btn icon="mdi-close" @click="closeOverlay" />
        </v-toolbar>

        <v-tabs v-model="activeTab" color="primary" bg-color="grey-lighten-4" grow>
          <v-tab value="visual" class="text-none font-weight-bold"><v-icon start>mdi-chart-bar</v-icon> Visualización</v-tab>
          <v-tab value="data"   class="text-none font-weight-bold"><v-icon start>mdi-table</v-icon> Datos (CSV)</v-tab>
          <v-tab value="meta"   class="text-none font-weight-bold"><v-icon start>mdi-information-outline</v-icon> Metadatos</v-tab>
        </v-tabs>

        <div class="h-100 overflow-hidden bg-white">

          <div v-if="activeTab === 'visual'" class="h-100">
            <v-carousel
              v-model="currentIndex"
              hide-delimiters
              height="calc(100vh - 112px)"
              @update:model-value="onSlideChange"
            >
              <v-carousel-item v-for="(product, i) in filteredProducts" :key="product.product_id">
                <div :id="'container-' + i" class="fill-height d-flex align-center justify-center bg-black">

                  <v-progress-circular v-if="!loadedData[i]" indeterminate size="70" color="primary" />

                  <template v-else>
                    <v-img
                      v-if="loadedData[i]?.type?.includes('image')"
                      :src="loadedData[i]?.url ?? ''"
                      contain width="100%" height="100%" max-height="90vh"
                    />
                    <iframe
                      v-else-if="loadedData[i]?.type?.includes('pdf') || loadedData[i]?.type?.includes('html')"
                      :src="loadedData[i]?.url ?? ''"
                      class="full-size-iframe"
                      style="width: 100%; height: 100%; border: none; background: white;"
                      referrerpolicy="no-referrer"
                      sandbox="allow-scripts allow-same-origin"
                    />
                    <audio v-else-if="loadedData[i]?.type?.includes('audio')" controls :src="loadedData[i]?.url ?? ''" />
                    <v-empty-state v-else icon="mdi-file-question" title="Formato no soportado directamente">
                      <v-btn :href="loadedData[i]?.url ?? ''" download>Descargar para ver</v-btn>
                    </v-empty-state>
                  </template>

                </div>
              </v-carousel-item>
            </v-carousel>
          </div>

          <div v-if="activeTab === 'data'" class="h-100 pa-8 overflow-y-auto">
            <v-empty-state
              icon="mdi-table-large"
              title="Datos no cargados"
              text="No disponemos de una vista previa de los datos en este momento, pero puedes descargar el CSV para explorarlos."
            >
              <v-btn color="black" prepend-icon="mdi-download">Descargar CSV</v-btn>
            </v-empty-state>
          </div>

          <div v-if="activeTab === 'meta'" class="h-100 pa-8 overflow-y-auto">
            <v-row v-if="currentProduct">
              <v-col cols="12" md="6" class="pr-md-8">
                <h2 class="text-h5 font-weight-bold mb-6 text-grey-darken-4">Contexto de Origen</h2>
                <div class="mb-6">
                  <div class="text-subtitle-1 font-weight-bold text-grey-darken-4 mb-1">ID del Producto</div>
                  <div class="text-body-1 text-primary">{{ currentProduct.product_id }}</div>
                </div>
                <div class="mb-6">
                  <div class="text-subtitle-1 font-weight-bold text-grey-darken-4 mb-1">Observatorio padre</div>
                  <div class="text-body-1 text-grey-darken-1">{{ route.params.observatory_id }}</div>
                </div>
                <div class="mb-6">
                  <div class="text-subtitle-1 font-weight-bold text-grey-darken-4 mb-1">Descripción</div>
                  <div class="text-body-1 text-grey-darken-1 text-wrap" style="line-height: 1.5;">
                    {{ currentProduct.description || 'Sin descripción disponible para este producto.' }}
                  </div>
                </div>
              </v-col>

              <v-col cols="12" md="6">
                <h2 class="text-h5 font-weight-bold mb-4 text-grey-darken-4">Parámetros de Consulta (DSL)</h2>
                <v-sheet
                  color="grey-lighten-4"
                  rounded="lg"
                  class="pa-4 mb-8 text-body-1 text-grey-darken-2"
                  style="font-family: monospace;"
                >
                  {{ productDSL }}
                </v-sheet>

                <h2 class="text-h5 font-weight-bold mt-6 mb-4 text-grey-darken-4">Etiquetas</h2>
                <div class="d-flex flex-wrap ga-2">
                  <template v-if="tagDetailsCache[currentProduct.product_id]?.length">
                    <v-chip
                      v-for="tag in tagDetailsCache[currentProduct.product_id]"
                      :key="tag.catalog_item_id"
                      color="primary"
                      variant="flat"
                      size="default"
                      class="font-weight-bold text-white px-4"
                    >
                      {{ tag.name }}
                    </v-chip>
                  </template>
                  <template v-else-if="currentProduct.tags?.length">
                    <v-chip
                      v-for="tag in currentProduct.tags"
                      :key="tag"
                      color="primary"
                      variant="flat"
                      size="default"
                      class="font-weight-bold text-white px-4"
                    >
                      {{ tag }}
                    </v-chip>
                  </template>
                  <span v-else class="text-body-1 text-grey-darken-1">
                    Sin etiquetas asociadas
                  </span>
                </div>
              </v-col>
            </v-row>
          </div>

        </div>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="copiedSnack" :timeout="2000" color="success" rounded="pill">
      <v-icon start>mdi-check</v-icon> Consulta copiada
    </v-snackbar>

    <!-- ── Reviews ── -->
    <v-row id="resenas" class="mt-6 mb-2">
      <v-col cols="12">
        <v-card rounded="xl" elevation="2" class="border">
          <v-card-text class="pa-5 pb-3 d-flex align-center justify-space-between flex-wrap ga-2">
            <div class="d-flex align-center ga-3">
              <v-icon color="amber-darken-1" size="24">mdi-star</v-icon>
              <span class="text-h6 font-weight-bold">Reseñas</span>
              <v-chip v-if="reviews.length" size="small" color="amber" variant="tonal" class="font-weight-bold">
                {{ avgRating.toFixed(1) }} ★ &nbsp;·&nbsp; {{ reviews.length }}
              </v-chip>
              <span v-else class="text-body-2 text-grey-darken-1">(sin reseñas aún)</span>
            </div>
            <v-btn
              v-if="!myReview"
              color="primary"
              variant="tonal"
              size="small"
              prepend-icon="mdi-pencil-outline"
              class="text-none"
              @click="openReviewDialog()"
            >Escribir reseña</v-btn>
          </v-card-text>

          <v-divider />

          <v-list v-if="reviews.length" lines="two" class="pa-2">
            <template v-for="(review, i) in reviews" :key="review.review_id">
              <v-list-item class="rounded-lg px-4 py-3">
                <template #prepend>
                  <v-avatar color="primary" variant="tonal" size="40" class="mr-3">
                    <v-icon>mdi-account-outline</v-icon>
                  </v-avatar>
                </template>

                <v-list-item-title class="d-flex align-center ga-2 mb-1 flex-wrap">
                  <v-rating :model-value="review.rating" color="amber" density="compact" size="small" readonly half-increments />
                  <span class="text-caption text-grey-darken-1">{{ getRelativeTime(review.created_at) }}</span>
                  <v-chip v-if="review.user_id === currentUserId" size="x-small" color="primary" variant="tonal">Tú</v-chip>
                </v-list-item-title>

                <v-list-item-subtitle class="text-body-2 text-grey-darken-2" style="white-space: normal;">
                  {{ review.content }}
                </v-list-item-subtitle>

                <template v-if="review.user_id === currentUserId" #append>
                  <div class="d-flex ga-1">
                    <v-btn icon="mdi-pencil-outline" size="x-small" variant="text" color="grey-darken-1" @click="openReviewDialog(review)" />
                    <v-btn icon="mdi-delete-outline" size="x-small" variant="text" color="error" @click="confirmDeleteReview(review)" />
                  </div>
                </template>
              </v-list-item>
              <v-divider v-if="i < reviews.length - 1" inset class="my-1" />
            </template>
          </v-list>

          <div v-else class="pa-8 text-center">
            <v-icon size="48" color="grey-lighten-2" class="mb-2">mdi-star-outline</v-icon>
            <p class="text-body-2 text-grey-darken-1">Sé el primero en dejar una reseña sobre este observatorio.</p>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Review create/edit dialog -->
    <v-dialog v-model="reviewDialog" max-width="480" persistent>
      <v-card rounded="xl">
        <v-toolbar color="primary" density="comfortable">
          <v-toolbar-title class="text-subtitle-1 font-weight-bold text-white">
            {{ editingReview ? 'Editar reseña' : 'Nueva reseña' }}
          </v-toolbar-title>
          <template #append>
            <v-btn icon="mdi-close" variant="text" color="white" @click="reviewDialog = false" />
          </template>
        </v-toolbar>
        <v-card-text class="pa-6">
          <div class="text-center mb-5">
            <p class="text-subtitle-2 font-weight-bold mb-2">Calificación</p>
            <v-rating v-model="reviewForm.rating" color="amber" hover size="x-large" />
          </div>
          <v-textarea
            v-model="reviewForm.content"
            label="Comentario"
            variant="outlined"
            rows="4"
            maxlength="500"
            counter
            hide-details="auto"
          />
        </v-card-text>
        <v-card-actions class="px-6 pb-5 pt-0">
          <v-spacer />
          <v-btn variant="text" color="grey-darken-1" class="text-none" @click="reviewDialog = false">Cancelar</v-btn>
          <v-btn
            color="primary"
            variant="flat"
            rounded="pill"
            class="px-6 text-none font-weight-bold"
            :loading="savingReview"
            :disabled="!reviewForm.rating || !reviewForm.content.trim()"
            @click="saveReview"
          >{{ editingReview ? 'Actualizar' : 'Publicar' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete confirm dialog -->
    <v-dialog v-model="deleteDialog" max-width="380">
      <v-card rounded="xl">
        <v-card-text class="pa-6 text-center">
          <v-icon size="48" color="error" class="mb-3">mdi-delete-outline</v-icon>
          <p class="text-subtitle-1 font-weight-bold mb-1">¿Eliminar reseña?</p>
          <p class="text-body-2 text-grey-darken-1">Esta acción no se puede deshacer.</p>
        </v-card-text>
        <v-card-actions class="px-6 pb-5 pt-0">
          <v-spacer />
          <v-btn variant="text" class="text-none" @click="deleteDialog = false">Cancelar</v-btn>
          <v-btn color="error" variant="flat" rounded="pill" class="px-6 text-none" :loading="deletingReview" @click="doDeleteReview">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>

  <!-- ── Observatory info drawer ── -->
  <v-navigation-drawer
    v-model="infoDrawer"
    location="right"
    temporary
    width="360"
  >
    <div class="pa-5">
      <div class="d-flex align-center justify-space-between mb-4">
        <span class="text-subtitle-1 font-weight-bold">Info del observatorio</span>
        <v-btn icon="mdi-close" variant="text" size="small" @click="infoDrawer = false" />
      </div>

      <template v-if="observatory">
        <h2 class="text-h6 font-weight-black text-capitalize mb-1">{{ observatory.title }}</h2>
        <p class="text-body-2 text-grey-darken-1 mb-4">{{ observatory.description }}</p>

        <div class="d-flex align-center ga-2 mb-1">
          <v-rating :model-value="avgRating" color="amber" density="compact" half-increments readonly size="small" />
          <span class="text-caption text-grey-darken-1">({{ reviews.length }} reseñas)</span>
        </div>

        <v-btn
          variant="tonal"
          color="primary"
          size="small"
          prepend-icon="mdi-star-outline"
          class="text-none mb-4"
          block
          @click="infoDrawer = false; scrollToReviews()"
        >Ir a Reseñas</v-btn>

        <!-- Last 5 reviews -->
        <div v-if="reviews.length" class="mb-4">
          <div class="text-caption font-weight-bold text-grey-darken-2 mb-2 text-uppercase" style="letter-spacing: 0.05em;">Últimas reseñas</div>
          <div
            v-for="review in reviews.slice(0, 5)"
            :key="review.review_id"
            class="mb-3 pa-3 rounded-lg bg-grey-lighten-4"
          >
            <div class="d-flex align-center ga-2 mb-1">
              <v-rating :model-value="review.rating" color="amber" density="compact" size="x-small" readonly half-increments />
              <span class="text-caption text-grey-darken-1 ml-auto">{{ getRelativeTime(review.created_at) }}</span>
            </div>
            <p class="text-body-2 text-grey-darken-2 mb-0" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
              {{ review.content }}
            </p>
          </div>
          <v-btn
            v-if="reviews.length > 5"
            variant="text"
            size="small"
            color="primary"
            class="text-none px-0"
            @click="infoDrawer = false; scrollToReviews()"
          >Ver todas ({{ reviews.length }})</v-btn>
        </div>
        <p v-else class="text-body-2 text-grey-darken-1 mb-4">Sin reseñas aún.</p>

        <v-divider class="mb-4" />

        <div v-if="observatory.services?.length" class="mb-4">
          <div class="text-caption font-weight-bold text-grey-darken-2 mb-2 text-uppercase" style="letter-spacing: 0.05em;">Servicios</div>
          <div class="d-flex flex-wrap ga-1">
            <v-chip
              v-for="svc in observatory.services"
              :key="svc.service_id"
              to="/external/services"
              size="small"
              color="primary"
              variant="tonal"
              class="font-weight-medium cursor-pointer"
              prepend-icon="mdi-cog-outline"
              @click="infoDrawer = false"
            >{{ svc.name }}</v-chip>
          </div>
        </div>

        <div v-if="observatory.data_sources?.length">
          <div class="text-caption font-weight-bold text-grey-darken-2 mb-2 text-uppercase" style="letter-spacing: 0.05em;">Fuente de datos</div>
          <div class="d-flex flex-wrap ga-1">
            <v-chip
              v-for="ds in observatory.data_sources"
              :key="ds.source_id"
              :to="`/datasources/${ds.source_id}`"
              size="small"
              color="teal"
              variant="tonal"
              class="font-weight-medium cursor-pointer"
              prepend-icon="mdi-database-outline"
              @click="infoDrawer = false"
            >{{ ds.name }}</v-chip>
          </div>
        </div>
      </template>

      <v-skeleton-loader v-else type="article" />
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { type ProductXDTO, type CatalogItemXResponseDTO, type ReviewDTO, type ObservatoryDTO } from '@/types/index.types';
import { useJubStore } from '@/stores/jub';
import { useAppStore, SnackbarColor } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';
import { getRelativeTime } from '@/utils/date';
import { useRoute } from 'vue-router';

definePage({
  name: 'ObservatoryDetails',
  path: '/observatories/:observatory_id',
  meta: {
    requiresAuth: true,
    layout: 'dashboard',
  },
});

const route      = useRoute('ObservatoryDetails');
const jubStore   = useJubStore();
const appStore   = useAppStore();
const authStore  = useAuthStore();
const currentUserId = computed(() => authStore.getUser()?.user_id ?? '');

// ── Form state ────────────────────────────────────────────────────────────────
const loadingItems = ref(false);
const items = ref<Record<'VS' | 'VT' | 'VI', Array<{ title: string; value: string }>>>({
  VS: [], VT: [], VI: [],
});
const operators = ref({ vs: 'OR', vt: 'AND', vi: 'AND' });
const form      = ref({ vs: [] as string[], vt: [] as string[], vi: [] as string[] });

function buildGroup(arr: string[], op: string): string {
  return arr.join(` ${op} `);
}

function buildSentence(arr: string[], op: string, noun: string): string {
  const conj = op === 'OR' ? ' <b>ó</b> ' : ' <b>y</b> ';
  return `Productos donde ${noun} sea ${arr.join(conj)}`;
}

const computedDSL = computed(() => {
  const vs = form.value.vs.length > 0 ? buildGroup(form.value.vs, operators.value.vs) : '*';
  const vt = form.value.vt.length > 0 ? buildGroup(form.value.vt, operators.value.vt) : '*';
  const vi = form.value.vi.length > 0 ? buildGroup(form.value.vi, operators.value.vi) : '*';
  return `jub.v1.VS(${vs}).VT(${vt}).VI(${vi})`;
});

function resetForm() {
  form.value      = { vs: [], vt: [], vi: [] };
  operators.value = { vs: 'OR', vt: 'AND', vi: 'AND' };
}

const copiedSnack   = ref(false);
const advancedMode  = ref(false);
const advancedQuery = ref('');

function onToggleAdvanced(val: boolean | null) {
  if (val) advancedQuery.value = computedDSL.value;
}

async function copyDSL() {
  await navigator.clipboard.writeText(advancedMode.value ? advancedQuery.value : computedDSL.value);
  copiedSnack.value = true;
}

// ── Observatory enriched data ─────────────────────────────────────────────────
const observatory = ref<ObservatoryDTO | null>(null);
const infoDrawer  = ref(false);

function serviceRoute(provider: string): string {
  if (provider === 'NEZ') return '/services/nez';
  if (provider === 'XELHUA') return '/services/xelhua';
  return '/external/services';
}

function scrollToReviews() {
  document.getElementById('resenas')?.scrollIntoView({ behavior: 'smooth' });
}

function extensionIcon(ext?: string): string {
  const e = ext?.toLowerCase() ?? '';
  if (['fits', 'fit'].includes(e)) return 'mdi-telescope';
  if (e === 'csv') return 'mdi-file-delimited-outline';
  if (e === 'json') return 'mdi-code-json';
  if (['hdf5', 'h5'].includes(e)) return 'mdi-database';
  if (e === 'xml') return 'mdi-file-xml-box';
  if (['png', 'jpg', 'jpeg', 'gif', 'tiff'].includes(e)) return 'mdi-image';
  if (e === 'pdf') return 'mdi-file-pdf-box';
  if (e === 'txt') return 'mdi-file-document-outline';
  if (e == "html") return 'mdi-language-html5';
  return 'mdi-file-outline';
}

// ── Tag name resolution ───────────────────────────────────────────────────────
const tagNameMap = computed(() => {
  const map = new Map<string, string>();
  for (const list of Object.values(items.value)) {
    for (const item of list) {
      const name = item.title?.split(' (')[0] ?? 'Unknown';
      map.set(item.value, name);
    }
  }
  return map;
});

// ── Search / results ──────────────────────────────────────────────────────────
const searchCounter    = ref(0);
const filteredProducts = ref<ProductXDTO[]>([]);
const viewMode         = ref<'grid' | 'table'>('grid');
const strict           = ref(false);
const skip             = ref(0);
const loadingMore      = ref(false);
const canLoadMore      = ref(false);
const pageSize         = computed(() => authStore.settings?.exploration?.items_per_page ?? 24);

async function executeSearch() {
  searchCounter.value++;
  skip.value = 0;
  const query = advancedMode.value ? advancedQuery.value : computedDSL.value;
  filteredProducts.value = await jubStore.search(
    query,
    route.params.observatory_id as string,
    0,
    pageSize.value,
    strict.value,
  );
  canLoadMore.value = filteredProducts.value.length === pageSize.value;
}

async function loadMore() {
  loadingMore.value = true;
  skip.value += pageSize.value;
  const query = advancedMode.value ? advancedQuery.value : computedDSL.value;
  const more = await jubStore.search(
    query,
    route.params.observatory_id as string,
    skip.value,
    pageSize.value,
    strict.value,
  );
  filteredProducts.value.push(...more);
  canLoadMore.value = more.length === pageSize.value;
  loadingMore.value = false;
}

// ── Product overlay ───────────────────────────────────────────────────────────
const activeTab    = ref('visual');
const showOverlay  = ref(false);
const currentIndex = ref(0);
const loadedData   = reactive<Record<number, { url: string | null; type: string | null }>>({});

const currentProduct = computed(() => filteredProducts.value[currentIndex.value]);

// Tag details fetched from GET /products/{id}/tags/details, keyed by product_id.
const tagDetailsCache = reactive<Record<string, CatalogItemXResponseDTO[]>>({});

const fetchTagDetailsIfNeeded = async (productId: string) => {
  if (!(productId in tagDetailsCache)) {
    tagDetailsCache[productId] = await jubStore.fetchProductTagDetails(productId);
  }
};

// DSL built from the product's actual tags using catalog_type to categorize each one.
const productDSL = computed(() => {
  const productId = currentProduct.value?.product_id;
  const tags = productId ? (tagDetailsCache[productId] ?? []) : [];
  if (!tags.length) return computedDSL.value;

  const vs = tags.filter(t => t.catalog_type === 'SPATIAL').map(t => t.value);
  const vt = tags.filter(t => t.catalog_type === 'TEMPORAL').map(t => String(t.code));
  const vi = tags.filter(t => t.catalog_type === 'INTEREST').map(t => t.value);

  return `jub.v1.VS(${vs.length ? vs.join(' OR ') : '*'}).VT(${vt.length ? vt.join(' AND ') : '*'}).VI(${vi.length ? vi.join(' AND ') : '*'})`;
});

const fetchIfNeeded = async (index: number) => {
  const product = filteredProducts.value[index];
  if (index >= 0 && product && !loadedData[index]) {
    loadedData[index] = await jubStore.downloadProduct(product.product_id);
  }
};

const onSlideChange = (index: number) => {
  fetchIfNeeded(index);
  fetchIfNeeded(index + 1);
  const p = filteredProducts.value[index];
  if (p) fetchTagDetailsIfNeeded(p.product_id);
};

const openOverlay = (startAt: number) => {
  currentIndex.value = startAt;
  showOverlay.value  = true;
  onSlideChange(startAt);
};

const closeOverlay = () => {
  Object.values(loadedData).forEach(f => { if (f.url) URL.revokeObjectURL(f.url); });
  Object.keys(loadedData).forEach(k => delete loadedData[parseInt(k)]);
  showOverlay.value = false;
};

const openDetails = (product: ProductXDTO) => {
  openOverlay(filteredProducts.value.findIndex(p => p.product_id === product.product_id));
};

const toggleFullScreen = () => {
  const el = document.getElementById(`container-${currentIndex.value}`);
  if (!el) return;
  document.fullscreenElement ? document.exitFullscreen() : el.requestFullscreen();
};

document.addEventListener('fullscreenchange', () => {
  document.querySelectorAll<HTMLIFrameElement>('.plot-iframe').forEach(iframe => {
    iframe.contentWindow?.dispatchEvent(new Event('resize'));
  });
});

// ── Create product dialog ─────────────────────────────────────────────────────
const showCreateDialog = ref(false);
const newTask = ref({ name: '', privacy: '', dataSource: '', catalogs: [] as string[] });
const catalogData = {
  DATASOURCE1: ['TAMPS', 'CDMX', 'NL', 'MEXICO'],
  DATASOURCE2: ['2023', '2024', '2025', '2026'],
  DATASOURCEN: ['SEX.M', 'SEX.F', 'CIE10.C50'],
};

const handleCreateTask = () => {
  appStore.showSnackbar('Tarea creada exitosamente', 3000, SnackbarColor.SUCCESS);
  showCreateDialog.value = false;
};

// ── Reviews ───────────────────────────────────────────────────────────────────
const obsId = computed(() => route.params.observatory_id as string);

const reviews       = ref<ReviewDTO[]>([]);
const reviewDialog  = ref(false);
const deleteDialog  = ref(false);
const savingReview  = ref(false);
const deletingReview = ref(false);
const editingReview = ref<ReviewDTO | null>(null);
const pendingDelete = ref<ReviewDTO | null>(null);
const reviewForm    = ref({ rating: 0, content: '' });

const avgRating = computed(() => {
  if (!reviews.value.length) return 0;
  return reviews.value.reduce((s, r) => s + r.rating, 0) / reviews.value.length;
});

const myReview = computed(() => reviews.value.find(r => r.user_id === currentUserId.value) ?? null);

async function loadReviews() {
  reviews.value = await jubStore.getReviews(obsId.value);
}

function openReviewDialog(review?: ReviewDTO) {
  editingReview.value = review ?? null;
  reviewForm.value    = review ? { rating: review.rating, content: review.content } : { rating: 0, content: '' };
  reviewDialog.value  = true;
}

async function saveReview() {
  savingReview.value = true;
  try {
    if (editingReview.value) {
      const updated = await jubStore.updateReview(obsId.value, editingReview.value.review_id, reviewForm.value.content, reviewForm.value.rating);
      if (updated) {
        const idx = reviews.value.findIndex(r => r.review_id === editingReview.value!.review_id);
        if (idx !== -1) reviews.value[idx] = updated;
        appStore.showSnackbar('Reseña actualizada', 2500, SnackbarColor.SUCCESS);
      } else {
        appStore.showSnackbar('Error al actualizar la reseña', 3000, SnackbarColor.ERROR);
      }
    } else {
      const created = await jubStore.createReview(obsId.value, reviewForm.value.content, reviewForm.value.rating);
      if (created) {
        reviews.value.unshift(created);
        appStore.showSnackbar('Reseña publicada', 2500, SnackbarColor.SUCCESS);
      } else {
        appStore.showSnackbar('Error al publicar la reseña', 3000, SnackbarColor.ERROR);
      }
    }
    reviewDialog.value = false;
  } finally {
    savingReview.value = false;
  }
}

function confirmDeleteReview(review: ReviewDTO) {
  pendingDelete.value = review;
  deleteDialog.value  = true;
}

async function doDeleteReview() {
  if (!pendingDelete.value) return;
  deletingReview.value = true;
  const ok = await jubStore.deleteReview(obsId.value, pendingDelete.value.review_id);
  if (ok) {
    reviews.value = reviews.value.filter(r => r.review_id !== pendingDelete.value!.review_id);
    appStore.showSnackbar('Reseña eliminada', 2500, SnackbarColor.SUCCESS);
  } else {
    appStore.showSnackbar('Error al eliminar la reseña', 3000, SnackbarColor.ERROR);
  }
  deletingReview.value = false;
  deleteDialog.value   = false;
  pendingDelete.value  = null;
}

// ── Init ──────────────────────────────────────────────────────────────────────
onMounted(async () => {
  jubStore.incrementViews(obsId.value);
  loadReviews();

  loadingItems.value = true;
  const [enriched, VS, VT, VI] = await Promise.all([
    jubStore.getObservatory(obsId.value),
    jubStore.fetchCatalogItemsByType('SPATIAL'),
    jubStore.fetchCatalogItemsByType('TEMPORAL'),
    jubStore.fetchCatalogItemsByType('INTEREST'),
  ]);
  observatory.value  = enriched;
  items.value        = { VS, VT, VI };
  loadingItems.value = false;
  await executeSearch();
});
</script>

<style scoped>
.cursor-help { cursor: help; }

div[id^="container-"]:fullscreen {
  width: 100vw !important;
  height: 100vh !important;
  background-color: white !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

:deep(.v-window__container) { height: 100% !important; }
:deep(.v-carousel__item)    { height: 100% !important; }

.full-size-iframe {
  display: block;
  flex: 1 1 auto;
}
</style>
