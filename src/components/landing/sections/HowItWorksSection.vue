<template>
  <v-sheet color="primary-darken-1" class="py-16 px-4 text-white overflow-hidden">
    <v-container max-width="1200" v-intersect="onIntersectDark">
      
      <v-row class="mb-12">
        <v-col cols="12" md="8" :class="isVisibleDark ? 'fade-up-active' : 'fade-up-hidden'" style="transition-delay: 100ms;">
          <v-chip color="white" variant="outlined" size="small" class="font-weight-bold mb-6 text-uppercase tracking-wide opacity-80">
            Filosofía del Ecosistema
          </v-chip>
          <h2 class="text-h4 text-md-h3 font-weight-black leading-tight mb-4">
            Mejora la forma de buscar y <br class="hidden-sm-and-down">
            gestionar información estratégica
          </h2>
          <p class="text-body-1 opacity-80" style="max-width: 600px;">
            Diseñamos Jub bajo tres principios técnicos fundamentales para garantizar que las instituciones mantengan el control absoluto de sus datos.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-card 
            color="rgba(255, 255, 255, 0.03)" 
            variant="flat" 
            rounded="xl" 
            class="pa-8 pa-md-10 fill-height d-flex flex-column position-relative insight-card border"
            style="border-color: rgba(255,255,255,0.1) !important;transition-delay: 200ms;"
            :class="isVisibleDark ? 'fade-up-active' : 'fade-up-hidden'"
          >
            <span class="text-watermark font-weight-black position-absolute">1</span>
            
            <div class="position-relative z-10">
              <v-icon size="40" color="white" class="mb-6 opacity-80">mdi-cloud-off-outline</v-icon>
              <h3 class="text-white text-h5 font-weight-bold mb-4">Desacoplamiento Total</h3>
              <p class="text-white text-body-2 leading-relaxed opacity-80 mb-0">
                Arquitectura agnóstica que elimina el encadenamiento tecnológico (vendor lock-in). Tú decides dónde se ejecuta el procesamiento y dónde se resguardan los datos.
              </p>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card 
            color="rgba(255, 255, 255, 0.03)" 
            variant="flat" 
            rounded="xl" 
            class="pa-8 pa-md-10 fill-height d-flex flex-column position-relative insight-card border"
            style="border-color: rgba(255,255,255,0.1) !important;transition-delay: 300ms;"
            :class="isVisibleDark ? 'fade-up-active' : 'fade-up-hidden'"
          >
            <span class="text-watermark font-weight-black position-absolute">2</span>
            
            <div class="position-relative z-10">
              <v-icon size="40" color="white" class="mb-6 opacity-80">mdi-shield-check-outline</v-icon>
              <h3 class="text-white text-h5 font-weight-bold mb-4">Trazabilidad Absoluta</h3>
              <p class="text-white text-body-2 leading-relaxed opacity-80 mb-0">
                Auditoría en cada paso del flujo. Desde la recolección del dato crudo hasta la indexación del producto de información, manteniendo la integridad referencial.
              </p>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card 
            color="rgba(255, 255, 255, 0.03)" 
            variant="flat" 
            rounded="xl" 
            class="pa-8 pa-md-10 fill-height d-flex flex-column position-relative insight-card border"
            style="border-color: rgba(255,255,255,0.1) !important;transition-delay: 400ms;"
            :class="isVisibleDark ? 'fade-up-active' : 'fade-up-hidden'"
          >
            <span class="text-watermark font-weight-black position-absolute">3</span>
            
            <div class="position-relative z-10">
              <v-icon size="40" color="white" class="mb-6 opacity-80">mdi-server-network</v-icon>
              <h3 class="text-white text-h5 font-weight-bold mb-4">Escalabilidad Dinámica</h3>
              <p class="text-white text-body-2 leading-relaxed opacity-80 mb-0">
                Soporta desde entornos de desarrollo locales hasta infraestructuras multi-nodo, distribuyendo la carga de búsqueda y almacenamiento según la demanda.
              </p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>




</template>

<script setup lang="ts">
import { ref } from 'vue';

const isVisibleDark = ref(false);
const isVisibleLight = ref(false);

const onIntersectDark = (isIntersecting: boolean) => {
  if (isIntersecting) isVisibleDark.value = true;
};


</script>

<style scoped>
.leading-tight {
  line-height: 1.1 !important;
}

.leading-relaxed {
  line-height: 1.6 !important;
}

.tracking-wide {
  letter-spacing: 1.5px !important;
}

.opacity-80 {
  opacity: 0.8;
}

.text-watermark {
  font-size: 14rem;
  line-height: 1;
  color: rgba(255, 255, 255, 0.04);
  right: -20px;
  bottom: -40px;
  user-select: none;
  pointer-events: none;
}

.insight-card {
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.insight-card:hover {
  transform: translateY(-8px);
  background-color: rgba(255, 255, 255, 0.08) !important;
}

.v-card.rounded-xl {
  border-radius: 32px !important;
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

@media (max-width: 600px) {
  .text-h1 {
    font-size: 4rem !important;
  }
  .text-watermark {
    font-size: 10rem;
    right: -10px;
    bottom: -20px;
  }
}
</style>