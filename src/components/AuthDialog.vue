/*
 * Copyright 2026 MADTEC-2025-M-478 Project Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

<template>
  <v-dialog v-model="showAuthDialog" max-width="450" persistent>
    <v-card rounded="0" elevation="4">
      
      <v-toolbar color="grey-darken-3" density="comfortable" flat>
        <v-btn icon="mdi-close" variant="text" color="white" @click="closeDialog"></v-btn>
        <v-toolbar-title class="text-white text-body-1 font-weight-medium ml-n2">
          Autenticación por contraseña
        </v-toolbar-title>
      </v-toolbar>

      <v-card-text class="px-10 pb-8 text-center bg-white" style="position: relative;">
        
        <!-- <div class="d-flex justify-center" style="margin-top: -32px; margin-bottom: 24px;">
          <v-avatar size="64" class="bg-transparent">
            <v-img 
              alt="Logo"
              src="@/assets/xolo.png"
            ></v-img>
          </v-avatar>
        </div> -->

        <v-form @submit.prevent="handleLogin">
          
          <v-text-field
            v-model="username"
            placeholder="Nombre de usuario"
            variant="solo"
            flat
            bg-color="grey-lighten-3"
            density="comfortable"
            rounded="0"
            hide-details
            class="mb-3"
          ></v-text-field>

          <v-text-field
            v-model="password"
            placeholder="Contraseña"
            type="password"
            variant="solo"
            flat
            bg-color="grey-lighten-3"
            density="comfortable"
            rounded="0"
            hide-details
            class="mb-5"
          ></v-text-field>

          <v-btn
            type="submit"
            color="black"
            block
            size="large"
            rounded="0"
            class="font-weight-bold text-white mb-4"
            elevation="0"
          >
            INICIAR SESIÓN
          </v-btn>

          <v-btn
            variant="text"
            color="grey-darken-1"
            class="text-none text-body-2"
            density="compact"
            :ripple="false"
          >
            Olvidaste tu contraseña ?
          </v-btn>

        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore,type AuthAttemptDTO } from '@/stores/auth';
import { useRouter } from 'vue-router';

// defineModel automatically syncs the v-model from the parent component (Vue 3.4+)
// const isOpen = defineModel<boolean>({ default: false });
const authStore = useAuthStore();
const router = useRouter();

const { showAuthDialog } = storeToRefs(authStore);

const username = ref('');
const password = ref('');

const closeDialog = () => {
  authStore.showAuthDialog = false;
  // Optional: clear fields on close
  // username.value = '';
  // password.value = '';
};

const handleLogin = async () => {
  // Pass the credentials to your Jub store or API client
  console.log('Intentando iniciar sesión con:', {
    username: username.value,
    password: password.value
  });

  const success = await authStore.login({
    username: username.value,
    password: password.value,
    scope: 'jub',
    expiration: "1h",
    renew_token: false
  } as AuthAttemptDTO);

  if (success) {
    closeDialog();
    if(authStore.pendingRedirect) {
      router.push(authStore.pendingRedirect);
      authStore.pendingRedirect = null; // Clear pending redirect after use
    } else {
      router.push({ name: 'Dashboard' });
    }

  } else {
    // Handle login failure (e.g., show an error message)
    alert('Error de autenticación. Por favor, verifica tus credenciales.');
  }


};
</script>

<style scoped>
/* Vuetify handles most styling, but ensuring inputs have zero border radius aligns with your design */
:deep(.v-field) {
  border-radius: 0 !important;
}
</style>