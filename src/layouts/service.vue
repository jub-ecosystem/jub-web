<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
console.log('Current route:', route.path);
console.log('Route object:', route.name);
const colorsMap: Record<string, string> = {
    "MictlanX": "black",
    "Xelhua": "red",
    "Nez": "blue",
};

</script>

<template>
    <service-app-bar :color="colorsMap[route.name] || 'black'"/>

    <v-main>
        <router-view />
    </v-main>
    <auth-dialog/>
</template>
