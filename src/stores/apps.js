import { defineStore } from 'pinia'
import { getApps, getDeployments } from '../api/apps'

export const useAppStore = defineStore('apps', {
  state: () => ({
    apps: [],
    deployments: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchApps() {
      this.loading = true
      try {
        this.apps = await getApps()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async fetchDeployments() {
      this.loading = true
      try {
        this.deployments = await getDeployments()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})
