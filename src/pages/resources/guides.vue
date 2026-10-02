<template>
  <v-container max-width="1100" class="py-8">

    <!-- Hero -->
    <v-card rounded="xl" elevation="0" class="mb-8 pa-8 text-center" color="primary" theme="dark">
      <v-icon size="52" class="mb-3">mdi-play-circle-outline</v-icon>
      <h1 class="text-h4 font-weight-black mb-2">Videotutoriales</h1>
      <p class="text-body-1 opacity-80">Guías en video para aprender a usar la plataforma JUB y explorar sus observatorios.</p>
    </v-card>

    <!-- Search -->
    <v-row class="mb-4" align="center">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="searchQuery"
          placeholder="Buscar por título o descripción…"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="comfortable"
          hide-details
          clearable
          rounded="lg"
        />
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center">
        <span class="text-body-2 text-grey-darken-1 font-weight-medium">
          {{ filtered.length }} video{{ filtered.length !== 1 ? 's' : '' }}
        </span>
      </v-col>
    </v-row>

    <!-- Grid -->
    <v-row>
      <v-col
        v-for="video in filtered"
        :key="video.driveFileId"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card
          rounded="xl"
          elevation="1"
          hover
          class="h-100 cursor-pointer"
          @click="open(video)"
        >
          <!-- Thumbnail -->
          <v-img
            :src="`https://drive.google.com/thumbnail?id=${video.driveFileId}&sz=w640`"
            aspect-ratio="16/9"
            cover
            rounded="xl xl 0 0"
            class="video-placeholder"
          >
            <template #placeholder>
              <div class="d-flex align-center justify-center fill-height bg-grey-lighten-3">
                <v-progress-circular indeterminate color="primary" />
              </div>
            </template>
            <template #error>
              <div class="d-flex align-center justify-center fill-height w-100 bg-grey-lighten-3">
                <v-icon size="48" color="grey-lighten-1">mdi-video-off-outline</v-icon>
              </div>
            </template>
            <!-- Play overlay -->
            <div class="play-overlay d-flex align-center justify-center fill-height">
              <v-icon size="56" color="white" class="play-icon">mdi-play-circle</v-icon>
            </div>
          </v-img>

          <v-card-text class="pa-4">
            <p class="text-subtitle-2 font-weight-bold mb-1" style="line-height: 1.3;">{{ video.title }}</p>
            <p class="text-caption text-grey-darken-1" style="line-height: 1.4;">{{ video.description }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Empty state -->
    <v-empty-state
      v-if="filtered.length === 0"
      icon="mdi-video-search-outline"
      title="Sin resultados"
      text="Ningún video coincide con la búsqueda actual."
    />

    <!-- Modal -->
    <v-dialog v-model="dialog" max-width="860" scrollable>
      <v-card rounded="xl" v-if="selected">
        <v-toolbar color="primary" density="compact" flat>
          <v-icon class="ml-3 mr-2 flex-shrink-0" size="20" color="white">mdi-play-circle-outline</v-icon>
          <v-toolbar-title class="text-subtitle-2 font-weight-bold">{{ selected.title }}</v-toolbar-title>
          <v-spacer />
          <v-btn icon="mdi-close" color="white" variant="text" @click="dialog = false" />
        </v-toolbar>

        <!-- Embed -->
        <div class="video-wrapper">
          <iframe
            :src="`https://drive.google.com/file/d/${selected.driveFileId}/preview`"
            allow="autoplay"
            allowfullscreen
            frameborder="0"
            class="video-frame"
          />
        </div>

        <v-card-text class="pa-5">
          <p class="text-body-2 text-grey-darken-2" style="line-height: 1.6;">{{ selected.description }}</p>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

definePage({
  name: 'ResourcesGuides',
})

interface GuideVideo {
  driveFileId: string
  title: string
  description: string
}

const videos: GuideVideo[] = [
  {
    driveFileId: '1S_Xvajhp8oyDHOoy29V-yzsKJoYFANlg',
    title: 'Cómo usar el Observatorio RETC',
    description: 'Una guía paso a paso para navegar y aprovechar al máximo el Observatorio RETC en la plataforma Jub.',
  },
  {
    driveFileId: '1Hg0G1wjVLhJ6A5y0yQrCThtvMfmMrIxo',
    title: 'Cómo usar los catálogos de Jub',
    description: 'Una guía paso a paso para navegar y aprovechar los catálogos de Jub en la plataforma.',
  },
  {
    driveFileId:'14hA1up_M_pYMIDMr4Qtgt57S7gHapaJx',
    title:'Cómo usar los elementos de los catálogos',
    description:'Una guia paso a paso para navegar entre los elementos de los catálogos indexados en la plataforma Jub'
  },
  {
    driveFileId:'1N_OUEIhBVI6P7wX6EqN6h8psh05yCt8N',
    title:'Cómo usar el lenguaje de consultas de Jub',
    description:'Una guía paso a paso para aprender a utilizar el lenguaje de consultas de Jub y realizar búsquedas avanzadas en la plataforma.'
  },
  {
    driveFileId:'1qgq1J-OFJgQYFXZFgDnrsXiSOSTPRkTA',
    title:'Como cerrar sesión en Jub',
    description:'Una guia rápida para cerrar sesión en la plataforma Jub desde cualquier dispositivo.'
  },
  {
    driveFileId:'1z8ovUn0fsUlqWBLi1h0n8RzrzqLpFHVW',
    title:'Configuracion de cuenta en Jub',
    description:'Una guia rápida para configurar tu cuenta en la plataforma Jub, incluyendo ajustes de perfil, preferencias y notificaciones.'
  },
  {
    driveFileId:'1XDwDh_AUS0H1bQnasVdnJ6I3-jzQKJJk',
    title:'Como usar las fuentes de datos en Jub',
    description:'Una guia rápida para usar las fuentes de datos en la plataforma Jub, incluyendo cómo acceder, filtrar y exportar datos para tus proyectos de investigación.'
  },
  {
    driveFileId:'1DZT1aacK_K2gUT5-09rs__sXRZsd7mqA',
    title:'Como usar los productos de Jub',
    description:'Una guia rápida para visualizar y descargar los productos disponibles en la plataforma Jub, incluyendo mapas, gráficos y reportes generados a partir de los datos de observación.'
  }


]

const searchQuery = ref('')
const dialog      = ref(false)
const selected    = ref<GuideVideo | null>(null)

const filtered = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return videos
  return videos.filter(v =>
    v.title.toLowerCase().includes(q) ||
    v.description.toLowerCase().includes(q),
  )
})

function open(video: GuideVideo) {
  selected.value = video
  dialog.value   = true
}
</script>

<style scoped>
.video-placeholder{
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  min-height: 150px;
}
/* .video-loading{
  background: green!important;
  display: flex;
  height: 500px;
  width: 100%;
}
.no-thumbnail {
  display: flex;
  height: 400px;
  width: 100%;
  background: red !important;
} */
.play-overlay {
  background: rgba(0, 0, 0, 0.25);
  opacity: 0;
  transition: opacity 0.2s ease;
}
.v-card:hover .play-overlay {
  opacity: 1;
}
.play-icon {
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
}

.video-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 */
  background: #000;
}
.video-frame {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  border: none;
}
</style>
