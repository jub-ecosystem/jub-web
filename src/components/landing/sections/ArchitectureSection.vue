<template>
      <v-sheet class="bg-primary-darken-2 py-16">
    <v-container max-width="1400">
      
      <v-row justify="center" class="text-center mb-10">
        <v-col cols="12" md="8">
          <v-chip color="primary-lighten-1" variant="flat" class="mb-4 font-weight-bold" size="small">
            MADTEC - 2025 - M-478
          </v-chip>
          
          <h2 class="text-h3 font-weight-black text-white mb-4">
            Arquitectura del Ecosistema
          </h2>
          
          <p class="text-body-1 text-grey-lighten-1 mx-auto" style="max-width: 800px;">
            Nuestro sistema está construido sobre una arquitectura hexagonal. 
            Desacoplamos por completo las interfaces de entrada (Driving Adapters) y las interfaces de salida (Driven Adapters) del núcleo del concentrador, garantizando un ecosistema altamente modular, escalable y agnóstico de tecnologías externas.
          </p>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12">
          <v-card 
            rounded="xl" 
            elevation="10" 
            class="bg-white overflow-hidden pa-2 pa-md-6 border"
            style="border-color: rgba(255,255,255,0.1) !important;"
          >
            <v-img 
              src="@/assets/arch.svg" 
              alt="Arquitectura Hexagonal del Sistema" 
              width="100%" 
              contain
            >
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height bg-grey-lighten-4">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </div>
              </template>
            </v-img>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-sheet>


<v-sheet class="bg-primary-darken-2 py-16 px-4 border-top">
    <v-container max-width="1200" v-intersect="onIntersectLegend">
      
      <v-row class="mb-12" justify="center">
        <v-col cols="12" md="8" class="text-center" :class="isVisible ? 'fade-up-active' : 'fade-up-hidden'">
          <v-chip color="grey-lighten-2" variant="outlined" size="small" class="font-weight-bold mb-4 text-uppercase tracking-wide">
            Simbología Técnica
          </v-chip>
          <h2 class="text-h3 font-weight-black text-white mb-4">
            Componentes de la arquitectura
          </h2>
          <p class="text-body-1 text-grey-lighten-1 mx-auto" style="max-width: 700px;">
            Conoce los elementos que conforman nuestra arquitectura en la cual se basa la plataforma para entender el flujo de los datos y las fronteras del sistema.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col 
          v-for="(item, index) in legendItems" 
          :key="index"
          cols="12" md="6" lg="4"
        >
          <v-card 
            color="rgba(255, 255, 255, 0.03)" 
            variant="flat" 
            rounded="xl" 
            class="pa-5 h-100 d-flex align-start border legend-card transition-swing"
            style="border-color: rgba(255,255,255,0.08) !important;"
            :class="isVisible ? 'fade-up-active' : 'fade-up-hidden'"
            :style="`transition-delay: ${index * 100}ms; --hover-color: ${item.glowColor};`"
          >
            <div class="icon-wrapper d-flex align-center justify-center rounded-lg mr-5 flex-shrink-0" :style="`background-color: ${item.bgColor};`">
              <v-img :src="item.image" width="32" height="32" contain>
                <template v-slot:placeholder>
                  <v-icon :color="item.iconColor" size="28">{{ item.fallbackIcon }}</v-icon>
                </template>
              </v-img>
            </div>

            <div>
              <h3 class="text-h6 font-weight-bold text-white mb-1">{{ item.title }}</h3>
              <p class="text-body-2 text-grey-lighten-1 mb-0 leading-relaxed">
                {{ item.description }}
              </p>
            </div>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-sheet>



</template>

<script setup lang="ts">
// Asegúrate de importar 'ref' si no lo tienes ya en tu script
import { ref } from 'vue';

// 1. Estado para disparar las animaciones de scroll
const isVisible = ref(false);

const isArchVisible = ref(false);

const onIntersectArch = (isIntersecting: boolean) => {

  if (isIntersecting) {
    isArchVisible.value = true;
  }
};

const onIntersect = (isIntersecting: boolean) => {
  if (isIntersecting) {
    isVisible.value = true;
  }
};

const onIntersectLegend = (isIntersecting: boolean) => {
  if (isIntersecting) {
    isVisible.value = true;
  }
};


import iconServer from '@/assets/icons/server.svg';
import iconAdapter from '@/assets/icons/adapter.svg';
const legendItems = ref([
  {
    title: 'Servidor',
    description: 'Nodos físicos o virtuales que alojan servicios, APIs o infraestructura externa de la que depende el ecosistema.',
    image: iconServer, 
    fallbackIcon: 'mdi-server-network',
    bgColor: 'rgba(255, 255, 255, 0.1)',
    iconColor: 'white',
    glowColor: 'rgba(255, 255, 255, 0.4)'
  },
  {
    title: 'Usuario',
    description: 'Clientes finales, desarrolladores o sistemas externos (CLI, Web) que interactúan con la plataforma.',
    image: '', 
    fallbackIcon: 'mdi-account',
    bgColor: 'rgba(255, 255, 255, 0.1)',
    iconColor: 'white',
    glowColor: 'rgba(255, 255, 255, 0.4)'
  },
  {
    title: 'Adaptador',
    description: 'Implementaciones que traducen las peticiones externas al lenguaje del dominio (Driving) o viceversa (Driven).',
    image: iconAdapter, 
    fallbackIcon: 'mdi-puzzle-outline',
    bgColor: 'rgba(0, 230, 118, 0.1)', 
    iconColor: '#00E676',
    glowColor: 'rgba(0, 230, 118, 0.4)'
  },
  {
    title: 'Puerto',
    description: 'Interfaces o contratos estrictos definidos por el núcleo de la aplicación que dictan cómo comunicarse con él.',
    image: '', 
    fallbackIcon: 'mdi-adjust',
    bgColor: 'rgba(33, 150, 243, 0.1)',
    iconColor: '#2196F3',
    glowColor: 'rgba(33, 150, 243, 0.4)'
  },
  {
    title: 'Servicio',
    description: 'Servicios del ecosistema como Nez, Xelhua o servicios modulares independientes como MictlanX.',
    image: '', 
    fallbackIcon: 'mdi-hexagon-outline',
    bgColor: 'rgba(255, 193, 7, 0.1)', 
    iconColor: '#FFC107',
    glowColor: 'rgba(255, 193, 7, 0.4)'
  },
  {
    title: 'Peticiones',
    description: 'Representa el flujo de ejecución, llamadas a métodos, consultas (Queries) o comandos hacia el sistema.',
    image: '',
    fallbackIcon: 'mdi-arrow-right',
    bgColor: 'rgba(255, 255, 255, 0.1)',
    iconColor: 'white',
    glowColor: 'rgba(255, 255, 255, 0.4)'
  }
]);

</script>

<style scoped>

.fade-up-hidden {
  opacity: 0;
  transform: translateY(40px);
}

.fade-up-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.hover-card:hover {
  background-color: #ffffff !important;
  box-shadow: 0 8px 24px rgba(0,0,0,0.06) !important;
  transform: translateY(-4px); 
  transition: all 0.3s ease;
}

.transition-all-custom {
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-up-hidden {
  opacity: 0;
  transform: translateY(50px) scale(0.98); 
}

.fade-up-active {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.legend-card {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.legend-card:hover {
  transform: translateY(-4px);
  background-color: rgba(255, 255, 255, 0.06) !important;
  border-color: var(--hover-color) !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), 0 0 15px var(--hover-color) !important;
}

.legend-card:hover .icon-wrapper {
  transform: scale(1.05);
}
</style>