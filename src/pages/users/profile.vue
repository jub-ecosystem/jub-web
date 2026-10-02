<template>
  <v-container class="py-8" max-width="1200">
    
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card rounded="xl" elevation="4" class="overflow-visible mt-10">
          <v-img
            height="180"
            cover
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
            class="bg-grey-lighten-2"
          ></v-img>

          <v-card-text class="d-flex flex-column align-center text-center position-relative pt-0">
            <v-avatar
              size="130"
              color="white"
              class="profile-avatar elevation-6"
            >
              <v-img 
                :src="currentUser?.profile_photo || 'https://placehold.co/150x150/eeeeee/999999?text=Sin+Foto'" 
                cover
              ></v-img>
            </v-avatar>

            <div class="mt-16 pt-2">
              <h1 class="text-h4 font-weight-black text-capitalize mb-1">
                {{ fullName }}
              </h1>
              <p class="text-subtitle-1 text-grey-darken-1 font-weight-medium mb-4">
                @{{ currentUser?.username || 'usuario' }}
              </p>

              <div class="d-flex justify-center ga-3 mb-6">
                <v-chip color="primary" variant="flat" prepend-icon="mdi-shield-account" class="font-weight-bold text-uppercase">
                  {{ 'User' }}
                </v-chip>
                <v-chip color="grey-darken-3" variant="tonal" prepend-icon="mdi-email-outline">
                  {{ currentUser?.email || 'No email' }}
                </v-chip>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-10">
      <v-col cols="12" md="10" lg="10">
        
        <div class="mb-6">
          <h2 class="text-h5 font-weight-bold">Mis observatorios</h2>
          <p class="text-body-2 text-grey-darken-1">Administra la visibilidad de tus observatorios.</p>
        </div>

        <!-- Loading -->
        <v-row v-if="loadingObs" justify="center" class="my-6">
          <v-col cols="auto">
            <v-progress-circular indeterminate color="primary" size="40" />
          </v-col>
        </v-row>

        <p v-else-if="observatories.length === 0" class="text-body-1 text-grey-darken-1 text-center my-6">
          Aún no tienes observatorios.
        </p>

        <template v-else>
        <v-row>
          <v-col v-for="obs in observatories" :key="obs.observatory_id" cols="12" sm="6" md="4">
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                v-bind="props"
                :elevation="isHovering ? 8 : 2"
                rounded="xl"
                class="h-100 transition-swing cursor-pointer gallery-card"
                @click="goToItem(obs)"
              >
                <v-img
                  :src="obs.image_url || 'https://placehold.co/600x400/eeeeee/999999?text=Observatorio'"
                  height="200"
                  cover
                  class="align-end"
                  :class="{ 'obs-disabled': obs.is_disabled }"
                >
                  <v-overlay
                    :model-value="isHovering ?? false"
                    contained
                    scrim="#036358"
                    class="align-center justify-center"
                  >
                    <v-btn color="white" variant="flat" rounded="pill" class="text-none font-weight-bold px-6">
                      Explorar
                    </v-btn>
                  </v-overlay>

                  <v-chip
                    :color="obs.is_disabled ? 'grey' : 'success'"
                    variant="flat"
                    size="small"
                    class="ma-3 font-weight-bold position-absolute top-0 right-0"
                  >
                    {{ obs.is_disabled ? 'Deshabilitado' : 'Publicado' }}
                  </v-chip>
                </v-img>

                <v-card-item class="pt-4 pb-1">
                  <v-card-title class="text-subtitle-1 font-weight-bold text-wrap" style="line-height: 1.2;">
                    {{ obs.title }}
                  </v-card-title>
                </v-card-item>

                <v-card-text class="d-flex align-center pb-0 pt-1">
                  <v-icon size="16" color="grey-darken-1">mdi-eye-outline</v-icon>
                  <span class="text-caption text-grey-darken-1 ml-1 font-weight-medium">
                    {{ obs.view_count ?? 0 }} vistas
                  </span>
                </v-card-text>

                <v-card-actions class="px-4 pb-3">
                  <div @click.stop>
                    <v-switch
                      :model-value="!obs.is_disabled"
                      label="Publicado"
                      inset
                      density="compact"
                      hide-details
                      color="success"
                      :loading="toggling[obs.observatory_id] ? 'success' : false"
                      :disabled="toggling[obs.observatory_id]"
                      @update:model-value="(v) => onToggle(obs, !!v)"
                    />
                  </div>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>

        <div v-if="hasMore" class="d-flex justify-center mt-6">
          <v-btn
            variant="tonal"
            color="primary"
            rounded="pill"
            class="text-none font-weight-bold"
            :loading="loadingMore"
            @click="loadMore"
          >
            Ver más
          </v-btn>
        </div>
        </template>

      </v-col>
    </v-row>

    <v-dialog :model-value="pendingDisable !== null" max-width="400" @update:model-value="(v) => { if (!v) pendingDisable = null }">
      <v-card rounded="xl">
        <v-card-text class="pt-6">
          ¿Deshabilitar este observatorio? Dejará de aparecer en las búsquedas.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" class="text-none" @click="pendingDisable = null">Cancelar</v-btn>
          <v-btn color="error" variant="flat" class="text-none" @click="confirmDisable">Deshabilitar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useJubStore, JubApiError } from '@/stores/jub';
import { useAppStore, SnackbarColor } from '@/stores/app';
import { useRouter } from 'vue-router';
import type { ObservatoryDTO } from '@/types/index.types';

definePage({
    name: 'UserProfile',
    meta: {
        requiresAuth: true,
        layout: 'dashboard'
    }
});

const authStore = useAuthStore();
const jubStore  = useJubStore();
const appStore  = useAppStore();
const router    = useRouter();

const currentUser = computed(() => authStore.getUser());

const fullName = computed(() => {
  const first = currentUser.value?.first_name || '';
  const last  = currentUser.value?.last_name  || '';
  return `${first} ${last}`.trim() || 'Usuario Desconocido';
});

const PAGE_SIZE = 12;

const loadingObs    = ref(false);
const loadingMore   = ref(false);
const observatories = ref<ObservatoryDTO[]>([]);
const pageIndex     = ref(0);
const hasMore       = ref(false);

const toggling       = reactive<Record<string, boolean>>({});
const pendingDisable = ref<ObservatoryDTO | null>(null);

const goToItem = (obs: ObservatoryDTO) => {
  router.push({ name: 'ObservatoryDetails', params: { observatory_id: obs.observatory_id } });
};

async function loadPage(index: number) {
  const page = await jubStore.get_observatories(index, PAGE_SIZE);
  const known = new Set(observatories.value.map(o => o.observatory_id));
  observatories.value.push(...page.filter(o => !known.has(o.observatory_id)));
  pageIndex.value = index;
  hasMore.value = page.length === PAGE_SIZE;
}

async function loadMore() {
  loadingMore.value = true;
  try {
    await loadPage(pageIndex.value + 1);
  } finally {
    loadingMore.value = false;
  }
}

function onToggle(obs: ObservatoryDTO, published: boolean) {
  if (published) {
    applyStatus(obs, false);
  } else {
    pendingDisable.value = obs;
  }
}

function confirmDisable() {
  const obs = pendingDisable.value;
  pendingDisable.value = null;
  if (obs) applyStatus(obs, true);
}

async function applyStatus(obs: ObservatoryDTO, isDisabled: boolean) {
  const id = obs.observatory_id;
  toggling[id] = true;
  try {
    const updated = await jubStore.setObservatoryStatus(id, isDisabled);
    const idx = observatories.value.findIndex(o => o.observatory_id === id);
    if (idx !== -1) observatories.value[idx] = { ...observatories.value[idx], ...updated };
    appStore.showSnackbar(
      isDisabled ? 'Observatorio deshabilitado.' : 'Observatorio publicado.',
      3000,
      SnackbarColor.SUCCESS,
    );
  } catch (e) {
    const status = e instanceof JubApiError ? e.status : 0;
    const message =
      status === 409 ? 'La configuración del observatorio aún no ha terminado.' :
      status === 403 ? 'Solo el propietario puede cambiar el estado del observatorio.' :
      'No se pudo actualizar el estado del observatorio.';
    appStore.showSnackbar(message, 4000, SnackbarColor.ERROR);
  } finally {
    toggling[id] = false;
  }
}

onMounted(async () => {
  loadingObs.value = true;
  try {
    await loadPage(0);
  } finally {
    loadingObs.value = false;
  }
});
</script>

<style scoped>
/* Posiciona el avatar mitad dentro y mitad fuera del cover */
.profile-avatar {
  position: absolute !important;
  top: -65px; /* Mitad del tamaño del avatar (130/2) */
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid white; /* Un borde blanco para que resalte sobre la portada */
  background-color: white;
}

/* Efecto suave al pasar el mouse por las tarjetas de la galería */
.gallery-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.gallery-card:hover {
  transform: translateY(-4px);
}

/* Observatorios deshabilitados: solo se atenúa la imagen, el chip sigue legible */
.obs-disabled :deep(.v-img__img) {
  opacity: 0.5;
}
</style>