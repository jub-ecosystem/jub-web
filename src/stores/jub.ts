import {defineStore} from 'pinia'
import {type CatalogResponseDTO,type CatalogItemAliasDTO,type CatalogItemDTO ,type CatalogSummaryDTO, type Notification,type ObservatoryDTO,type ObservatoryStatsDTO,type ProductXDTO,type UserSettings, type DataSourceDTO, type DataRecord, type TaskXDTO, type TasksStatsDTO, type ServiceDTO, type CatalogItemXResponseDTO, type ReviewDTO} from '@/types/index.types'
// interface Observatory





export const useJubStore = defineStore('jub', () => {
    const catalogs = ref<CatalogSummaryDTO[]>([]);
    const API_URL = import.meta.env.VITE_JUB_API_URL || 'http://localhost:5000/api/v2';
    const isLoading = ref(false)
    const error = ref<string | null>(null );
    const themeMapping: Record<string, 'light' | 'dark'> = {
        'jubThemeLight': 'light',
        'jubThemeDark': 'dark'
    }
    const catalog = ref<CatalogResponseDTO | null>(null);
    const catalogItemsCache = ref<Record<string, Array<{title: string; value: string}>>>({});

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
            const response = await fetch(`${API_URL}/observatories`);
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
    async function search_observatories(query:string,strict:boolean, skip = 0, limit = 24): Promise<ObservatoryDTO[]>{
        try{
            isLoading.value = true;
            const response = await fetch(`${API_URL}/search/observatories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query,strict, skip, limit })
            });
            if(response.ok){
                const data:ObservatoryDTO[] = await response.json();
                console.log("Observatories",data)
                return data;
            }else {
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

    async function search(query:string,observatory_id:string,skip:number,limit:number, strict = false): Promise<ProductXDTO[]>{
        try{
            isLoading.value = true;
            const response = await fetch(`${API_URL}/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query,observatory_id, skip,limit, strict })
            });
            if(response.ok){
                const data:ProductXDTO[] = await response.json();
                return data;
            }else {
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
            const response = await fetch(`${API_URL}/code`, {
                method: 'POST',
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
            const response = await fetch(`${API_URL}/catalogs/${catalogId}`);
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

  async function fetchCatalogItemsByType(type: string, bustCache = false): Promise<Array<{title: string; value: string}>> {
    if (!bustCache && catalogItemsCache.value[type]) return catalogItemsCache.value[type];
    if (catalogs.value.length === 0) await fetchCatalogs();

    const matching = catalogs.value.filter(c => c.catalog_type === type);
    const result: Array<{title: string; value: string}> = [];

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
          const dslValue = type === 'TEMPORAL' ? String(i.code) : i.value;
          if (!seen.has(dslValue)) {
            seen.add(dslValue);
            result.push({ value: dslValue, title: `${i.name} (${dslValue})` });
          }
        }
      } catch {
        // skip failed catalogs silently
      }
    }

    catalogItemsCache.value[type] = result;
    return result;
  }

  async function searchServices(query: string, skip = 0, limit = 100, strict = false): Promise<ServiceDTO[]> {
    try {
      isLoading.value = true;
      const response = await fetch(`${API_URL}/search/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    try {
      const response = await fetch(`${API_URL}/products/${productId}/tags/details`, {
        headers: authHeaders(),
      });
      if (!response.ok) throw new Error(response.statusText);
      return await response.json() as CatalogItemXResponseDTO[];
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e);
      return [];
    }
  }

  async function downloadProduct(productId: string): Promise<{ url: string | null; type: string | null }> {
    try {
      const response = await fetch(`${API_URL}/products/${productId}/download`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Temporal-Secret-Key': `${localStorage.getItem('secret')}`,
        },
      });
      if (!response.ok) throw new Error(response.statusText);
      const blob = await response.blob();
      const type = blob.type || response.headers.get('content-type') || 'application/octet-stream';
      return { url: URL.createObjectURL(blob), type };
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e);
      return { url: null, type: null };
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
        reset,
        incrementViews,
        getReviews,
        createReview,
        updateReview,
        deleteReview,
    }

})