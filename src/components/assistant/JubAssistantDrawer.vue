<script setup lang="ts">
import { useAssistantStore } from '@/stores/assistant'
import logoUrl from '@/assets/logo.svg'

const assistantStore = useAssistantStore()
</script>

<template>
  <Teleport to="body">
    <Transition name="jub-slide">
      <div v-if="assistantStore.isOpen" class="jub-assistant-drawer">
        <!-- Header -->
        <div class="jub-drawer-header">
          <div class="d-flex align-center ga-2">
            <!-- <v-img :src="logoUrl" width="28" height="28" /> -->
             <v-icon  size="28" color="primary">mdi-robot-happy </v-icon>
            <span class="text-subtitle-1 font-weight-bold">Asistente Jub</span> 
              <v-chip
            color="amber-darken-2"
            variant="tonal"
            prepend-icon="mdi-flask-outline"
            size="small"
            class="font-weight-bold"
          >Experimental</v-chip>
          </div>
          <v-btn icon="mdi-close" variant="text" size="small" @click="assistantStore.isOpen = false" />
        </div>

        <!-- Chat -->
        <div class="jub-drawer-chat">
          <JubAssistantChat />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<!-- Non-scoped: the div is teleported to <body> and lives outside this component's DOM subtree -->
<style>
.jub-assistant-drawer {
  position: fixed;
  top: 72px; /* matches v-app-bar height="72" */
  right: 0;
  bottom: 0;
  width: 420px;
  z-index: 220;
  background: #fff;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-left: 1px solid rgba(0, 0, 0, 0.08);
}

.jub-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
}

.jub-drawer-chat {
  flex: 1;
  overflow-y: auto;
}

.jub-slide-enter-active,
.jub-slide-leave-active {
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.jub-slide-enter-from,
.jub-slide-leave-to {
  transform: translateX(100%);
}
</style>
