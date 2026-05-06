<template>
  <div class="xelhua-page bg-background">

    <v-sheet class="hero-section d-flex flex-column align-center justify-center pt-16 pb-16" color="grey-darken-4">
      <v-container class="text-center position-relative z-10" max-width="800">

        <v-img
          src="@/assets/xelhua.png"
          alt="Xelhua Logo"
          width="200"
          class="mx-auto mb-4"
        ></v-img>

        <h1 class="text-h2 text-white mb-2" style="font-family: Georgia, serif !important;">
          Xelhua
        </h1>

        <p class="text-body-1 mb-6" style="font-family: monospace; color: #EF9A9A;">
          Procesamiento organizado de datos estructurados a escala.
        </p>

        <h2 class="text-h5 font-weight-bold text-white mb-10">
          Plataforma de malla de servicios para análisis de datos estructurados
        </h2>

        <div class="d-flex justify-center flex-wrap gap-4 mb-8">
          <v-btn
            color="grey-darken-2"
            rounded="pill"
            size="large"
            elevation="0"
            class="text-none font-weight-bold px-8"
            disabled
          >
            <v-icon start>mdi-file-document-outline</v-icon>
            Reporte técnico
          </v-btn>

          <v-btn
            color="grey-darken-2"
            rounded="pill"
            size="large"
            elevation="0"
            class="text-none font-weight-bold px-8"
            disabled
          >
            <v-icon start>mdi-github</v-icon>
            Repositorio
          </v-btn>

          <v-btn
            rounded="pill"
            size="large"
            elevation="0"
            class="text-none font-weight-bold px-8"
            style="background-color: #C62828; color: white;"
            href="https://apix.tamps.cinvestav.mx/xelhua/app/"
            target="_blank"
          >
            <v-icon start>mdi-open-in-new</v-icon>
            Plataforma
          </v-btn>
        </div>

        <div class="d-flex justify-center flex-wrap gap-2 pb-16">
          <v-chip
            v-for="tag in ['Prod 2', 'Meta B', 'E1-C1', 'E1-C2', 'E1-C3']"
            :key="tag"
            variant="flat"
            class="font-weight-bold px-4"
            style="background-color: #B71C1C; color: white;"
          >
            {{ tag }}
          </v-chip>
        </div>

      </v-container>
    </v-sheet>

    <v-container class="px-4 pb-16">
      <v-card
        class="mx-auto overlap-card mt-n16"
        max-width="1000"
        elevation="6"
        rounded="xl"
      >
        <v-card-text class="pa-8 pa-md-12">
          <div class="text-center mb-12">
            <h2 class="text-h4 font-weight-black text-grey-darken-4 mb-4">¿Qué es Xelhua?</h2>
            <p class="text-body-1 text-grey-darken-1 mx-auto" style="max-width: 800px; line-height: 1.6;">
              Xelhua es una plataforma de malla de servicios diseñada para el procesamiento organizado de datos científicos estructurados.
              Orquesta flujos de trabajo complejos, genera productos de datos consultables y se integra de forma nativa con el concentrador JUB
              y el sistema de almacenamiento distribuido MictlanX, formando el núcleo de análisis de datos estructurados del ecosistema JUB.
            </p>
          </div>

          <v-row>
            <v-col cols="12" sm="6" md="3" class="text-center px-4">
              <v-avatar color="red-lighten-4" variant="tonal" size="64" class="mb-4">
                <v-icon size="32" color="red-darken-2">mdi-pipe</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-1 font-weight-bold mb-2">Flujos de Procesamiento</h3>
              <p class="text-caption text-grey-darken-1">Orquestación de pipelines para datos tabulares, series de tiempo y estructuras jerárquicas.</p>
            </v-col>

            <v-col cols="12" sm="6" md="3" class="text-center px-4">
              <v-avatar color="red-lighten-4" variant="tonal" size="64" class="mb-4">
                <v-icon size="32" color="red-darken-2">mdi-package-variant-closed</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-1 font-weight-bold mb-2">Productos de Datos</h3>
              <p class="text-caption text-grey-darken-1">Resultados de análisis almacenados y accesibles mediante una API de productos estandarizada integrada con JUB.</p>
            </v-col>

            <v-col cols="12" sm="6" md="3" class="text-center px-4">
              <v-avatar color="red-lighten-4" variant="tonal" size="64" class="mb-4">
                <v-icon size="32" color="red-darken-2">mdi-share-variant-outline</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-1 font-weight-bold mb-2">Integración con JUB</h3>
              <p class="text-caption text-grey-darken-1">Acoplamiento bidireccional con el concentrador JUB para indexación, búsqueda y exposición de resultados.</p>
            </v-col>

            <v-col cols="12" sm="6" md="3" class="text-center px-4">
              <v-avatar color="red-lighten-4" variant="tonal" size="64" class="mb-4">
                <v-icon size="32" color="red-darken-2">mdi-database-arrow-up</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-1 font-weight-bold mb-2">Almacenamiento Distribuido</h3>
              <p class="text-caption text-grey-darken-1">Persistencia de objetos de datos mediante MictlanX, garantizando alta disponibilidad y transferencia segura.</p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>

    <v-sheet class="bg-surface py-16 border-bottom">
      <v-container max-width="1200">
        <div class="text-center mb-12">
          <v-chip variant="tonal" class="mb-4 font-weight-bold" size="small" style="color: #B71C1C; background-color: #FFEBEE;">
            Meta B • Prod 2
          </v-chip>
          <h2 class="text-h4 font-weight-black text-grey-darken-4 mb-4">Componentes del Sistema</h2>
          <p class="text-body-1 text-grey-darken-1 mx-auto" style="max-width: 800px;">
            La plataforma Xelhua se estructura en tres componentes técnicos interoperables, cada uno con indicadores de rendimiento
            y criterios de verificación definidos para garantizar la calidad e integración en el ecosistema JUB.
          </p>
        </div>

        <v-row>
          <v-col cols="12" md="4">
            <v-card rounded="xl" elevation="0" class="h-100 pa-6 border bg-grey-lighten-4 transition-swing hover-card">
              <div class="d-flex align-start">
                <v-avatar variant="flat" rounded="lg" class="mr-4 mt-1" style="background-color: #C62828;">
                  <v-icon color="white">mdi-pipe-valve</v-icon>
                </v-avatar>
                <div>
                  <div class="text-caption font-weight-bold mb-1" style="color: #B71C1C;">Actividad D1 • E1-C1</div>
                  <h3 class="text-h6 font-weight-bold text-grey-darken-4 mb-2">Malla de Servicios</h3>
                  <p class="text-body-2 text-grey-darken-2 mb-3">
                    Infraestructura central de orquestación para el procesamiento de datos estructurados. Gestiona la comunicación entre microservicios y garantiza la resiliencia del sistema ante fallos.
                  </p>
                  <div class="d-flex flex-wrap gap-1">
                    <v-chip size="x-small" variant="flat" class="font-weight-bold" style="background-color: #FFCDD2; color: #B71C1C;">≥ 90% cobertura unitaria</v-chip>
                    <v-chip size="x-small" color="grey-lighten-2" variant="flat">Repo + informe técnico</v-chip>
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card rounded="xl" elevation="0" class="h-100 pa-6 border bg-grey-lighten-4 transition-swing hover-card">
              <div class="d-flex align-start">
                <v-avatar color="primary" variant="flat" rounded="lg" class="mr-4 mt-1">
                  <v-icon color="white">mdi-connection</v-icon>
                </v-avatar>
                <div>
                  <div class="text-caption font-weight-bold text-primary mb-1">Actividad D2 • E1-C2</div>
                  <h3 class="text-h6 font-weight-bold text-grey-darken-4 mb-2">Acoplamiento JUB</h3>
                  <p class="text-body-2 text-grey-darken-2 mb-3">
                    Integración con el concentrador JUB para indexación y exposición de productos generados. Disponibilidad del servicio al 99% con verificación mediante la API de procesos.
                  </p>
                  <div class="d-flex flex-wrap gap-1">
                    <v-chip size="x-small" variant="flat" class="font-weight-bold" style="background-color: #FFCDD2; color: #B71C1C;">Disponibilidad 99%</v-chip>
                    <v-chip size="x-small" variant="flat" class="font-weight-bold" style="background-color: #FFCDD2; color: #B71C1C;">≥ 90% cobertura</v-chip>
                    <v-chip size="x-small" color="grey-lighten-2" variant="flat">API de procesos</v-chip>
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card rounded="xl" elevation="0" class="h-100 pa-6 border bg-grey-lighten-4 transition-swing hover-card">
              <div class="d-flex align-start">
                <v-avatar color="secondary-blue" variant="flat" rounded="lg" class="mr-4 mt-1">
                  <v-icon color="white">mdi-database-sync</v-icon>
                </v-avatar>
                <div>
                  <div class="text-caption font-weight-bold text-secondary-blue mb-1">Actividad D3 • E1-C3</div>
                  <h3 class="text-h6 font-weight-bold text-grey-darken-4 mb-2">Acoplamiento MictlanX</h3>
                  <p class="text-body-2 text-grey-darken-2 mb-3">
                    Integración con MictlanX para la persistencia distribuida de productos de datos. Expone la API de productos con el listado y estado de cada resultado generado por los flujos.
                  </p>
                  <div class="d-flex flex-wrap gap-1">
                    <v-chip size="x-small" variant="flat" class="font-weight-bold" style="background-color: #FFCDD2; color: #B71C1C;">Disponibilidad 99%</v-chip>
                    <v-chip size="x-small" variant="flat" class="font-weight-bold" style="background-color: #FFCDD2; color: #B71C1C;">≥ 90% cobertura</v-chip>
                    <v-chip size="x-small" color="grey-lighten-2" variant="flat">API de productos</v-chip>
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-sheet class="bg-grey-darken-4 py-16">
      <v-container max-width="1000">
        <v-row align="center" justify="space-between" class="mb-10">
          <v-col cols="12" md="5">
            <h2 class="text-h4 font-weight-black text-white mb-4">Validación Técnica</h2>
            <p class="text-body-1 text-grey-lighten-1 mb-0">
              Los indicadores de desempeño de Xelhua garantizan estabilidad, alta disponibilidad y cobertura completa
              de los casos de uso acordados con los usuarios finales. Todos los umbrales han sido superados.
            </p>
          </v-col>
          <v-col cols="12" md="6" class="d-flex justify-end">
            <v-chip color="success" variant="flat" class="font-weight-bold px-4" size="large">
              <v-icon start>mdi-check-decagram</v-icon>
              Métricas Cumplidas
            </v-chip>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" md="3" class="text-center">
            <v-card color="rgba(255,255,255,0.05)" rounded="xl" elevation="0" class="pa-6 h-100" style="border: 1px solid rgba(76, 175, 80, 0.3);">
              <v-progress-circular
                :model-value="92"
                color="red-darken-1"
                size="90"
                width="8"
                class="mb-4"
              >
                <span class="text-h5 font-weight-bold text-white">
                  <vue3-autocounter :startAmount="0" :endAmount="92" :duration="2" suffix="%" />
                </span>
              </v-progress-circular>
              <div class="text-subtitle-1 font-weight-bold text-white mb-1">Malla de Servicios</div>
              <div class="text-caption text-grey-lighten-1">Cobertura de pruebas unitarias (Meta: ≥ 90%)</div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="3" class="text-center">
            <v-card color="rgba(255,255,255,0.05)" rounded="xl" elevation="0" class="pa-6 h-100" style="border: 1px solid rgba(76, 175, 80, 0.3);">
              <div class="d-flex justify-center align-center mb-4" style="height: 90px;">
                <v-icon size="64" color="success">mdi-server-network</v-icon>
              </div>
              <div class="text-subtitle-1 font-weight-bold text-white mb-1">Acoplamiento JUB</div>
              <div class="text-caption text-success font-weight-bold text-uppercase mb-1">Operativo</div>
              <div class="text-caption text-grey-lighten-1">Disponibilidad del servicio (Meta: ≥ 99%)</div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="3" class="text-center">
            <v-card color="rgba(255,255,255,0.05)" rounded="xl" elevation="0" class="pa-6 h-100" style="border: 1px solid rgba(76, 175, 80, 0.3);">
              <v-progress-circular
                :model-value="91"
                color="red-darken-1"
                size="90"
                width="8"
                class="mb-4"
              >
                <span class="text-h5 font-weight-bold text-white">
                  <vue3-autocounter :startAmount="0" :endAmount="91" :duration="2" suffix="%" />
                </span>
              </v-progress-circular>
              <div class="text-subtitle-1 font-weight-bold text-white mb-1">Acoplamiento MictlanX</div>
              <div class="text-caption text-grey-lighten-1">Pruebas de integración (Meta: ≥ 90%)</div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="3" class="text-center">
            <v-card color="rgba(255,255,255,0.05)" rounded="xl" elevation="0" class="pa-6 h-100" style="border: 1px solid rgba(76, 175, 80, 0.3);">
              <v-progress-circular
                :model-value="100"
                color="success"
                size="90"
                width="8"
                class="mb-4"
              >
                <span class="text-h5 font-weight-bold text-white">
                  <vue3-autocounter :startAmount="0" :endAmount="100" :duration="2" suffix="%" />
                </span>
              </v-progress-circular>
              <div class="text-subtitle-1 font-weight-bold text-white mb-1">Casos de Uso</div>
              <div class="text-caption text-grey-lighten-1">Cumplimiento de los casos pactados (Meta: 100%)</div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-sheet class="bg-surface py-16">
      <v-container max-width="960">
        <div class="text-center mb-10">
          <h2 class="text-h4 font-weight-black mb-2">API de Xelhua</h2>
          <p class="text-body-1 text-grey-darken-1">
            Interactúa con los flujos de procesamiento y consulta los productos generados a través de una API REST estandarizada.
          </p>
        </div>

        <v-row>
          <v-col cols="12" md="6">
            <div class="d-flex align-center mb-3">
              <v-icon size="18" color="red-darken-2" class="mr-2">mdi-pipe</v-icon>
              <span class="text-subtitle-1 font-weight-bold" style="color: #B71C1C;">API de Procesos</span>
            </div>
            <v-card rounded="xl" elevation="8" class="bg-grey-darken-4 overflow-hidden">
              <v-toolbar color="rgba(0,0,0,0.2)" density="compact" class="px-4">
                <div class="d-flex ga-2">
                  <v-avatar size="12" color="error"></v-avatar>
                  <v-avatar size="12" color="warning"></v-avatar>
                  <v-avatar size="12" color="success"></v-avatar>
                </div>
                <v-spacer></v-spacer>
                <span class="text-caption text-grey-lighten-1 font-monospace">POST /api/v1/processes</span>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text class="pa-5 font-monospace" style="line-height: 1.7; color: #e0e0e0; font-size: 0.78rem;">
                <div><span style="color: #c678dd;">POST</span> <span style="color: #98c379;">/api/v1/processes</span></div>
                <div class="mb-3"><span style="color: #61afef;">Authorization:</span> <span style="color: #e5c07b;">Bearer &lt;token&gt;</span></div>
                <div><span style="color: #7f848e;">{</span></div>
                <div>&nbsp;&nbsp;<span style="color: #e06c75;">"flow"</span>: <span style="color: #98c379;">"csv-ingest"</span>,</div>
                <div>&nbsp;&nbsp;<span style="color: #e06c75;">"source"</span>: <span style="color: #98c379;">"mictlanx://bucket/data.csv"</span>,</div>
                <div>&nbsp;&nbsp;<span style="color: #e06c75;">"params"</span>: <span style="color: #7f848e;">{</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #e06c75;">"delimiter"</span>: <span style="color: #98c379;">","</span>,</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #e06c75;">"encoding"</span>: <span style="color: #98c379;">"utf-8"</span>,</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #e06c75;">"observatory"</span>: <span style="color: #98c379;">"azomalli"</span></div>
                <div>&nbsp;&nbsp;<span style="color: #7f848e;">}</span></div>
                <div><span style="color: #7f848e;">}</span></div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <div class="d-flex align-center mb-3">
              <v-icon size="18" color="primary" class="mr-2">mdi-package-variant-closed</v-icon>
              <span class="text-subtitle-1 font-weight-bold text-primary">API de Productos</span>
            </div>
            <v-card rounded="xl" elevation="8" class="bg-grey-darken-4 overflow-hidden">
              <v-toolbar color="rgba(0,0,0,0.2)" density="compact" class="px-4">
                <div class="d-flex ga-2">
                  <v-avatar size="12" color="error"></v-avatar>
                  <v-avatar size="12" color="warning"></v-avatar>
                  <v-avatar size="12" color="success"></v-avatar>
                </div>
                <v-spacer></v-spacer>
                <span class="text-caption text-grey-lighten-1 font-monospace">GET /api/v1/products</span>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text class="pa-5 font-monospace" style="line-height: 1.7; color: #e0e0e0; font-size: 0.78rem;">
                <div><span style="color: #c678dd;">GET</span> <span style="color: #98c379;">/api/v1/products?flow=csv-ingest</span></div>
                <div class="mb-3"><span style="color: #61afef;">Authorization:</span> <span style="color: #e5c07b;">Bearer &lt;token&gt;</span></div>
                <div class="mb-2"><span style="color: #7f848e; font-style: italic;">// Respuesta</span></div>
                <div><span style="color: #7f848e;">{</span></div>
                <div>&nbsp;&nbsp;<span style="color: #e06c75;">"products"</span>: <span style="color: #7f848e;">[{</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #e06c75;">"id"</span>: <span style="color: #98c379;">"ProdXEY-001"</span>,</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #e06c75;">"flow"</span>: <span style="color: #98c379;">"csv-ingest"</span>,</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #e06c75;">"status"</span>: <span style="color: #98c379;">"ready"</span>,</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #e06c75;">"size_mb"</span>: <span style="color: #d19a66;">12.4</span></div>
                <div>&nbsp;&nbsp;<span style="color: #7f848e;">}]</span></div>
                <div><span style="color: #7f848e;">}</span></div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-footer class="bg-grey-darken-4 pt-12 pb-6 d-flex flex-column border-t" style="border-color: rgba(255,255,255,0.1) !important;">
      <v-container max-width="1200" class="pa-0">
        <v-row justify="center" align="center" class="mb-8">
          <v-img max-width="80" src="@/assets/xelhua.png" width="80" />
        </v-row>
        <v-row justify="space-between" class="mb-8">

          <v-col cols="12" md="4" class="text-center text-md-left mb-6 mb-md-0">
            <h3 class="text-h5 font-weight-black text-white mb-4" style="font-family: Georgia, serif !important;">
              Xelhua
            </h3>
            <p class="text-body-2 text-grey-lighten-1 mb-0 mx-auto mx-md-0" style="max-width: 300px;">
              Plataforma de malla de servicios para el procesamiento y análisis de datos estructurados científicos integrada al ecosistema JUB.
            </p>
          </v-col>

          <v-col cols="12" md="4" class="text-center">
            <h4 class="text-subtitle-1 font-weight-bold text-white mb-4">Código Abierto</h4>
            <div class="d-flex flex-column align-center ga-3">
              <v-tooltip text="Repositorio no disponible aún" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    variant="outlined"
                    color="grey-darken-1"
                    prepend-icon="mdi-github"
                    rounded="pill"
                    class="text-none font-weight-bold"
                    width="220"
                    disabled
                  >
                    Xelhua Service
                  </v-btn>
                </template>
              </v-tooltip>
            </div>
          </v-col>

          <v-col cols="12" md="4" class="text-center text-md-right mt-6 mt-md-0">
            <h4 class="text-subtitle-1 font-weight-bold text-white mb-4">Contacto</h4>
            <p class="text-body-2 text-grey-lighten-1 mb-1">
              <v-icon size="small" class="mr-2">mdi-email-outline</v-icon>
              jesus.castillo.b@cinvestav.mx
            </p>
            <p class="text-body-2 text-grey-lighten-1">
              Cinvestav Unidad Tamaulipas, México
            </p>
          </v-col>

        </v-row>

        <v-divider color="grey-darken-2" class="mb-6"></v-divider>

        <v-row>
          <v-col cols="12" class="text-center text-caption text-grey-darken-1">
            &copy; {{ new Date().getFullYear() }} Jub Ecosystem. Todos los derechos reservados.<br>
            Distribuido bajo la Licencia Apache 2.0.
          </v-col>
        </v-row>
      </v-container>
    </v-footer>

  </div>
</template>

<script lang="ts" setup>
import Vue3Autocounter from 'vue3-autocounter';

definePage({
  name: 'Xelhua',
  meta: {
    requiresAuth: false,
    layout: 'service',
  },
});
</script>

<style scoped>
.hero-section {
  background-image: linear-gradient(160deg, rgba(30, 5, 5, 0.97) 0%, rgba(183, 28, 28, 0.80) 50%, rgba(30, 5, 5, 0.97) 100%);
  position: relative;
}

.overlap-card {
  position: relative;
  z-index: 20;
}

.gap-4 { gap: 16px; }
.gap-2 { gap: 8px; }
.gap-1 { gap: 4px; }

.hover-card:hover {
  background-color: #ffffff !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
}
</style>
