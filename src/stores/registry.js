import { defineStore } from 'pinia'
import { getImages } from '../api/registry'

export const useRegistryStore = defineStore('registry', {
  state: () => ({
    images: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchImages() {
      this.loading = true
      try {
        this.images = await getImages()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})
