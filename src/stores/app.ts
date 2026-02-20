// Utilities
import { defineStore } from 'pinia'
import {ref} from 'vue'

export const useAppStore = defineStore('app', ()=>{
  // State
  const isLoading = ref(false)

  // Actions
  function setIsLoading(value: boolean) {
    isLoading.value = value
  }

  return {
    isLoading,
    setIsLoading,
  }
})
