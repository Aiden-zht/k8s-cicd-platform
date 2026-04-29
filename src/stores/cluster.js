import { defineStore } from 'pinia'
import { getClusters, getNodes } from '../api/cluster'

export const useClusterStore = defineStore('cluster', {
  state: () => ({
    clusters: [],
    activeCluster: 'dev01-1',  // 当前选中集群
    nodes: [],
    loading: false,
    error: null
  }),
  actions: {
    setActiveCluster(name) {
      this.activeCluster = name
      // 同步到 URL（不刷新页面）
      const url = new URL(window.location)
      url.searchParams.set('cluster', name)
      window.history.pushState({}, '', url)
    },
    initFromURL() {
      const params = new URLSearchParams(window.location.search)
      const cluster = params.get('cluster')
      if (cluster && this.clusters.find(c => c.name === cluster)) {
        this.activeCluster = cluster
      }
    },
    async fetchClusters() {
      this.loading = true
      try {
        this.clusters = await getClusters()
        this.initFromURL()  // 初始化时从 URL 恢复状态
        // 如果 URL 中没有集群参数，默认选中第一个
        if (!this.activeCluster || !this.clusters.find(c => c.name === this.activeCluster)) {
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
