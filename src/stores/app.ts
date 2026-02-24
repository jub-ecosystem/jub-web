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

  function login() {
    setIsLoading(true)
    console.log('Logging in...')
    setIsLoading(false)
  }

  return {
    isLoading,
    setIsLoading,
  }
})
