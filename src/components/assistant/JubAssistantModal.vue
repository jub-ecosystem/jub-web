<script setup lang="ts">
import { useAssistantStore } from '@/stores/assistant'
import logoUrl from '@/assets/logo.svg'

const assistantStore = useAssistantStore()
</script>

<template>
  <v-dialog
    v-model="assistantStore.isOpen"
    fullscreen
    transition="dialog-bottom-transition"
  >
    <v-card class="d-flex flex-column" style="height: 100%">
      <!-- Sticky toolbar -->
      <v-toolbar color="primary" density="compact" flat>
        <!-- <v-img :src="logoUrl" width="24" height="24" class="ml-3 mr-2 flex-shrink-0" /> -->
        <v-icon class="ml-3 mr-1 flex-shrink-0" size="24" color="white">
          mdi-robot
        </v-icon>
        <div class="text-subtitle-1 font-weight-bold d-flex align-center px-4">
          <span>Asistente Jub</span>
          <v-chip
            color="amber-darken-2"
            variant="flat"
            prepend-icon="mdi-flask-outline"
            size="small"
            class="font-weight-bold ms-5"
          >
            Experimental
          </v-chip>
        </div>
        <!-- <v-toolbar-title class="text-subtitle-1 font-weight-bold">
          Asistente Jub
              <v-chip
            color="amber-darken-2"
            variant="tonal"
            prepend-icon="mdi-flask-outline"
            size="small"
            class="font-weight-bold"
          ></v-chip>
        </v-toolbar-title> -->
        <v-spacer />
        <v-btn
          icon="mdi-close"
          color="white"
          size="large"
          variant="text"
          @click="assistantStore.isOpen = false"
        />
      </v-toolbar>

      <!-- Scrollable chat -->
      <div class="flex-grow-1 overflow-y-auto">
        <JubAssistantChat />
      </div>
    </v-card>
  </v-dialog>
</template>
