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
<template >
  <HeroSection />

   <div class="d-flex" style="height: 20px; width: 100%;">
    <div class="flex-grow-1 bg-blue-darken-1"></div>
    <div class="flex-grow-1 bg-blue-accent-4"></div>
    <div class="flex-grow-1 bg-blue-darken-4"></div>
    <div class="flex-grow-1 bg-blue-accent-3"></div>
  </div>
  <ObservatoryCarousel class=" mt-16" />

  <ValueProposition class=" mt-16"/>
  
  <StatsSection class=" mt-16"/>
  
  <HowItWorksSection class=" mt-16"/>

  <LandingFooter class=" mt-16"/>

  
</template>

<style>
  /*<v-container class="py-16" >
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
  </v-container>*/
</style>

  
<script setup lang="ts">

import HeroSection from '@/components/landing/sections/HeroSection.vue';
import StatsSection from '@/components/landing/sections/StatsSection.vue';

definePage({
  name: 'Home',
  meta: {
    requiresAuth: false,
    layout: 'default',
  },
});
</script>

