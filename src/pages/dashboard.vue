<template>
  <v-container class="py-10">
    <div class="text-center mb-10">
      
      <v-responsive max-width="700" class="mx-auto">
        <v-row no-gutters align="center">
          
          <v-col>
            <v-combobox
              v-model:search="observatoriesStore.searchQuery"
              placeholder="Busca un observatorio..." 
              variant="solo-filled" 
              rounded="pill" 
              flat 
              bg-color="grey-lighten-3"  
              :items="observatoriesStore.filteredObservatories" 
              item-title="title"
              persistent-search
              clearable
              hide-no-data
              :return-object="false"
            >
              <template v-slot:append-inner>
                <v-icon color="grey-darken-1">mdi-tune</v-icon>
              </template>
            </v-combobox>
          </v-col>

          <v-col cols="auto" class="d-flex ml-4">
            <v-btn 
              icon="mdi-view-grid" 
              variant="text" 
              :color="viewMode === 'grid' ? 'primary' : 'grey-darken-3'" 
              @click="viewMode = 'grid'"
              class="mr-1"
            ></v-btn>
            <v-btn 
              icon="mdi-view-list" 
              variant="text" 
              :color="viewMode === 'table' ? 'primary' : 'grey-darken-3'" 
              @click="viewMode = 'table'"
            ></v-btn>
          </v-col>
        </v-row>

        <p class="text-subtitle-2 text-grey-darken-1 mt-3">
          ¿Como realizar busquedas usando identificadores? 
        </p>
      </v-responsive>      
    </div>

    <v-progress-linear v-if="observatoriesStore.isLoading" indeterminate color="primary"></v-progress-linear>

    <v-alert v-if="observatoriesStore.error" type="error" class="mb-5">
      {{ observatoriesStore.error }}
    </v-alert>

    <v-row v-if="viewMode === 'grid'">
        <v-col v-for="observatory in observatoriesStore.filteredObservatories" 
            :key="observatory.obid" cols="12" sm="6" md="6">
            <ObservatoryCard :observatory="observatory" @show-details="openDialog" />
        </v-col>        
    </v-row>

    <v-row v-else-if="viewMode === 'table'">
      <v-col cols="12">
        <ObservatoryTables :items="observatoriesStore.filteredObservatories" @show-details="openDialog" />
      </v-col>
    </v-row>    

    <ObservatoryDialog v-model="showDialog" :observatory="selectedobservatory" />
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useJubStore, type Observatory } from '@/stores/observatories';

definePage({
  name: 'Dashboard',
  meta: {
    requiresAuth: false,
    layout: 'dashboard',
  },
});

const observatoriesStore = useJubStore();
//dashboardStore.initObservatory();
onMounted(() => {
  observatoriesStore.fetchObservatories();
});

const viewMode = ref<'grid' | 'table'>('grid');
const showDialog = ref(false);
const selectedobservatory = ref<Observatory | null>(null);

const openDialog = (observatory: Observatory) => {
  selectedobservatory.value = observatory;
  showDialog.value = true;
};
</script>