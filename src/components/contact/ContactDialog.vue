<template>
  <v-dialog v-model="internalModel" max-width="540">
    <v-card rounded="xl" class="pa-2">

      <v-img :src="member?.image" height="200" cover class="ma-2 rounded-lg">
        <template v-slot:error>
          <div class="d-flex align-center justify-center fill-height bg-grey-lighten-3">
            <v-icon size="64" color="grey-lighten-1">mdi-account</v-icon>
          </div>
        </template>
      </v-img>

      <v-card-text class="pt-4 pb-2">
        <h2 class="text-h5 font-weight-bold mb-1">{{ member?.name }}</h2>

        <div class="d-flex align-center mb-1">
          <v-icon size="15" color="grey-darken-1" class="mr-1">mdi-office-building-outline</v-icon>
          <span class="text-body-2 text-grey-darken-1">{{ member?.institution }}</span>
        </div>

        <div class="d-flex align-center mb-3">
          <v-icon size="15" color="grey-darken-1" class="mr-1">mdi-school-outline</v-icon>
          <span class="text-body-2 text-grey-darken-1">{{ member?.degree }}</span>
        </div>

        <div class="d-flex flex-wrap ga-2 mb-2">
          <v-chip
            v-for="role in member?.role"
            :key="role"
            size="small"
            color="primary"
            variant="tonal"
            class="font-weight-medium"
          >
            {{ role }}
          </v-chip>
          <v-chip
            v-if="member?.snii"
            size="small"
            color="amber-darken-2"
            variant="tonal"
            class="font-weight-bold"
          >
            SNII {{ member.snii }}
          </v-chip>
        </div>

        <div v-if="member?.services?.length" class="d-flex flex-wrap ga-1 mb-3">
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

        <v-divider class="mb-3"></v-divider>

        <p class="text-body-2 text-grey-darken-2 text-justify mb-3" style="line-height: 1.6;">
          {{ member?.bio }}
        </p>

        <v-divider class="mb-3"></v-divider>

        <v-row dense class="text-caption text-grey-darken-1">
          <v-col cols="12" sm="6" v-if="member?.area">
            <div class="d-flex align-start">
              <v-icon size="14" class="mr-1 mt-1" color="grey">mdi-tag-outline</v-icon>
              <span><strong>Área:</strong> {{ member.area }}</span>
            </div>
          </v-col>
          <v-col cols="6" sm="3" v-if="member?.duration">
            <div class="d-flex align-center">
              <v-icon size="14" class="mr-1" color="grey">mdi-clock-outline</v-icon>
              <span>{{ member.duration }}</span>
            </div>
          </v-col>
          <v-col cols="6" sm="3" v-if="member?.cvu">
            <div class="d-flex align-center">
              <v-icon size="14" class="mr-1" color="grey">mdi-identifier</v-icon>
              <span>CVU {{ member.cvu }}</span>
            </div>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="justify-end px-4 pb-3">
        <v-btn variant="text" color="grey" class="text-none" @click="internalModel = false">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Contact } from '@/stores/contacts';

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

const props = defineProps<{ modelValue: boolean; member: Contact | null }>();
const emit = defineEmits(['update:modelValue']);

const internalModel = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>
