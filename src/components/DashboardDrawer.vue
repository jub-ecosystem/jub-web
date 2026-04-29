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
      <v-tooltip location="end" text="Observatorios" :disabled="mobile">
        <template #activator="{ props: tip }">
          <v-list-item v-bind="tip" prepend-icon="mdi-telescope" title="Observatorios" value="observatories"
            :to="{ name: 'Dashboard' }" />
        </template>
      </v-tooltip>
      <v-tooltip location="end" text="Catálogos" :disabled="mobile">
        <template #activator="{ props: tip }">
          <v-list-item v-bind="tip" prepend-icon="mdi-book-open-variant-outline" title="Catálogos" value="catalogs"
            :to="{ name: 'Catalogs' }" />
        </template>
      </v-tooltip>
      <v-tooltip location="end" text="Servicios" :disabled="mobile">
        <template #activator="{ props: tip }">
          <v-list-item v-bind="tip" prepend-icon="mdi-api" title="Servicios" value="services"
            :to="{ name: 'ExternalServices' }" />
        </template>
      </v-tooltip>
      <v-tooltip location="end" text="Fuentes de datos" :disabled="mobile">
        <template #activator="{ props: tip }">
          <v-list-item v-bind="tip" prepend-icon="mdi-database-outline" title="Fuentes de datos" value="datasources"
            :to="{ name: 'DataSources' }" />
        </template>
      </v-tooltip>
      <v-tooltip location="end" text="Generador de gráficas" :disabled="mobile">
        <template #activator="{ props: tip }">
          <v-list-item v-bind="tip" prepend-icon="mdi-chart-bar" title="Generador de gráficas" value="charts"
            :to="{ name: 'Charts' }" />
        </template>
      </v-tooltip>
      <v-tooltip location="end" text="Tareas" :disabled="mobile">
        <template #activator="{ props: tip }">
          <v-list-item v-bind="tip" prepend-icon="mdi-clipboard-list-outline" title="Tareas" value="tasks"
            :to="{ name: 'TasksIndex' }" />
        </template>
      </v-tooltip>
      <v-tooltip location="end" text="Guía de búsqueda" :disabled="mobile">
        <template #activator="{ props: tip }">
          <v-list-item v-bind="tip" prepend-icon="mdi-help-circle-outline" title="Guía de búsqueda" value="query-guide"
            :to="{ name: 'QueryGuide' }" />
        </template>
      </v-tooltip>
      <v-tooltip location="end" text="Configuración" :disabled="mobile">
        <template #activator="{ props: tip }">
          <v-list-item v-bind="tip" prepend-icon="mdi-cog-outline" title="Configuración" value="settings"
            :to="{ name: 'Settings' }" />
        </template>
      </v-tooltip>
      <v-tooltip location="end" text="Cerrar sesión" :disabled="mobile">
        <template #activator="{ props: tip }">
          <v-list-item v-bind="tip" prepend-icon="mdi-logout" title="Cerrar sesión" value="logout"
            @click="logout" />
        </template>
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