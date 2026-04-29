import { defineStore } from 'pinia'
import { getClusters, getNodes } from '../api/cluster'

export const useClusterStore = defineStore('cluster', {
  state: () => ({
    clusters: [],
    nodes: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchClusters() {
      this.loading = true
      try {
        this.clusters = await getClusters()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async fetchNodes() {
      this.loading = true
      try {
        this.nodes = await getNodes()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})
