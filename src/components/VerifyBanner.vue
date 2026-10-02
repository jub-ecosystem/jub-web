<template>
  <Teleport to="body">
    <!-- Blocking overlay -->
    <Transition name="overlay-fade">
      <div
        v-if="banner && banner.status !== 'success'"
        class="verify-overlay"
        @click.stop.prevent
        @keydown.stop.prevent
      />
    </Transition>

    <!-- Sliding banner -->
    <Transition name="banner-slide">
      <div
        v-if="banner"
        class="verify-banner"
        :class="bannerColorClass"
      >
        <div class="d-flex align-center justify-space-between px-6 py-3 w-100">

          <!-- Left: icon + message -->
          <div class="d-flex align-center ga-3">
            <v-progress-circular
              v-if="banner.status === 'retrying'"
              indeterminate
              size="20"
              width="2"
              color="amber-darken-3"
            />
            <v-icon v-else-if="banner.status === 'success'" color="success" size="22">mdi-check-circle</v-icon>
            <v-icon v-else color="error" size="22">mdi-alert-circle-outline</v-icon>

            <div class="d-flex align-center ga-3 flex-wrap">
              <span v-if="banner.status === 'retrying'" class="text-body-2 font-weight-bold text-grey-darken-3">
                Verificando sesión — intento {{ banner.attempt }} de 3
              </span>
              <span v-else-if="banner.status === 'success'" class="text-body-2 font-weight-bold text-success-darken-1">
                Conexión restaurada — estamos en línea nuevamente
              </span>
              <span v-else class="text-body-2 font-weight-bold text-grey-darken-3">
                No se pudo verificar tu sesión
              </span>

              <v-chip
                v-if="banner.status === 'retrying' && banner.countdown > 0"
                size="x-small"
                color="amber-darken-2"
                variant="tonal"
                class="font-weight-bold font-monospace"
              >reintentando en {{ banner.countdown }}s</v-chip>

              <v-chip
                v-if="banner.status === 'failed'"
                size="x-small"
                color="error"
                variant="tonal"
                class="font-weight-bold"
              >3 intentos fallidos</v-chip>
            </div>
          </div>

          <!-- Right: action button -->
          <v-btn
            v-if="banner.status === 'retrying' || banner.status === 'failed'"
            size="small"
            color="primary"
            variant="flat"
            class="text-none font-weight-bold ml-4"
            @click="banner.status === 'retrying' ? authStore.cancelRetry() : openLogin()"
          >Iniciar sesión</v-btn>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router    = useRouter();

const banner = computed(() => authStore.verifyBanner);

const bannerColorClass = computed(() => {
  if (!banner.value) return '';
  if (banner.value.status === 'success') return 'banner-success';
  if (banner.value.status === 'failed')  return 'banner-error';
  return 'banner-warning';
});

const openLogin = () => {
  authStore.showAuthDialog = true;
};

// Once the user logs in via AuthDialog, clear the banner and resume navigation if needed
watch(() => authStore.isVerified, async (verified) => {
  if (verified) {
    if (authStore.pendingRedirect) {
      const dest = authStore.pendingRedirect;
      authStore.pendingRedirect = null;
      await router.push(dest);
    }
    authStore.verifyBanner = null;
  }
});
</script>

<style scoped>
.verify-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.38);
  z-index: 1998;
}

.verify-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1999;
  display: flex;
  align-items: center;
  min-height: 52px;
  box-shadow: 0 2px 12px rgba(0,0,0,.12);
}

.banner-warning { background: #fff8e1; border-bottom: 2px solid #f9a825; }
.banner-error   { background: #fbe9e7; border-bottom: 2px solid #e53935; }
.banner-success { background: #e8f5e9; border-bottom: 2px solid #43a047; }

/* Banner slide from top */
.banner-slide-enter-active,
.banner-slide-leave-active { transition: transform 0.3s ease, opacity 0.3s ease; }
.banner-slide-enter-from,
.banner-slide-leave-to    { transform: translateY(-100%); opacity: 0; }

/* Overlay fade */
.overlay-fade-enter-active,
.overlay-fade-leave-active { transition: opacity 0.25s ease; }
.overlay-fade-enter-from,
.overlay-fade-leave-to    { opacity: 0; }
</style>
