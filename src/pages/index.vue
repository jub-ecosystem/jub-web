/*
 * Copyright 2026 MADTEC-2025-M-478 Project Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

<template>

    <!-- Navigation Drawer  -->


      <v-sheet 
        color="blue-grey-darken-4" 
        class="d-flex align-center justify-center text-center"
        min-height="600"
      >
        <v-container>
          <v-avatar color="grey-lighten-2" size="180" class="mb-6 border-lg">
            <v-img src="@/assets/logo.svg" contain></v-img>
            <!-- <span class="text-h5 text-grey-darken-3">Central Logo</span> -->
          </v-avatar>

          <h1 :class="[responsiveBannerTitle, 'font-weight-bold', 'text-white', 'mb-4']">
            Jub: Unificación de Servicios de Ciencia de Datos
para la Construcción de un Concentrador, Distribuidor y
Buscador Nacional de Datos e Información Estratégica
          </h1>

          <p class="bg-primary rounded text-h6 text-grey-lighten-1 mb-8 mx-auto" style="max-width: 900px;">
          MADTEC-2025-M-478 
          </p>

          <div class="d-flex justify-center gap-4">
            <v-btn @click="onClickDemo" color="black" rounded="pill" size="x-large" class="px-10 text-white border">
              Demo
            </v-btn>
            <v-btn color="black" rounded="pill" size="x-large" class="px-10 text-white border">
              Contacto
            </v-btn>
          </div>
        </v-container>
      </v-sheet>

      <div class="d-flex" style="height: 20px; width: 100%;">
        <div class="flex-grow-1 bg-blue-darken-1"></div>
        <div class="flex-grow-1 bg-blue-accent-4"></div>
        <div class="flex-grow-1 bg-blue-darken-4"></div>
        <div class="flex-grow-1 bg-blue-accent-3"></div>
      </div>

      <v-container class="py-16">
        <h2 class="text-center text-h4 font-weight-bold text-grey-darken-4 mb-10">
          Componentes principales: Servicios
        </h2>
        
        <v-row>
          <v-col v-for="n in 3" :key="n" cols="12" md="4">
            <v-sheet color="grey-lighten-4" height="200" rounded="lg" class="d-flex align-center justify-center">
              <span class="text-grey">Service Card Placeholder</span>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
</template>

<script setup lang="ts">
// import { useRouter } from 'vue-router';
// Define the menu items here to keep the template clean
// The students can later map these to Vue Router paths
import { useDisplay } from 'vuetify'; 
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import AuthDialog from '@/components/AuthDialog.vue';
definePage({
  name: 'Home',
  meta: {
    requiresAuth: false,
    layout: 'default',
  },
});


const router = useRouter();
const authStore = useAuthStore();
const { name } = useDisplay();

const responsiveBannerTitle = computed(() => {
  if (name.value === 'xs') return 'text-h5';
  if (name.value === 'sm') return 'text-h4';
  if (name.value === 'md') return 'text-h3';
  return 'text-h4';
 
});

function onClickDemo() {
  const result = authStore.getUser(); 
  if (result) {
    // User is logged in, navigate to the demo page
    router.push({ name: 'Dashboard' });
  } else {
    authStore.pendingRedirect = '/dashboard';
    authStore.showAuthDialog = true;
  }
}




</script>

<style scoped>
/* Vuetify handles most of the layout, but gap is useful for flexbox spacing */
.gap-4 {
  gap: 16px;
}
</style>