<template>
  <v-sheet class="bg-surface py-16 px-4 overflow-hidden">
    <v-container max-width="1200" v-intersect="onIntersect">
      
      <div class="text-center mb-12 mb-md-16">
        <v-chip color="secondary-blue" variant="tonal" size="small" class="font-weight-bold mb-4 text-uppercase tracking-wide">
          Impacto y Escalabilidad
        </v-chip>
        <h2 class="text-h3 font-weight-black text-grey-darken-4">
          Procesamiento a gran escala
        </h2>
      </div>

      <v-row class="text-center mb-10" justify="center">
        <v-col cols="12" md="4" :class="isVisible ? 'fade-up-active' : 'fade-up-hidden'" style="transition-delay: 100ms;">
          <div class="text-h1 font-weight-black text-secondary-blue mb-2" style="line-height: 1;">
            <vue3-autocounter v-if="isVisible" ref="counter1" :startAmount="0" :endAmount="99.9" :decimals="1" :duration="2" suffix="%" />
            <span v-else>0%</span>
          </div>
          <div class="text-h6 font-weight-bold text-grey-darken-4">Disponibilidad en red</div>
          <div class="text-body-2 text-grey-darken-1 mt-1 mx-auto" style="max-width: 250px;">Resiliencia asegurada por la arquitectura de MictlanX.</div>
        </v-col>

        <v-col cols="12" md="4" :class="isVisible ? 'fade-up-active' : 'fade-up-hidden'" style="transition-delay: 200ms;">
          <div class="text-h1 font-weight-black text-primary mb-2" style="line-height: 1;">
            <vue3-autocounter v-if="isVisible" ref="counter2" :startAmount="0" :endAmount="100" :decimals="0" :duration="2.5" suffix="k+" />
            <span v-else>0k+</span>
          </div>
          <div class="text-h6 font-weight-bold text-grey-darken-4">Productos indexados</div>
          <div class="text-body-2 text-grey-darken-1 mt-1 mx-auto" style="max-width: 250px;">Búsqueda eficiente en repositorios masivos de metadatos.</div>
        </v-col>

        <v-col cols="12" md="4" :class="isVisible ? 'fade-up-active' : 'fade-up-hidden'" style="transition-delay: 300ms;">
          <div class="text-h1 font-weight-black text-teal mb-2" style="line-height: 1;">
            <vue3-autocounter v-if="isVisible" ref="counter3" :startAmount="0" :endAmount="10" :decimals="0" :duration="1.5" suffix="+" />
            <span v-else>0+</span>
          </div>
          <div class="text-h6 font-weight-bold text-grey-darken-4">Observatorios integrados</div>
          <div class="text-body-2 text-grey-darken-1 mt-1 mx-auto" style="max-width: 250px;">Dominios de investigación unificados en un solo ecosistema.</div>
        </v-col>
      </v-row>

      <v-row>
        
        <v-col cols="12" md="6">
          <v-card 
            color="blue-lighten-5" 
            variant="flat" 
            rounded="xl"
            class="pa-8 pa-md-12 d-flex flex-column justify-center fill-height border transition-swing hover-card" 
            style="border-color: rgba(var(--v-theme-secondary-blue), 0.2) !important; min-height: 280px;transition-delay: 400ms;"
            :class="isVisible ? 'fade-up-active' : 'fade-up-hidden'"
          >
            <v-avatar color="secondary-blue" variant="tonal" size="64" class="mb-6">
              <v-icon size="32" color="secondary-blue">mdi-shield-lock-outline</v-icon>
            </v-avatar>
            <h4 class="text-h4 font-weight-bold text-grey-darken-4 mb-4" style="line-height: 1.2;">
              Cifrado y Conectividad
            </h4>
            <p class="text-body-1 text-grey-darken-2 mb-0">
              Datos transmitidos con cifrado End-to-End. Además, cuenta con SDKs y conectores nativos listos para integrar tus modelos de IA y herramientas analíticas sin fricción.
            </p>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card 
            color="white" 
            variant="flat" 
            rounded="xl"
            class="pa-8 pa-md-12 d-flex flex-column align-start justify-center fill-height border transition-swing hover-card position-relative overflow-hidden" 
            style="min-height: 280px; transition-delay: 500ms;"
            :class="isVisible ? 'fade-up-active' : 'fade-up-hidden'"
          >
            <v-icon 
              size="180" 
              color="grey-lighten-4" 
              class="position-absolute" 
              style="right: -30px; bottom: -30px; z-index: 0;"
            >
              mdi-database-sync-outline
            </v-icon>

            <div class="position-relative z-10">
              <v-avatar color="primary" variant="tonal" size="56" class="mb-6">
                <v-icon size="32" color="primary">mdi-identifier</v-icon>
              </v-avatar>
              <h4 class="text-h5 font-weight-bold text-grey-darken-4 mb-3" style="line-height: 1.4;">
                Creación asíncrona de observatorios
              </h4>
              <p class="text-body-1 text-grey-darken-2 mb-0">
                Búsqueda ultra rápida y estructurada mediante la asignación de identificadores nominales únicos en bases masivas.
              </p>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card 
            color="grey-darken-4" 
            variant="flat" 
            rounded="xl" 
            class="pa-8 pa-md-12 border-0 transition-swing hover-card overflow-hidden"
            :class="isVisible ? 'fade-up-active' : 'fade-up-hidden'"
            style="transition-delay: 600ms;"
          >
            <v-row align="center">
              
              <v-col cols="12" md="5" class="text-center text-md-left mb-6 mb-md-0 z-10">
                <v-chip color="primary" variant="outlined" size="small" class="font-weight-bold mb-4">
                  Crecimiento Continuo
                </v-chip>
                <h4 class="text-h4 font-weight-black text-white mb-4">
                  Datos estructurados y no estructurados
                </h4>
                <p class="text-body-1 text-grey-lighten-1">
                  Integración y procesamiento masivo de información proveniente de múltiples dominios, escalando dinámicamente según la demanda.
                </p>
              </v-col>

              <v-col cols="12" md="7">
                <v-card color="transparent" flat class="pt-4">
                  <v-sparkline
                    :model-value="sparklineData"
                    color="primary"
                    line-width="3"
                    padding="16"
                    stroke-linecap="round"
                    smooth="10"
                    auto-draw
                    :auto-draw-duration="2000"
                    fill
                    class="sparkline-bg"
                  ></v-sparkline>
                </v-card>
              </v-col>

            </v-row>
          </v-card>
        </v-col>

      </v-row>
    </v-container>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Vue3Autocounter from 'vue3-autocounter';

const isVisible = ref(false);

const onIntersect = (isIntersecting: boolean) => {
  if (isIntersecting) {
    isVisible.value = true;
  }
};

const sparklineData = ref([
  10, 15, 22, 18, 35, 48, 42, 65, 80, 75, 95, 120, 150
]);
</script>

<style scoped>
.text-h1 {
  font-size: clamp(3.5rem, 6vw, 4.5rem) !important;
  letter-spacing: -1px !important;
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
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08) !important;
}

.v-card.rounded-xl {
  border-radius: 24px !important; 
}

@media (min-width: 960px) {
  .v-card.rounded-xl {
    border-radius: 40px !important;
  }
}

.sparkline-bg {
  --v-theme-surface: transparent; 
  background: linear-gradient(to top, rgba(0, 230, 118, 0.05), transparent);
}
</style>