import {defineStore} from 'pinia'
import {type CatalogResponseDTO,type CatalogItemAliasDTO,type CatalogItemDTO ,type CatalogSummaryDTO, type Notification,type ObservatoryDTO,type ObservatoryStatsDTO,type ProductXDTO,type UserSettings, type DataSourceDTO, type DataRecord, type TaskXDTO, type TasksStatsDTO, type ServiceDTO, type CatalogItemXResponseDTO, type ReviewDTO, type SearchSuggestionResponseDTO, type ObservatorySuggestionResponseDTO, type CatalogXDTO} from '@/types/index.types'
import { useAuthStore } from '@/stores/auth'
import type { VerifyDTO } from '@/types/index.types'
// interface Observatory





export const useJubStore = defineStore('jub', () => {
    const catalogs = ref<CatalogSummaryDTO[]>([]);
    const API_URL = import.meta.env.VITE_JUB_API_URL || 'http://localhost:5000/api/v2';

    function trigger401() {
        const token    = localStorage.getItem('token');
        const secret   = localStorage.getItem('secret');
        const username = localStorage.getItem('username');
        if (token && secret && username) {
            useAuthStore().verifyWithRetry({ access_token: token, secret, username } as VerifyDTO);
        }
    }
    const isLoading = ref(false)
    const error = ref<string | null>(null );
    const themeMapping: Record<string, 'light' | 'dark'> = {
        'jubThemeLight': 'light',
        'jubThemeDark': 'dark'
    }
    const catalog = ref<CatalogResponseDTO | null>(null);
    const catalogItemsCache    = ref<Record<string, Array<{title: string; value: string}>>>({});
    const tagDetailsStoreCache = ref<Record<string, CatalogItemXResponseDTO[]>>({});

    // ── Download queue ────────────────────────────────────────────────────────
    const downloadQueue      = ref<string[]>([]);
    const activeDownloadId   = ref<string | null>(null);
    const activeController   = ref<AbortController | null>(null);
    const downloadCache      = ref<Record<string, { url: string | null; type: string | null; size: number | null }>>({});
    const downloadProgress   = ref<Record<string, number>>({});
    const cancelledDownloads = ref<Record<string, boolean>>({});
    const downloadMeta       = ref<Record<string, { name: string; extension?: string }>>({});
    const downloadSpeed      = ref<number>(0);
    const isSlowNetwork      = computed(() => downloadSpeed.value > 0 && downloadSpeed.value < 300);
    let   _queueRunning      = false;

    async function fetchCatalogs() {
        isLoading.value = true;
        error.value   = null;
        try {
            const response = await fetch(`${API_URL}/catalogs`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Temporal-Secret-Key': `${localStorage.getItem("secret")}`
                }
            });
            if(response.ok){
                const data:CatalogSummaryDTO[] = await response.json();
                catalogs.value = data;
            }else {
                throw new Error(`Error fetching catalogs: ${response.statusText}`);
            }

        } catch (e: any) {
            error.value = e?.response?.data?.detail ?? 'Error al cargar los catálogos';
        } finally {
            isLoading.value = false;
        }
    }

    async function get_notifications(): Promise<Notification[]> {
        try{
            isLoading.value = true;
            const response = await fetch(`${API_URL}/notifications`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Temporal-Secret-Key': `${localStorage.getItem("secret")}`
                }
            });
            if(response.ok){
                const data:Notification[] = await response.json();
                return data;
            }else {
                throw new Error(`Error fetching notifications: ${response.statusText}`);
            }
        }catch(e){
            console.error(e);
            error.value = e instanceof Error ? e.message : String(e);
            return [];
        }finally {
            isLoading.value = false;
        }
    }

    async function mark_notification_as_read(notificationId: string): Promise<boolean> {
        try{
            isLoading.value = true;
            const response = await fetch(`${API_URL}/notifications/${notificationId}/read`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Temporal-Secret-Key': `${localStorage.getItem("secret")}`
                }
            });
            if(response.ok){
                return true;
            }else {
                throw new Error(`Error marking notification as read: ${response.statusText}`);
            }
        }catch(e){
            console.error(e);
            error.value = e instanceof Error ? e.message : String(e);
            return false;
        }finally {
            isLoading.value = false;
        }
    }
    async function mark_all_notifications_as_read(): Promise<boolean> {
        try{
            isLoading.value = true;
            const response = await fetch(`${API_URL}/notifications/read-all`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Temporal-Secret-Key': `${localStorage.getItem("secret")}`
                }
            });
            if(response.ok){
                return true;
            }else {
                throw new Error(`Error marking all notifications as read: ${response.statusText}`);
            }
        }catch(e){
            console.error(e);
            error.value = e instanceof Error ? e.message : String(e);
            return false;
        }finally {
            isLoading.value = false;
        }
    }


    async function get_settings(userId: string): Promise<UserSettings> {
        try{
            isLoading.value = true;
            const response = await fetch(`${API_URL}/users/${userId}/settings`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Temporal-Secret-Key': `${localStorage.getItem("secret")}`
                }
            });
            if(response.ok){
                const data:UserSettings = await response.json();
                console.log("Fetched user settings");
                return data;
            }else {
                throw new Error(`Error fetching settings: ${response.statusText}`);
            }
        }catch(e){
            console.error(e);
            error.value = e instanceof Error ? e.message : String(e);
            const default_settings:UserSettings = {
                appearance: {
                    theme: 'light',
                    font_size: 12,
                    reduce_animations: false
                },
                exploration: {
                    enable_tutorial: true,
                    default_view: 'grid',
                    items_per_page: 24,
                },
                export: {
                    default_format: 'json',
                    include_metadata: false,
                }
            }
            return default_settings;
        }finally {
            isLoading.value = false;
        }
    }
    async function convert_theme_to_jub_format(theme: string): Promise<string> {
        return Object.keys(themeMapping).find(key => themeMapping[key] === theme) || 'jubThemeLight';
    }


    async function update_settings(userId: string, settings:UserSettings): Promise<boolean>{
        try{
            isLoading.value = true;
            // settings.appearance.theme = themeMapping[settings.appearance.theme] || 'light';
            console.log("Updating settings for user:", userId, settings);
            const response = await fetch(`${API_URL}/users/${userId}/settings`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Temporal-Secret-Key': `${localStorage.getItem("secret")}`
                },
                body: JSON.stringify(settings)
            });
            if(response.ok){
                const data = await response.json();
                return true;
            }else {
                throw new Error(`Error updating settings: ${response.statusText}`);
            }
        }catch(e){
            console.error(e);
            error.value = e instanceof Error ? e.message : String(e);
            return false;
        }finally {
            isLoading.value = false;
        }
    }
    async function get_observatories(): Promise<ObservatoryDTO[]>  {
        try{
            isLoading.value = true;
            const response = await fetch(`${API_URL}/observatories`, { headers: authHeaders() });
            if(response.ok){
                const data:ObservatoryDTO[] = await response.json();
                return data;
            }else {
                throw new Error(`Error fetching observatories: ${response.statusText}`);
            }
            
        }catch(e){
            console.error(e);
            error.value = e instanceof Error ? e.message : String(e);
            return [];
        }finally {
            isLoading.value = false
        }
    }
    async function search_observatories(query:string,strict:boolean, skip = 0, limit = 24, no_cache = false): Promise<ObservatoryDTO[]>{
        try{
            isLoading.value = true;
            const response = await fetch(`${API_URL}/search/observatories`, {
                method: 'POST',
                headers: {
                    ...authHeaders(),
                    // 'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query, strict, skip, limit, no_cache })
            });
            if(response.ok){
                const data:ObservatoryDTO[] = await response.json();
                console.log("Observatories",data)
                return data;
            } else {
                if (response.status === 401) trigger401();
                throw new Error(`Error searching observatories: ${response.statusText}`);
            }
        } catch (e){
            console.error(e);
            error.value = e instanceof Error ? e.message : String(e);
            return [];
        } finally {
            isLoading.value = false; 
        }
    }

    async function search(query: string, observatory_id: string | null, skip: number, limit: number, strict = false, no_cache = false): Promise<ProductXDTO[]>{
        try{
            isLoading.value = true;
            const response = await fetch(`${API_URL}/search`, {
                method: 'POST',
                headers: {
                    ...authHeaders(),
                    // 'Content-Type': 'application/json',
                    // "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    // "Temporal-Secret-Key": `${localStorage.getItem("secret")}`,
                },
                body: JSON.stringify({ query, observatory_id, skip, limit, strict, no_cache })
            });
            if(response.ok){
                const data:ProductXDTO[] = await response.json();
                return data;
            } else {
                if (response.status === 401) trigger401();
                throw new Error(`Error searching products: ${response.statusText}`);
            }
        } catch (e){
            console.error(e);
            error.value = e instanceof Error ? e.message : String(e);
            return [];
        } finally {
            isLoading.value = false;
        }
    }

    async function getObservatory(observatoryId: string): Promise<ObservatoryDTO | null> {
        try {
            const res = await fetch(`${API_URL}/observatories/${observatoryId}`, {
                headers: authHeaders(),
            });
            if (!res.ok) return null;
            return await res.json() as ObservatoryDTO;
        } catch {
            return null;
        }
    }

    async function fetchObservatoryStats(ids: string[]): Promise<ObservatoryStatsDTO[]> {
        try {
            const res = await fetch(`${API_URL}/observatories/details`, {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify({ ids }),
            });
            if (!res.ok) return [];
            return await res.json() as ObservatoryStatsDTO[];
        } catch {
            return [];
        }
    }
    async function upload_yaml(file: File | Blob): Promise<boolean> {
        try {
            isLoading.value = true;
            const formData = new FormData();
            // El nombre 'file' debe coincidir exactamente con el parámetro de tu backend: file: UploadFile = File(...)
            formData.append('file', file, 'config.yml');

            // Ajusta la URL según el prefijo real de tu router (ej. /api/v2/search/code o /api/v2/code)
            const { 'Content-Type': _ct, ...authOnly } = authHeaders();
            const response = await fetch(`${API_URL}/code`, {
                method: 'POST',
                headers: authOnly,
                body: formData, // No agregues 'Content-Type', el navegador lo establece automáticamente como multipart/form-data
            });

            if (response.ok) {
                return true;
            } else {
                const errorData = await response.json();
                throw new Error(errorData.detail || `Error al enviar YAML: ${response.statusText}`);
            }
        } catch (e) {
            console.error(e);
            error.value = e instanceof Error ? e.message : String(e);
            return false;
        } finally {
            isLoading.value = false;
        }
    }

    async function fetchCatalog(catalogId: string) {
    // Don't re-fetch if it's already the same catalog
        if (catalog.value?.catalog_id === catalogId) return;

        isLoading.value = true;
        error.value   = null;
        catalog.value = null;
        try {
            const response = await fetch(`${API_URL}/catalogs/${catalogId}`, { headers: authHeaders() });
            const data: CatalogResponseDTO = await response.json();
            catalog.value = data;
        } catch (e: any) {
            error.value = e?.response?.data?.detail ?? 'Error al cargar el catálogo';
        } finally {
            isLoading.value = false;
        }
    }

  function reset() {
    catalog.value = null;
    error.value   = null;
  }

  function authHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Temporal-Secret-Key': `${localStorage.getItem('secret')}`,
    };
  }

  async function fetchCatalogItemsByType(type: string, bustCache = false): Promise<Array<{title: string; value: string; group?: string}>> {
    const LS_KEY = `jub:catalog:${type}`;
    if (!bustCache) {
      if (catalogItemsCache.value[type]) return catalogItemsCache.value[type];
      const stored = localStorage.getItem(LS_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          catalogItemsCache.value[type] = parsed;
          return parsed;
        } catch { /* corrupt — fall through */ }
      }
    } else {
      delete catalogItemsCache.value[type];
      localStorage.removeItem(LS_KEY);
    }
    if (catalogs.value.length === 0) await fetchCatalogs();

    const matching = catalogs.value.filter(c => c.catalog_type === type);
    const result: Array<{title: string; value: string; group?: string}> = [];

    function flatten(items: any[]): any[] {
      return items.flatMap((i: any) => [i, ...(i.children?.length ? flatten(i.children) : [])]);
    }

    const seen = new Set<string>();

    for (const cat of matching) {
      try {
        const resp = await fetch(`${API_URL}/catalogs/${cat.catalog_id}`, { headers: authHeaders() });
        if (!resp.ok) continue;
        const data = await resp.json();
        const flat = flatten(data.items ?? []);
        for (const i of flat) {
          // TEMPORAL catalogs: the DSL uses the numeric code (e.g. 2024),
          // not the UPPER_SNAKE value (e.g. Y2024).
          // INTEREST catalogs: prefix with catalog value so the backend can resolve the scope.
          let dslValue: string;
          if (type === 'TEMPORAL') dslValue = String(i.code);
          else if (type === 'INTEREST') dslValue = `${cat.value}.${i.value}`;
          else dslValue = i.value;

          if (!seen.has(dslValue)) {
            seen.add(dslValue);
            result.push({ value: dslValue, title: `${i.name} (${i.value})`, group: type === 'INTEREST' ? cat.name : undefined });
          }
        }
      } catch {
        // skip failed catalogs silently
      }
    }

    catalogItemsCache.value[type] = result;
    localStorage.setItem(LS_KEY, JSON.stringify(result));
    return result;
  }

  async function searchServices(query: string, skip = 0, limit = 100, strict = false): Promise<ServiceDTO[]> {
    try {
      isLoading.value = true;
      const headers = authHeaders();
      // console.log("Searching services with query:", query, "strict:", strict, headers);
      const response = await fetch(`${API_URL}/search/services`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ query, skip, limit, strict }),
      });
      if (!response.ok) throw new Error(response.statusText);
      return await response.json() as ServiceDTO[];
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e);
      return [];
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchDescendantDslValues(catalogType: string, parentValue: string): Promise<string[]> {
    if (catalogs.value.length === 0) await fetchCatalogs();
    const matching = catalogs.value.filter(c => c.catalog_type === catalogType);
    const results: string[] = [];

    function collectLeaves(items: CatalogItemDTO[], capturing: boolean): void {
      for (const item of items) {
        const active = capturing || item.value === parentValue;
        if (active && !(item.children?.length)) {
          results.push(catalogType === 'TEMPORAL' ? String(item.code) : item.value);
        }
        if (item.children?.length) collectLeaves(item.children, active);
      }
    }

    for (const cat of matching) {
      try {
        const resp = await fetch(`${API_URL}/catalogs/${cat.catalog_id}`, { headers: authHeaders() });
        if (!resp.ok) continue;
        const data = await resp.json();
        collectLeaves(data.items ?? [], false);
      } catch { /* skip */ }
    }
    return [...new Set(results)];
  }

  async function generatePlot(query: string, chartType: string, observatoryId?: string): Promise<any> {
    try {
      isLoading.value = true;
      error.value = null;
      const body: Record<string, unknown> = { query, chart_type: chartType };
      if (observatoryId) body.observatory_id = observatoryId;
      const response = await fetch(`${API_URL}/search/plot`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const detail = await response.json().catch(() => ({}));
        throw new Error(detail?.detail ?? response.statusText);
      }
      return await response.json();
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e);
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchDataSources(): Promise<DataSourceDTO[]> {
    try {
      isLoading.value = true;
      const response = await fetch(`${API_URL}/datasources`, { headers: authHeaders() });
      if (!response.ok) throw new Error(response.statusText);
      return await response.json() as DataSourceDTO[];
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e);
      return [];
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchDataSource(sourceId: string): Promise<DataSourceDTO | null> {
    try {
      isLoading.value = true;
      const response = await fetch(`${API_URL}/datasources/${sourceId}`, { headers: authHeaders() });
      if (!response.ok) throw new Error(response.statusText);
      return await response.json() as DataSourceDTO;
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e);
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchTasksStats(): Promise<TasksStatsDTO> {
    try {
      isLoading.value = true;
      const response = await fetch(`${API_URL}/tasks/stats`, { headers: authHeaders() });
      if (!response.ok) throw new Error(response.statusText);
      return await response.json() as TasksStatsDTO;
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e);
      return { pending: 0, running: 0, success: 0, failed: 0 };
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchTasks(skip = 0, limit = 20): Promise<TaskXDTO[]> {
    try {
      isLoading.value = true;
      const response = await fetch(`${API_URL}/tasks?skip=${skip}&limit=${limit}`, { headers: authHeaders() });
      if (!response.ok) throw new Error(response.statusText);
      return await response.json() as TaskXDTO[];
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e);
      return [];
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchTask(taskId: string): Promise<TaskXDTO | null> {
    try {
      isLoading.value = true;
      const response = await fetch(`${API_URL}/tasks/${taskId}`, { headers: authHeaders() });
      if (!response.ok) throw new Error(response.statusText);
      return await response.json() as TaskXDTO;
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e);
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  async function retryTask(taskId: string): Promise<boolean> {
    try {
      isLoading.value = true;
      const response = await fetch(`${API_URL}/tasks/${taskId}/retry`, {
        method: 'PUT',
        headers: authHeaders(),
      });
      if (!response.ok) throw new Error(response.statusText);
      return true;
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e);
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async function queryDataSource(sourceId: string, query: string, limit = 100, skip = 0): Promise<DataRecord[]> {
    try {
      isLoading.value = true;
      const response = await fetch(`${API_URL}/datasources/${sourceId}/query`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ query, limit, skip }),
      });
      if (!response.ok) throw new Error(response.statusText);
      return await response.json() as DataRecord[];
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e);
      return [];
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchProductTagDetails(productId: string): Promise<CatalogItemXResponseDTO[]> {
    const LS_KEY = `jub:tags:${productId}`;
    if (tagDetailsStoreCache.value[productId]) return tagDetailsStoreCache.value[productId];
    const stored = localStorage.getItem(LS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CatalogItemXResponseDTO[];
        tagDetailsStoreCache.value[productId] = parsed;
        return parsed;
      } catch { /* corrupt — fall through */ }
    }
    try {
      const response = await fetch(`${API_URL}/products/${productId}/tags/details`, {
        headers: authHeaders(),
      });
      if (!response.ok) throw new Error(response.statusText);
      const result = await response.json() as CatalogItemXResponseDTO[];
      tagDetailsStoreCache.value[productId] = result;
      localStorage.setItem(LS_KEY, JSON.stringify(result));
      return result;
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e);
      return [];
    }
  }

  async function _downloadWithSignal(
    productId: string,
    signal: AbortSignal,
    onProgress?: (pct: number, received: number) => void,
  ): Promise<{ url: string | null; type: string | null; size: number | null }> {
    const response = await fetch(`${API_URL}/products/${productId}/download`, {
      headers: authHeaders(),
      signal,
    });
    if (!response.ok) throw new Error(response.statusText);
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const total = parseInt(response.headers.get('content-length') ?? '0', 10);
    if (onProgress && response.body) {
      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let received = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        received += value.length;
        const pct = total > 0 ? Math.min(99, Math.round((received / total) * 100)) : -1;
        onProgress(pct, received);
      }
      const blob = new Blob(chunks as BlobPart[], { type: contentType });
      onProgress(100, received);
      return { url: URL.createObjectURL(blob), type: contentType, size: blob.size };
    }
    const blob = await response.blob();
    const type = blob.type || contentType;
    return { url: URL.createObjectURL(blob), type, size: blob.size };
  }

  async function _processQueue(): Promise<void> {
    if (_queueRunning) return;
    _queueRunning = true;
    while (downloadQueue.value.length > 0) {
      const productId = downloadQueue.value.shift()!;
      activeDownloadId.value = productId;
      const controller = new AbortController();
      activeController.value = controller;
      const dlStart = Date.now();
      downloadProgress.value[productId] = -1;
      try {
        const result = await _downloadWithSignal(productId, controller.signal, (pct, receivedBytes) => {
          downloadProgress.value[productId] = pct;
          const elapsed = (Date.now() - dlStart) / 1000;
          if (elapsed >= 1) {
            downloadSpeed.value = Math.round(receivedBytes / elapsed / 1024);
          }
        });
        if (result.url) {
          downloadCache.value[productId] = result;
        } else {
          cancelledDownloads.value[productId] = true;
        }
      } catch (e) {
        cancelledDownloads.value[productId] = true;
      } finally {
        downloadSpeed.value = 0;
        delete downloadProgress.value[productId];
        activeDownloadId.value = null;
        activeController.value = null;
      }
    }
    _queueRunning = false;
  }

  function enqueueDownload(productId: string, meta?: { name: string; extension?: string }): void {
    if (downloadCache.value[productId]?.url) return;
    if (activeDownloadId.value === productId) return;
    if (downloadQueue.value.includes(productId)) return;
    delete cancelledDownloads.value[productId];
    if (meta) downloadMeta.value[productId] = meta;
    downloadQueue.value.push(productId);
    _processQueue();
  }

  function cancelAllDownloads(): void {
    downloadQueue.value.splice(0);
    activeController.value?.abort();
    downloadSpeed.value = 0;
    Object.keys(cancelledDownloads.value).forEach(k => delete cancelledDownloads.value[k]);
  }

  function cancelDownload(productId: string): void {
    const qi = downloadQueue.value.indexOf(productId);
    if (qi !== -1) {
      downloadQueue.value.splice(qi, 1);
      cancelledDownloads.value[productId] = true;
      return;
    }
    if (activeDownloadId.value === productId) {
      activeController.value?.abort();
    }
  }

  async function downloadProduct(
    productId: string,
    onProgress?: (pct: number) => void,
  ): Promise<{ url: string | null; type: string | null; size: number | null }> {
    try {
      const ctrl = new AbortController();
      return await _downloadWithSignal(productId, ctrl.signal, onProgress);
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e);
      return { url: null, type: null, size: null };
    }
  }

  async function fetchSearchSuggestions(
    observatoryId: string,
    limit = 5,
  ): Promise<SearchSuggestionResponseDTO | null> {
    try {
      const params = new URLSearchParams({ observatory_id: observatoryId, limit: String(limit) });
      const res = await fetch(`${API_URL}/search/products/suggestions?${params}`, {
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error(res.statusText);
      return await res.json();
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e);
      return null;
    }
  }

  async function fetchObservatorySuggestions(
    limit = 5,
  ): Promise<ObservatorySuggestionResponseDTO | null> {
    try {
      const params = new URLSearchParams({ limit: String(limit) });
      const res = await fetch(`${API_URL}/search/observatories/suggestions?${params}`, {
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error(res.statusText);
      return await res.json();
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e);
      return null;
    }
  }

    // ── Observatory views & reviews ───────────────────────────────────────────
    async function incrementViews(observatoryId: string): Promise<number> {
      try {
        const res = await fetch(`${API_URL}/observatories/${observatoryId}/view`, {
          method: 'POST',
          headers: authHeaders(),
        });
        if (!res.ok) return 0;
        const data = await res.json();
        return data.view_count ?? 0;
      } catch { return 0; }
    }

    async function getReviews(observatoryId: string): Promise<ReviewDTO[]> {
      try {
        const res = await fetch(`${API_URL}/observatories/${observatoryId}/reviews`, {
          headers: authHeaders(),
        });
        if (!res.ok) return [];
        return await res.json() as ReviewDTO[];
      } catch { return []; }
    }

    async function createReview(observatoryId: string, content: string, rating: number): Promise<ReviewDTO | null> {
      try {
        const res = await fetch(`${API_URL}/observatories/${observatoryId}/reviews`, {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify({ content, rating }),
        });
        if (!res.ok) throw new Error(res.statusText);
        return await res.json() as ReviewDTO;
      } catch { return null; }
    }

    async function updateReview(observatoryId: string, reviewId: string, content?: string, rating?: number): Promise<ReviewDTO | null> {
      try {
        const res = await fetch(`${API_URL}/observatories/${observatoryId}/reviews/${reviewId}`, {
          method: 'PUT',
          headers: authHeaders(),
          body: JSON.stringify({ content, rating }),
        });
        if (!res.ok) throw new Error(res.statusText);
        return await res.json() as ReviewDTO;
      } catch { return null; }
    }

    async function deleteReview(observatoryId: string, reviewId: string): Promise<boolean> {
      try {
        const res = await fetch(`${API_URL}/observatories/${observatoryId}/reviews/${reviewId}`, {
          method: 'DELETE',
          headers: authHeaders(),
        });
        return res.ok || res.status === 204;
      } catch { return false; }
    }

    // ── Observatory catalogs (for Jub Assistant) ──────────────────────────────
    const CATALOG_CACHE_SIZE = 3;
    const _observatoryCatalogsCache = new Map<string, CatalogXDTO[]>();
    const isLoadingObsCatalogs = ref(false);

    async function fetchObservatoryCatalogs(observatoryId: string): Promise<CatalogXDTO[]> {
      const cached = _observatoryCatalogsCache.get(observatoryId);
      if (cached) return cached;

      isLoadingObsCatalogs.value = true;
      try {
        const res = await fetch(`${API_URL}/observatories/${observatoryId}/catalogs`, {
          headers: authHeaders(),
        });
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json() as CatalogXDTO[];
        if (_observatoryCatalogsCache.size >= CATALOG_CACHE_SIZE) {
          const oldest = _observatoryCatalogsCache.keys().next().value;
          if (oldest !== undefined) _observatoryCatalogsCache.delete(oldest);
        }
        _observatoryCatalogsCache.set(observatoryId, data);
        return data;
      } catch (e) {
        error.value = e instanceof Error ? e.message : String(e);
        return [];
      } finally {
        isLoadingObsCatalogs.value = false;
      }
    }

    return {
        get_observatories,
        getObservatory,
        fetchObservatoryStats,
        search,
        search_observatories,
        upload_yaml,
        update_settings,
        get_settings,
        get_notifications,
        mark_notification_as_read,
        mark_all_notifications_as_read,
        convert_theme_to_jub_format,
        isLoading,
        error,
        catalog,
        catalogs,
        catalogItemsCache,
        tagDetailsStoreCache,
        fetchCatalog,
        fetchCatalogs,
        fetchDataSources,
        fetchDataSource,
        queryDataSource,
        fetchTasksStats,
        fetchTasks,
        fetchTask,
        retryTask,
        fetchCatalogItemsByType,
        fetchDescendantDslValues,
        searchServices,
        generatePlot,
        fetchProductTagDetails,
        downloadProduct,
        enqueueDownload,
        cancelDownload,
        cancelAllDownloads,
        downloadQueue,
        activeDownloadId,
        downloadCache,
        downloadProgress,
        cancelledDownloads,
        downloadMeta,
        downloadSpeed,
        isSlowNetwork,
        fetchSearchSuggestions,
        fetchObservatorySuggestions,
        reset,
        incrementViews,
        getReviews,
        createReview,
        updateReview,
        deleteReview,
        fetchObservatoryCatalogs,
        isLoadingObsCatalogs,
    }

})