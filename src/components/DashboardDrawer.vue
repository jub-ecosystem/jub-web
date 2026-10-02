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
    </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAppStore,SnackbarColor } from '@/stores/app';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();
// const drawer = ref(true)
const router = useRouter()
const authStore = useAuthStore();
const currentUser = computed(() => authStore.getUser());
const appStore = useAppStore();

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
    // Emit the update event to the parent component
    emit('update:modelValue', value);
  }
});


function closeOnMobile() {
  if (mobile.value) drawerModel.value = false;
}

const logout = async () => {
  try {
    const  response = await authStore.logout();
    if (response) {
      appStore.showSnackbar("Has salido del sistema exitosamente",3000,SnackbarColor.SUCCESS);
    } else {
      appStore.showSnackbar("Error al cerrar sesión",3000,SnackbarColor.ERROR);
    }
    router.push({ "name": "Home" })
  } catch (error) {
    console.error('Logout error:', error);
  } finally {

  }
}
</script>