<template>
  <v-navigation-drawer app v-model="drawerModel" :permanent="!mobile" :rail="!mobile" :temporary="mobile">
    <v-list>
      <v-list-item class="cursor-pointer"
        :prepend-avatar="`https://api.dicebear.com/9.x/bottts/svg?seed=${currentUser?.fullname}`"
        :title="`${currentUser?.first_name} ${currentUser?.last_name}`" :to="{ 'name': 'UserProfile' }">
        <template v-slot:append>
          <v-btn icon="mdi-chevron-left" variant="text"></v-btn>
        </template>
      </v-list-item>

    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav @click.capture="closeOnMobile">
      <v-tooltip location="end" :disabled="mobile">
        <template #activator="{ props: tip }">
          <v-list-item v-bind="tip" prepend-icon="mdi-telescope" title="Observatorios" value="observatories"
            :to="{ name: 'Dashboard' }" />
        </template>
        <span>Observatorios</span>
      </v-tooltip>
      <v-tooltip location="end" :disabled="mobile">
        <template #activator="{ props: tip }">
          <v-list-item v-bind="tip" prepend-icon="mdi-book-open-variant-outline" title="Catálogos" value="catalogs"
            :to="{ name: 'Catalogs' }" />
        </template>
        <span>Catálogos</span>
      </v-tooltip>
      <v-tooltip location="end" :disabled="mobile">
        <template #activator="{ props: tip }">
          <v-list-item v-bind="tip" prepend-icon="mdi-sitemap" title="Servicios" value="services"
            :to="{ name: 'ExternalServices' }" />
        </template>
        <span>Servicios</span>
      </v-tooltip>
      <v-tooltip location="end" :disabled="mobile">
        <template #activator="{ props: tip }">
          <v-list-item v-bind="tip" prepend-icon="mdi-database-outline" title="Fuentes de datos" value="datasources"
            :to="{ name: 'DataSources' }" />
        </template>
        <span>Fuentes de datos</span>
      </v-tooltip>
      <v-tooltip location="end" :disabled="mobile">
        <template #activator="{ props: tip }">
          <v-list-item v-bind="tip" prepend-icon="mdi-chart-bar" title="Generador de gráficas" value="charts"
            :to="{ name: 'Charts' }" />
        </template>
        <span>Generador de gráficas</span>
      </v-tooltip>
      <v-tooltip location="end" :disabled="mobile">
        <template #activator="{ props: tip }">
          <v-list-item v-bind="tip" prepend-icon="mdi-clipboard-list-outline" title="Tareas" value="tasks"
            :to="{ name: 'TasksIndex' }" />
        </template>
        <span>Tareas</span>
      </v-tooltip>
      <v-tooltip location="end" :disabled="mobile">
        <template #activator="{ props: tip }">
          <v-list-item v-bind="tip" prepend-icon="mdi-help-circle-outline" title="Guía de búsqueda" value="query-guide"
            :to="{ name: 'QueryGuide' }" />
        </template>
        <span>Guía de búsqueda</span>
      </v-tooltip>
      <v-tooltip location="end" :disabled="mobile">
        <template #activator="{ props: tip }">
          <v-list-item v-bind="tip" prepend-icon="mdi-cog-outline" title="Configuración" value="settings"
            :to="{ name: 'Settings' }" />
        </template>
        <span>Configuración</span>
      </v-tooltip>
      <v-tooltip location="end" :disabled="mobile">
        <template #activator="{ props: tip }">
          <v-list-item v-bind="tip" prepend-icon="mdi-logout" title="Cerrar sesión" value="logout"
            @click="logout" />
        </template>
        <span>Cerrar sesión</span>
      </v-tooltip>

      <v-divider class="my-1" />

      <v-tooltip location="end" :disabled="mobile">
        <template #activator="{ props: tip }">
          <v-list-item
            v-bind="tip"
            prepend-icon="mdi-broom"
            title="Limpiar caché"
            value="clear-cache"
            base-color="orange-darken-1"
            @click="showClearCacheDialog = true"
          />
        </template>
        <span>Limpiar caché de búsquedas</span>
      </v-tooltip>
    </v-list>

    <!-- Clear cache confirmation dialog -->
    <v-dialog v-model="showClearCacheDialog" max-width="400">
      <v-card rounded="0" elevation="4">
        <v-toolbar color="black" density="comfortable" flat>
          <v-btn icon="mdi-close" variant="text" color="white" @click="showClearCacheDialog = false" />
          <v-toolbar-title class="text-white text-body-1 font-weight-medium ml-n2">
            Limpiar caché de búsquedas
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text class="px-8 py-6 bg-white text-center">
          <v-icon size="40" color="orange-darken-2" class="mb-3">mdi-alert-circle-outline</v-icon>
          <p class="text-body-2 text-grey-darken-2">
            Se eliminarán los datos en caché de búsquedas. La próxima consulta descargará la información nuevamente desde el concentrador Jub.
          </p>
        </v-card-text>
        <v-card-actions class="px-8 pb-6 justify-end ga-2">
          <v-btn variant="text" @click="showClearCacheDialog = false">Cancelar</v-btn>
          <v-btn color="primary" variant="flat" rounded="0" @click="confirmClearCache">Limpiar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-navigation-drawer>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAppStore, SnackbarColor } from '@/stores/app';
import { useJubStore } from '@/stores/jub';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();
const router = useRouter()
const authStore = useAuthStore();
const currentUser = computed(() => authStore.getUser());
const appStore = useAppStore();
const jubStore = useJubStore();

const props = defineProps<{
  modelValue: boolean
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>();

const drawerModel = computed({
  get() {
    return props.modelValue;
  },
  set(value: boolean) {
    emit('update:modelValue', value);
  }
});

function closeOnMobile() {
  if (mobile.value) drawerModel.value = false;
}

const logout = async () => {
  try {
    const response = await authStore.logout();
    if (response) {
      appStore.showSnackbar("Has salido del sistema exitosamente", 3000, SnackbarColor.SUCCESS);
    } else {
      appStore.showSnackbar("Error al cerrar sesión", 3000, SnackbarColor.ERROR);
    }
    router.push({ "name": "Home" })
  } catch (error) {
    console.error('Logout error:', error);
  }
}

const showClearCacheDialog = ref(false)

const confirmClearCache = () => {
  jubStore.clearAllSearchCache()
  showClearCacheDialog.value = false
  appStore.showSnackbar('Caché de búsquedas eliminado', 3000, SnackbarColor.SUCCESS)
}
</script>
