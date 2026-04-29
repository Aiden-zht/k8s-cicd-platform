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
      this.error = null
      try {
        this.images = await getImages()
      } catch (err) {
        this.error = err instanceof Error ? err.message : String(err)
      } finally {
        this.loading = false
      }
    }
  }
})
