<template>
  <div class="kaexla-page bg-background">

    <v-sheet class="hero-section d-flex flex-column align-center justify-center pt-16 pb-16">
      <v-container class="text-center position-relative z-10" max-width="800">

        <v-chip color="amber" variant="flat" class="mb-6 font-weight-bold text-grey-darken-4" size="large" prepend-icon="mdi-clock-outline">
          Etapa 2 — Próxima Etapa del Proyecto
        </v-chip>

        <v-avatar size="90" variant="flat" rounded="xl" class="mb-4" style="background-color: rgba(255,255,255,0.1);">
          <v-icon size="52" color="white">mdi-translate</v-icon>
        </v-avatar>

        <h1 class="text-h2 text-white mb-2" style="font-family: Georgia, serif !important;">
          Kaexla
        </h1>

        <p class="text-body-1 mb-4" style="font-family: monospace; color: #FFCC80;">
          Observatorio de Lengua y Cultura Tének.
        </p>

        <h2 class="text-h5 font-weight-bold text-white mb-8">
          Preservación, indexación y análisis de datos lingüísticos del pueblo Tének integrados en JUB
        </h2>

        <div class="d-flex justify-center flex-wrap gap-2 mb-10">
          <v-chip variant="flat" class="font-weight-bold px-4" style="background-color: #3E2723; color: white;">Prod 8</v-chip>
          <v-chip variant="flat" class="font-weight-bold px-4" style="background-color: #3E2723; color: white;">Meta H</v-chip>
          <v-chip variant="flat" class="font-weight-bold px-4" style="background-color: #3E2723; color: white;">E2-C1</v-chip>
          <v-chip variant="flat" class="font-weight-bold px-4" style="background-color: #3E2723; color: white;">E2-C2</v-chip>
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
                <v-icon start>mdi-book-open-outline</v-icon>
                Artículo de divulgación
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
            <h2 class="text-h4 font-weight-black text-grey-darken-4 mb-4">¿Qué es el Observatorio Kaexla?</h2>
            <p class="text-body-1 text-grey-darken-1 mx-auto" style="max-width: 800px; line-height: 1.6;">
              Kaexla es un observatorio dedicado a la preservación y análisis computacional de la lengua Tének, lengua indígena
              de la Huasteca potosina y tamaulipeca. El observatorio integra corpus lingüísticos, registros fonológicos y
              materiales etnolingüísticos en el concentrador JUB, construyendo una base de datos de metadatos indexada y
              consultable. La validación del sistema se realizará en colaboración con etnolingüistas especializados,
              y los resultados se difundirán mediante un artículo de divulgación.
            </p>
          </div>

          <v-row>
            <v-col cols="12" sm="6" md="3" class="text-center px-4">
              <v-avatar color="brown-lighten-4" variant="tonal" size="56" class="mb-3">
                <v-icon size="28" color="brown-darken-2">mdi-book-open-page-variant</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-2 font-weight-bold mb-1">Corpus Lingüístico</h3>
              <p class="text-caption text-grey-darken-1">Recopilación, digitalización y estructuración de materiales del idioma Tének en formatos interoperables.</p>
            </v-col>
            <v-col cols="12" sm="6" md="3" class="text-center px-4">
              <v-avatar color="brown-lighten-4" variant="tonal" size="56" class="mb-3">
                <v-icon size="28" color="brown-darken-2">mdi-database-search</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-2 font-weight-bold mb-1">Indexación en JUB</h3>
              <p class="text-caption text-grey-darken-1">Catálogo de productos lingüísticos accesible a través del buscador DCSPI del concentrador JUB.</p>
            </v-col>
            <v-col cols="12" sm="6" md="3" class="text-center px-4">
              <v-avatar color="brown-lighten-4" variant="tonal" size="56" class="mb-3">
                <v-icon size="28" color="brown-darken-2">mdi-account-group</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-2 font-weight-bold mb-1">Validación Etnolingüística</h3>
              <p class="text-caption text-grey-darken-1">Pruebas de funcionamiento y validez del sistema con etnolingüistas especializados en lengua Tének.</p>
            </v-col>
            <v-col cols="12" sm="6" md="3" class="text-center px-4">
              <v-avatar color="brown-lighten-4" variant="tonal" size="56" class="mb-3">
                <v-icon size="28" color="brown-darken-2">mdi-newspaper-variant</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-2 font-weight-bold mb-1">Divulgación</h3>
              <p class="text-caption text-grey-darken-1">Publicación de artículo de divulgación con los resultados y el impacto del observatorio Kaexla.</p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>

    <v-sheet class="bg-surface py-14">
      <v-container max-width="1000">
        <div class="text-center mb-10">
          <v-chip color="amber" variant="tonal" class="mb-4 font-weight-bold" size="small">
            Meta H • Prod 8 • Etapa 2
          </v-chip>
          <h2 class="text-h4 font-weight-black text-grey-darken-4 mb-4">Componentes Planificados</h2>
          <p class="text-body-1 text-grey-darken-1 mx-auto" style="max-width: 700px;">
            Kaexla se estructura en dos componentes técnicos que cubren la integración de los datos lingüísticos con el
            concentrador JUB y su indexación en MictlanX para persistencia y consulta.
          </p>
        </div>

        <v-row>
          <v-col cols="12" md="6">
            <v-card rounded="xl" elevation="0" class="pa-6 border bg-grey-lighten-4 h-100">
              <div class="d-flex align-start">
                <v-avatar style="background-color: #4E342E;" variant="flat" rounded="lg" class="mr-4 mt-1">
                  <v-icon color="white">mdi-connection</v-icon>
                </v-avatar>
                <div class="flex-grow-1">
                  <div class="d-flex justify-space-between align-center mb-1">
                    <div class="text-caption font-weight-bold text-grey-darken-1">E2-C1</div>
                    <v-chip size="x-small" color="amber" variant="tonal" class="font-weight-bold">0%</v-chip>
                  </div>
                  <h3 class="text-h6 font-weight-bold text-grey-darken-4 mb-2">Acoplamiento con JUB</h3>
                  <p class="text-body-2 text-grey-darken-2 mb-3">
                    Integración de los datos lingüísticos Tének con el concentrador JUB para su exposición en el buscador DCSPI.
                    Habilitación del sitio web del observatorio Kaexla dentro de la plataforma JUB con todos los materiales indexados.
                  </p>
                  <v-progress-linear model-value="0" color="brown-darken-2" bg-color="grey-lighten-2" rounded height="6" class="mb-3"></v-progress-linear>
                  <div class="d-flex flex-wrap gap-1">
                    <v-chip size="x-small" color="grey-lighten-2" variant="flat">≥ 90% cobertura</v-chip>
                    <v-chip size="x-small" color="grey-lighten-2" variant="flat">100% casos de uso</v-chip>
                    <v-chip size="x-small" color="grey-lighten-2" variant="flat">Sitio en JUB</v-chip>
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card rounded="xl" elevation="0" class="pa-6 border bg-grey-lighten-4 h-100">
              <div class="d-flex align-start">
                <v-avatar color="primary" variant="flat" rounded="lg" class="mr-4 mt-1">
                  <v-icon color="white">mdi-database-check</v-icon>
                </v-avatar>
                <div class="flex-grow-1">
                  <div class="d-flex justify-space-between align-center mb-1">
                    <div class="text-caption font-weight-bold text-grey-darken-1">E2-C2</div>
                    <v-chip size="x-small" color="amber" variant="tonal" class="font-weight-bold">0%</v-chip>
                  </div>
                  <h3 class="text-h6 font-weight-bold text-grey-darken-4 mb-2">Indexación de Productos Lingüísticos</h3>
                  <p class="text-body-2 text-grey-darken-2 mb-3">
                    Construcción de la base de datos de metadatos lingüísticos almacenada en MictlanX y accesible a través de JUB.
                    Verificación mediante la visualización de productos lingüísticos en JUB y la base de datos de metadatos generada.
                  </p>
                  <v-progress-linear model-value="0" color="brown-darken-2" bg-color="grey-lighten-2" rounded height="6" class="mb-3"></v-progress-linear>
                  <div class="d-flex flex-wrap gap-1">
                    <v-chip size="x-small" color="grey-lighten-2" variant="flat">≥ 90% cobertura</v-chip>
                    <v-chip size="x-small" color="grey-lighten-2" variant="flat">100% casos de uso</v-chip>
                    <v-chip size="x-small" color="grey-lighten-2" variant="flat">Base de datos metadatos</v-chip>
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-sheet class="bg-grey-lighten-3 py-12">
      <v-container max-width="600">
        <div class="text-center mb-8">
          <h2 class="text-h5 font-weight-black text-grey-darken-4 mb-2">Plataformas Requeridas</h2>
          <p class="text-body-2 text-grey-darken-1">El Observatorio Kaexla depende de los siguientes servicios del ecosistema JUB.</p>
        </div>
        <v-row justify="center">
          <v-col v-for="dep in kaexlaDependencies" :key="dep.name" cols="6" sm="4" class="text-center">
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
          El Observatorio Kaexla forma parte de la <strong>Etapa 2</strong> del proyecto MADTEC-2025-M-478. Su desarrollo
          contempla la validación con etnolingüistas especializados en lengua Tének, la publicación de un artículo de divulgación
          y el despliegue del sitio web oficial del observatorio dentro del concentrador JUB. El reporte técnico de pruebas
          de funcionamiento y validez es uno de los entregables formales de la Meta H.
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
  name: 'Kaexla',
  meta: {
    requiresAuth: false,
    layout: 'service',
  },
});

const kaexlaDependencies = [
  { name: 'JUB', role: 'Concentrador', icon: 'mdi-hub-outline', color: 'primary' },
  { name: 'MictlanX', role: 'Almacenamiento', icon: 'mdi-database', color: 'grey-darken-3' },
];
</script>

<style scoped>
.hero-section {
  background-image: linear-gradient(160deg, rgba(20, 10, 5, 0.97) 0%, rgba(62, 39, 35, 0.85) 50%, rgba(20, 10, 5, 0.97) 100%);
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
