import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// Datos basados en http://localhost:5000/docs
export interface Observatory {
    obid: string;        
    title: string;
    image_url: string;   
    description: string; 
    catalogs: string[];  
}


export const useJubStore = defineStore('jub', () => {
  
    const observatories = ref<Observatory[]>([]);
    const selectedObservatory = ref<Observatory | null>(null);
    const searchQuery = ref('');
    
    
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    
    const filteredObservatories = computed(() => {
        if (!searchQuery.value) return observatories.value;
        
        return observatories.value.filter(obs =>
            obs.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    });

    // GET /observatories: Trae la lista completa
    async function fetchObservatories() {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await fetch('http://localhost:5000/observatories');
            if (!response.ok) throw new Error('Error al conectar con el API');
            
            const data = await response.json();
            console.log("Datos recibidos del API:", data);
            observatories.value = data;
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Error desconocido';
            console.error("Error en fetchObservatories:", err);
        } finally {
            isLoading.value = false;
        }
    }

    // GET /observatories/{obid}: Trae el detalle de uno solo
    async function fetchObservatoryById(obid: string) {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await fetch(`http://localhost:5000/observatories/${obid}`);
            if (!response.ok) throw new Error('No se encontró el observatorio');
            
            const data = await response.json();
            selectedObservatory.value = data;
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Error al cargar detalle';
        } finally {
            isLoading.value = false;
        }
    }

    return {
        observatories,
        selectedObservatory,
        searchQuery,
        isLoading,
        error,
        
        filteredObservatories,
        
        fetchObservatories,
        fetchObservatoryById
    };
});