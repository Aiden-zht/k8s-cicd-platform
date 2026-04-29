import { pipelines, pipelineRuns } from '../mock/pipelines'

export const getPipelines = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve([...pipelines]), 300)
  })
}

export const getPipelineRuns = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve([...pipelineRuns]), 300)
  })
}

export const runPipeline = (id) => {
  return new Promise(resolve => {
    setTimeout(() => resolve({ success: true }), 500)
  })
}
