<template>
  <v-container class="py-10">
    <div class="text-center mb-10">
      <h1 class="text-h3 font-weight-bold mb-4">Contacta al equipo</h1>

      <v-responsive max-width="600" class="mx-auto">
        <v-combobox
          v-model:search="contactStore.searchQuery"
          placeholder="Busca por nombre, institución o área..."
          variant="solo-filled"
          rounded="pill"
          flat
          bg-color="grey-lighten-3"
          :items="contactStore.contacts"
          item-title="name"
          persistent-search
          clearable
          hide-no-data
          :return-object="false"
        />
        <p class="text-caption text-grey mt-2">
          Si no encuentras con quién comunicarte, escríbenos a
          <a href="mailto:jub@cinvestav.mx" class="text-grey font-weight-bold text-decoration-none">jub@cinvestav.mx</a>
        </p>
      </v-responsive>
    </div>

    <!-- Lead card -->
    <template v-if="leadContacts.length">
      <div class="mb-3">
        <v-chip color="primary" variant="tonal" size="small" class="font-weight-bold mb-4">
          Responsable Técnico del Proyecto
        </v-chip>
      </div>
      <v-row class="mb-8" justify="center">
        <v-col
          v-for="lead in leadContacts"
          :key="lead.id"
          cols="12"
          md="10"
        >
          <v-card
            elevation="4"
            rounded="xl"
            class="lead-card overflow-hidden"
          >
            <v-row no-gutters align="center">
              <v-col cols="12" sm="3" class="d-flex justify-center pa-6">
                <v-avatar size="140" style="border: 4px solid #00ABDC;">
                  <v-img :src="lead.image">
                    <template v-slot:error>
                      <div class="d-flex align-center justify-center fill-height bg-grey-lighten-3">
                        <v-icon size="64" color="grey-lighten-1">mdi-account</v-icon>
                      </div>
                    </template>
                  </v-img>
                </v-avatar>
              </v-col>

              <v-col cols="12" sm="9" class="pa-6 pl-sm-0">
                <div class="d-flex flex-wrap ga-2 mb-3">
                  <v-chip color="primary" variant="flat" size="small" class="font-weight-bold">
                    <v-icon start size="14">mdi-star</v-icon>
                    Responsable Técnico
                  </v-chip>
                  <v-chip color="amber-darken-2" variant="tonal" size="small" class="font-weight-bold">
                    SNII {{ lead.snii }}
                  </v-chip>
                  <v-chip color="grey-lighten-3" variant="flat" size="small" class="text-grey-darken-2">
                    CVU {{ lead.cvu }}
                  </v-chip>
                </div>

                <h2 class="text-h5 font-weight-black text-grey-darken-4 mb-1">{{ lead.name }}</h2>

                <div class="d-flex align-center mb-1">
                  <v-icon size="15" color="primary" class="mr-1">mdi-office-building-outline</v-icon>
                  <span class="text-body-2 font-weight-medium text-grey-darken-2">{{ lead.institution }}</span>
                </div>

                <div class="d-flex align-center mb-3">
                  <v-icon size="15" color="grey-darken-1" class="mr-1">mdi-school-outline</v-icon>
                  <span class="text-body-2 text-grey-darken-1">{{ lead.degree }}</span>
                </div>

                <p class="text-body-2 text-grey-darken-2 mb-3" style="line-height: 1.6; max-width: 700px;">
                  {{ lead.bio }}
                </p>

                <div class="d-flex align-center text-caption text-grey-darken-1 mb-3">
                  <v-icon size="14" class="mr-1">mdi-tag-outline</v-icon>
                  {{ lead.area }}
                </div>

                <div v-if="lead.services?.length" class="d-flex flex-wrap ga-1">
                  <v-chip
                    v-for="svc in lead.services"
                    :key="svc"
                    size="x-small"
                    variant="flat"
                    :style="svcStyle(svc)"
                    class="font-weight-bold text-white"
                    label
                  >
                    {{ svc }}
                  </v-chip>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-divider class="mb-8"></v-divider>
    </template>

    <!-- Regular contacts grid -->
    <div v-if="regularContacts.length" class="mb-4">
      <v-chip color="grey-lighten-3" variant="flat" size="small" class="font-weight-bold text-grey-darken-2 mb-4">
        Equipo de Investigación ({{ regularContacts.length }} miembros)
      </v-chip>
    </div>

    <v-row>
      <v-col
        v-for="member in regularContacts"
        :key="member.id"
        cols="12" sm="6" md="4" lg="3"
      >
        <ContactCard :member="member" @show-details="openDialog" />
      </v-col>
    </v-row>

    <v-row v-if="!leadContacts.length && !regularContacts.length" justify="center" class="py-12">
      <v-col cols="12" class="text-center text-grey-darken-1">
        <v-icon size="48" color="grey-lighten-2" class="mb-3">mdi-account-search</v-icon>
        <p class="text-body-1">No se encontraron miembros con ese criterio de búsqueda.</p>
      </v-col>
    </v-row>

    <ContactDialog v-model="showDialog" :member="selectedMember" />
  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useContactStore, type Contact } from '@/stores/contacts';

const svcColors: Record<string, string> = {
  JUB:      '#00ABDC',
  Xelhua:   '#B71C1C',
  Nez:      '#1A237E',
  MictlanX: '#212121',
};
function svcStyle(svc: string) {
  const bg = svcColors[svc] ?? '#616161';
  return { backgroundColor: bg, color: 'white' };
}

definePage({
  name: 'Contact',
  meta: {
    requiresAuth: false,
    layout: 'default',
  },
});

const contactStore = useContactStore();

const leadContacts    = computed(() => contactStore.filteredContacts.filter(c => c.isLead));
const regularContacts = computed(() => contactStore.filteredContacts.filter(c => !c.isLead));

const showDialog     = ref(false);
const selectedMember = ref<Contact | null>(null);

function openDialog(member: Contact) {
  selectedMember.value = member;
  showDialog.value = true;
}
</script>

<style scoped lang="sass">
.lead-card
  border-left: 4px solid #00ABDC
</style>
