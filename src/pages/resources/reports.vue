<template>
  <v-container max-width="900" class="py-8">

    <!-- Hero -->
    <v-card rounded="xl" elevation="0" class="mb-8 pa-8 text-center" color="primary" theme="dark">
      <v-icon size="52" class="mb-3">mdi-file-document-outline</v-icon>
      <h1 class="text-h4 font-weight-black mb-2">Reportes técnicos</h1>
      <p class="text-body-1 opacity-80">
        Documentación técnica del proyecto MADTEC-2025 y sus plataformas asociadas.
      </p>
    </v-card>

    <!-- Report cards -->
    <v-row>
      <v-col v-for="report in reports" :key="report.title" cols="12" sm="6">
        <v-card rounded="xl" elevation="2" class="h-100 d-flex flex-column" :style="`border-top: 4px solid rgb(var(--v-theme-${report.color}))`">

          <v-card-item class="pt-5">
            <template #prepend>
              <v-avatar :color="report.color" variant="tonal" size="48" rounded="lg" class="mr-2">
                <v-icon size="24">{{ report.icon }}</v-icon>
              </v-avatar>
            </template>
            <v-card-title class="text-body-1 font-weight-bold" style="white-space: normal; line-height: 1.3;">
              {{ report.title }}
            </v-card-title>
            <template #append>
              <v-chip :color="report.color" size="x-small" variant="tonal" class="font-weight-bold">
                {{ report.category }}
              </v-chip>
            </template>
          </v-card-item>

          <v-card-text class="flex-grow-1">
            <p class="text-body-2 text-grey-darken-1" style="line-height: 1.6;">{{ report.description }}</p>
          </v-card-text>

          <v-card-actions class="pa-4 pt-0">
            <v-tooltip v-if="!report.link || report.link === '#'" text="Próximamente disponible" location="top">
              <template #activator="{ props: tp }">
                <div v-bind="tp" class="w-100">
                  <v-btn
                    block
                    :color="report.color"
                    variant="tonal"
                    prepend-icon="mdi-download"
                    class="text-none font-weight-bold"
                    disabled
                  >Descargar reporte</v-btn>
                </div>
              </template>
            </v-tooltip>
            <v-btn
              v-else
              block
              :color="report.color"
              variant="tonal"
              prepend-icon="mdi-download"
              class="text-none font-weight-bold"
              :href="report.link"
              target="_blank"
              rel="noopener"
            >Descargar reporte</v-btn>
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts" setup>
definePage({
  name: 'ResourcesReports',
  // meta: { requiresAuth: false, layout: 'default' },
});

interface Report {
  title: string;
  category: string;
  description: string;
  icon: string;
  color: string;
  link: string;
}

const reports: Report[] = [
  {
    title: 'Reporte técnico final del proyecto',
    category: 'Proyecto',
    description: 'Documento integrador que consolida los resultados, metodología y conclusiones del proyecto MADTEC-2025. Incluye el alcance completo de las plataformas desarrolladas y su impacto en el ecosistema de datos científicos.',
    icon: 'mdi-file-document-multiple-outline',
    color: 'primary',
    link: '#',
  },
  {
    title: 'Reporte técnico — JUB',
    category: 'Plataforma',
    description: 'Descripción técnica de JUB, la plataforma genérica de big data para ciencias de la vida y salud. Cubre la arquitectura de sandboxes, el modelo de observatorios FAIR y los servicios de ciencia de datos.',
    icon: 'mdi-telescope',
    color: 'teal',
    link: '#',
  },
  {
    title: 'Reporte técnico — MictlanX',
    category: 'Componente',
    description: 'Documentación de MictlanX, el sistema de almacenamiento en nube del proyecto. Describe la arquitectura de descarga por fragmentos, la gestión de concurrencia y las estrategias de replicación.',
    icon: 'mdi-cloud-outline',
    color: 'blue-grey',
    link: '#',
  },
  {
    title: 'Reporte técnico — Xelhua',
    category: 'Componente',
    description: 'Documentación de Xelhua, el servicio de autenticación y autorización. Abarca el modelo de tokens, la integración con servicios externos y los mecanismos de seguridad implementados.',
    icon: 'mdi-server-network',
    color: 'red-darken-2',
    link: '#',
  },
  {
    title: 'Reporte técnico — Nez',
    category: 'Componente',
    description: 'Documentación de Nez, el modelo esqueleto para construir sistemas de IA en el continuum computacional. Incluye el modelo de construcción, la integración de requerimientos no funcionales y los casos de estudio.',
    icon: 'mdi-graph-outline',
    color: 'deep-purple',
    link: '#',
  },
];
</script>
