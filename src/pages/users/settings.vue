<template>
  <v-container max-width="900" class="py-8">
    
    <div class="mb-8">
      <h1 class="text-h4 font-weight-black mb-1">Configuración</h1>
      <p class="text-body-1 text-grey-darken-1">Personaliza tu experiencia y el entorno de trabajo.</p>
    </div>

    <v-row>
      <v-col cols="12">
        <v-card rounded="xl" elevation="2" class="pa-2">
          <v-card-title>
            <v-icon start color="primary" class="mr-2">mdi-cog-outline</v-icon>
            General
          </v-card-title>
          <v-list lines="two" bg-color="transparent">
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="grey-darken-2">mdi-account-circle-outline</v-icon>
              </template>
              <v-list-item-title class="font-weight-medium">Información de la cuenta</v-list-item-title>
              <v-list-item-subtitle>Actualiza tu nombre, correo electrónico y contraseña.</v-list-item-subtitle>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="grey-darken-2">mdi-bell-outline</v-icon>
              </template>
              <v-list-item-title class="font-weight-medium">Notificaciones</v-list-item-title>
              <v-list-item-subtitle>Configura tus preferencias de notificación.</v-list-item-subtitle>
            </v-list-item>
            <v-divider inset></v-divider>
            <v-list-item disabled>
              <template v-slot:prepend>
                <v-icon color="grey-darken-2">mdi-shield-lock-outline</v-icon>
              </template>
              <v-list-item-title class="font-weight-medium">Seguridad y privacidad</v-list-item-title>
              <v-list-item-subtitle>Gestiona tus opciones de seguridad y privacidad.</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="grey-darken-2">mdi-school-outline</v-icon>
              </template>
              <v-list-item-title class="font-weight-medium">Tutorial</v-list-item-title>
              <v-list-item-subtitle>Aprende a utilizar todas las funcionalidades de la aplicación.</v-list-item-subtitle>
              <template v-slot:append>
                  <v-switch v-model="settings.exploration.enable_tutorial" color="primary" hide-details inset></v-switch>

              </template>
            </v-list-item>
            <!-- <v-list-item disabled>
              <template v-slot:prepend>
                <v-icon color="grey-darken-2">mdi-cloud-sync-outline</v-icon>
              </template>
              <v-list-item-title class="font-weight-medium">Integraciones</v-list-item-title>
              <v-list-item-subtitle>Conecta con servicios externos y aplicaciones.</v-list-item-subtitle>
            </v-list-item> -->

          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card rounded="xl" elevation="2" class="pa-2">
          <v-card-title class="d-flex align-center font-weight-bold px-4 pt-4">
            <v-icon start color="primary" class="mr-2">mdi-palette-outline</v-icon>
            Apariencia
          </v-card-title>
          
          <v-list lines="two" bg-color="transparent">
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="grey-darken-2" class="mt-2">mdi-theme-light-dark</v-icon>
              </template>
              <v-list-item-title class="font-weight-medium">Tema de la Interfaz</v-list-item-title>
              <v-list-item-subtitle>Alterna entre modo claro y oscuro.</v-list-item-subtitle>
              
              <template v-slot:append>
                <v-btn-toggle
                  v-model="settings.appearance.theme"
                  color="primary"
                  variant="outlined"
                  divided
                  rounded="lg"
                  density="comfortable"
                  @update:model-value="toggleTheme"
                >
                  <v-btn value="light" class="text-none">
                    <v-icon start>mdi-white-balance-sunny</v-icon> Claro
                  </v-btn>
                  <v-btn value="dark" class="text-none">
                    <v-icon start>mdi-weather-night</v-icon> Oscuro
                  </v-btn>
                </v-btn-toggle>
              </template>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="grey-darken-2" class="mt-2">mdi-format-font-size</v-icon>
              </template>
              <v-list-item-title class="font-weight-medium">Tamaño de Fuente</v-list-item-title>
              <v-list-item-subtitle>Incrementa o disminuye el tamaño de la fuente.</v-list-item-subtitle>
                <template v-slot:append>
                <div style="width: 120px;">
                  <v-select
                    v-model="settings.appearance.font_size"
                    :items="[8, 10, 12, 14, 16]"
                    variant="outlined"
                    density="compact"
                    hide-details
                    rounded="lg"
                  ></v-select>
                </div>
              </template>
            </v-list-item>
            <v-divider inset></v-divider>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="grey-darken-2" class="mt-2">mdi-animation-outline</v-icon>
              </template>
              <v-list-item-title class="font-weight-medium">Reducir animaciones</v-list-item-title>
              <v-list-item-subtitle>Mejora el rendimiento en equipos con menos recursos.</v-list-item-subtitle>
              
              <template v-slot:append>
                <v-switch v-model="settings.appearance.reduce_animations" color="primary" hide-details inset></v-switch>
              </template>
            </v-list-item>



          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card rounded="xl" elevation="2" class="pa-2">
          <v-card-title class="d-flex align-center font-weight-bold px-4 pt-4">
            <v-icon start color="secondary-blue" class="mr-2">mdi-view-dashboard-outline</v-icon>
            Exploración de datos
          </v-card-title>
          
          <v-list lines="two" bg-color="transparent">
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="grey-darken-2">mdi-format-list-numbered</v-icon>
              </template>
              <v-list-item-title class="font-weight-medium">Observatorios por página</v-list-item-title>
              <v-list-item-subtitle>Cantidad de resultados a mostrar en las búsquedas.</v-list-item-subtitle>
              
              <template v-slot:append>
                <div style="width: 120px;">
                  <v-select
                    v-model="settings.exploration.items_per_page"
                    :items="[12, 24, 48, 100]"
                    variant="outlined"
                    density="compact"
                    hide-details
                    rounded="lg"
                  ></v-select>
                </div>
              </template>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="grey-darken-2">mdi-view-grid-outline</v-icon>
              </template>
              <v-list-item-title class="font-weight-medium">Vista por defecto</v-list-item-title>
              <v-list-item-subtitle>Elige cómo prefieres visualizar los catálogos y observatorios.</v-list-item-subtitle>
              
              <template v-slot:append>
                <div style="width: 150px;">
                  <v-select
                    v-model="settings.exploration.default_view"
                    :items="[{ title: 'Cuadrícula', value: 'grid' }, { title: 'Tabla', value: 'list' }]"
                    item-title="title"
                    item-value="value"
                    variant="outlined"
                    density="compact"
                    hide-details
                    rounded="lg"
                  ></v-select>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12">
        
        <v-card rounded="xl" elevation="2" class="pa-2">
          <v-card-title class="d-flex align-center font-weight-bold px-4 pt-4">
            <v-icon start color="teal" class="mr-2">mdi-database-export-outline</v-icon>
            Exportación de datos
          </v-card-title>
          
          <v-list lines="two" bg-color="transparent">
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="grey-darken-2">mdi-file-download-outline</v-icon>
              </template>
              <v-list-item-title class="font-weight-medium">Formato de exportación predeterminado</v-list-item-title>
              <v-list-item-subtitle>Formato al descargar productos o consultas DSL.</v-list-item-subtitle>
              
              <template v-slot:append>
                <v-btn-toggle
                  v-model="settings.export.default_format"
                  color="teal"
                  variant="outlined"
                  divided
                  rounded="lg"
                  density="comfortable"
                >
                  <v-btn value="json" class="font-weight-bold">JSON</v-btn>
                  <v-btn value="yml" class="font-weight-bold">YML</v-btn>
                </v-btn-toggle>
              </template>
            </v-list-item>
          </v-list>

        </v-card>

      </v-col>
    </v-row>

    <div class="d-flex justify-end mt-8">
      <v-btn
        color="black"
        size="large"
        rounded="lg"
        class="text-none font-weight-bold px-8"
        prepend-icon="mdi-content-save-outline"
        @click="saveSettings"
        :loading="isSaving"
      >
        Guardar Cambios
      </v-btn>
    </div>

    <v-snackbar v-model="showSnackbar" color="success" rounded="pill">
      <v-icon start>mdi-check-circle</v-icon> Configuración guardada exitosamente.
    </v-snackbar>

  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useTheme } from 'vuetify'
import { useAuthStore } from '@/stores/auth'
import { useJubStore } from '@/stores/jub'
import {type UserSettings} from '@/types/index.types'

definePage({
  name: 'Settings',
  meta: {
    requiresAuth: true,
    layout: 'profile'
  }
})

const authStore = useAuthStore()
const jubStore = useJubStore()
const vuetifyTheme = useTheme()

const isSaving     = ref(false)
const showSnackbar = ref(false)
const settings = ref<UserSettings>({
    appearance: {
        theme: 'light',
        font_size: 12,
        reduce_animations: false
      },
      exploration: {
        items_per_page: 24,
        default_view: 'grid',
        enable_tutorial: false
      },
      export: {
        default_format: 'json',
        include_metadata: false
      }
})

  // theme: 'jubThemeLight', // o 'jubThemeDark'
  // fontSize: authStore.settings?.appearance?.font_size || 12,
  // itemsPerPage: authStore.settings?.exploration?.items_per_page || 24,
  // defaultView: authStore.settings?.exploration?.default_view || 'grid',
  // reduceAnimations: false,
  // exportFormat: authStore.settings?.export?.format || 'json'
// })

const toggleTheme = async (newTheme: string) => {
  // const theme = await jubStore.convert_theme_to_jub_format(newTheme)
  // console.log("Toggling theme to:", theme)
  if (newTheme) {
    const x = await jubStore.convert_theme_to_jub_format(newTheme)
    vuetifyTheme.change(x) 
    // vuetifyTheme.global.name.value = newTheme
  }
}


const saveSettings = async () => {
  isSaving.value = true
  // const updated_settings:UserSettings = {
  //   appearance: {
  //     theme: themeMapping[settings.value.theme] || 'light',
  //     font_size: settings.value.fontSize,
  //   },
  //   exploration: {
  //     items_per_page: settings.value.itemsPerPage,
  //     default_view: settings.value.defaultView,
  //     enable_tutorials: authStore.settings?.exploration?.enable_tutorials || false
  //   },
  //   export: {
  //     format: settings.value.exportFormat,
  //     include_metadata: authStore.settings?.export?.include_metadata || false
  //   }
  // }
  console.log("Saving settings for user:", authStore.user?.user_id, settings.value)
  const response = await jubStore.update_settings(authStore.user?.user_id || '', settings.value)
  
  setTimeout(() => {
    isSaving.value = false
    showSnackbar.value = true
  }, 800)
}

onMounted(async () => {
  console.log("Loading settings for user:", authStore.user?.user_id)
  settings.value = await jubStore.get_settings(authStore.user?.user_id || '')
  await toggleTheme(settings.value.appearance.theme)
  // settings.value.theme = vuetifyTheme.global.name.value
  
})
</script>