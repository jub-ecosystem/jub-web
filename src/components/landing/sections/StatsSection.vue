<template>
  <v-sheet color="grey-lighten-4" class="py-8 py-md-16 px-4">
    <v-container>
      <v-card color="transparent" rounded="xl" elevation="0" class="pa-4 pa-md-16 mx-auto" max-width="1400">
        
        <div class="text-center mb-8 mb-md-12">
          <p class="text-subtitle-2 text-md-subtitle-1 font-weight-bold text-secondary-blue mb-2 text-uppercase">
            XXXXXXXXXX
          </p>
          <h2 class="text-h4 text-md-h3 font-weight-bold text-grey-darken-4">
            TITLE
          </h2>
        </div>

        <v-row>
          <v-col cols="12" md="6">
            <v-card color="surface-light" variant="flat" rounded="lg"
              class="pa-6  d-flex flex-column justify-center fill-height" min-height="250">
              <h1 class="responsive-h1 font-weight-bold text-secondary-blue mb-2 mb-md-4">
                100k+
              </h1>
              <h4 class="text-h5 text-md-h4 font-weight-medium text-grey-darken-4">
                Productos de información <br class="hidden-xs"> indexados
              </h4>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card color="surface-light" variant="flat" rounded="lg"
              class="pa-6 d-flex flex-column align-center justify-center text-center fill-height" min-height="350">
              <div class="flex-grow-1">
                <h4 class="text-h6 text-md-h5 font-weight-bold text-grey-darken-4 mb-0">
                  Creación asíncrona de observatorios <br class="hidden-xs"> y búsqueda mediante identificadores nominales
                </h4>
              </div>
              <v-img src="@/assets/icons/Icon_4.png" max-width="140" width="140" max-width-md="130" width-md="130" contain class="ml-2 ml-md-4"></v-img>
            </v-card>
          </v-col>

          <v-col cols="12">
            <v-card color="surface-light" variant="flat" rounded="lg" class="pa-6 pa-md-10">
              <v-row align="center">
                <v-col cols="12" md="5" class="text-center text-md-left">
                  <h4 class="text-h5 text-md-h4 font-weight-bold text-grey-darken-4">
                    Datos estructurados y no estructurados
                  </h4>
                </v-col>
                <v-col cols="12" md="7">
                  <v-card color="white" flat rounded="lg" class="pa-2 pa-md-6">
                    <v-img src="@/assets/images/Grafica.png" height="220" contain></v-img>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-sheet>
</template>

<style scoped>
.responsive-h1 {
  font-size: clamp(3rem, 10vw, 6rem) !important;
  line-height: 1;
  letter-spacing: -3px !important;
}

.v-card.rounded-xl {
  border-radius: 24px !important; 
}

@media (min-width: 960px) {
  .v-card.rounded-xl {
    border-radius: 40px !important;
  }
}

.fill-height {
  height: 100%;
}
</style>