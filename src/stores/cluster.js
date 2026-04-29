import { defineStore } from 'pinia'
import { getClusters, getNodes } from '../api/cluster'

export const useClusterStore = defineStore('cluster', {
  state: () => {
    const params = new URLSearchParams(window.location.search)
    const clusterFromURL = params.get('cluster')
    const savedCluster = sessionStorage.getItem('activeCluster')
    console.log('cluster store state init, location.search:', window.location.search, 'clusterFromURL:', clusterFromURL, 'savedCluster:', savedCluster)
    return {
      clusters: [],
      activeCluster: clusterFromURL || savedCluster || 'dev01-1',
      nodes: [],
      loading: false,
      error: null
    }
  },
  actions: {
    setActiveCluster(name) {
      console.log('setActiveCluster called with:', name, 'current:', this.activeCluster)
      this.activeCluster = name
      sessionStorage.setItem('activeCluster', name)
      const url = new URL(window.location)
      url.searchParams.set('cluster', name)
      window.history.pushState({}, '', url)
      console.log('after setActiveCluster, activeCluster:', this.activeCluster)
    },
    async fetchClusters() {
      console.log('fetchClusters called, activeCluster:', this.activeCluster)
      this.loading = true
      try {
        this.clusters = await getClusters()
        console.log('after fetchClusters, clusters:', this.clusters.length, 'activeCluster:', this.activeCluster)
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
