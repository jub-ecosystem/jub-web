<template>
  <v-container max-width="800" class="py-8">

    <div class="mb-6 d-flex align-center ga-3">
      <v-btn icon="mdi-arrow-left" variant="text" :to="{ name: 'TasksIndex' }"></v-btn>
      <h1 class="text-h5 font-weight-black">Detalle de tarea</h1>
    </div>

    <template v-if="jubStore.isLoading && !task">
      <v-skeleton-loader type="card" class="mb-4"></v-skeleton-loader>
      <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
    </template>

    <template v-else-if="task">
      <v-card rounded="xl" elevation="2" class="mb-4">
        <v-card-item>
          <template v-slot:prepend>
            <v-avatar :color="getStatusColor(task.current_status) + '-lighten-4'" size="52">
              <v-icon :color="getStatusColor(task.current_status)" size="28">{{ getStatusIcon(task.current_status) }}</v-icon>
            </v-avatar>
          </template>
          <v-card-title class="text-h6 font-weight-bold">{{ task.title }}</v-card-title>
          <v-card-subtitle>{{ task.description }}</v-card-subtitle>
          <template v-slot:append>
            <div class="d-flex flex-column align-end ga-2">
              <v-chip variant="flat" :color="getStatusColor(task.current_status)" class="text-white font-weight-bold text-uppercase">
                {{ task.current_status }}
              </v-chip>
              <v-chip variant="tonal" color="secondary" size="small">{{ task.operation }}</v-chip>
            </div>
          </template>
        </v-card-item>

        <v-divider></v-divider>

        <v-card-text>
          <v-row dense>
            <v-col cols="12" sm="6">
              <div class="text-overline text-grey-darken-1 mb-1">Tarea ID</div>
              <div class="text-body-2 font-weight-medium font-mono">{{ task.task_id }}</div>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="text-overline text-grey-darken-1 mb-1">Observatorio</div>
              <div class="text-body-2 font-weight-medium font-mono">{{ task.observatory_id }}</div>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="text-overline text-grey-darken-1 mb-1">Creada</div>
              <div class="text-body-2">{{ formatDate(task.created_at) }}</div>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="text-overline text-grey-darken-1 mb-1">Última actualización</div>
              <div class="text-body-2">{{ formatDate(task.updated_at) }}</div>
            </v-col>
          </v-row>

          <div v-if="task.current_status === 'running' || task.current_status === 'pending'" class="mt-4">
            <div class="text-overline text-grey-darken-1 mb-1">Progreso</div>
            <div class="text-body-2 mb-2">{{ task.progress_message ?? (task.current_status === 'pending' ? 'En cola...' : 'Procesando...') }}</div>
            <v-progress-linear
              :color="getStatusColor(task.current_status)"
              height="8"
              rounded
              indeterminate
            ></v-progress-linear>
          </div>
        </v-card-text>

        <v-card-actions v-if="task.current_status === 'failed'" class="pa-4 pt-0">
          <v-btn
            color="error"
            variant="tonal"
            prepend-icon="mdi-refresh"
            rounded="lg"
            class="text-none font-weight-bold"
            :loading="retrying"
            @click="handleRetry"
          >
            Reintentar tarea
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>

    <v-empty-state
      v-else-if="!jubStore.isLoading"
      icon="mdi-clipboard-search-outline"
      title="Tarea no encontrada"
      text="La tarea solicitada no existe o no tienes acceso a ella."
    >
      <template v-slot:actions>
        <v-btn color="primary" variant="tonal" :to="{ name: 'TasksIndex' }">Volver a tareas</v-btn>
      </template>
    </v-empty-state>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000" rounded="lg">
      {{ snackbar.text }}
    </v-snackbar>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useJubStore } from '@/stores/jub';
import type { TaskXDTO } from '@/types/index.types';

definePage({
  name: 'TaskDetails',
  meta: {
    requiresAuth: true,
    layout: 'dashboard',
  },
});

const route = useRoute('TaskDetails');
const jubStore = useJubStore();
const task = ref<TaskXDTO | null>(null);
const retrying = ref(false);
const snackbar = ref({ show: false, text: '', color: 'success' });

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: 'warning',
    running: 'info',
    success: 'success',
    failed: 'error',
  };
  return colors[status] ?? 'grey';
};

const getStatusIcon = (status: string) => {
  const icons: Record<string, string> = {
    pending: 'mdi-clock-outline',
    running: 'mdi-loading mdi-spin',
    success: 'mdi-check-circle',
    failed: 'mdi-alert-circle-outline',
  };
  return icons[status] ?? 'mdi-help-circle-outline';
};

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(new Date(dateString));
};

async function handleRetry() {
  if (!task.value) return;
  retrying.value = true;
  const ok = await jubStore.retryTask(task.value.task_id);
  retrying.value = false;
  if (ok) {
    snackbar.value = { show: true, text: 'Tarea puesta en cola nuevamente.', color: 'success' };
    task.value = await jubStore.fetchTask(task.value.task_id);
  } else {
    snackbar.value = { show: true, text: 'No se pudo reintentar la tarea.', color: 'error' };
  }
}

onMounted(async () => {
  task.value = await jubStore.fetchTask(route.params.taskId as string);
});
</script>
