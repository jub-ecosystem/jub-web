<template>
  <v-sheet color="grey-darken-4" class="py-14 py-md-16 overflow-hidden">
    <v-container max-width="1200">

      <!-- Header -->
      <v-row justify="center" class="text-center mb-10 mb-md-14">
        <v-col cols="12" md="8">
          <v-chip color="primary" variant="tonal" size="small" class="font-weight-bold mb-4 text-uppercase tracking-wide">
            El Ecosistema en Acción
          </v-chip>
          <h2 class="text-h4 text-md-h3 font-weight-black text-white mb-4" style="line-height: 1.15;">
            De los datos al<br>conocimiento estratégico
          </h2>
          <p class="text-body-2 text-body-md-1 mx-auto" style="max-width: 640px; color: rgba(255,255,255,0.65); line-height: 1.7;">
            Los observatorios son productos construidos sobre los servicios del ecosistema.
            JUB los concentra en un único punto de búsqueda para habilitar el acceso estratégico a la información.
          </p>
        </v-col>
      </v-row>

      <!-- Pipeline Visualization -->
      <div class="pipeline-wrapper mb-12 mb-md-16">
        <div class="pipeline-track">

          <template v-for="(step, i) in pipeline" :key="step.label">

            <div class="pipeline-step" :class="{ 'pipeline-step--highlight': step.highlight }">
              <div class="pipeline-step__icon mb-2" :style="`background: ${step.iconBg};`">
                <v-icon :color="step.iconColor" size="22">{{ step.icon }}</v-icon>
              </div>
              <div class="pipeline-step__label">{{ step.label }}</div>
              <div class="pipeline-step__sub">{{ step.sub }}</div>
              <div v-if="step.pills" class="pipeline-step__pills">
                <span
                  v-for="pill in step.pills"
                  :key="pill.label"
                  class="pipeline-pill"
                  :style="`background: ${pill.color};`"
                >{{ pill.label }}</span>
              </div>
            </div>

            <div v-if="i < pipeline.length - 1" class="pipeline-arrow">
              <v-icon size="16" color="grey-darken-1">mdi-arrow-right</v-icon>
            </div>

          </template>

        </div>
      </div>

      <!-- Observatory Gallery header -->
      <div class="d-flex flex-column flex-sm-row align-sm-center justify-space-between mb-6 ga-2">
        <div>
          <v-chip color="amber-darken-1" variant="tonal" size="small" class="font-weight-bold mb-2 text-uppercase">
            Etapa 2 · En desarrollo
          </v-chip>
          <h3 class="text-h5 text-md-h4 font-weight-black text-white">Observatorios del ecosistema</h3>
        </div>
        <p class="text-caption" style="max-width: 280px; color: rgba(255,255,255,0.45); line-height: 1.5;">
          Cada observatorio usa los servicios del ecosistema para producir información estratégica buscable desde JUB.
        </p>
      </div>

      <!-- Observatory Cards Grid -->
      <v-row>
        <v-col
          v-for="obs in observatories"
          :key="obs.id"
          cols="12"
          sm="6"
        >
          <v-card
            rounded="xl"
            elevation="0"
            class="observatory-card h-100 d-flex flex-column"
            :style="`border-top: 4px solid ${obs.color};`"
          >
            <v-card-text class="pa-5 pa-sm-6 flex-grow-1">

              <!-- Header row -->
              <div class="d-flex align-start justify-space-between mb-4">
                <div class="d-flex align-center ga-3">
                  <div
                    class="obs-icon-wrap d-flex align-center justify-center rounded-lg flex-shrink-0"
                    :style="`background: ${obs.color}1A;`"
                  >
                    <v-icon :style="`color: ${obs.color};`" size="22">{{ obs.icon }}</v-icon>
                  </div>
                  <div>
                    <div class="text-subtitle-1 font-weight-black text-grey-darken-4" style="line-height: 1.2;">{{ obs.name }}</div>
                    <div class="text-caption text-grey-darken-1">{{ obs.subtitle }}</div>
                  </div>
                </div>
                <v-chip
                  color="amber-darken-1"
                  variant="tonal"
                  size="x-small"
                  class="font-weight-bold flex-shrink-0 ml-2 mt-1"
                >
                  En desarrollo
                </v-chip>
              </div>

              <p class="text-body-2 text-grey-darken-2 mb-4" style="line-height: 1.65;">
                {{ obs.description }}
              </p>

              <v-divider class="mb-4"></v-divider>

              <!-- Services -->
              <div class="mb-3">
                <div class="text-caption text-grey font-weight-medium mb-2 text-uppercase" style="letter-spacing: 0.5px;">
                  Servicios del ecosistema
                </div>
                <div class="d-flex flex-wrap ga-1">
                  <v-chip
                    v-for="svc in obs.services"
                    :key="svc"
                    size="x-small"
                    variant="flat"
                    :style="svcStyle(svc)"
                    class="font-weight-bold text-white"
                    label
                  >
                    {{ svc }}
                  </v-chip>
                </div>
              </div>

              <!-- Domain tags -->
              <div class="d-flex flex-wrap ga-1">
                <v-chip
                  v-for="tag in obs.tags"
                  :key="tag"
                  size="x-small"
                  color="grey-lighten-3"
                  variant="flat"
                  class="text-grey-darken-2"
                  prepend-icon="mdi-tag-outline"
                >
                  {{ tag }}
                </v-chip>
              </div>

            </v-card-text>

            <v-card-actions class="px-5 px-sm-6 pb-5 pt-0">
              <v-tooltip text="Disponible al completar la Etapa 2" location="top">
                <template v-slot:activator="{ props }">
                  <div v-bind="props" style="width: 100%;">
                    <v-btn
                      variant="tonal"
                      color="grey"
                      class="text-none"
                      size="small"
                      block
                      rounded="lg"
                      disabled
                      prepend-icon="mdi-clock-outline"
                    >
                      Disponible en Etapa 2
                    </v-btn>
                  </div>
                </template>
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-sheet>
</template>

<script setup lang="ts">

const pipeline = [
  {
    icon: 'mdi-database-outline',
    label: 'Fuentes de Datos',
    sub: 'Satelitales, clínicas, ambientales',
    iconBg: 'rgba(255,255,255,0.07)',
    iconColor: 'grey-lighten-1',
  },
  {
    icon: 'mdi-cogs',
    label: 'Servicios',
    sub: 'Procesamiento especializado',
    iconBg: 'rgba(0,171,220,0.15)',
    iconColor: '#00ABDC',
    pills: [
      { label: 'Xelhua', color: '#B71C1C' },
      { label: 'Nez',    color: '#1A237E' },
      { label: 'MictlanX', color: '#424242' },
    ],
  },
  {
    icon: 'mdi-package-variant-closed',
    label: 'Productos',
    sub: 'Datos procesados e indexados',
    iconBg: 'rgba(0,150,136,0.15)',
    iconColor: '#4DB6AC',
  },
  {
    icon: 'mdi-telescope',
    label: 'Observatorios',
    sub: 'Entornos temáticos de análisis',
    iconBg: 'rgba(255,179,0,0.12)',
    iconColor: '#FFB300',
  },
  {
    icon: 'mdi-magnify',
    label: 'JUB',
    sub: 'Concentrador y buscador unificado',
    iconBg: 'rgba(0,171,220,0.22)',
    iconColor: '#00ABDC',
    highlight: true,
  },
];

const observatories = [
  {
    id: 'azomalli',
    name: 'Azomalli',
    subtitle: 'Observatorio de Salud Mental',
    color: '#4A148C',
    icon: 'mdi-brain',
    description: 'Monitoreo sistemático de la atención a trastornos mentales por consumo de sustancias. Integra datos clínicos del Instituto Nacional de Psiquiatría Ramón de la Fuente Muñiz para apoyar la toma de decisiones en salud pública.',
    tags: ['Salud Mental', 'Epidemiología', 'CDMX'],
    services: ['Xelhua', 'JUB'],
  },
  {
    id: 'alerta',
    name: 'ALERTA',
    subtitle: 'Observatorio de Contaminantes',
    color: '#BF360C',
    icon: 'mdi-alert-circle-outline',
    description: 'Detección y análisis de zonas de riesgo por contaminación ambiental. Combina trabajo de campo con análisis de datos para validar la presencia de contaminantes en áreas críticas de San Luis Potosí.',
    tags: ['Salud Pública', 'Toxicología', 'SLP'],
    services: ['Xelhua'],
  },
  {
    id: 'ima',
    name: 'IMA',
    subtitle: 'Observatorio de Monitoreo Integrado',
    color: '#1B5E20',
    icon: 'mdi-chart-areaspline',
    description: 'Plataforma de ciencia de datos para el monitoreo integrado de variables estratégicas. Concentra indicadores multidisciplinarios en un entorno unificado de análisis y visualización para la toma de decisiones.',
    tags: ['Ciencia de Datos', 'Indicadores', 'Multidisciplinar'],
    services: ['JUB', 'MictlanX'],
  },
  {
    id: 'kaexla',
    name: 'Kaexla',
    subtitle: 'Observatorio de Percepción Remota',
    color: '#3E2723',
    icon: 'mdi-satellite-variant',
    description: 'Análisis geoespacial e imagenología aplicada al monitoreo territorial y diagnóstico médico. Procesa datos satelitales y de tomografía para generar productos de información de alta precisión.',
    tags: ['Geoinformática', 'Imagenología', 'Satélite'],
    services: ['Nez'],
  },
];

const svcColors: Record<string, string> = {
  JUB:      '#00ABDC',
  Xelhua:   '#B71C1C',
  Nez:      '#1A237E',
  MictlanX: '#424242',
};

function svcStyle(svc: string) {
  const bg = svcColors[svc] ?? '#616161';
  return { backgroundColor: bg, color: 'white' };
}
</script>

<style scoped>
.tracking-wide {
  letter-spacing: 1.5px !important;
}

/* ── Pipeline ── */

.pipeline-wrapper {
  overflow-x: auto;
  padding-bottom: 8px;
  /* hide scrollbar visually but keep functionality */
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.1) transparent;
}

.pipeline-track {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 0;
  min-width: 560px; /* forces scroll on very small screens */
}

.pipeline-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 16px 12px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.07);
  width: 130px;
  flex-shrink: 0;
  transition: background 0.2s ease;
}

.pipeline-step--highlight {
  background: rgba(0, 171, 220, 0.1);
  border-color: rgba(0, 171, 220, 0.25);
}

.pipeline-step__icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pipeline-step__label {
  font-size: 11px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 4px;
  line-height: 1.3;
}

.pipeline-step__sub {
  font-size: 9.5px;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.4;
  margin-bottom: 0;
}

.pipeline-step__pills {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-top: 8px;
  width: 100%;
}

.pipeline-pill {
  font-size: 9px;
  font-weight: 700;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  text-align: center;
  letter-spacing: 0.3px;
}

.pipeline-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  padding-bottom: 24px; /* align vertically with icon center of step */
  flex-shrink: 0;
  opacity: 0.4;
}

/* ── Observatory Cards ── */

.observatory-card {
  background: #ffffff;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.observatory-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.35) !important;
}

.obs-icon-wrap {
  width: 44px;
  height: 44px;
}
</style>
