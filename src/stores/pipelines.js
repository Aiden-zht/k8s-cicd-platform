import { defineStore } from 'pinia'
import { getPipelines, getPipelineRuns, runPipeline } from '../api/pipelines'

export const usePipelineStore = defineStore('pipelines', {
  state: () => ({
    pipelines: [],
    runs: [],
    loading: {
      pipelines: false,
      runs: false
    },
    error: null
  }),
  actions: {
    async fetchPipelines() {
      this.loading.pipelines = true
      this.error = null
      try {
        this.pipelines = await getPipelines()
      } catch (err) {
        this.error = err instanceof Error ? err.message : String(err)
      } finally {
        this.loading.pipelines = false
      }
    },
    async fetchRuns() {
      this.loading.runs = true
      this.error = null
      try {
        this.runs = await getPipelineRuns()
      } catch (err) {
        this.error = err instanceof Error ? err.message : String(err)
      } finally {
        this.loading.runs = false
      }
    },
    async run(id) {
      await runPipeline(id)
      await this.fetchPipelines()
    }
  }
})
