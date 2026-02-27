<template>
  <v-container class="py-10">
    <div class="text-center mb-10">
      <h1 class="text-h3 font-weight-bold mb-4">Contacta al equipo</h1>
      
      <v-responsive max-width="600" class="mx-auto">
        <v-autocomplete  placeholder="Busca un miembro del equipo..." 
            variant="solo-filled" rounded="pill" flat bg-color="grey-lighten-3" 
                :items="contactStore.members" item-title="name" clearable>
        </v-autocomplete>
        <p class="text-caption text-grey mt-2">
          Si no encuentras con quién comunicarte, escríbenos a 
          <a href="mailto:jub@cinvestav.mx" class="text-grey font-weight-bold text-decoration-none">jub@cinvestav.mx</a>
        </p>
      </v-responsive>
    </div>

    <v-row>
      <v-col v-for="member in contactStore.members" :key="member.id" cols="12" sm="6" md="4">
        <ContactCard :member="member" @show-details="openDialog" />
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


interface Contact {
    id: number;
    name: string;
    phone: string;
    role: string[];
    image: string;
    country: string;
    bio: string;
}

const useTeamStore = defineStore('team', () => {
    const members = ref<Contact[]>([]);

    function initContacts(){
        for (let i = 1; i <= 12; i++) {
          let random_letters = Math.random().toString(36).substring(2, 10);


          const default_contact: Contact = {
            bio:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien eget nunc efficitur varius. Sed at felis ac nisl convallis tincidunt. Curabitur a ligula id enim efficitur commodo.",
            country: "México",
            id: i,
            image: `https://api.dicebear.com/9.x/bottts/svg?seed=${i}`,
            name: `${random_letters} ${i}`,
            phone: `+52 55 1234 567${i}`,
            role: ["Desarrollador", "Diseñador"]
          }
          members.value= [...members.value, default_contact];
          // members+=
      }
  }

    return {
      members,
      initContacts
    }
});

const contactStore      = useTeamStore();
contactStore.initContacts();


// teamStore.members =
const showDialog     = ref(false);
const selectedMember = ref<Contact | null>(null);

const openDialog = (member: Contact) => {
  selectedMember.value = member;
  showDialog.value = true;
};
</script>

<style scoped lang="sass">
</style>