<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
console.log('Current route:', route.path);
console.log('Route object:', route.name);
const colorsMap: Record<string, string> = {
    "MictlanX": "black",
    "Xelhua": "#B71C1C",
    "Nez": "#1A237E",
    "IMA": "#1B5E20",
    "Alerta": "#BF360C",
    "Azomalli": "#4A148C",
    "Kaexla": "#3E2723",
};

</script>

<template>
    <service-app-bar :color="colorsMap[route.name] || 'black'"/>

    <v-main>
        <router-view />
    </v-main>
    <auth-dialog/>
</template>
