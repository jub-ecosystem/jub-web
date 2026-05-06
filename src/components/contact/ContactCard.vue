<template>
  <v-card class="contact-card d-flex flex-column" elevation="2" rounded="xl" height="100%">

    <v-img :src="member.image" height="200" cover class="ma-2 rounded-lg flex-grow-0">
      <template v-slot:error>
        <div class="d-flex align-center justify-center fill-height bg-grey-lighten-3">
          <v-icon size="64" color="grey-lighten-1">mdi-account</v-icon>
        </div>
      </template>
      <template v-slot:default>
        <div class="image-overlay d-flex align-end pa-2">
          <div v-if="member.services?.length" class="d-flex flex-wrap ga-1">
            <v-chip
              v-for="svc in member.services"
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
        </div>
      </template>
    </v-img>

    <v-card-item class="pt-3 pb-1 flex-grow-1">
      <div class="text-subtitle-1 font-weight-bold mb-1" style="line-height: 1.3;">
        {{ member.name }}
      </div>

      <div class="d-flex align-center mb-1">
        <v-icon size="13" color="grey-darken-1" class="mr-1 flex-shrink-0">mdi-office-building-outline</v-icon>
        <span class="text-caption text-grey-darken-1" style="line-height: 1.3;">{{ member.institution }}</span>
      </div>

      <div class="d-flex align-center text-caption text-grey mb-2">
        <v-icon size="13" color="grey" class="mr-1 flex-shrink-0">mdi-tag-outline</v-icon>
        <span class="text-truncate">{{ member.area }}</span>
      </div>

      <div class="d-flex flex-wrap ga-1">
        <v-chip size="x-small" color="primary" variant="tonal" class="font-weight-medium">
          {{ member.role[0] }}
        </v-chip>
        <v-chip v-if="member.snii" size="x-small" color="amber-darken-2" variant="tonal" class="font-weight-bold">
          SNII {{ member.snii }}
        </v-chip>
      </div>
    </v-card-item>

    <v-card-actions class="px-3 pb-3 pt-2">
      <v-btn
        variant="elevated"
        color="primary"
        class="text-none font-weight-bold"
        size="small"
        block
        rounded="lg"
        elevation="0"
        @click="$emit('show-details', member)"
      >
        <v-icon start size="16">mdi-card-account-details-outline</v-icon>
        Ver perfil
        <v-icon end size="14">mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script setup lang="ts">
import type { Contact } from '@/stores/contacts';

defineProps<{ member: Contact }>();
defineEmits(['show-details']);

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
</script>

<style scoped>
.contact-card {
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.contact-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
  transform: translateY(-2px);
}
.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%);
  border-radius: 0 0 8px 8px;
  min-height: 48px;
}
</style>
