<template>
  <v-navigation-drawer app permanent v-model="drawerModel" rail>
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

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-telescope" title="Observatorios" value="observatories"
        :to="{ name: 'Dashboard' }" />
      <v-list-item prepend-icon="mdi-book-open-variant-outline" title="Catálogos" value="catalogs"
        :to="{ name: 'Catalogs' }" />
      <v-list-item prepend-icon="mdi-api" title="Servicios" value="services"
        :to="{ name: 'ExternalServices' }" />
      <v-list-item prepend-icon="mdi-database-outline" title="Fuentes de datos" value="datasources"
        :to="{ name: 'DataSources' }" />
      <v-list-item prepend-icon="mdi-chart-bar" title="Generador de gráficas" value="charts"
        :to="{ name: 'Charts' }" />
      <v-list-item prepend-icon="mdi-clipboard-list-outline" title="Tareas" value="tasks"
        :to="{ name: 'TasksIndex' }" />
      <v-list-item prepend-icon="mdi-help-circle-outline" title="Guía de búsqueda" value="query-guide"
        :to="{ name: 'QueryGuide' }" />
      <v-list-item prepend-icon="mdi-cog-outline" title="Configuración" value="settings"
        :to="{ name: 'Settings' }" />
      <v-list-item prepend-icon="mdi-logout" title="Cerrar sesión" value="logout"
        @click="logout" />
    </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAppStore,SnackbarColor } from '@/stores/app';
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