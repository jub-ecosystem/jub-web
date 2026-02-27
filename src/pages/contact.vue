<template>
  <v-container class="py-10">
    <div class="text-center mb-10">
      <h1 class="text-h3 font-weight-bold mb-4">Contacta al equipo</h1>
      
      <v-responsive max-width="600" class="mx-auto">
        <v-autocomplete v-model="teamStore.search" placeholder="Busca un miembro del equipo..." 
            variant="solo-filled" rounded="pill" flat bg-color="grey-lighten-3" 
                :items="teamStore.members" item-title="name" clearable>
        </v-autocomplete>
        <p class="text-caption text-grey mt-2">
          Si no encuentras con quién comunicarte, escríbenos a 
          <a href="mailto:jub@cinvestav.mx" class="text-grey font-weight-bold text-decoration-none">jub@cinvestav.mx</a>
        </p>
      </v-responsive>
    </div>

    <v-row>
      <v-col v-for="member in teamStore.filteredMembers" :key="member.id" cols="12" sm="6" md="4">
        <ContactCard :member="member" />
      </v-col>
    </v-row>

    <ContactDialog v-model="showDialog" :member="selectedMember" />
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { defineStore } from 'pinia';

definePage({
    name: 'Contact',
    meta: {
        requiresAuth: false,
        layout: 'default',
    },
});

//Datos Falsos de Ejemplo
const useTeamStore = defineStore('team', {
  state: () => ({
    search: null as string | null,
    members: [
      { 
        id: 1, 
        name: 'FirtName LastName', 
        phone: '+00 0000 0000 000', 
        role: ['Researcher', 'Storage', 'MictlanX'], 
        image: new URL('@/assets/images/Perfil.png', import.meta.url).href,
        country: new URL('@/assets/images/Bandera.png', import.meta.url).href,
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus nulla nunc,'
        + 'non tincidunt turpis interdum eu. Nullam malesuada dignissim risus, nec iaculis dolor egestas sed.' 
        + 'Donec rhoncus augue eu quam sagittis vestibulum eget at nunc. Aenean efficitur felis sed eros gravida,'
        + 'ac pharetra augue consectetur.'
      },
      { 
        id: 2, 
        name: 'FirtName LastName', 
        phone: '+00 0000 0000 000', 
        role: ['Researcher', 'Storage', 'MictlanX'], 
        image: new URL('@/assets/images/Perfil.png', import.meta.url).href,
        country: new URL('@/assets/images/Bandera.png', import.meta.url).href,
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus nulla nunc,'
        + 'non tincidunt turpis interdum eu. Nullam malesuada dignissim risus, nec iaculis dolor egestas sed.' 
        + 'Donec rhoncus augue eu quam sagittis vestibulum eget at nunc. Aenean efficitur felis sed eros gravida,'
        + 'ac pharetra augue consectetur.'
      },
      { 
        id: 3, 
        name: 'FirtName LastName', 
        phone: '+00 0000 0000 000', 
        role: ['Researcher', 'Storage', 'MictlanX'], 
        image: new URL('@/assets/images/Perfil.png', import.meta.url).href,
        country: new URL('@/assets/images/Bandera.png', import.meta.url).href,
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus nulla nunc,'
        + 'non tincidunt turpis interdum eu. Nullam malesuada dignissim risus, nec iaculis dolor egestas sed.' 
        + 'Donec rhoncus augue eu quam sagittis vestibulum eget at nunc. Aenean efficitur felis sed eros gravida,'
        + 'ac pharetra augue consectetur.'
      },
      { 
        id: 4, 
        name: 'FirtName LastName', 
        phone: '+00 0000 0000 000', 
        role: ['Researcher', 'Storage', 'MictlanX'], 
        image: new URL('@/assets/images/Perfil.png', import.meta.url).href,
        country: new URL('@/assets/images/Bandera.png', import.meta.url).href,
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus nulla nunc,'
        + 'non tincidunt turpis interdum eu. Nullam malesuada dignissim risus, nec iaculis dolor egestas sed.' 
        + 'Donec rhoncus augue eu quam sagittis vestibulum eget at nunc. Aenean efficitur felis sed eros gravida,'
        + 'ac pharetra augue consectetur.'
      },      
      { 
        id: 5, 
        name: 'FirtName LastName', 
        phone: '+00 0000 0000 000', 
        role: ['Researcher', 'Storage', 'MictlanX'], 
        image: new URL('@/assets/images/Perfil.png', import.meta.url).href,
        country: new URL('@/assets/images/Bandera.png', import.meta.url).href,
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus nulla nunc,'
        + 'non tincidunt turpis interdum eu. Nullam malesuada dignissim risus, nec iaculis dolor egestas sed.' 
        + 'Donec rhoncus augue eu quam sagittis vestibulum eget at nunc. Aenean efficitur felis sed eros gravida,'
        + 'ac pharetra augue consectetur.'
      },
      { 
        id: 6, 
        name: 'FirtName LastName', 
        phone: '+00 0000 0000 000', 
        role: ['Researcher', 'Storage', 'MictlanX'], 
        image: new URL('@/assets/images/Perfil.png', import.meta.url).href,
        country: new URL('@/assets/images/Bandera.png', import.meta.url).href,
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent maximus nulla nunc,'
        + 'non tincidunt turpis interdum eu. Nullam malesuada dignissim risus, nec iaculis dolor egestas sed.' 
        + 'Donec rhoncus augue eu quam sagittis vestibulum eget at nunc. Aenean efficitur felis sed eros gravida,'
        + 'ac pharetra augue consectetur.'
      },                  
    ]
  }),
  getters: {
    filteredMembers: (state) => {
      if (!state.search) return state.members;
      return state.members.filter(m => 
        m.name.toLowerCase().includes(state.search!.toLowerCase())
      );
    }
  }
});

const teamStore = useTeamStore();
const showDialog = ref(false);
const selectedMember = ref(null);

const openDialog = (member: any) => {
  selectedMember.value = member;
  showDialog.value = true;
};
</script>

<style scoped lang="sass">
</style>