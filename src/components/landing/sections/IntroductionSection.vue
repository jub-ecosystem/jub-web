<template>
<v-sheet class="py-16" style="background-color: #fafbfc;">
      <v-container max-width="1200">
        
        <v-row class="mb-10" justify="center">
          <v-col cols="12" md="10" class="text-center">
            <v-chip color="primary" variant="tonal" size="small" class="font-weight-bold mb-4 px-4 text-uppercase">
              El Contexto Actual
            </v-chip>
            <h2 class="text-h3 font-weight-black text-grey-darken-4 mb-6" style="line-height: 1.2;">
              El reto no es generar datos, <br>
              <span class="text-primary">sino conectarlos con propósito.</span>
            </h2>
            <p class="text-body-1 text-grey-darken-1 mx-auto" style="max-width: 800px; line-height: 1.6;">
              Las organizaciones producen terabytes de información estratégica, pero convertir esos cúmulos de datos en herramientas útiles para la toma de decisiones es un proceso que tiene tres grandes desafíos.
            </p>
          </v-col>
        </v-row>

        <v-row align="stretch" class="mb-6">
          
          <v-col cols="12" md="4">
            <v-card rounded="xl" elevation="0" class="h-100 pa-8 border bg-white transition-swing hover-card d-flex flex-column">
              <div class="d-flex justify-space-between align-start mb-6">
                <v-chip color="error" variant="flat" class="font-weight-black text-white px-4">P1</v-chip>
                <v-avatar color="error-lighten-4" variant="flat" size="48">
                  <v-icon color="error" size="24">mdi-lock-open-variant-outline</v-icon>
                </v-avatar>
              </div>
              <h3 class="text-h6 font-weight-bold text-grey-darken-4 mb-3">Dependencia Tecnológica</h3>
              <p class="text-body-2 text-grey-darken-2 mb-0 flex-grow-1">
                Delegar la infraestructura a proveedores públicos de nube crea graves riesgos de privacidad y obliga a la organización a ceder el control estratégico sobre sus propios procesos de análisis.
              </p>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card rounded="xl" elevation="0" class="h-100 pa-8 border bg-white transition-swing hover-card d-flex flex-column">
              <div class="d-flex justify-space-between align-start mb-6">
                <v-chip color="secondary-blue" variant="flat" class="font-weight-black text-white px-4">P2</v-chip>
                <v-avatar color="indigo-lighten-4" variant="flat" size="48">
                  <v-icon color="secondary-blue" size="24">mdi-puzzle-outline</v-icon>
                </v-avatar>
              </div>
              <h3 class="text-h6 font-weight-bold text-grey-darken-4 mb-3">Manejo de Heterogeneidad</h3>
              <p class="text-body-2 text-grey-darken-2 mb-0 flex-grow-1">
                Los datos estructurados y no estructurados viven en silos. Conectar herramientas analíticas aisladas con el almacenamiento final resulta en una arquitectura frágil, lenta y muy difícil de mantener.
              </p>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card rounded="xl" elevation="0" class="h-100 pa-8 border bg-white transition-swing hover-card d-flex flex-column">
              <div class="d-flex justify-space-between align-start mb-6">
                <v-chip color="teal" variant="flat" class="font-weight-black text-white px-4">P3</v-chip>
                <v-avatar color="teal-lighten-4" variant="flat" size="48">
                  <v-icon color="teal-darken-2" size="24">mdi-magnify-expand</v-icon>
                </v-avatar>
              </div>
              <h3 class="text-h6 font-weight-bold text-grey-darken-4 mb-3">Acceso Fragmentado</h3>
              <p class="text-body-2 text-grey-darken-2 mb-0 flex-grow-1">
                Compartir, indexar y buscar información estratégica masiva, generada por equipos multidisciplinarios, es totalmente ineficiente si no existe un buscador unificado y centralizado.
              </p>
            </v-card>
          </v-col>

        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card 
              rounded="xl" 
              elevation="0" 
              class="pa-8 pa-md-12 border-0 transition-swing hover-card position-relative overflow-hidden"
              style="background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary-blue)) 100%);"
            >
              <v-icon 
                size="250" 
                color="white" 
                class="position-absolute d-none d-md-block" 
                style="opacity: 0.05; right: -20px; top: -40px;"
              >
                mdi-hexagon-multiple
              </v-icon>

              <div class="position-relative z-10 d-flex flex-column flex-md-row align-center justify-space-between">
                
                <div class="mb-6 mb-md-0" style="max-width: 700px;">
                  <v-chip color="white" variant="flat" size="small" class="font-weight-black text-primary mb-4 text-uppercase tracking-wide">
                    La Solución Unificada
                  </v-chip>
                  <h3 class="text-h4 font-weight-black text-white mb-4" style="line-height: 1.2;">
                    Un Concentrador Nacional de Información Estratégica
                  </h3>
                  <p class="text-body-1 text-white mb-0" style="opacity: 0.9;">
                    Para resolver <strong>P1</strong>, <strong>P2</strong> y <strong>P3</strong>, creamos un ecosistema unificador. Una plataforma que concentra a <strong>Jub</strong>, <strong>Xelhua</strong>, <strong>Nez</strong> y <strong>MictlanX</strong> para distribuir y buscar información estratégica sin ceder el control de los datos ni generar dependencia tecnológica externa.
                  </p>
                </div>
                
                <div class="ml-md-8 flex-shrink-0">
                  <v-btn
                    color="white"
                    variant="elevated"
                    size="x-large"
                    rounded="pill"
                    class="text-none font-weight-bold text-primary"
                    prepend-icon="mdi-arrow-down"
                    elevation="4"
                    @click="goToArchitecture"
                  >
                    Ver Solución
                  </v-btn>
                </div>

              </div>
            </v-card>
          </v-col>
        </v-row>

      </v-container>
    </v-sheet>

</template>


<script lang="ts" setup>

function goToArchitecture() {
  const element = document.getElementById('arquitectura');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

</script>
<style scoped>
.hover-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06) !important;
  transition: all 0.3s ease-out;
}
</style>