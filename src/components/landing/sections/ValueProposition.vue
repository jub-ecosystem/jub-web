<template>
  <v-sheet class="bg-surface py-12 py-md-16 overflow-hidden">
    <v-container max-width="1200" v-intersect="onIntersect">

      <v-row justify="center" class="text-center mb-10 mb-md-16">
        <v-col cols="12" md="8">
          <v-chip color="secondary-blue" variant="tonal" size="small" class="font-weight-bold mb-4 text-uppercase tracking-wide">
            El Flujo de Trabajo
          </v-chip>
          <h2 class="text-h4 text-md-h3 font-weight-black text-grey-darken-4 mb-4" style="line-height: 1.2;">
            Una solución integral desde la
            ingesta hasta la consulta.
          </h2>
          <p class="text-body-2 text-body-md-1 text-grey-darken-1 mx-auto" style="max-width: 700px;">
            Jub no es solo un repositorio, es el orquestador central del ecosistema. Así procesamos, organizamos y resguardamos la información estratégica.
          </p>
        </v-col>
      </v-row>

      <v-timeline align="start" truncate-line="both" side="end" class="workflow-timeline">

        <!-- Step 1 -->
        <v-timeline-item dot-color="primary" size="large" fill-dot>
          <template v-slot:icon><span class="text-h6 text-white font-weight-bold">1</span></template>

          <v-card elevation="0" rounded="xl" class="border bg-white transition-swing hover-card" :class="isVisible ? 'fade-up-active' : 'fade-up-hidden'" style="transition-delay: 100ms;">
            <div class="d-flex">
              <div class="icon-panel bg-grey-lighten-4 d-flex align-center justify-center flex-shrink-0">
                <v-icon class="workflow-icon" color="primary">mdi-filter-variant</v-icon>
              </div>
              <div class="pa-4 pa-sm-6 flex-grow-1 min-w-0">
                <h3 class="text-subtitle-1 text-sm-h5 font-weight-bold text-grey-darken-4 mb-1 mb-sm-2">Manejo inteligente de variables</h3>
                <p class="text-caption text-sm-body-2 text-grey-darken-1 mb-3 mb-sm-4">Gestión avanzada de metadatos para habilitar búsquedas precisas dentro de la plataforma Jub.</p>

                <ul class="list-unstyled mb-3 mb-sm-6">
                  <li class="d-flex align-start mb-2">
                    <v-icon color="primary" size="small" class="mr-2 mt-1 flex-shrink-0">mdi-check-circle</v-icon>
                    <span class="text-caption text-sm-body-2 text-grey-darken-3">Organización estructurada por <strong>dimensiones espaciales</strong>.</span>
                  </li>
                  <li class="d-flex align-start mb-2">
                    <v-icon color="primary" size="small" class="mr-2 mt-1 flex-shrink-0">mdi-check-circle</v-icon>
                    <span class="text-caption text-sm-body-2 text-grey-darken-3">Filtros exactos basados en <strong>variables temporales</strong>.</span>
                  </li>
                  <li class="d-flex align-start">
                    <v-icon color="primary" size="small" class="mr-2 mt-1 flex-shrink-0">mdi-check-circle</v-icon>
                    <span class="text-caption text-sm-body-2 text-grey-darken-3">Clasificación dinámica por <strong>áreas de interés</strong>.</span>
                  </li>
                </ul>

                <v-divider class="mb-3"></v-divider>

                <div class="d-flex flex-wrap ga-1 ga-sm-2">
                  <v-chip size="x-small" color="grey-darken-2" variant="flat" class="font-weight-bold">Objetivo 1</v-chip>
                  <v-chip size="x-small" color="primary" variant="tonal" class="font-weight-bold">Meta 1</v-chip>
                  <router-link to="/" class="text-decoration-none">
                    <v-chip size="x-small" color="secondary-blue" variant="outlined" class="font-weight-bold hover-chip cursor-pointer">Prod1E1-C2 (Buscador)</v-chip>
                  </router-link>
                </div>
              </div>
            </div>
          </v-card>
        </v-timeline-item>

        <!-- Step 2 -->
        <v-timeline-item dot-color="secondary-blue" size="large" fill-dot>
          <template v-slot:icon><span class="text-h6 text-white font-weight-bold">2</span></template>

          <v-card elevation="0" rounded="xl" class="border bg-white transition-swing hover-card" :class="isVisible ? 'fade-up-active' : 'fade-up-hidden'" style="transition-delay: 200ms;">
            <div class="d-flex">
              <div class="icon-panel bg-blue-lighten-5 d-flex align-center justify-center flex-shrink-0">
                <v-icon class="workflow-icon" color="secondary-blue">mdi-database-import</v-icon>
              </div>
              <div class="pa-4 pa-sm-6 flex-grow-1 min-w-0">
                <h3 class="text-subtitle-1 text-sm-h5 font-weight-bold text-grey-darken-4 mb-1 mb-sm-2">Ingesta automatizada</h3>
                <p class="text-caption text-sm-body-2 text-grey-darken-1 mb-3 mb-sm-4">Recolección de datos sin intervención manual al crear nuevos observatorios.</p>

                <ul class="list-unstyled mb-3 mb-sm-6">
                  <li class="d-flex align-start mb-2">
                    <v-icon color="secondary-blue" size="small" class="mr-2 mt-1 flex-shrink-0">mdi-check-circle</v-icon>
                    <span class="text-caption text-sm-body-2 text-grey-darken-3">Acoplamiento nativo y directo con <router-link to="/services/nez" class="font-weight-bold text-secondary-blue text-decoration-none hover-link">Nez</router-link> y <router-link to="/services/xelhua" class="font-weight-bold text-secondary-blue text-decoration-none hover-link">Xelhua</router-link>.</span>
                  </li>
                  <li class="d-flex align-start mb-2">
                    <v-icon color="secondary-blue" size="small" class="mr-2 mt-1 flex-shrink-0">mdi-check-circle</v-icon>
                    <span class="text-caption text-sm-body-2 text-grey-darken-3">Integración disponible para sistemas propietarios mediante código.</span>
                  </li>
                </ul>

                <v-divider class="mb-3"></v-divider>

                <div class="d-flex flex-wrap ga-1 ga-sm-2">
                  <v-chip size="x-small" color="grey-darken-2" variant="flat" class="font-weight-bold">Objetivo 2 &amp; 3</v-chip>
                  <v-chip size="x-small" color="secondary-blue" variant="tonal" class="font-weight-bold">Meta 2 &amp; 3</v-chip>
                  <router-link to="/" class="text-decoration-none">
                    <v-chip size="x-small" color="secondary-blue" variant="outlined" class="font-weight-bold hover-chip cursor-pointer">Prod2E1-C2</v-chip>
                  </router-link>
                  <router-link to="/" class="text-decoration-none">
                    <v-chip size="x-small" color="secondary-blue" variant="outlined" class="font-weight-bold hover-chip cursor-pointer">Prod3E1-C2</v-chip>
                  </router-link>
                </div>
              </div>
            </div>
          </v-card>
        </v-timeline-item>

        <!-- Step 3 -->
        <v-timeline-item dot-color="teal" size="large" fill-dot>
          <template v-slot:icon><span class="text-h6 text-white font-weight-bold">3</span></template>

          <v-card elevation="0" rounded="xl" class="border bg-white transition-swing hover-card" :class="isVisible ? 'fade-up-active' : 'fade-up-hidden'" style="transition-delay: 300ms;">
            <div class="d-flex">
              <div class="icon-panel bg-teal-lighten-5 d-flex align-center justify-center flex-shrink-0">
                <v-icon class="workflow-icon" color="teal">mdi-file-tree</v-icon>
              </div>
              <div class="pa-4 pa-sm-6 flex-grow-1 min-w-0">
                <h3 class="text-subtitle-1 text-sm-h5 font-weight-bold text-grey-darken-4 mb-1 mb-sm-2">Concentrador de datos y metadatos</h3>
                <p class="text-caption text-sm-body-2 text-grey-darken-1 mb-3 mb-sm-4">El motor central que asegura que la información esté estructurada para los investigadores.</p>

                <ul class="list-unstyled mb-3 mb-sm-6">
                  <li class="d-flex align-start mb-2">
                    <v-icon color="teal" size="small" class="mr-2 mt-1 flex-shrink-0">mdi-check-circle</v-icon>
                    <span class="text-caption text-sm-body-2 text-grey-darken-3">Estructuración y organización en el <strong>Concentrador DCS-PI</strong>.</span>
                  </li>
                  <li class="d-flex align-start">
                    <v-icon color="teal" size="small" class="mr-2 mt-1 flex-shrink-0">mdi-check-circle</v-icon>
                    <span class="text-caption text-sm-body-2 text-grey-darken-3">Indexación centralizada para descubrimiento instantáneo.</span>
                  </li>
                </ul>

                <v-divider class="mb-3"></v-divider>

                <div class="d-flex flex-wrap ga-1 ga-sm-2">
                  <v-chip size="x-small" color="teal" variant="tonal" class="font-weight-bold">Meta 1</v-chip>
                  <router-link to="/" class="text-decoration-none">
                    <v-chip size="x-small" color="secondary-blue" variant="outlined" class="font-weight-bold hover-chip cursor-pointer">Prod1E1-C1 (Concentrador)</v-chip>
                  </router-link>
                </div>
              </div>
            </div>
          </v-card>
        </v-timeline-item>

        <!-- Step 4 -->
        <v-timeline-item dot-color="grey-darken-4" size="large" fill-dot>
          <template v-slot:icon><span class="text-h6 text-white font-weight-bold">4</span></template>

          <v-card elevation="0" rounded="xl" class="border bg-white transition-swing hover-card" :class="isVisible ? 'fade-up-active' : 'fade-up-hidden'" style="transition-delay: 400ms;">
            <div class="d-flex">
              <div class="icon-panel bg-grey-lighten-3 d-flex align-center justify-center flex-shrink-0">
                <v-icon class="workflow-icon" color="grey-darken-4">mdi-server-network</v-icon>
              </div>
              <div class="pa-4 pa-sm-6 flex-grow-1 min-w-0">
                <h3 class="text-subtitle-1 text-sm-h5 font-weight-bold text-grey-darken-4 mb-1 mb-sm-2">Persistencia y alta disponibilidad</h3>
                <p class="text-caption text-sm-body-2 text-grey-darken-1 mb-3 mb-sm-4">Almacenamiento distribuido de productos de información, contenidos y datos crudos.</p>

                <ul class="list-unstyled mb-3 mb-sm-6">
                  <li class="d-flex align-start mb-2">
                    <v-icon color="grey-darken-4" size="small" class="mr-2 mt-1 flex-shrink-0">mdi-check-circle</v-icon>
                    <span class="text-caption text-sm-body-2 text-grey-darken-3">Arquitectura respaldada por <router-link to="/services/mictlanx" class="font-weight-bold text-grey-darken-4 text-decoration-underline hover-link">MictlanX</router-link>.</span>
                  </li>
                  <li class="d-flex align-start mb-2">
                    <v-icon color="grey-darken-4" size="small" class="mr-2 mt-1 flex-shrink-0">mdi-check-circle</v-icon>
                    <span class="text-caption text-sm-body-2 text-grey-darken-3">Alta disponibilidad garantizada para ecosistemas críticos.</span>
                  </li>
                  <li class="d-flex align-start">
                    <v-icon color="grey-darken-4" size="small" class="mr-2 mt-1 flex-shrink-0">mdi-check-circle</v-icon>
                    <span class="text-caption text-sm-body-2 text-grey-darken-3">Seguridad criptográfica en las transferencias de datos.</span>
                  </li>
                </ul>

                <v-divider class="mb-3"></v-divider>

                <div class="d-flex flex-wrap ga-1 ga-sm-2">
                  <v-chip size="x-small" color="grey-darken-2" variant="flat" class="font-weight-bold">Objetivo 4</v-chip>
                  <v-chip size="x-small" color="grey-darken-4" variant="tonal" class="font-weight-bold">Meta 4</v-chip>
                  <router-link to="/" class="text-decoration-none">
                    <v-chip size="x-small" color="secondary-blue" variant="outlined" class="font-weight-bold hover-chip cursor-pointer">Prod4E1-C1 (Cliente)</v-chip>
                  </router-link>
                  <router-link to="/" class="text-decoration-none">
                    <v-chip size="x-small" color="secondary-blue" variant="outlined" class="font-weight-bold hover-chip cursor-pointer">Prod4E1-C2 (VSS)</v-chip>
                  </router-link>
                </div>
              </div>
            </div>
          </v-card>
        </v-timeline-item>

        <!-- Step 5 -->
        <v-timeline-item dot-color="indigo" size="large" fill-dot>
          <template v-slot:icon><span class="text-h6 text-white font-weight-bold">5</span></template>

          <v-card elevation="0" rounded="xl" class="border bg-white transition-swing hover-card" :class="isVisible ? 'fade-up-active' : 'fade-up-hidden'" style="transition-delay: 500ms;">
            <div class="d-flex">
              <div class="icon-panel bg-indigo-lighten-5 d-flex align-center justify-center flex-shrink-0">
                <v-icon class="workflow-icon" color="indigo">mdi-monitor-dashboard</v-icon>
              </div>
              <div class="pa-4 pa-sm-6 flex-grow-1 min-w-0">
                <h3 class="text-subtitle-1 text-sm-h5 font-weight-bold text-grey-darken-4 mb-1 mb-sm-2">Visualización y búsqueda unificada</h3>
                <p class="text-caption text-sm-body-2 text-grey-darken-1 mb-3 mb-sm-4">Acceso centralizado a los productos de información a través de una interfaz que integra los resultados de todo el ecosistema.</p>

                <ul class="list-unstyled mb-3 mb-sm-6">
                  <li class="d-flex align-start mb-2">
                    <v-icon color="indigo" size="small" class="mr-2 mt-1 flex-shrink-0">mdi-check-circle</v-icon>
                    <span class="text-caption text-sm-body-2 text-grey-darken-3">Exploración ágil e interactiva de los datos procesados.</span>
                  </li>
                  <li class="d-flex align-start mb-2">
                    <v-icon color="indigo" size="small" class="mr-2 mt-1 flex-shrink-0">mdi-check-circle</v-icon>
                    <span class="text-caption text-sm-body-2 text-grey-darken-3">Consulta de catálogos y productos generados por los diferentes observatorios.</span>
                  </li>
                  <li class="d-flex align-start">
                    <v-icon color="indigo" size="small" class="mr-2 mt-1 flex-shrink-0">mdi-check-circle</v-icon>
                    <span class="text-caption text-sm-body-2 text-grey-darken-3">Entorno unificador diseñado para apoyar la toma de decisiones.</span>
                  </li>
                </ul>

                <v-divider class="mb-3"></v-divider>

                <div class="d-flex flex-wrap ga-1 ga-sm-2">
                  <v-chip size="x-small" color="indigo" variant="tonal" class="font-weight-bold">Meta 1</v-chip>
                  <router-link to="/" class="text-decoration-none">
                    <v-chip size="x-small" color="secondary-blue" variant="outlined" class="font-weight-bold hover-chip cursor-pointer">Prod1E1-C2 (Buscador)</v-chip>
                  </router-link>
                  <router-link to="/" class="text-decoration-none">
                    <v-chip size="x-small" color="secondary-blue" variant="outlined" class="font-weight-bold hover-chip cursor-pointer">Jub UI</v-chip>
                  </router-link>
                </div>
              </div>
            </div>
          </v-card>
        </v-timeline-item>

      </v-timeline>

    </v-container>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isVisible = ref(false);

const onIntersect = (isIntersecting: boolean) => {
  if (isIntersecting) {
    isVisible.value = true;
  }
};
</script>

<style scoped>
.list-unstyled {
  list-style: none;
  padding-left: 0;
}

/* Icon panel: compact column on mobile, wider on sm+ */
.icon-panel {
  width: 68px;
  flex: 0 0 68px;
  border-radius: 12px 0 0 12px;
}

@media (min-width: 600px) {
  .icon-panel {
    width: 140px;
    flex: 0 0 140px;
  }
}

/* Icon sizes */
.workflow-icon {
  font-size: 28px !important;
}

@media (min-width: 600px) {
  .workflow-icon {
    font-size: 56px !important;
  }
}

/* Constrain timeline width on mobile so it doesn't overflow */
.workflow-timeline {
  padding-left: 0;
}

:deep(.v-timeline--vertical.v-timeline) {
  grid-template-columns: 0 min-content auto;
}

@media (min-width: 600px) {
  :deep(.v-timeline--vertical.v-timeline) {
    grid-template-columns: 1fr min-content 1fr;
  }
}

.tracking-wide {
  letter-spacing: 1.5px !important;
}

.fade-up-hidden {
  opacity: 0;
  transform: translateY(40px);
}

.fade-up-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.hover-card {
  transition: all 0.3s ease;
}

.hover-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08) !important;
  border-color: rgba(var(--v-theme-primary), 0.3) !important;
}

.hover-link {
  transition: opacity 0.2s ease;
}

.hover-link:hover {
  opacity: 0.7;
}

.hover-chip:hover {
  background-color: rgba(var(--v-theme-secondary-blue), 0.1) !important;
  transform: translateY(-1px);
  transition: all 0.2s ease;
}

:deep(.v-timeline-divider__line) {
  background: linear-gradient(to bottom, rgb(var(--v-theme-primary)), rgb(var(--v-theme-teal)), #212121) !important;
  opacity: 0.2;
}
</style>
