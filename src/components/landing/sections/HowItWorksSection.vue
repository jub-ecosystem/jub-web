<template>
  <v-sheet color="primary-darken-1" class="py-16 px-4 text-white ">
    <v-container >
      <v-row class="mb-12">
        <v-col cols="12" md="8">
          <h2 class="text-h4 text-md-h3 font-weight-bold leading-tight">
            Mejora la forma de buscar información <br> estratégica
          </h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-card color="rgba(255, 255, 255, 0.05)" variant="flat" rounded="xl" class="pa-8 fill-height d-flex flex-column">
            <span class="text-white text-h1 font-weight-bold mb-4 ">1</span>
            <h3 class="text-white text-h5 font-weight-bold mb-4 text-uppercase">Subtitle</h3>
            <p class="text-white text-body-1  leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis orci a leo accumsan pretium.
            </p>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card color="rgba(255, 255, 255, 0.05)" variant="flat" rounded="xl" class="pa-8 fill-height d-flex flex-column">
            <span class="text-white text-h1 font-weight-bold mb-4 ">2</span>
            <h3 class="text-white text-h5 font-weight-bold mb-4 text-uppercase">Subtitle</h3>
            <p class="text-white text-body-1  leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis orci a leo accumsan pretium.
            </p>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card color="rgba(255, 255, 255, 0.05)" variant="flat" rounded="xl" class="pa-8 fill-height d-flex flex-column">
            <span class="text-white text-h1 font-weight-bold mb-4 ">3</span>
            <h3 class="text-white text-h5 font-weight-bold mb-4 text-uppercase">Subtitle</h3>
            <p class="text-white text-body-1  leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis orci a leo accumsan pretium.
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>

  <v-sheet  color="grey-lighten-4" class="py-16 px-4 mt-16">
    <v-container class="mt-16">
        <v-row class="text-center mb-10">
            <v-col cols="12" md="4">
            <div class="text-h1 font-weight-bold mb-2">00%</div>
            <div class="text-body-1  leading-relaxed">Something</div>
            </v-col>
            <v-col cols="12" md="4">
            <div class="text-h1 font-weight-bold mb-2">100k</div>
            <div class="text-body-1 leading-relaxed">Something</div>
            </v-col>
            <v-col cols="12" md="4">
            <div class="text-h1 font-weight-bold mb-2">10+</div>
                <div class="text-body-1 leading-relaxed">Something</div>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="12" md="4">
            <v-card color="surface-light" flat rounded="xl" height="200" ></v-card>
            </v-col>
            <v-col cols="6" md="3">
            <v-card color="transparent" flat rounded="xl" ></v-card>
            </v-col>
            <v-col cols="12" md="4">
            <v-card color="secondary-blue" flat rounded="xl" height="200"></v-card>
            </v-col>
        </v-row>
    </v-container >
  </v-sheet>

</template>

<style scoped>
.leading-tight {
  line-height: 1.2 !important;
}
.leading-relaxed {
  font-size: 1.2rem !important;
}
.v-card.rounded-xl {
  border-radius: 32px !important;
}

@media (max-width: 600px) {
  .text-h1 {
    font-size: 4rem !important;
  }
  .leading-relaxed {
    font-size: 1.1rem !important; 
  }
}
</style>