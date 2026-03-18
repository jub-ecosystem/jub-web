<template>
  <v-container class="mt-4">
    <h1 class="text-h4 mb-4">Tareas</h1>
    <p>Esta sección está en construcción. Pronto podrás gestionar tus tareas aquí.</p>
  </v-container>
</template>
<script lang="ts" setup>
  definePage({
    name: 'TasksIndex',
    meta: {
        requiresAuth: true,
        layout: 'dashboard',
    },
}); 
</script>