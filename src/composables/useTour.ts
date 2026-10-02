import { driver } from 'driver.js';
import type { Config, DriveStep } from 'driver.js';
import { useAuthStore } from '@/stores/auth';
import { useJubStore } from '@/stores/jub';

export function useTour(steps: DriveStep[], options: Partial<Config> & { pageKey?: string } = {}) {
  const authStore = useAuthStore();
  const jubStore  = useJubStore();
  const { pageKey, ...driverOptions } = options;
  const LS_KEY = pageKey ? `jub:tour:seen:${pageKey}` : null;

  const disableTutorialOnServer = () => {
    const userId   = authStore.user?.user_id;
    const settings = authStore.settings;
    if (!userId || !settings || !settings.exploration.enable_tutorial) return;
    const updated = {
      ...settings,
      exploration: { ...settings.exploration, enable_tutorial: false },
    };
    authStore.settings!.exploration.enable_tutorial = false;
    jubStore.update_settings(userId, updated);
  };

  const driverObj = driver({
    showProgress: true,
    allowClose: true,
    overlayOpacity: 0.55,
    stagePadding: 6,
    stageRadius: 8,
    doneBtnText: 'Finalizar',
    nextBtnText: 'Siguiente →',
    prevBtnText: '← Anterior',
    progressText: '{{current}} de {{total}}',
    ...driverOptions,
    steps,
    onDestroyStarted: () => {
      if (LS_KEY) localStorage.setItem(LS_KEY, '1');
      disableTutorialOnServer();
      driverObj.destroy();
    },
  });

  const startTour = () => {
    if (!authStore.settings?.exploration?.enable_tutorial) return;
    if (LS_KEY && localStorage.getItem(LS_KEY)) return;
    driverObj.drive();
  };

  const replayTour = () => {
    if (LS_KEY) localStorage.removeItem(LS_KEY);
    driverObj.drive();
  };

  return { startTour, replayTour, driverObj };
}
