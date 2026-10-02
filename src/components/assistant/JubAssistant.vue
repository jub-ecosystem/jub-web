<script setup lang="ts">
import type { ProductXDTO, ServiceSummaryDTO, DataSourceSummaryDTO } from '@/types/index.types'
import { useAssistantStore } from '@/stores/assistant'

const props = defineProps<{
  obsId: string
  observatoryTitle: string
  vsItems: Array<{ title: string; value: string }>
  vtItems: Array<{ title: string; value: string }>
  viItems: Array<{ title: string; value: string }>
  products: ProductXDTO[]
  services: ServiceSummaryDTO[]
  dataSources: DataSourceSummaryDTO[]
}>()

const assistantStore = useAssistantStore()

let tooltipInterval: ReturnType<typeof setInterval> | null = null
let tooltipHideTimer: ReturnType<typeof setTimeout> | null = null

// Sync products live (changes on every search)
watch(() => props.products, (val) => { assistantStore.products = val }, { immediate: true })

// Sync observatory identity — arrives async (getObservatory resolves after JubAssistant mounts)
watch(() => props.observatoryTitle, (val) => { if (val) assistantStore.observatoryTitle = val })
watch(() => props.obsId,            (val) => { if (val) assistantStore.obsId = val })

// Sync catalog items and observatory relations (loaded once after mount)
watch(
  () => [props.vsItems, props.vtItems, props.viItems, props.services, props.dataSources] as const,
  () => {
    assistantStore.vsItems     = props.vsItems
    assistantStore.vtItems     = props.vtItems
    assistantStore.viItems     = props.viItems
    assistantStore.services    = props.services
    assistantStore.dataSources = props.dataSources
  },
  { immediate: true },
)

function startTooltipCycle() {
  tooltipInterval = setInterval(() => {
    if (!assistantStore.isOpen) {
      assistantStore.showTooltip = true
      tooltipHideTimer = setTimeout(() => { assistantStore.showTooltip = false }, 8000)
    }
  }, 60_000)
}

function clearTimers() {
  if (tooltipInterval)  { clearInterval(tooltipInterval);  tooltipInterval  = null }
  if (tooltipHideTimer) { clearTimeout(tooltipHideTimer);  tooltipHideTimer = null }
}

watch(() => assistantStore.isOpen, (val) => {
  if (val) { assistantStore.showTooltip = false }
})

onMounted(() => {
  assistantStore.register({
    obsId:            props.obsId,
    observatoryTitle: props.observatoryTitle,
    vsItems:          props.vsItems,
    vtItems:          props.vtItems,
    viItems:          props.viItems,
    services:         props.services,
    dataSources:      props.dataSources,
  })
  startTooltipCycle()
})

onBeforeUnmount(() => {
  clearTimers()
  assistantStore.unregister()
})
</script>

<template><!-- registration-only: button lives in the app bar (dashboard layout) --></template>
