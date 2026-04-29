import { defineStore } from 'pinia'
import { getPipelines, getPipelineRuns, runPipeline } from '../api/pipelines'

export const usePipelineStore = defineStore('pipelines', {
  state: () => ({
    pipelines: [],
    runs: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchPipelines() {
      this.loading = true
      try {
        this.pipelines = await getPipelines()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async fetchRuns() {
      this.loading = true
      try {
        this.runs = await getPipelineRuns()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async run(id) {
      await runPipeline(id)
      await this.fetchPipelines()
    }
  }
})
