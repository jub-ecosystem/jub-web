<template>
  <v-container max-width="900" class="py-8">

    <v-btn
      variant="text"
      prepend-icon="mdi-arrow-left"
      class="text-none font-weight-bold mb-4 px-0"
      @click="$router.back()"
    >
      Volver
    </v-btn>

    <!-- Tour replay button -->
    <v-tooltip text="Ver tutorial" location="left">
      <template #activator="{ props: tp }">
        <v-btn v-bind="tp" icon="mdi-help-circle-outline" variant="tonal" color="primary" size="small"
               style="position:fixed;bottom:24px;right:24px;z-index:200;" @click="replayTour" />
      </template>
    </v-tooltip>

    <!-- Hero -->
    <v-card rounded="xl" elevation="0" class="mb-8 pa-8 text-center" color="primary" theme="dark" data-tour="guide-hero">
      <v-icon size="52" class="mb-3">mdi-console-line</v-icon>
      <h1 class="text-h4 font-weight-black mb-2">Cómo realizar búsquedas usando identificadores</h1>
      <p class="text-body-1 opacity-80">
        Aprende a consultar datos científicos con el lenguaje de consulta JUB DSL
        paso a paso, desde lo más básico hasta consultas avanzadas con agrupaciones y operaciones matemáticas.
      </p>
    </v-card>

    <!-- ── SECCIÓN 1: ¿Qué es el DSL? ── -->
    <section class="mb-10" data-tour="guide-s1">
      <div class="d-flex align-center ga-3 mb-4">
        <v-avatar color="primary" variant="flat" size="36">
          <span class="font-weight-black text-white">1</span>
        </v-avatar>
        <h2 class="text-h5 font-weight-black">¿Qué es el lenguaje de consulta JUB?</h2>
      </div>

      <p class="text-body-1 text-grey-darken-1 mb-4">
        JUB DSL (<em>Domain Specific Language</em>) es un lenguaje diseñado para
        recuperar registros de datos a partir de <strong>identificadores de catálogo</strong>.
        En lugar de escribir SQL o condiciones complejas, usas prefijos cortos que
        representan dimensiones del dato.
      </p>

      <v-card rounded="xl" elevation="1" class="pa-5 mb-4" color="grey-lighten-5">
        <div class="text-overline font-weight-bold text-grey-darken-2 mb-2">Estructura general</div>
        <code class="text-h6 font-weight-black text-primary d-block mb-4">
          jub.v1.&lt;PREFIJO&gt;(&lt;IDENTIFICADOR&gt;).&lt;PREFIJO&gt;(&lt;IDENTIFICADOR&gt;)…
        </code>
        <v-divider class="mb-4" />
        <v-table density="compact">
          <thead>
            <tr class="bg-grey-lighten-4">
              <th class="font-weight-bold">Prefijo</th>
              <th class="font-weight-bold">Significado</th>
              <th class="font-weight-bold">Ejemplo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prefix in prefixDefs" :key="prefix.code">
              <td>
                <v-chip :color="prefix.color" variant="flat" class="font-monospace font-weight-black" size="small">
                  {{ prefix.code }}
                </v-chip>
              </td>
              <td class="text-body-2">{{ prefix.meaning }}</td>
              <td class="font-monospace text-caption text-grey-darken-2">{{ prefix.example }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>

      <v-alert type="info" variant="tonal" rounded="xl" class="mb-0">
        <strong>¿De dónde salen los identificadores?</strong>
        Los identificadores son el campo <code>value</code> de los ítems de catálogo
        (p.ej. <code>MX</code>, <code>TAMPS</code>, <code>MASCULINO</code>).
        Puedes consultarlos en la sección <strong>Catálogos</strong>.
      </v-alert>
    </section>

    <v-divider class="mb-10" />

    <!-- ── SECCIÓN 2: Paso a paso ── -->
    <section class="mb-10" data-tour="guide-s2">
      <div class="d-flex align-center ga-3 mb-6">
        <v-avatar color="primary" variant="flat" size="36">
          <span class="font-weight-black text-white">2</span>
        </v-avatar>
        <h2 class="text-h5 font-weight-black">Construye tu consulta paso a paso</h2>
      </div>

      <div>
        <div v-for="(step, i) in steps" :key="i" class="d-flex ga-3 ga-sm-4">
          <!-- Dot + connecting line -->
          <div class="d-flex flex-column align-center flex-shrink-0" style="width: 28px;">
            <v-avatar :color="step.color" size="28">
              <span class="text-caption font-weight-black text-white">{{ i + 1 }}</span>
            </v-avatar>
            <div
              v-if="i < steps.length - 1"
              class="flex-grow-1 mt-1"
              style="width: 2px; background: rgba(var(--v-theme-primary), 0.25); min-height: 16px;"
            />
          </div>

          <!-- Card -->
          <v-card rounded="xl" elevation="1" class="mb-4 flex-grow-1" style="min-width: 0;">
            <v-card-title class="text-body-1 font-weight-bold d-flex align-center ga-2 pt-4 flex-wrap">
              <v-icon :color="step.color" size="20">{{ step.icon }}</v-icon>
              {{ step.title }}
            </v-card-title>
            <v-card-text>
              <p class="text-body-2 text-grey-darken-1 mb-3">{{ step.description }}</p>
              <div v-if="step.example" class="rounded-lg pa-3" style="background: #1e1e2e; overflow-x: auto;">
                <code class="text-caption font-monospace" style="color: #cdd6f4; white-space: nowrap;">{{ step.example }}</code>
              </div>
              <div v-if="step.note" class="mt-3">
                <v-alert density="compact" type="warning" variant="tonal" rounded="lg" :text="step.note" />
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </section>

    <v-divider class="mb-10" />

    <!-- ── SECCIÓN 3: Ejemplos reales ── -->
    <section class="mb-10" data-tour="guide-s3">
      <div class="d-flex align-center ga-3 mb-6">
        <v-avatar color="primary" variant="flat" size="36">
          <span class="font-weight-black text-white">3</span>
        </v-avatar>
        <h2 class="text-h5 font-weight-black">Ejemplos de consultas reales</h2>
      </div>

      <v-row>
        <v-col v-for="ex in realExamples" :key="ex.title" cols="12" md="6">
          <v-card rounded="xl" elevation="1" class="h-100">
            <v-card-item>
              <template #prepend>
                <v-avatar :color="ex.color" variant="tonal" rounded="lg">
                  <v-icon>{{ ex.icon }}</v-icon>
                </v-avatar>
              </template>
              <v-card-title class="text-body-1 font-weight-bold">{{ ex.title }}</v-card-title>
            </v-card-item>
            <v-card-text>
              <p class="text-body-2 text-grey-darken-1 mb-3">{{ ex.explanation }}</p>
              <div class="rounded-lg pa-3 d-flex align-start flex-wrap ga-2 justify-space-between" style="background: #1e1e2e;">
                <code class="text-caption font-monospace flex-grow-1" style="color: #cdd6f4; word-break: break-all;">{{ ex.query }}</code>
                <v-btn
                  icon="mdi-content-copy"
                  variant="text"
                  size="x-small"
                  color="grey"
                  class="flex-shrink-0"
                  @click="copyQuery(ex.query)"
                />
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <v-divider class="mb-10" />

    <!-- ── SECCIÓN 4: Operadores matemáticos ── -->
    <section class="mb-10" data-tour="guide-s4">
      <div class="d-flex align-center ga-3 mb-4">
        <v-avatar color="primary" variant="flat" size="36">
          <span class="font-weight-black text-white">4</span>
        </v-avatar>
        <h2 class="text-h5 font-weight-black">Operaciones matemáticas con <code>VO</code></h2>
      </div>

      <p class="text-body-1 text-grey-darken-1 mb-5">
        El prefijo <v-chip color="orange" variant="flat" size="x-small" class="font-monospace font-weight-bold mx-1">VO</v-chip>
        permite aplicar funciones matemáticas sobre variables numéricas observables del conjunto de datos.
        Se usa junto con <v-chip color="deep-purple" variant="flat" size="x-small" class="font-monospace font-weight-bold mx-1">BY</v-chip>
        para agrupar resultados.
      </p>

      <v-card rounded="xl" elevation="1" class="overflow-hidden mb-4">
        <v-table>
          <thead class="bg-grey-lighten-4">
            <tr>
              <th class="font-weight-bold">Función</th>
              <th class="font-weight-bold">Significado</th>
              <th class="font-weight-bold">Ejemplo de uso</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="op in mathOps" :key="op.fn">
              <td>
                <v-chip color="orange" variant="tonal" class="font-monospace font-weight-bold" size="small">
                  {{ op.fn }}(variable)
                </v-chip>
              </td>
              <td class="text-body-2">{{ op.meaning }}</td>
              <td class="font-monospace text-caption text-grey-darken-2">{{ op.example }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>

      <v-card rounded="xl" elevation="0" color="deep-purple-lighten-5" class="pa-5">
        <div class="text-body-2 font-weight-bold mb-2 text-deep-purple-darken-2">
          <v-icon size="18" class="mr-1">mdi-lightbulb-outline</v-icon>
          Agrupación con <code>BY</code>
        </div>
        <p class="text-body-2 text-grey-darken-2 mb-3">
          Puedes combinar <code>VO</code> con <code>BY</code> para obtener
          resultados desglosados. <code>BY</code> recibe el identificador de la
          dimensión por la que quieres agrupar.
        </p>
        <div class="rounded-lg pa-3" style="background: #1e1e2e;">
          <code class="text-caption font-monospace" style="color: #cdd6f4;">
            jub.v1.VS(MX).VO(AVG(EDAD)).BY(SEXO)
          </code>
        </div>
        <p class="text-caption text-grey-darken-1 mt-2 mb-0">
          → Promedio de EDAD en México, agrupado por SEXO.
        </p>
      </v-card>
    </section>

    <v-divider class="mb-10" />

    <!-- ── SECCIÓN 5: Errores comunes ── -->
    <section class="mb-10">
      <div class="d-flex align-center ga-3 mb-6">
        <v-avatar color="error" variant="flat" size="36">
          <v-icon color="white" size="20">mdi-alert</v-icon>
        </v-avatar>
        <h2 class="text-h5 font-weight-black">Errores comunes y cómo evitarlos</h2>
      </div>

      <v-row>
        <v-col v-for="err in commonErrors" :key="err.title" cols="12" md="6">
          <v-card rounded="xl" elevation="1">
            <v-card-item>
              <template #prepend>
                <v-icon color="error" size="24">mdi-close-circle-outline</v-icon>
              </template>
              <v-card-title class="text-body-1 font-weight-bold">{{ err.title }}</v-card-title>
            </v-card-item>
            <v-card-text>
              <p class="text-body-2 text-grey-darken-1 mb-3">{{ err.description }}</p>
              <div class="d-flex ga-2 flex-column">
                <div>
                  <div class="text-caption font-weight-bold text-error mb-1">Incorrecto:</div>
                  <div class="rounded-lg pa-2" style="background: #fef2f2;">
                    <code class="text-caption font-monospace text-error">{{ err.wrong }}</code>
                  </div>
                </div>
                <div>
                  <div class="text-caption font-weight-bold text-success mb-1">Correcto:</div>
                  <div class="rounded-lg pa-2" style="background: #f0fdf4;">
                    <code class="text-caption font-monospace text-success">{{ err.correct }}</code>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <!-- CTA -->
    <v-card rounded="xl" elevation="1" class="pa-8 text-center" color="grey-lighten-5" data-tour="guide-cta">
      <v-icon size="40" color="primary" class="mb-3">mdi-database-search</v-icon>
      <h3 class="text-h6 font-weight-bold mb-2">¿Listo para consultar?</h3>
      <p class="text-body-2 text-grey-darken-1 mb-4">
        Ve a las fuentes de datos y usa el panel de consulta DSL para explorar los registros.
      </p>
      <v-btn
        color="primary"
        variant="flat"
        rounded="pill"
        :to="{ name: 'DataSources' }"
        prepend-icon="mdi-arrow-right"
        class="text-none font-weight-bold"
      >
        Explorar fuentes de datos
      </v-btn>
    </v-card>

    <!-- Snackbar copy -->
    <v-snackbar v-model="copiedSnack" :timeout="2000" color="success" rounded="pill">
      <v-icon start>mdi-check</v-icon> Consulta copiada al portapapeles
    </v-snackbar>

  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { useTour } from '@/composables/useTour';

definePage({
  name: 'QueryGuide',
  meta: { 
    requiresAuth: true, 
    layout: 'dashboard' 
  },
});

const copiedSnack = ref(false);

const guideTourSteps = [
  { element: '[data-tour="guide-hero"]', popover: { title: 'Guía de búsqueda DSL',   description: 'Aprende a usar el lenguaje JUB DSL para consultar datos científicos de forma precisa y expresiva.', side: 'bottom' as const } },
  { element: '[data-tour="guide-s1"]',   popover: { title: '¿Qué es el DSL?',        description: 'Explica la estructura general del lenguaje: prefijos (VS, VT, VI, VO, BY) y cómo combinarlos para construir consultas.', side: 'bottom' as const } },
  { element: '[data-tour="guide-s2"]',   popover: { title: 'Paso a paso',            description: 'Guía progresiva desde la consulta más básica hasta consultas con operaciones matemáticas y agrupaciones.', side: 'top' as const } },
  { element: '[data-tour="guide-s3"]',   popover: { title: 'Ejemplos reales',        description: 'Consultas listas para copiar y usar. Haz clic en el ícono de copia para llevarlas a cualquier buscador.', side: 'top' as const } },
  { element: '[data-tour="guide-s4"]',   popover: { title: 'Operaciones con VO/BY',  description: 'Aprende a calcular promedios, sumas y conteos sobre variables numéricas y a desglosar los resultados por dimensión.', side: 'top' as const } },
  { element: '[data-tour="guide-cta"]',  popover: { title: '¿Listo para consultar?', description: 'Ve directamente a las fuentes de datos y prueba las consultas DSL que acabas de aprender.', side: 'top' as const } },
];

const { startTour, replayTour } = useTour(guideTourSteps, { pageKey: 'query-guide' });

onMounted(async () => {
  await nextTick();
  startTour();
});

async function copyQuery(query: string) {
  await navigator.clipboard.writeText(query);
  copiedSnack.value = true;
}

const prefixDefs = [
  { code: 'VS', color: 'blue',        meaning: 'Variable Espacial — filtra por ubicación geográfica.',          example: 'VS(MX), VS(TAMPS), VS(CDMX)' },
  { code: 'VT', color: 'teal',        meaning: 'Variable Temporal — filtra por año, mes o fecha.',              example: 'VT(2024), VT(2020_2024)' },
  { code: 'VI', color: 'green',       meaning: 'Variable de Interés — filtra por categorías (sexo, grupo, etc.)', example: 'VI(MASCULINO), VI(GRUPO_A)' },
  { code: 'VO', color: 'orange',      meaning: 'Variable Observable — aplica una operación matemática.',         example: 'VO(AVG(EDAD)), VO(SUM(CASOS))' },
  { code: 'BY', color: 'deep-purple', meaning: 'Agrupación — desglosa resultados por una dimensión.',           example: 'BY(SEXO), BY(ESTADO)' },
];

const steps = [
  {
    title: 'Comienza con el prefijo de versión',
    description: 'Toda consulta empieza con jub.v1 (versión 1 del DSL). Este prefijo es obligatorio.',
    example: 'jub.v1',
    icon: 'mdi-numeric-1-circle-outline',
    color: 'primary',
    note: null,
  },
  {
    title: 'Agrega un filtro espacial (VS)',
    description: 'Usa VS seguido del identificador geográfico entre paréntesis. El identificador es el "value" del ítem en el catálogo SPATIAL.',
    example: 'jub.v1.VS(MX)',
    icon: 'mdi-map-marker-outline',
    color: 'blue',
    note: null,
  },
  {
    title: 'Agrega un filtro temporal (VT)',
    description: 'Si quieres acotar por año o rango de fechas, encadena un VT. El valor debe ser un identificador del catálogo TEMPORAL.',
    example: 'jub.v1.VS(MX).VT(2024)',
    icon: 'mdi-calendar-outline',
    color: 'teal',
    note: null,
  },
  {
    title: 'Agrega variables de interés (VI)',
    description: 'Usa VI para filtrar por categorías como sexo, grupo etario o cualquier dimensión de interés. Puedes encadenar múltiples VI.',
    example: 'jub.v1.VS(MX).VT(2024).VI(MASCULINO)',
    icon: 'mdi-tag-outline',
    color: 'green',
    note: null,
  },
  {
    title: 'Agrega operaciones matemáticas (VO)',
    description: 'Si necesitas calcular un promedio, suma o conteo sobre una variable numérica, usa VO con la función deseada.',
    example: 'jub.v1.VS(MX).VT(2024).VO(AVG(EDAD))',
    icon: 'mdi-function',
    color: 'orange',
    note: null,
  },
  {
    title: 'Agrupa por dimensión (BY)',
    description: 'Cuando usas VO, puedes desglosar los resultados por una dimensión con BY. El identificador es el "value" del catálogo de esa dimensión.',
    example: 'jub.v1.VS(MX).VT(2024).VO(AVG(EDAD)).BY(SEXO)',
    icon: 'mdi-group',
    color: 'deep-purple',
    note: 'BY solo tiene efecto cuando se combina con VO.',
  },
];

const realExamples = [
  {
    title: 'Todos los registros de México',
    explanation: 'Recupera todos los registros cuya variable espacial sea MX (México).',
    query: 'jub.v1.VS(MX)',
    icon: 'mdi-map',
    color: 'blue',
  },
  {
    title: 'Registros de Tamaulipas en 2024',
    explanation: 'Combina filtro espacial (TAMPS) y temporal (2024) para acotar resultados.',
    query: 'jub.v1.VS(TAMPS).VT(2024)',
    icon: 'mdi-calendar-range',
    color: 'teal',
  },
  {
    title: 'Hombres en Nuevo León',
    explanation: 'Filtra por entidad (NL) y la variable de interés MASCULINO del catálogo de sexo.',
    query: 'jub.v1.VS(NL).VI(MASCULINO)',
    icon: 'mdi-account-outline',
    color: 'green',
  },
  {
    title: 'Promedio de edad por sexo en México',
    explanation: 'Calcula el promedio de la variable EDAD en MX y desglosa el resultado por SEXO.',
    query: 'jub.v1.VS(MX).VO(AVG(EDAD)).BY(SEXO)',
    icon: 'mdi-chart-bar',
    color: 'orange',
  },
  {
    title: 'Total de casos en Ciudad de México en 2023',
    explanation: 'Suma la variable CASOS para CDMX en el año 2023.',
    query: 'jub.v1.VS(CDMX).VT(2023).VO(SUM(CASOS))',
    icon: 'mdi-sigma',
    color: 'red',
  },
  {
    title: 'Conteo de registros de mujeres por estado en 2022',
    explanation: 'Cuenta registros de FEMENINO en todo México durante 2022, agrupado por estado.',
    query: 'jub.v1.VS(MX).VT(2022).VI(FEMENINO).VO(COUNT(CASOS)).BY(ESTADO)',
    icon: 'mdi-counter',
    color: 'deep-purple',
  },
];

const mathOps = [
  { fn: 'AVG',   meaning: 'Promedio aritmético de todos los valores.',               example: 'VO(AVG(EDAD))' },
  { fn: 'SUM',   meaning: 'Suma total de todos los valores.',                        example: 'VO(SUM(CASOS))' },
  { fn: 'COUNT', meaning: 'Conteo de registros que coinciden con el filtro.',        example: 'VO(COUNT(REGISTROS))' },
];

const commonErrors = [
  {
    title: 'No iniciar con jub.v1',
    description: 'El prefijo de versión es obligatorio. Sin él el parser rechaza la consulta.',
    wrong: 'VS(MX).VT(2024)',
    correct: 'jub.v1.VS(MX).VT(2024)',
  },
  {
    title: 'Identificador en minúsculas',
    description: 'Los identificadores de catálogo son UPPER_SNAKE_CASE. Deben escribirse en mayúsculas.',
    wrong: 'jub.v1.VS(mx).VI(masculino)',
    correct: 'jub.v1.VS(MX).VI(MASCULINO)',
  },
  {
    title: 'BY sin VO',
    description: 'BY solo tiene efecto cuando hay una operación VO. Sin VO, la agrupación no produce resultados útiles.',
    wrong: 'jub.v1.VS(MX).BY(SEXO)',
    correct: 'jub.v1.VS(MX).VO(AVG(EDAD)).BY(SEXO)',
  },
  {
    title: 'Identificador inexistente en el catálogo',
    description: 'Si el identificador no existe en el catálogo correspondiente, la consulta no retornará resultados. Verifica en la sección Catálogos.',
    wrong: 'jub.v1.VS(TAMAULIPAS)',
    correct: 'jub.v1.VS(TAMPS)',
  },
];
</script>
