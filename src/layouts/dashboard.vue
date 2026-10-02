<template>
  <dashboard-drawer v-model="drawer" />

  <v-app-bar app color="white" elevation="0" height="72" class="px-2 border-b">
    <template v-slot:prepend>
      <v-btn @click="onBack" icon="mdi-arrow-left"></v-btn>
    </template>
    
    <template v-slot:append>

      <!-- Jub Assistant button (only on observatory detail page) -->
      <v-tooltip
        v-if="assistantStore.isAvailable"
        :model-value="assistantStore.showTooltip"
        location="bottom"
        no-click-animation
      >
        <template #activator="{ props: tipProps }">
          <v-btn
            v-bind="tipProps"
            icon
            variant="text"
            class="mr-1 jub-assistant-btn"
            @click="assistantStore.isOpen = !assistantStore.isOpen"
          >
          <v-icon size="30" color="primary">mdi-robot</v-icon>
            <!-- <v-img src="@/assets/logo.svg" width="30" height="30" /> -->
          </v-btn>
        </template>
        <span>¿Necesitas ayuda con las consultas de este observatorio?</span>
      </v-tooltip>

      <!-- Download queue panel -->
      <v-menu
        v-model="showDownloads"
        :close-on-content-click="false"
        location="bottom end"
        offset="10"
        transition="scale-transition"
      >
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" variant="text" color="grey-darken-2" class="mr-1">
            <v-badge :content="downloadCount" :model-value="downloadCount > 0" color="primary" max="99">
              <v-icon>mdi-tray-arrow-down</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-card width="360" max-height="480" rounded="xl" elevation="6" class="d-flex flex-column overflow-hidden border">

          <v-toolbar color="white" density="compact" class="border-b px-2">
            <v-toolbar-title class="text-subtitle-1 font-weight-bold">Descargas</v-toolbar-title>
            <v-spacer />
            <v-btn
              v-if="downloadCount > 0"
              variant="text" size="small" color="error"
              class="text-none font-weight-bold text-caption"
              @click="jubStore.cancelAllDownloads()"
            >Cancelar todo</v-btn>
          </v-toolbar>

          <div class="overflow-y-auto flex-grow-1">

            <!-- Active download -->
            <template v-if="jubStore.activeDownloadId">
              <div class="px-4 pt-3 pb-1">
                <span class="text-caption font-weight-bold text-grey-darken-2 text-uppercase" style="letter-spacing:.05em;">En progreso</span>
              </div>
              <v-list-item class="px-4 py-2">
                <template #prepend>
                  <v-progress-circular indeterminate color="primary" size="20" width="2" class="mr-3" />
                </template>
                <v-list-item-title class="text-body-2 font-weight-medium text-truncate">
                  {{ jubStore.downloadMeta[jubStore.activeDownloadId]?.name ?? jubStore.activeDownloadId }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-progress-linear
                    :indeterminate="(jubStore.downloadProgress[jubStore.activeDownloadId] ?? -1) < 0"
                    :model-value="Math.max(0, jubStore.downloadProgress[jubStore.activeDownloadId] ?? 0)"
                    color="primary" height="4" rounded class="mt-1"
                  />
                </v-list-item-subtitle>
                <template #append>
                  <v-btn icon="mdi-close" size="x-small" variant="text" color="error"
                    @click="jubStore.cancelDownload(jubStore.activeDownloadId!)" />
                </template>
              </v-list-item>
              <v-divider />
            </template>

            <!-- Queued items -->
            <template v-if="jubStore.downloadQueue.length > 0">
              <div class="px-4 pt-3 pb-1">
                <span class="text-caption font-weight-bold text-grey-darken-2 text-uppercase" style="letter-spacing:.05em;">En cola</span>
              </div>
              <v-list-item v-for="(pid, i) in jubStore.downloadQueue" :key="pid" class="px-4 py-2">
                <template #prepend>
                  <v-avatar color="warning" variant="tonal" size="28" rounded="lg" class="mr-3 text-caption font-weight-bold">
                    {{ i + 1 }}
                  </v-avatar>
                </template>
                <v-list-item-title class="text-body-2 font-weight-medium text-truncate">
                  {{ jubStore.downloadMeta[pid]?.name ?? pid }}
                </v-list-item-title>
                <template #append>
                  <v-btn icon="mdi-close" size="x-small" variant="text" color="grey-darken-1"
                    @click="jubStore.cancelDownload(pid)" />
                </template>
              </v-list-item>
              <v-divider />
            </template>

            <!-- Completed -->
            <template v-if="completedDownloads.length > 0">
              <div class="px-4 pt-3 pb-1">
                <span class="text-caption font-weight-bold text-grey-darken-2 text-uppercase" style="letter-spacing:.05em;">Completadas</span>
              </div>
              <v-list-item v-for="pid in completedDownloads" :key="pid" class="px-4 py-2">
                <template #prepend>
                  <v-avatar color="success" variant="tonal" size="28" rounded="lg" class="mr-3">
                    <v-icon size="16">mdi-check</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="text-body-2 font-weight-medium text-truncate">
                  {{ jubStore.downloadMeta[pid]?.name ?? pid }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-caption text-grey-darken-1">
                  {{ jubStore.downloadCache[pid]?.type?.split('/')[1]?.split(';')[0]?.toUpperCase() ?? '–' }}
                </v-list-item-subtitle>
                <template #append>
                  <v-btn icon="mdi-download" size="x-small" variant="text" color="primary"
                    @click="saveFromPanel(pid)" />
                </template>
              </v-list-item>
            </template>

            <!-- Empty state -->
            <div
              v-if="!jubStore.activeDownloadId && jubStore.downloadQueue.length === 0 && completedDownloads.length === 0"
              class="pa-6 text-center"
            >
              <v-icon size="40" color="grey-lighten-2" class="mb-2">mdi-tray-arrow-down</v-icon>
              <div class="text-body-2 text-grey-darken-1">No hay descargas activas.</div>
            </div>

          </div>
        </v-card>
      </v-menu>

      <v-chip
        v-if="jubStore.isSlowNetwork"
        size="small"
        color="warning"
        variant="tonal"
        prepend-icon="mdi-wifi-strength-1-alert"
        class="mr-3 font-weight-bold text-none"
      >Red lenta</v-chip>

      <v-menu
        v-model="showNotifications" 
        :close-on-content-click="false" 
        location="bottom end" 
        offset="10"
        transition="scale-transition"
      >
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" variant="text" color="grey-darken-2" class="mr-2">
            <v-badge 
              :content="unreadCount" 
              :model-value="unreadCount > 0" 
              color="error" 
              max="99"
            >
              <v-icon>mdi-bell-outline</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-card width="380" max-height="500" rounded="xl" elevation="6" class="d-flex flex-column overflow-hidden border">
          
          <v-toolbar color="white" density="compact" class="border-b px-2">
            <v-toolbar-title class="text-subtitle-1 font-weight-bold">Notificaciones</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip text="Marcar todas como leídas" location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn 
                  v-bind="props" 
                  icon="mdi-check-all" 
                  variant="text" 
                  size="small" 
                  color="primary"
                  :disabled="unreadCount === 0"
                  @click="markAllAsRead"
                ></v-btn>
              </template>
            </v-tooltip>
          </v-toolbar>

          <v-list lines="three" class="pa-0 overflow-y-auto" bg-color="white">
            <template v-for="(notification, index) in notifications" :key="notification.notification_id">
              
              <v-list-item 
                :class="{'bg-blue-lighten-5': !notification.is_read}" 
                class="px-4 py-3 transition-swing cursor-pointer"
                @click="markAsRead(notification.notification_id)"
                hover
              >
                <template v-slot:prepend>
                  <v-avatar :color="getNotificationColors(notification)" variant="tonal" size="40" class="mr-3 mt-1 align-self-start">
                    <v-icon size="small">{{ getNotificationIcons(notification) }}</v-icon>
                  </v-avatar>
                </template>

                <v-list-item-title :class="{'font-weight-bold text-grey-darken-4': !notification.is_read, 'font-weight-medium text-grey-darken-2': notification.is_read}" class="text-body-2 mb-1">
                  {{ notification.title }}
                </v-list-item-title>
                
                <v-list-item-subtitle class="text-caption text-grey-darken-1 text-wrap mb-1" style="line-height: 1.3;">
                  {{ notification.message }}
                </v-list-item-subtitle>
                
                <div class="d-flex align-center mt-2">
                  <span class="text-caption text-grey font-weight-medium">{{ getRelativeTime(notification.created_at) }}</span>
                  <v-spacer></v-spacer>
                  <div v-if="!notification.is_read" style="width: 8px; height: 8px; border-radius: 50%; background-color: rgb(var(--v-theme-primary));"></div>
                </div>
              </v-list-item>

              <v-divider v-if="index < notifications.length - 1"></v-divider>
            </template>

            <div v-if="notifications.length === 0" class="pa-6 text-center">
              <v-icon size="48" color="grey-lighten-2" class="mb-2">mdi-bell-sleep-outline</v-icon>
              <div class="text-body-2 text-grey-darken-1">No tienes notificaciones nuevas.</div>
            </div>
          </v-list>

          <v-card-actions class="bg-grey-lighten-4 justify-center py-2 border-t">
            <v-btn variant="text" color="black" class="text-none font-weight-bold text-caption" size="small">
              Ver todo el historial
            </v-btn>
          </v-card-actions>
          
        </v-card>
      </v-menu>

      <v-app-bar-nav-icon @click="drawer = !drawer" variant="text" color="grey-darken-2"></v-app-bar-nav-icon>
      
    </template>
  </v-app-bar>

  <!-- Jub Assistant panels (rendered at layout level for proper z-index) -->
  <template v-if="assistantStore.isAvailable">
    <JubAssistantDrawer v-if="mdAndUp" />
    <JubAssistantModal  v-else />
  </template>

  <v-main>
    <router-view />
  </v-main>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useJubStore } from '@/stores/jub';
import { useAssistantStore } from '@/stores/assistant';
import { type Notification } from '@/types/index.types';
import { getRelativeTime } from '@/utils/date';
import { useDisplay } from 'vuetify';
import { V } from 'node_modules/vitest/dist/chunks/evaluatedModules.d.BxJ5omdx';

const { mobile, mdAndUp } = useDisplay();
const assistantStore = useAssistantStore();
const drawer = ref(!mobile.value);
const router = useRouter();

const onBack = () => {
  router.back();
};

const showNotifications = ref(false);
const showDownloads     = ref(false);

const downloadCount = computed(() =>
  (jubStore.activeDownloadId ? 1 : 0) + jubStore.downloadQueue.length
);

const completedDownloads = computed(() =>
  Object.keys(jubStore.downloadCache)
    .filter(pid => jubStore.downloadCache[pid]?.url)
    .slice(-8)
    .reverse()
);

function saveFromPanel(pid: string) {
  const entry = jubStore.downloadCache[pid];
  if (!entry?.url) return;
  const ext = entry.type?.split('/')[1]?.split(';')[0] ?? 'bin';
  const a = document.createElement('a');
  a.href = entry.url;
  a.download = `${pid}.${ext}`;
  a.click();
}


const jubStore = useJubStore();

const notifications = ref<Notification[]>([]);

const unreadCount = computed(() => {
  return notifications.value.filter((n:Notification) => !n.is_read).length;
});

const getNotificationIcons = computed(() => {
  return (notification:Notification) =>{
    const entityIcons: Record<string, string> = {
      observatory: 'mdi-telescope',
      product: 'mdi-package-variant-closed',
      catalog: 'mdi-book-open-page-variant',
      user_profile: 'mdi-account-circle',
      data_source: 'mdi-database',
      task: 'mdi-clipboard-list-outline',
      none: 'mdi-bell',
      other: 'mdi-dots-horizontal-circle'
    };

    const operationIcons: Record<string, string> = {
      create: 'mdi-plus',
      update: 'mdi-pencil',
      delete: 'mdi-trash-can',
      read: 'mdi-eye',
      other: 'mdi-dots-horizontal'
    };
    return entityIcons[notification.entity] || 'mdi-bell';
  }
});


const getNotificationColors = computed(() => {
  return (notification:Notification) =>{
    const statusColors: Record<string, string> = {
      success: 'green',
      warning: 'orange',
      error: 'red',
      info: 'blue',
      other: 'grey'
    };
    return statusColors[notification.status] || 'grey';
  }
});

const markAsRead = async (id: string) => {
  const notification = notifications.value.find((n:Notification) => n.notification_id=== id);
  if (notification && !notification.is_read) {
    // Call : jubStore.markNotificationAsRead(id)
    const response = await jubStore.mark_notification_as_read(notification.notification_id);
    notification.is_read = response;
    // }
  }
};

const markAllAsRead = async () => {
    const response = await jubStore.mark_all_notifications_as_read();
    if (response) {
      notifications.value = notifications.value.map((n:Notification) => ({ ...n, is_read: true }));
      // value.forEach((n:Notification) => n.is_read  = true);
    }
  // notifications.value.forEach(n => n.is_read = true);
  // Call : jubStore.markAllNotificationsAsRead()
};


onMounted(async () => {
  notifications.value = await jubStore.get_notifications();
});

</script>

<style scoped>
.v-list-item {
  transition: background-color 0.2s ease;
}

@keyframes jub-heartbeat {
  0%   { transform: scale(1);    box-shadow: 0 0 0 0   rgba(0, 171, 220, 0.5); }
  20%  { transform: scale(1.08); box-shadow: 0 0 0 6px rgba(0, 171, 220, 0);  }
  35%  { transform: scale(1); }
  50%  { transform: scale(1.04); box-shadow: 0 0 0 4px rgba(0, 171, 220, 0);  }
  80%  { transform: scale(1); }
  100% { transform: scale(1); }
}

.jub-assistant-btn {
  animation: jub-heartbeat 3.5s ease-in-out infinite;
  border-radius: 50%;
}
</style>