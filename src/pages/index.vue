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

  <Separator :size="20"/>
  
  <IntroductionSection/>
  
  <Separator :size="20"/>
  
  <LogicMapSection/>
  
  <Separator :size="20"/>
  
  <ValueProposition/>
  
  <Separator :size="20"/>

  <StatsSection />
  
  <Separator :size="20"/>
  
  <HowItWorksSection />

  <Separator :size="20"/>
  <ArchitectureSection/>

  <Separator :size="20"/>

  <ObservatoryCarousel/> 

  <Separator :size="20"/>
  <ReadyToGetStartedSection />
  
  <LandingFooter />

  
</template>

<style>
.arch-section {
  /* Set the image as the background */
  background-image: url('@/assets/arch.svg');
  /* 'cover' makes it fill the entire sheet, 'contain' makes it fit without cropping */
  background-size: contain; 
  background-position: center;
  background-repeat: no-repeat;
  
  /* Optional: Set a minimum height so the section is always big enough */
  min-height:1000px; 
}

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

