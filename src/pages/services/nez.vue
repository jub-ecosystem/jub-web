<template>
    <v-container class="py-12">
        <v-row class="gap-4" align="center" justify="center">
        <v-col cols="12" md="8" lg="6">
            <v-sheet color="grey-lighten-4" height="200" rounded="lg" class="d-flex align-center justify-center">
            <span class="text-grey">Nez Service Card Placeholder</span>
            </v-sheet>
        </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts" setup>
definePage({
    name: 'Nez',
    meta:{
        requiresAuth: false,
        layout: 'service'
    }
})
</script>