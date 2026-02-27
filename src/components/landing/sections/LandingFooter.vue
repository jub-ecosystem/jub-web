<template>
  <v-footer color="secondary-blue" class="py-10 px-4 text-white">
    <v-container >
      <v-row align="center" justify="center">
        <v-col cols="12" md="4" class="text-center text-md-left">
          <span class="text-body-1 font-weight-medium">Soluciones</span>
        </v-col>

        <v-col cols="12" md="4" class="text-center d-flex flex-column align-center">
          <v-avatar size="120" class="mb-4 bg-transparent border-white border-sm">
            <v-img src="@/assets/logo.svg" contain></v-img>
          </v-avatar>
          <span class="text-body-1 font-weight-medium">Docs</span>
        </v-col>

        <v-col cols="12" md="4" class="text-center text-md-right">
          <span class="text-body-1 font-weight-medium">Siguenos en:</span>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="text-center mt-8">
          <p class="text-body-1 font-weight-medium">
            © 2026 todos los derechos reservados
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>


<style scoped>
.border-white {
  border: 2px solid rgba(255, 255, 255, 0.5) !important;
}
</style>