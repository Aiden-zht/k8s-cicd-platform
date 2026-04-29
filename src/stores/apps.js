import { defineStore } from 'pinia'
import { getApps, getDeployments } from '../api/apps'

export const useAppStore = defineStore('apps', {
  state: () => ({
    apps: [],
    deployments: [],
    loading: {
      apps: false,
      deployments: false
    },
    error: null
  }),
  actions: {
    async fetchApps() {
      this.loading.apps = true
      this.error = null
      try {
        this.apps = await getApps()
      } catch (err) {
        this.error = err instanceof Error ? err.message : String(err)
      } finally {
        this.loading.apps = false
      }
    },
    async fetchDeployments() {
      this.loading.deployments = true
      this.error = null
      try {
        this.deployments = await getDeployments()
      } catch (err) {
        this.error = err instanceof Error ? err.message : String(err)
      } finally {
        this.loading.deployments = false
      }
    }
  }
})
