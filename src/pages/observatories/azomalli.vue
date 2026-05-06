<template>
  <div class="azomalli-page bg-background">

    <v-sheet class="hero-section d-flex flex-column align-center justify-center pt-16 pb-16">
      <v-container class="text-center position-relative z-10" max-width="800">

        <v-chip color="amber" variant="flat" class="mb-6 font-weight-bold text-grey-darken-4" size="large" prepend-icon="mdi-clock-outline">
          Etapa 2 — Próxima Etapa del Proyecto
        </v-chip>

        <v-avatar size="90" variant="flat" rounded="xl" class="mb-4" style="background-color: rgba(255,255,255,0.1);">
          <v-icon size="52" color="white">mdi-head-heart-outline</v-icon>
        </v-avatar>

        <h1 class="text-h2 text-white mb-2" style="font-family: Georgia, serif !important;">
          Azomalli
        </h1>

        <p class="text-body-1 mb-4" style="font-family: monospace; color: #CE93D8;">
          Observatorio de Salud Mental y Bienestar Social.
        </p>

        <h2 class="text-h5 font-weight-bold text-white mb-8">
          Análisis de datos de salud mental y comportamiento suicida a través del ecosistema JUB con Xelhua
        </h2>

        <div class="d-flex justify-center flex-wrap gap-2 mb-10">
          <v-chip variant="flat" class="font-weight-bold px-4" style="background-color: #4A148C; color: white;">Prod 7</v-chip>
          <v-chip variant="flat" class="font-weight-bold px-4" style="background-color: #4A148C; color: white;">Meta G</v-chip>
          <v-chip variant="flat" class="font-weight-bold px-4" style="background-color: #4A148C; color: white;">E2-C1</v-chip>
        </div>

        <div class="d-flex justify-center flex-wrap gap-3 pb-16">
          <v-tooltip text="No disponible — Etapa 2 pendiente" location="top">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" color="grey-darken-2" rounded="pill" size="large" elevation="0" class="text-none font-weight-bold px-8" disabled>
                <v-icon start>mdi-web</v-icon>
                Sitio del Observatorio
              </v-btn>
            </template>
          </v-tooltip>
          <v-tooltip text="No disponible — Etapa 2 pendiente" location="top">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" color="grey-darken-2" rounded="pill" size="large" elevation="0" class="text-none font-weight-bold px-8" disabled>
                <v-icon start>mdi-newspaper-variant-outline</v-icon>
                Artículo científico
              </v-btn>
            </template>
          </v-tooltip>
        </div>

      </v-container>
    </v-sheet>

    <v-container class="px-4 pb-10">
      <v-card class="mx-auto overlap-card mt-n12" max-width="1000" elevation="6" rounded="xl">
        <v-card-text class="pa-8 pa-md-10">
          <div class="text-center mb-8">
            <h2 class="text-h4 font-weight-black text-grey-darken-4 mb-4">¿Qué es el Observatorio Azomalli?</h2>
            <p class="text-body-1 text-grey-darken-1 mx-auto" style="max-width: 800px; line-height: 1.6;">
              Azomalli es un observatorio especializado en el análisis de datos relacionados con la salud mental y el comportamiento
              suicida. Integra fuentes de datos estructurados procesadas por la plataforma Xelhua —incluyendo el módulo de
              configuración de Xelhua— y expone los resultados de análisis a través de la interfaz del concentrador JUB.
              Los entregables de este observatorio incluyen una publicación en artículo científico arbitrado, además del
              despliegue y validación con usuarios finales de la plataforma.
            </p>
          </div>

          <v-row>
            <v-col cols="12" sm="6" md="3" class="text-center px-4">
              <v-avatar color="purple-lighten-4" variant="tonal" size="56" class="mb-3">
                <v-icon size="28" color="purple-darken-2">mdi-chart-bar</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-2 font-weight-bold mb-1">Análisis de Datos</h3>
              <p class="text-caption text-grey-darken-1">Procesamiento de registros epidemiológicos y estadísticas de salud mental a escala regional y nacional.</p>
            </v-col>
            <v-col cols="12" sm="6" md="3" class="text-center px-4">
              <v-avatar color="purple-lighten-4" variant="tonal" size="56" class="mb-3">
                <v-icon size="28" color="purple-darken-2">mdi-cog-transfer</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-2 font-weight-bold mb-1">Módulo Xelhua</h3>
              <p class="text-caption text-grey-darken-1">Configuración específica de Xelhua para los flujos de procesamiento de datos de salud mental e indicadores de bienestar.</p>
            </v-col>
            <v-col cols="12" sm="6" md="3" class="text-center px-4">
              <v-avatar color="purple-lighten-4" variant="tonal" size="56" class="mb-3">
                <v-icon size="28" color="purple-darken-2">mdi-monitor-dashboard</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-2 font-weight-bold mb-1">Visualización en JUB</h3>
              <p class="text-caption text-grey-darken-1">Dashboards y gráficas de análisis de salud mental integrados en la interfaz del concentrador JUB.</p>
            </v-col>
            <v-col cols="12" sm="6" md="3" class="text-center px-4">
              <v-avatar color="purple-lighten-4" variant="tonal" size="56" class="mb-3">
                <v-icon size="28" color="purple-darken-2">mdi-newspaper-variant</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-2 font-weight-bold mb-1">Publicación Científica</h3>
              <p class="text-caption text-grey-darken-1">Publicación de resultados en artículo científico arbitrado como entregable formal de la Meta G.</p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>

    <v-sheet class="bg-surface py-14">
      <v-container max-width="800">
        <div class="text-center mb-10">
          <v-chip color="amber" variant="tonal" class="mb-4 font-weight-bold" size="small">
            Meta G • Prod 7 • Etapa 2
          </v-chip>
          <h2 class="text-h4 font-weight-black text-grey-darken-4 mb-4">Componente Planificado</h2>
          <p class="text-body-1 text-grey-darken-1 mx-auto" style="max-width: 700px;">
            El observatorio Azomalli se articula en torno a un único componente principal de flujo de procesamiento,
            con umbrales de calidad más exigentes que el estándar del proyecto.
          </p>
        </div>

        <v-card rounded="xl" elevation="0" class="pa-8 border bg-grey-lighten-4">
          <div class="d-flex align-start">
            <v-avatar style="background-color: #4A148C;" variant="flat" rounded="lg" class="mr-4 mt-1">
              <v-icon color="white">mdi-head-heart-outline</v-icon>
            </v-avatar>
            <div class="flex-grow-1">
              <div class="d-flex justify-space-between align-center mb-2">
                <div class="text-caption font-weight-bold text-grey-darken-1">E2-C1</div>
                <v-chip size="x-small" color="amber" variant="tonal" class="font-weight-bold">0%</v-chip>
              </div>
              <h3 class="text-h5 font-weight-bold text-grey-darken-4 mb-3">Flujo de Procesamiento de Datos de Salud Mental</h3>
              <p class="text-body-1 text-grey-darken-2 mb-4">
                Diseño e implementación del pipeline completo de procesamiento de datos epidemiológicos de salud mental y suicidio.
                Incluye la configuración del módulo Xelhua específico para este dominio, la integración con JUB para exposición
                de resultados en la interfaz del concentrador, y la validación con usuarios finales de la plataforma.
                La verificación de este componente se realizará mediante la visualización de los análisis de salud mental
                y suicidios directamente en la interfaz de JUB.
              </p>
              <v-progress-linear model-value="0" style="background-color: #E1BEE7;" color="#4A148C" rounded height="8" class="mb-4"></v-progress-linear>
              <v-row>
                <v-col cols="12" sm="4">
                  <v-card color="purple-lighten-5" rounded="lg" class="pa-3 text-center">
                    <div class="text-h6 font-weight-black" style="color: #4A148C;">≥ 90%</div>
                    <div class="text-caption text-grey-darken-1">Cobertura de pruebas unitarias</div>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-card color="purple-lighten-5" rounded="lg" class="pa-3 text-center">
                    <div class="text-h6 font-weight-black" style="color: #4A148C;">100%</div>
                    <div class="text-caption text-grey-darken-1">Cumplimiento de casos de uso</div>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-card color="purple-lighten-5" rounded="lg" class="pa-3 text-center">
                    <div class="text-h6 font-weight-black" style="color: #4A148C;">1</div>
                    <div class="text-caption text-grey-darken-1">Artículo científico publicado</div>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-card>
      </v-container>
    </v-sheet>

    <v-sheet class="bg-grey-lighten-3 py-12">
      <v-container max-width="600">
        <div class="text-center mb-8">
          <h2 class="text-h5 font-weight-black text-grey-darken-4 mb-2">Plataformas Requeridas</h2>
          <p class="text-body-2 text-grey-darken-1">El Observatorio Azomalli depende de los siguientes servicios del ecosistema JUB.</p>
        </div>
        <v-row justify="center">
          <v-col v-for="dep in azomaliDependencies" :key="dep.name" cols="6" sm="4" class="text-center">
            <v-card rounded="xl" elevation="1" class="pa-4">
              <v-icon size="36" :color="dep.color" class="mb-2">{{ dep.icon }}</v-icon>
              <div class="text-subtitle-2 font-weight-bold">{{ dep.name }}</div>
              <div class="text-caption text-grey-darken-1">{{ dep.role }}</div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-sheet class="bg-surface py-10">
      <v-container max-width="700" class="text-center">
        <v-icon size="48" color="amber-darken-1" class="mb-4">mdi-information-outline</v-icon>
        <h3 class="text-h5 font-weight-bold text-grey-darken-4 mb-3">Estado del Observatorio</h3>
        <p class="text-body-1 text-grey-darken-1 mb-6">
          El Observatorio Azomalli forma parte de la <strong>Etapa 2</strong> del proyecto MADTEC-2025-M-478. Su desarrollo
          requiere que la plataforma Xelhua esté completamente operativa. Los entregables incluyen el enlace al sitio web en
          el concentrador JUB con el módulo de configuración de Xelhua, los resultados de pruebas en entorno real y
          la publicación de los resultados en un artículo científico arbitrado.
        </p>
        <v-chip color="amber" variant="flat" class="font-weight-bold text-grey-darken-4 px-6" size="large">
          <v-icon start>mdi-progress-clock</v-icon>
          0% de avance — Pendiente de inicio
        </v-chip>
      </v-container>
    </v-sheet>

  </div>
</template>

<script lang="ts" setup>
definePage({
  name: 'Azomalli',
  meta: {
    requiresAuth: false,
    layout: 'service',
  },
});

const azomaliDependencies = [
  { name: 'JUB', role: 'Concentrador', icon: 'mdi-hub-outline', color: 'primary' },
  { name: 'Xelhua', role: 'Procesamiento', icon: 'mdi-pipe', color: 'teal-darken-1' },
  { name: 'MictlanX', role: 'Almacenamiento', icon: 'mdi-database', color: 'grey-darken-3' },
];
</script>

<style scoped>
.hero-section {
  background-image: linear-gradient(160deg, rgba(20, 5, 35, 0.97) 0%, rgba(74, 20, 140, 0.80) 50%, rgba(20, 5, 35, 0.97) 100%);
  position: relative;
}

.overlap-card {
  position: relative;
  z-index: 20;
}

.gap-3 { gap: 12px; }
.gap-2 { gap: 8px; }
.gap-1 { gap: 4px; }
</style>
