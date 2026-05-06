<template>
  <div class="alerta-page bg-background">

    <v-sheet class="hero-section d-flex flex-column align-center justify-center pt-16 pb-16">
      <v-container class="text-center position-relative z-10" max-width="800">

        <v-chip color="amber" variant="flat" class="mb-6 font-weight-bold text-grey-darken-4" size="large" prepend-icon="mdi-clock-outline">
          Etapa 2 — Próxima Etapa del Proyecto
        </v-chip>

        <v-avatar size="90" variant="flat" rounded="xl" class="mb-4" style="background-color: rgba(255,255,255,0.1);">
          <v-icon size="52" color="white">mdi-biohazard</v-icon>
        </v-avatar>

        <h1 class="text-h2 text-white mb-2" style="font-family: Georgia, serif !important;">
          ALERTA
        </h1>

        <p class="text-body-1 mb-4" style="font-family: monospace; color: #FFAB91;">
          Observatorio Toxicológico de Monitoreo de Contaminantes.
        </p>

        <h2 class="text-h5 font-weight-bold text-white mb-8">
          Recolección y análisis de datos de contaminantes mediante trabajo de campo y procesamiento con Xelhua
        </h2>

        <div class="d-flex justify-center flex-wrap gap-2 mb-10">
          <v-chip variant="flat" class="font-weight-bold px-4" style="background-color: #BF360C; color: white;">Prod 6</v-chip>
          <v-chip variant="flat" class="font-weight-bold px-4" style="background-color: #BF360C; color: white;">Meta F</v-chip>
          <v-chip variant="flat" class="font-weight-bold px-4" style="background-color: #BF360C; color: white;">E2-C1</v-chip>
          <v-chip variant="flat" class="font-weight-bold px-4" style="background-color: #BF360C; color: white;">E2-C2</v-chip>
          <v-chip variant="flat" class="font-weight-bold px-4" style="background-color: #BF360C; color: white;">E2-C3</v-chip>
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
                <v-icon start>mdi-file-document-outline</v-icon>
                Reporte técnico
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
            <h2 class="text-h4 font-weight-black text-grey-darken-4 mb-4">¿Qué es el Observatorio ALERTA?</h2>
            <p class="text-body-1 text-grey-darken-1 mx-auto" style="max-width: 800px; line-height: 1.6;">
              ALERTA es un observatorio toxicológico diseñado para el monitoreo de contaminantes ambientales mediante la recolección
              de muestras en campo y el procesamiento automatizado de datos a través de Xelhua. El sistema genera bases de datos
              de metadatos de contaminantes, visualiza sus productos en la interfaz JUB y produce reportes técnicos para
              autoridades e instituciones de salud pública. Las cartas de transferencia a usuarios finales forman parte de los
              entregables formales de este observatorio.
            </p>
          </div>

          <v-row>
            <v-col cols="12" sm="6" md="3" class="text-center px-4">
              <v-avatar color="deep-orange-lighten-4" variant="tonal" size="56" class="mb-3">
                <v-icon size="28" color="deep-orange-darken-2">mdi-magnify-scan</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-2 font-weight-bold mb-1">Trabajo de Campo</h3>
              <p class="text-caption text-grey-darken-1">Recolección de muestras de contaminantes en sitios de monitoreo institucionales con protocolos estandarizados.</p>
            </v-col>
            <v-col cols="12" sm="6" md="3" class="text-center px-4">
              <v-avatar color="deep-orange-lighten-4" variant="tonal" size="56" class="mb-3">
                <v-icon size="28" color="deep-orange-darken-2">mdi-pipe</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-2 font-weight-bold mb-1">Procesamiento con Xelhua</h3>
              <p class="text-caption text-grey-darken-1">Análisis automatizado de datos de contaminantes mediante los flujos de procesamiento de la plataforma Xelhua.</p>
            </v-col>
            <v-col cols="12" sm="6" md="3" class="text-center px-4">
              <v-avatar color="deep-orange-lighten-4" variant="tonal" size="56" class="mb-3">
                <v-icon size="28" color="deep-orange-darken-2">mdi-database-search</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-2 font-weight-bold mb-1">Base de Metadatos</h3>
              <p class="text-caption text-grey-darken-1">Generación de una base de datos de metadatos de contaminantes indexada y consultable a través de JUB.</p>
            </v-col>
            <v-col cols="12" sm="6" md="3" class="text-center px-4">
              <v-avatar color="deep-orange-lighten-4" variant="tonal" size="56" class="mb-3">
                <v-icon size="28" color="deep-orange-darken-2">mdi-chart-scatter-plot</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-2 font-weight-bold mb-1">Visualización</h3>
              <p class="text-caption text-grey-darken-1">Mapas y gráficas de distribución de contaminantes expuestos en la interfaz del concentrador JUB.</p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>

    <v-sheet class="bg-surface py-14">
      <v-container max-width="1000">
        <div class="text-center mb-10">
          <v-chip color="amber" variant="tonal" class="mb-4 font-weight-bold" size="small">
            Meta F • Prod 6 • Etapa 2
          </v-chip>
          <h2 class="text-h4 font-weight-black text-grey-darken-4 mb-4">Componentes Planificados</h2>
          <p class="text-body-1 text-grey-darken-1 mx-auto" style="max-width: 700px;">
            El observatorio ALERTA se compone de tres módulos técnicos articulados alrededor del procesamiento
            de datos toxicológicos con Xelhua y el almacenamiento con MictlanX.
          </p>
        </div>

        <v-row>
          <v-col v-for="comp in alertaComponents" :key="comp.label" cols="12" md="4">
            <v-card rounded="xl" elevation="0" class="pa-6 border bg-grey-lighten-4 h-100">
              <div class="d-flex align-start">
                <v-avatar :color="comp.color" variant="flat" rounded="lg" class="mr-4 mt-1">
                  <v-icon color="white">{{ comp.icon }}</v-icon>
                </v-avatar>
                <div class="flex-grow-1">
                  <div class="d-flex justify-space-between align-center mb-1">
                    <div class="text-caption font-weight-bold text-grey-darken-1">{{ comp.label }}</div>
                    <v-chip size="x-small" color="amber" variant="tonal" class="font-weight-bold">0%</v-chip>
                  </div>
                  <h3 class="text-h6 font-weight-bold text-grey-darken-4 mb-1">{{ comp.title }}</h3>
                  <p class="text-body-2 text-grey-darken-2 mb-3">{{ comp.description }}</p>
                  <v-progress-linear model-value="0" color="deep-orange-darken-2" bg-color="grey-lighten-2" rounded height="6" class="mb-2"></v-progress-linear>
                  <div class="d-flex flex-wrap gap-1 mt-2">
                    <v-chip v-for="ind in comp.indicators" :key="ind" size="x-small" color="grey-lighten-2" variant="flat">{{ ind }}</v-chip>
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-sheet class="bg-grey-lighten-3 py-12">
      <v-container max-width="700">
        <div class="text-center mb-8">
          <h2 class="text-h5 font-weight-black text-grey-darken-4 mb-2">Plataformas Requeridas</h2>
          <p class="text-body-2 text-grey-darken-1">El Observatorio ALERTA depende de los siguientes servicios del ecosistema JUB.</p>
        </div>
        <v-row justify="center">
          <v-col v-for="dep in alertaDependencies" :key="dep.name" cols="6" sm="3" class="text-center">
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
          El Observatorio ALERTA forma parte de la <strong>Etapa 2</strong> del proyecto MADTEC-2025-M-478. Su desarrollo incluye
          trabajo de campo para recolección de muestras, procesamiento con Xelhua, generación de la base de datos de contaminantes,
          y validación con usuarios finales. Los entregables formales incluyen el reporte técnico de pruebas de funcionamiento
          y las cartas de transferencia a usuarios finales.
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
  name: 'Alerta',
  meta: {
    requiresAuth: false,
    layout: 'service',
  },
});

const alertaComponents = [
  {
    label: 'E2-C1',
    title: 'Procesamiento de Contaminantes',
    description: 'Pipeline de análisis de datos toxicológicos recolectados en campo. Normalización, limpieza y transformación hacia formatos listos para su indexación y visualización.',
    icon: 'mdi-filter-cog',
    color: 'deep-orange-darken-2',
    indicators: ['≥ 80% cobertura', '100% casos de uso', 'Rendimiento validado'],
  },
  {
    label: 'E2-C2',
    title: 'Integración con Xelhua',
    description: 'Acoplamiento del flujo de datos ALERTA con la plataforma Xelhua para el procesamiento estructurado de los registros de contaminantes y generación de productos analíticos.',
    icon: 'mdi-pipe',
    color: 'teal-darken-1',
    indicators: ['≥ 80% cobertura', '100% casos de uso', 'API de procesos'],
  },
  {
    label: 'E2-C3',
    title: 'Almacenamiento con MictlanX',
    description: 'Persistencia de la base de datos de metadatos de contaminantes y los productos visualizables en el sistema distribuido MictlanX, indexados para búsqueda en JUB.',
    icon: 'mdi-database-check',
    color: 'primary',
    indicators: ['≥ 80% cobertura', '100% casos de uso', 'Base de datos de metadatos'],
  },
];

const alertaDependencies = [
  { name: 'JUB', role: 'Concentrador', icon: 'mdi-hub-outline', color: 'primary' },
  { name: 'Xelhua', role: 'Procesamiento', icon: 'mdi-pipe', color: 'teal-darken-1' },
  { name: 'MictlanX', role: 'Almacenamiento', icon: 'mdi-database', color: 'grey-darken-3' },
];
</script>

<style scoped>
.hero-section {
  background-image: linear-gradient(160deg, rgba(40, 10, 5, 0.97) 0%, rgba(191, 54, 12, 0.80) 50%, rgba(40, 10, 5, 0.97) 100%);
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
