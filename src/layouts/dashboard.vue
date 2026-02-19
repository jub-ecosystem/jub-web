<template>
    <v-app-bar :elevation="2">
        <template v-slot:prepend>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Jub</v-app-bar-title>
    </v-app-bar>
    <v-main>
        <router-view />
    </v-main>

</template>