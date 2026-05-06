<template>
  <div class="ima-page bg-background">

    <v-sheet class="hero-section d-flex flex-column align-center justify-center pt-16 pb-16">
      <v-container class="text-center position-relative z-10" max-width="800">

        <v-chip color="amber" variant="flat" class="mb-6 font-weight-bold text-grey-darken-4" size="large" prepend-icon="mdi-clock-outline">
          Etapa 2 — Próxima Etapa del Proyecto
        </v-chip>

        <v-avatar size="90" variant="flat" rounded="xl" class="mb-4" style="background-color: rgba(255,255,255,0.1);">
          <v-icon size="52" color="white">mdi-weather-partly-cloudy</v-icon>
        </v-avatar>

        <h1 class="text-h2 text-white mb-2" style="font-family: Georgia, serif !important;">
          IMA
        </h1>

        <p class="text-body-1 mb-4" style="font-family: monospace; color: #A5D6A7;">
          Observatorio de Monitoreo Ambiental.
        </p>

        <h2 class="text-h5 font-weight-bold text-white mb-8">
          Integración de datos atmosféricos y ambientales mediante Kawak y JUB
        </h2>

        <div class="d-flex justify-center flex-wrap gap-2 mb-10">
          <v-chip variant="flat" class="font-weight-bold px-4" style="background-color: #1B5E20; color: white;">Prod 5</v-chip>
          <v-chip variant="flat" class="font-weight-bold px-4" style="background-color: #1B5E20; color: white;">Meta E</v-chip>
          <v-chip variant="flat" class="font-weight-bold px-4" style="background-color: #1B5E20; color: white;">E2-C1</v-chip>
          <v-chip variant="flat" class="font-weight-bold px-4" style="background-color: #1B5E20; color: white;">E2-C2</v-chip>
          <v-chip variant="flat" class="font-weight-bold px-4" style="background-color: #1B5E20; color: white;">E2-C3</v-chip>
          <v-chip variant="flat" class="font-weight-bold px-4" style="background-color: #1B5E20; color: white;">E2-C4</v-chip>
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
            <h2 class="text-h4 font-weight-black text-grey-darken-4 mb-4">¿Qué es el Observatorio IMA?</h2>
            <p class="text-body-1 text-grey-darken-1 mx-auto" style="max-width: 800px; line-height: 1.6;">
              El Observatorio IMA (Índices y Métricas Ambientales) es una plataforma de monitoreo ambiental que integra datos
              atmosféricos de fuentes internacionales como MERRA (Modern-Era Retrospective Analysis for Research and Applications de la NASA)
              y EMAS. A través de la integración Kawak-JUB, los productos ambientales son indexados en MictlanX y expuestos en el
              concentrador JUB para búsqueda y visualización por parte de investigadores y usuarios institucionales.
            </p>
          </div>

          <v-row>
            <v-col cols="12" sm="6" md="3" class="text-center px-4">
              <v-avatar color="green-lighten-4" variant="tonal" size="56" class="mb-3">
                <v-icon size="28" color="green-darken-2">mdi-weather-cloudy</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-2 font-weight-bold mb-1">Datos MERRA</h3>
              <p class="text-caption text-grey-darken-1">Reanálisis atmosférico de la NASA con cobertura global y alta resolución temporal.</p>
            </v-col>
            <v-col cols="12" sm="6" md="3" class="text-center px-4">
              <v-avatar color="green-lighten-4" variant="tonal" size="56" class="mb-3">
                <v-icon size="28" color="green-darken-2">mdi-chart-line</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-2 font-weight-bold mb-1">Datos EMAS</h3>
              <p class="text-caption text-grey-darken-1">Métricas ambientales y series de tiempo de estaciones de monitoreo regionales.</p>
            </v-col>
            <v-col cols="12" sm="6" md="3" class="text-center px-4">
              <v-avatar color="green-lighten-4" variant="tonal" size="56" class="mb-3">
                <v-icon size="28" color="green-darken-2">mdi-connection</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-2 font-weight-bold mb-1">Integración Kawak-JUB</h3>
              <p class="text-caption text-grey-darken-1">Pipeline de recuperación y transformación de datos ambientales hacia el concentrador JUB.</p>
            </v-col>
            <v-col cols="12" sm="6" md="3" class="text-center px-4">
              <v-avatar color="green-lighten-4" variant="tonal" size="56" class="mb-3">
                <v-icon size="28" color="green-darken-2">mdi-database</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-2 font-weight-bold mb-1">Indexación MictlanX</h3>
              <p class="text-caption text-grey-darken-1">Almacenamiento distribuido y persistencia de los productos ambientales generados.</p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>

    <v-sheet class="bg-surface py-14">
      <v-container max-width="1100">
        <div class="text-center mb-10">
          <v-chip color="amber" variant="tonal" class="mb-4 font-weight-bold" size="small">
            Meta E • Prod 5 • Etapa 2
          </v-chip>
          <h2 class="text-h4 font-weight-black text-grey-darken-4 mb-4">Componentes Planificados</h2>
          <p class="text-body-1 text-grey-darken-1 mx-auto" style="max-width: 700px;">
            El observatorio IMA se compone de cuatro módulos técnicos que estarán disponibles en la Etapa 2.
            Los indicadores y criterios de verificación están definidos; el desarrollo inicia al completar la Etapa 1.
          </p>
        </div>

        <v-row>
          <v-col v-for="comp in imaComponents" :key="comp.label" cols="12" md="6">
            <v-card rounded="xl" elevation="0" class="pa-6 border bg-grey-lighten-4 mb-2">
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
                  <v-progress-linear model-value="0" color="green-darken-2" bg-color="grey-lighten-2" rounded height="6" class="mb-2"></v-progress-linear>
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
      <v-container max-width="800">
        <div class="text-center mb-8">
          <h2 class="text-h5 font-weight-black text-grey-darken-4 mb-2">Plataformas Requeridas</h2>
          <p class="text-body-2 text-grey-darken-1">El Observatorio IMA depende de los siguientes servicios del ecosistema JUB para su operación.</p>
        </div>
        <v-row justify="center">
          <v-col v-for="dep in imaDependencies" :key="dep.name" cols="6" sm="3" class="text-center">
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
          El Observatorio IMA forma parte de la <strong>Etapa 2</strong> del proyecto MADTEC-2025-M-478. Su desarrollo iniciará
          una vez que los servicios de la Etapa 1 (JUB, Xelhua, Nez, MictlanX) estén completamente validados y en producción.
          Los entregables incluyen pruebas de integración Kawak-JUB, visualización de productos MERRA y EMAS indexados en MictlanX,
          y despliegue del sitio web oficial del observatorio.
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
  name: 'IMA',
  meta: {
    requiresAuth: false,
    layout: 'service',
  },
});

const imaComponents = [
  {
    label: 'E2-C1',
    title: 'Acoplamiento Kawak-JUB',
    description: 'Integración del sistema Kawak con el concentrador JUB para la ingesta automatizada de datos atmosféricos y ambientales en tiempo real.',
    icon: 'mdi-connection',
    color: 'green-darken-2',
    indicators: ['≥ 80% cobertura', '100% casos de uso', 'Pruebas integración Kawak-JUB'],
  },
  {
    label: 'E2-C2',
    title: 'Recuperación de Datos (MERRA / EMAS)',
    description: 'Módulo de descarga y transformación de datos del reanálisis atmosférico MERRA-2 de NASA y de las estaciones de monitoreo ambiental EMAS.',
    icon: 'mdi-cloud-download',
    color: 'teal-darken-1',
    indicators: ['≥ 80% cobertura', '100% casos de uso', 'Validación UX'],
  },
  {
    label: 'E2-C3',
    title: 'Procesamiento Ambiental',
    description: 'Pipeline de análisis y generación de productos ambientales derivados: índices de calidad del aire, mapas de temperatura, humedad relativa y otros indicadores.',
    icon: 'mdi-chart-areaspline',
    color: 'amber-darken-2',
    indicators: ['≥ 80% cobertura', '100% casos de uso', 'Rendimiento validado'],
  },
  {
    label: 'E2-C4',
    title: 'Indexación en MictlanX',
    description: 'Almacenamiento distribuido de los productos generados en MictlanX con indexación en JUB para búsqueda y visualización de mapas, tablas y series de tiempo.',
    icon: 'mdi-database-check',
    color: 'primary',
    indicators: ['≥ 80% cobertura', '100% casos de uso', 'Visualización en JUB'],
  },
];

const imaDependencies = [
  { name: 'JUB', role: 'Concentrador', icon: 'mdi-hub-outline', color: 'primary' },
  { name: 'MictlanX', role: 'Almacenamiento', icon: 'mdi-database', color: 'grey-darken-3' },
  { name: 'Kawak', role: 'Fuente de datos', icon: 'mdi-weather-cloudy', color: 'green-darken-2' },
  { name: 'Nez', role: 'Imagenología', icon: 'mdi-satellite-variant', color: 'indigo' },
];
</script>

<style scoped>
.hero-section {
  background-image: linear-gradient(160deg, rgba(5, 25, 10, 0.97) 0%, rgba(27, 94, 32, 0.82) 50%, rgba(5, 25, 10, 0.97) 100%);
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
