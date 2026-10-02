<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
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
