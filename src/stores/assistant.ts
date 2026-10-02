import { defineStore } from 'pinia'
import type { ProductXDTO, ServiceSummaryDTO, DataSourceSummaryDTO } from '@/types/index.types'

export const useAssistantStore = defineStore('assistant', () => {
  const isOpen      = ref(false)
  const isAvailable = ref(false)
  const showTooltip = ref(false)
  const pendingQuery = ref<string | null>(null)

  const obsId            = ref('')
  const observatoryTitle = ref('')
  const vsItems          = ref<Array<{ title: string; value: string }>>([])
  const vtItems          = ref<Array<{ title: string; value: string }>>([])
  const viItems          = ref<Array<{ title: string; value: string }>>([])
  const products         = ref<ProductXDTO[]>([])
  const services         = ref<ServiceSummaryDTO[]>([])
  const dataSources      = ref<DataSourceSummaryDTO[]>([])

  function register(data: {
    obsId: string
    observatoryTitle: string
    vsItems: Array<{ title: string; value: string }>
    vtItems: Array<{ title: string; value: string }>
    viItems: Array<{ title: string; value: string }>
    services: ServiceSummaryDTO[]
    dataSources: DataSourceSummaryDTO[]
  }) {
    obsId.value            = data.obsId
    observatoryTitle.value = data.observatoryTitle
    vsItems.value          = data.vsItems
    vtItems.value          = data.vtItems
    viItems.value          = data.viItems
    services.value         = data.services
    dataSources.value      = data.dataSources
    isAvailable.value      = true
  }

  function unregister() {
    isAvailable.value  = false
    isOpen.value       = false
    showTooltip.value  = false
    pendingQuery.value = null
    obsId.value        = ''
    observatoryTitle.value = ''
    vsItems.value      = []
    vtItems.value      = []
    viItems.value      = []
    products.value     = []
    services.value     = []
    dataSources.value  = []
  }

  return {
    isOpen,
    isAvailable,
    showTooltip,
    obsId,
    observatoryTitle,
    vsItems,
    vtItems,
    viItems,
    products,
    services,
    dataSources,
    pendingQuery,
    register,
    unregister,
  }
})
