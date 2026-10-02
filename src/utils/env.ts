// Runtime config: values injected into /config.js by the container at startup
// (see docker/40-runtime-config.sh). Falls back to the value baked in at build time.
declare global {
  interface Window {
    __APP_CONFIG__?: Record<string, string | undefined>;
  }
}

export function getEnv(key: string, fallback = ''): string {
  const runtime = window.__APP_CONFIG__?.[key];
  if (runtime) return runtime;
  return (import.meta.env[key] as string | undefined) || fallback;
}
