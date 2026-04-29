import { defineStore } from 'pinia'
import { getClusters, getNodes } from '../api/cluster'

export const useClusterStore = defineStore('cluster', {
  state: () => {
    const params = new URLSearchParams(window.location.search)
    const clusterFromURL = params.get('cluster')
    return {
      clusters: [],
      activeCluster: clusterFromURL || 'dev01-1',
      nodes: [],
      loading: false,
      error: null
    }
  },
  actions: {
    setActiveCluster(name) {
      this.activeCluster = name
      const url = new URL(window.location)
      url.searchParams.set('cluster', name)
      window.history.pushState({}, '', url)
    },
    async fetchClusters() {
      this.loading = true
      try {
        this.clusters = await getClusters()
        if (!this.clusters.find(c => c.name === this.activeCluster)) {
          this.activeCluster = this.clusters[0]?.name || ''
        }
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
