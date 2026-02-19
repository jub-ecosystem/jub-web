<template>
    <v-container>
        <h1>Dashboard 2</h1>
    </v-container>
</template>
<script lang="ts" setup>
  //
      definePage({
        name: 'Dashboard',
        meta: {
            requiresAuth: true,
            layout: 'dashboard',
        },
    });
</script>
<style scoped>
</style>