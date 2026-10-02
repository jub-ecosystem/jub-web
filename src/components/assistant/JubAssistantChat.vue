<script setup lang="ts">
import type { CatalogXDTO } from '@/types/index.types'
import { useAssistantStore } from '@/stores/assistant'
import { useJubStore } from '@/stores/jub'

let _skipFn: (() => void) | null = null

const assistantStore = useAssistantStore()
const jubStore = useJubStore()

// ── Chat state ────────────────────────────────────────────────────────────────
const currentStep  = ref(0)   // 0=greeting, 1=context, 2=queries, 3=outro
const greetingText = ref('')
const greetingDone = ref(false)
const outroText    = ref('')
const outroDone    = ref(false)

const catalogs        = ref<CatalogXDTO[]>([])
const catalogsLoading = ref(false)
const catalogsFetched = ref(false)

const PAGE_SIZE        = 10
const suggestionsPage  = ref(1)
const popularQueries   = ref<Array<{ query: string; hit_count: number }>>([])
const generatedQueries = ref<string[]>([])
const feedbackGiven    = ref<'useful' | 'not-useful' | null>(null)

let typingTimer: ReturnType<typeof setInterval> | null = null

// ── Typing animation ──────────────────────────────────────────────────────────
function typeMessage(
  target: Ref<string>,
  done: Ref<boolean>,
  fullText: string,
  onComplete: () => void,
) {
  target.value = ''
  done.value   = false
  let i = 0
  typingTimer = setInterval(() => {
    target.value += fullText[i++]
    if (i >= fullText.length) {
      clearInterval(typingTimer!)
      typingTimer = null
      _skipFn     = null
      done.value  = true
      onComplete()
    }
  }, 18)
  _skipFn = () => {
    if (typingTimer) { clearInterval(typingTimer); typingTimer = null }
    target.value = fullText
    done.value   = true
    _skipFn      = null
    onComplete()
  }
}

function skipTyping() { _skipFn?.() }

// ── Reset when observatory changes ────────────────────────────────────────────
watch(() => assistantStore.obsId, () => {
  currentStep.value     = 0
  greetingText.value    = ''
  greetingDone.value    = false
  outroText.value       = ''
  outroDone.value       = false
  catalogs.value        = []
  catalogsLoading.value = false
  catalogsFetched.value = false
  suggestionsPage.value  = 1
  popularQueries.value   = []
  generatedQueries.value = []
  feedbackGiven.value    = null
  if (typingTimer) { clearInterval(typingTimer); typingTimer = null }
})

// ── Step 0: Greeting — starts when drawer/modal opens ────────────────────────
watch(() => assistantStore.isOpen, (val) => {
  if (val && currentStep.value === 0 && !greetingDone.value) {
    startGreeting()
  }
}, { immediate: true })

function startGreeting() {
  // console.log("O TITLE",assistantStore.observatoryTitle, assistantStore.obsId)
  const msg = `¡Hola! Soy el Asistente Jub. Estoy aquí para ayudarte a explorar el observatorio "${assistantStore.observatoryTitle}" y aprovechar al máximo sus datos. 🚀`
  typeMessage(greetingText, greetingDone, msg, () => {
    nextTick(() => { currentStep.value = 1 })
  })
}

// ── Step 1: Observatory context ───────────────────────────────────────────────
async function loadContext() {
  if (catalogsFetched.value) return
  catalogsLoading.value = true
  catalogs.value = await jubStore.fetchObservatoryCatalogs(assistantStore.obsId)
  catalogsLoading.value = false
  catalogsFetched.value = true
}

watch(currentStep, async (step) => {
  if (step === 1) {
    await loadContext()
    await nextTick()
    setTimeout(() => { currentStep.value = 2 }, 400)
  }
  if (step === 2) {
    buildSuggestions()
    setTimeout(() => { currentStep.value = 3 }, 600)
  }
  if (step === 3) {
    const msg = 'Espero que esta información te sea útil. ¡No dudes en volver cuando necesites explorar más datos! 😊'
    typeMessage(outroText, outroDone, msg, () => {})
  }
})

// ── Query generation ──────────────────────────────────────────────────────────
async function buildPopularQueries() {
  if (popularQueries.value.length > 0) return

  // Phase 1: localStorage cache (shared key with observatory page)
  const LS_KEY = `jub:suggestions:${assistantStore.obsId}`
  const cached = localStorage.getItem(LS_KEY)
  if (cached) {
    try {
      const parsed = JSON.parse(cached) as Array<{ query: string; hit_count: number }>
      if (parsed.length) { popularQueries.value = parsed }
    } catch { /* corrupt — fall through */ }
  }

  // Phase 2: fetch fresh from API
  try {
    const res = await jubStore.fetchSearchSuggestions(assistantStore.obsId, 8)
    if (res?.suggestions?.length) {
      popularQueries.value = res.suggestions
      return
    }
  } catch { /* fall through to product-tag fallback */ }

  // Phase 3: fallback — product-tag derived queries with frequency as hit_count
  if (popularQueries.value.length > 0) return  // satisfied by cache already
  const vsSet = new Set(assistantStore.vsItems.map(i => i.value))
  const vtSet = new Set(assistantStore.vtItems.map(i => i.value))
  const viSet = new Set(assistantStore.viItems.map(i => i.value))
  const raw: string[] = []
  for (const product of assistantStore.products.slice(0, 50)) {
    const vsTags: string[] = []
    const vtTags: string[] = []
    const viTags: string[] = []
    for (const tag of product.tags ?? []) {
      if (vsSet.has(tag)) vsTags.push(tag)
      else if (vtSet.has(tag) || /^\d{4}$/.test(tag)) vtTags.push(tag)
      else if (viSet.has(tag) || tag.includes('.')) viTags.push(tag)
    }
    const vs = vsTags.slice(0, 2).join(' OR ') || '*'
    const vt = vtTags[0] || '*'
    const vi = viTags.slice(0, 2).join(' AND ') || '*'
    raw.push(`jub.v1.VS(${vs}).VT(${vt}).VI(${vi})`)
  }
  const freq = new Map<string, number>()
  for (const dsl of raw) freq.set(dsl, (freq.get(dsl) ?? 0) + 1)
  popularQueries.value = [...new Set(raw)]
    .sort((a, b) => (freq.get(b) ?? 0) - (freq.get(a) ?? 0))
    .slice(0, 50)
    .map(q => ({ query: q, hit_count: freq.get(q) ?? 0 }))
}

function buildAdvancedQueries() {
  const seen = new Set<string>()
  const adv: string[] = []
  for (const item of assistantStore.vsItems.slice(0, 5)) {
    const dsl = `jub.v1.VS(${item.value}).VT(*).VI(*)`
    if (!seen.has(dsl)) { seen.add(dsl); adv.push(dsl) }
  }
  for (const item of assistantStore.vtItems.slice(0, 4)) {
    const dsl = `jub.v1.VS(*).VT(${item.value}).VI(*)`
    if (!seen.has(dsl)) { seen.add(dsl); adv.push(dsl) }
  }
  for (const item of assistantStore.viItems.slice(0, 4)) {
    const dsl = `jub.v1.VS(*).VT(*).VI(${item.value})`
    if (!seen.has(dsl)) { seen.add(dsl); adv.push(dsl) }
  }
  generatedQueries.value = adv
}

function buildSuggestions() {
  buildPopularQueries()   // async, fire-and-forget — spinner handles wait
  buildAdvancedQueries()
}

watch(() => assistantStore.products, (val) => {
  if (val.length > 0 && currentStep.value >= 2 && popularQueries.value.length === 0) {
    buildPopularQueries()
  }
})

watch(() => assistantStore.vsItems, (val) => {
  if (val.length > 0 && currentStep.value >= 2 && generatedQueries.value.length === 0) {
    buildAdvancedQueries()
  }
})

const visibleQueries = computed(() =>
  generatedQueries.value.slice(0, suggestionsPage.value * PAGE_SIZE),
)
const hasMore = computed(() =>
  visibleQueries.value.length < generatedQueries.value.length,
)

function giveFeedback(type: 'useful' | 'not-useful') {
  feedbackGiven.value = type
}

function applyQuery(query: string) {
  assistantStore.pendingQuery = query
  assistantStore.isOpen = false
}

onBeforeUnmount(() => {
  if (typingTimer) clearInterval(typingTimer)
})
</script>

<template>
  <div class="jub-chat pa-4">

    <!-- Step 0: Greeting -->
    <v-sheet
      v-if="currentStep >= 0"
      rounded="xl"
      color="grey-lighten-4"
      class="pa-4 mb-4"
      :style="!greetingDone ? 'cursor: pointer' : ''"
      @click="skipTyping"
    >
      <div class="d-flex align-center ga-2 mb-2">
        <v-icon color="primary" size="18">mdi-robot-outline</v-icon>
        <span class="text-caption text-medium-emphasis font-weight-medium">Asistente Jub</span>
      </div>
      <span :class="['typing-cursor', { done: greetingDone }]">{{ greetingText }}</span>
    </v-sheet>

    <!-- Step 1: Observatory context -->
    <template v-if="currentStep >= 1">
      <v-sheet rounded="xl" color="grey-lighten-4" class="pa-4 mb-4">
        <div class="d-flex align-center ga-2 mb-3">
          <v-icon color="primary" size="18">mdi-telescope</v-icon>
          <span class="text-caption text-medium-emphasis font-weight-medium">Contexto del observatorio</span>
        </div>

        <div v-if="catalogsLoading" class="d-flex align-center ga-3 py-2">
          <v-progress-circular indeterminate color="primary" size="20" width="2" />
          <span class="text-body-2 text-medium-emphasis">Cargando información de catálogos…</span>
        </div>

        <template v-else-if="catalogsFetched && catalogs.length === 0">
          <v-empty-state
            icon="mdi-book-off-outline"
            text="No hay catálogos asignados actualmente a este observatorio. Por favor, verifica más tarde o contacta a soporte para más información."
            size="small"
            class="py-2"
          />
        </template>

        <template v-else-if="catalogs.length > 0">
          <p class="text-body-2 mb-3">
            Este observatorio cuenta con los siguientes catálogos disponibles para realizar consultas:
          </p>
          <v-list density="compact" class="bg-transparent pa-0 mb-3">
            <v-list-item
              v-for="cat in catalogs"
              :key="cat.catalog_id"
              :to="`/catalogs/${cat.catalog_id}`"
              rounded="lg"
              class="px-2 mb-1"
            >
              <template #prepend>
                <v-icon size="16" color="primary" class="mr-2">mdi-book-open-variant</v-icon>
              </template>
              <v-list-item-title class="text-body-2 font-weight-medium">{{ cat.name }}</v-list-item-title>
              <v-list-item-subtitle class="text-caption" style="white-space: normal">{{ cat.description }}</v-list-item-subtitle>
              <template #append>
                <v-chip size="x-small" color="primary" variant="tonal" class="ml-2">{{ cat.catalog_type }}</v-chip>
              </template>
            </v-list-item>
          </v-list>

          <div v-if="assistantStore.dataSources.length > 0 || assistantStore.services.length > 0" class="mb-1">
            <p class="text-caption text-medium-emphasis mb-2">Recursos relacionados:</p>
            <div class="d-flex flex-wrap ga-2">
              <v-btn
                v-for="ds in assistantStore.dataSources"
                :key="ds.source_id"
                :to="`/datasources/${ds.source_id}`"
                size="x-small"
                variant="tonal"
                color="teal"
                prepend-icon="mdi-database-outline"
              >
              <span class="text-truncate" style="max-width: 280px; display: inline-block">
              {{ ds.name }}
              
              </span>
            </v-btn>
              <v-btn
                v-for="svc in assistantStore.services"
                :key="svc.service_id"
                :to="{ path: '/external/services', query: { service_id: svc.service_id } }"
                size="x-small"
                variant="tonal"
                color="primary"
                prepend-icon="mdi-cog-outline"
              >
              <span class="text-truncate" style="max-width: 320px; display: inline-block">
              {{ svc.name }}
              </span>
            </v-btn>
              <v-btn
                to="/guides/query"
                size="x-small"
                variant="tonal"
                color="primary"
                prepend-icon="mdi-help-circle-outline"
              >Guía de consultas</v-btn>
            </div>
          </div>
        </template>
      </v-sheet>
    </template>

    <!-- Step 2a: Popular queries -->
    <template v-if="currentStep >= 2">
      <v-sheet rounded="xl" color="grey-lighten-4" class="pa-4 mb-4">
        <div class="d-flex align-center ga-2 mb-3">
          <v-icon color="primary" size="18">mdi-star-outline</v-icon>
          <span class="text-caption text-medium-emphasis font-weight-medium">Búsquedas populares</span>
        </div>

        <div v-if="popularQueries.length === 0" class="d-flex align-center ga-3 py-2">
          <v-progress-circular indeterminate color="primary" size="20" width="2" />
          <span class="text-body-2 text-medium-emphasis">Generando sugerencias…</span>
        </div>

        <template v-else>
          <div
            v-for="(item, index) in popularQueries"
            :key="item.query"
            class="query-item mb-2"
            :style="{ animationDelay: `${index * 60}ms` }"
          >
            <v-sheet
              rounded="lg"
              color="white"
              class="pa-2 px-3 d-flex align-center ga-2 query-chip"
              style="border: 1px solid rgba(0,171,220,0.2); cursor: pointer"
              @click="applyQuery(item.query)"
            >
              <v-icon size="14" color="primary">mdi-magnify</v-icon>
              <code class="text-caption flex-grow-1" style="font-family: monospace; word-break: break-all">
                {{ item.query.length > 42 ? item.query.slice(0, 42) + '…' : item.query }}
              </code>
              <v-chip v-if="item.hit_count > 0" size="x-small" variant="tonal" color="warning" class="flex-shrink-0">
                {{ item.hit_count }}
              </v-chip>
              <v-icon v-else size="14" color="primary" class="flex-shrink-0">mdi-arrow-right</v-icon>
            </v-sheet>
          </div>
        </template>
      </v-sheet>
    </template>

    <!-- Step 2b: Suggested combinations -->
    <template v-if="currentStep >= 2">
      <v-sheet rounded="xl" color="grey-lighten-4" class="pa-4 mb-4">
        <div class="d-flex align-center ga-2 mb-3">
          <v-icon color="primary" size="18">mdi-shuffle-variant</v-icon>
          <span class="text-caption text-medium-emphasis font-weight-medium">Sugerencias de consulta</span>
        </div>

        <div v-if="generatedQueries.length === 0" class="d-flex align-center ga-3 py-2">
          <v-progress-circular indeterminate color="primary" size="20" width="2" />
          <span class="text-body-2 text-medium-emphasis">Generando sugerencias basadas en los datos…</span>
        </div>

        <template v-else>
          <v-chip
            size="x-small"
            variant="tonal"
            color="orange-darken-1"
            prepend-icon="mdi-information-outline"
            class="mb-3"
          >Algunas combinaciones pueden no retornar resultados</v-chip>

          <div
            v-for="(query, index) in visibleQueries"
            :key="query"
            class="query-item mb-2"
            :style="{ animationDelay: `${index * 60}ms` }"
          >
            <v-sheet
              rounded="lg"
              color="white"
              class="pa-2 px-3 d-flex align-center ga-2 query-chip"
              style="border: 1px solid rgba(0,171,220,0.2); cursor: pointer"
              @click="applyQuery(query)"
            >
              <v-icon size="14" color="primary">mdi-magnify</v-icon>
              <code class="text-caption flex-grow-1" style="font-family: monospace; word-break: break-all">{{ query }}</code>
              <v-icon size="14" color="primary" class="flex-shrink-0">mdi-arrow-right</v-icon>
            </v-sheet>
          </div>

          <div v-if="hasMore" class="mt-3 text-center">
            <v-btn variant="tonal" color="primary" size="small" prepend-icon="mdi-chevron-down" @click="suggestionsPage++">
              Ver más
            </v-btn>
          </div>
        </template>
      </v-sheet>
    </template>

    <!-- Step 3: Outro + feedback -->
    <template v-if="currentStep >= 3">
      <v-divider class="mb-4" />

      <v-sheet
        rounded="xl"
        color="grey-lighten-4"
        class="pa-4 mb-4"
        :style="!outroDone ? 'cursor: pointer' : ''"
        @click="skipTyping"
      >
        <div class="d-flex align-center ga-2 mb-2">
          <v-icon color="primary" size="18">mdi-robot-outline</v-icon>
          <span class="text-caption text-medium-emphasis font-weight-medium">Asistente Jub</span>
        </div>
        <span :class="['typing-cursor', { done: outroDone }]">{{ outroText }}</span>
      </v-sheet>

      <div v-if="outroDone" class="text-center mb-4">
        <p class="text-body-2 text-medium-emphasis mb-3">¿Te fue útil esta información?</p>
        <div class="d-flex justify-center ga-3">
          <v-btn
            :variant="feedbackGiven === 'useful' ? 'flat' : 'tonal'"
            :color="feedbackGiven === 'useful' ? 'success' : 'default'"
            :disabled="feedbackGiven !== null && feedbackGiven !== 'useful'"
            size="small"
            prepend-icon="mdi-thumb-up-outline"
            @click="giveFeedback('useful')"
          >Útil</v-btn>
          <v-btn
            :variant="feedbackGiven === 'not-useful' ? 'flat' : 'tonal'"
            :color="feedbackGiven === 'not-useful' ? 'error' : 'default'"
            :disabled="feedbackGiven !== null && feedbackGiven !== 'not-useful'"
            size="small"
            prepend-icon="mdi-thumb-down-outline"
            @click="giveFeedback('not-useful')"
          >No útil</v-btn>
        </div>
        <p v-if="feedbackGiven" class="text-caption text-medium-emphasis mt-2">
          {{ feedbackGiven === 'useful' ? '¡Gracias por tu comentario! 😊' : 'Gracias, trabajaremos para mejorar. 🙏' }}
        </p>
      </div>
    </template>

  </div>
</template>

<style scoped>
.jub-chat { min-height: 100%; }

.typing-cursor::after {
  content: '';
  display: inline-block;
  width: 2px;
  height: 1em;
  background: currentColor;
  margin-left: 2px;
  vertical-align: text-bottom;
  animation: blink-cursor 1s step-end infinite;
}
.typing-cursor.done::after { display: none; }

@keyframes blink-cursor {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

.query-chip:hover {
  background-color: rgba(0, 171, 220, 0.06) !important;
}

.query-item {
  opacity: 0;
  animation: fade-in-up 0.3s ease forwards;
}
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
