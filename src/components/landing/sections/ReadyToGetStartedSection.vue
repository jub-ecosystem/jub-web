<template>
      
  <v-sheet color="primary-blue" class="py-16 px-4">
    <v-container>
      <v-row justify="center" class="text-center mb-12">
        <v-col cols="12" md="8">
          <h2 class="text-white text-h2 font-weight-bold leading-tight mb-4">Listo para comenzar?</h2>
          <p class="text-white text-body-1 leading-relaxed mb-6">Únete hoy y sé parte del futuro de la observabilidad de datos. Regístrate ahora para experimentar los beneficios de nuestra plataforma y llevar la gestión de tus datos al siguiente nivel.</p>
          <v-btn :to="{'name':'Signin'}" color="white" class="text-primary-blue font-weight-bold" large>Comenzar</v-btn>   
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>

</template>
