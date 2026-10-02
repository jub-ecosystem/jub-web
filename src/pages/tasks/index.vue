<template>
  <v-container max-width="1000" class="py-8">

    <!-- Tour replay button -->
    <v-tooltip text="Ver tutorial" location="left">
      <template #activator="{ props: tp }">
        <v-btn v-bind="tp" icon="mdi-help-circle-outline" variant="tonal" color="primary" size="small"
               style="position:fixed;bottom:24px;right:24px;z-index:200;" @click="replayTour" />
      </template>
    </v-tooltip>

    <div class="mb-8 d-flex align-center justify-space-between" data-tour="tasks-header">
      <div>
        <h1 class="text-h4 font-weight-black mb-1">Estado de tareas</h1>
        <p class="text-body-1 text-grey-darken-1">Monitorea la generación de productos y configuración de observatorios.</p>
      </div>
      <v-btn color="primary" variant="tonal" prepend-icon="mdi-refresh" :loading="jubStore.isLoading" @click="loadTasks">
        Actualizar
      </v-btn>
    </div>

    <v-row class="mb-6" data-tour="tasks-stats">
      <v-col cols="12" sm="4">
        <v-card rounded="xl" elevation="1" class="pa-4 border-s-lg" style="border-left-color: rgb(var(--v-theme-info)) !important;">
          <div class="text-overline text-grey-darken-1">En Progreso</div>
          <div class="text-h4 font-weight-bold text-info">{{ (stats.pending ?? 0) + (stats.running ?? 0) }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card rounded="xl" elevation="1" class="pa-4 border-s-lg" style="border-left-color: rgb(var(--v-theme-success)) !important;">
          <div class="text-overline text-grey-darken-1">Completadas</div>
          <div class="text-h4 font-weight-bold text-success">{{ stats.success ?? 0 }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card rounded="xl" elevation="1" class="pa-4 border-s-lg" style="border-left-color: rgb(var(--v-theme-error)) !important;">
          <div class="text-overline text-grey-darken-1">Fallidas</div>
          <div class="text-h4 font-weight-bold text-error">{{ stats.failed ?? 0 }}</div>
        </v-card>
      </v-col>
    </v-row>

    <v-card rounded="xl" elevation="2" class="overflow-hidden" data-tour="tasks-list">
      <v-list lines="three" bg-color="surface">

        <template v-if="jubStore.isLoading && tasks.length === 0">
          <v-list-item v-for="n in 3" :key="n" class="pa-4">
            <v-skeleton-loader type="list-item-avatar-three-line"></v-skeleton-loader>
          </v-list-item>
        </template>

        <template v-else>
          <template v-for="(task, index) in tasks" :key="task.task_id">

            <v-list-item class="pa-4" :to="{ name: 'TaskDetails', params: { taskId: task.task_id } }">
              <template v-slot:prepend>
                <v-avatar :color="getStatusColor(task.current_status) + '-lighten-4'" size="48" class="mr-4">
                  <v-icon :color="getStatusColor(task.current_status)">{{ getStatusIcon(task.current_status) }}</v-icon>
                </v-avatar>
              </template>

              <v-list-item-title class="text-h6 font-weight-bold mb-1">
                {{ task.title }}
              </v-list-item-title>

              <v-list-item-subtitle class="text-body-2 mb-2 text-wrap">
                {{ task.description }}
              </v-list-item-subtitle>

              <div v-if="task.current_status === 'running' || task.current_status === 'pending'" class="mt-3">
                <div class="d-flex justify-space-between text-caption font-weight-medium mb-1 text-grey-darken-1">
                  <span>{{ task.current_status === 'pending' ? 'En cola...' : (task.progress_message ?? 'Procesando...') }}</span>
                </div>
                <v-progress-linear
                  :color="getStatusColor(task.current_status)"
                  height="6"
                  rounded
                  indeterminate
                ></v-progress-linear>
              </div>

              <div class="mt-3 d-flex align-center flex-wrap ga-2">
                <v-chip size="small" variant="flat" :color="getStatusColor(task.current_status)" class="text-white font-weight-bold text-uppercase">
                  {{ task.current_status }}
                </v-chip>
                <v-chip size="small" variant="tonal" color="secondary">
                  {{ task.operation }}
                </v-chip>
                <span class="text-caption text-grey-darken-1">
                  <v-icon size="small" class="mr-1">mdi-calendar-clock</v-icon>
                  Inicio: {{ formatDate(task.created_at) }}
                </span>
                <span v-if="task.current_status === 'success' || task.current_status === 'failed'" class="text-caption text-grey-darken-1">
                  <v-icon size="small" class="mr-1">mdi-check-all</v-icon>
                  Actualizado: {{ formatDate(task.updated_at) }}
                </span>
              </div>

              <template v-slot:append>
                <div class="d-flex flex-column ga-2 justify-center h-100 ml-4">
                  <v-btn
                    v-if="task.current_status === 'failed'"
                    color="error"
                    variant="outlined"
                    size="small"
                    rounded="lg"
                    class="text-none font-weight-bold"
                    :loading="retryingId === task.task_id"
                    @click.prevent="handleRetry(task.task_id)"
                  >
                    Reintentar
                  </v-btn>
                </div>
              </template>

            </v-list-item>

            <v-divider v-if="index < tasks.length - 1" inset></v-divider>
          </template>

          <v-empty-state
            v-if="!jubStore.isLoading && tasks.length === 0"
            icon="mdi-clipboard-text-outline"
            title="No hay tareas recientes"
            text="Las tareas de generación de productos aparecerán aquí."
          ></v-empty-state>
        </template>

      </v-list>
    </v-card>

    <!-- Load more -->
    <div v-if="canLoadMore" class="d-flex justify-center mt-6">
      <v-btn
        variant="tonal"
        color="primary"
        rounded="pill"
        :loading="loadingMore"
        prepend-icon="mdi-chevron-down"
        class="px-8 font-weight-bold text-none"
        @click="loadMore"
      >Cargar más</v-btn>
    </div>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000" rounded="lg">
      {{ snackbar.text }}
    </v-snackbar>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useJubStore } from '@/stores/jub';
import { useAuthStore } from '@/stores/auth';
import { useTour } from '@/composables/useTour';
import type { TaskXDTO, TasksStatsDTO } from '@/types/index.types';

definePage({
  name: 'TasksIndex',
  meta: {
    requiresAuth: true,
    layout: 'dashboard',
  },
});

const jubStore   = useJubStore();
const authStore  = useAuthStore();
const tasks      = ref<TaskXDTO[]>([]);
const stats      = ref<TasksStatsDTO>({ pending: 0, running: 0, success: 0, failed: 0 });
const retryingId = ref<string | null>(null);
const snackbar   = ref({ show: false, text: '', color: 'success' });
const skip        = ref(0);
const loadingMore = ref(false);
const canLoadMore = ref(false);
const pageSize    = computed(() => authStore.settings?.exploration?.items_per_page ?? 20);

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
    success: 'mdi-check',
    failed: 'mdi-alert-circle-outline',
  };
  return icons[status] ?? 'mdi-help-circle-outline';
};

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
  }).format(new Date(dateString));
};

async function loadTasks() {
  skip.value = 0;
  const [taskList, taskStats] = await Promise.all([
    jubStore.fetchTasks(0, pageSize.value),
    jubStore.fetchTasksStats(),
  ]);
  tasks.value = taskList;
  stats.value = taskStats;
  canLoadMore.value = taskList.length === pageSize.value;
}

async function loadMore() {
  loadingMore.value = true;
  skip.value += pageSize.value;
  const more = await jubStore.fetchTasks(skip.value, pageSize.value);
  tasks.value.push(...more);
  canLoadMore.value = more.length === pageSize.value;
  loadingMore.value = false;
}

async function handleRetry(taskId: string) {
  retryingId.value = taskId;
  const ok = await jubStore.retryTask(taskId);
  retryingId.value = null;
  if (ok) {
    snackbar.value = { show: true, text: 'Tarea puesta en cola nuevamente.', color: 'success' };
    await loadTasks();
  } else {
    snackbar.value = { show: true, text: 'No se pudo reintentar la tarea.', color: 'error' };
  }
}

const tasksTourSteps = [
  { element: '[data-tour="tasks-header"]', popover: { title: 'Estado de tareas',   description: 'Monitorea todas las tareas de generación de productos y configuración de observatorios. Usa "Actualizar" para refrescar el estado.', side: 'bottom' as const } },
  { element: '[data-tour="tasks-stats"]',  popover: { title: 'Estadísticas',        description: 'Resumen rápido de tareas en progreso, completadas y fallidas. Los números se actualizan en tiempo real al hacer clic en Actualizar.', side: 'bottom' as const } },
  { element: '[data-tour="tasks-list"]',   popover: { title: 'Lista de tareas',     description: 'Cada tarea muestra su título, estado, operación y fechas. Las tareas en progreso muestran una barra animada. Haz clic en "Reintentar" si alguna falló.', side: 'top' as const } },
];

const { startTour, replayTour } = useTour(tasksTourSteps, { pageKey: 'tasks' });

onMounted(async () => {
  await loadTasks();
  await nextTick();
  startTour();
});
</script>
