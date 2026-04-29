export const pipelines = [
  {
    id: 1,
    name: 'frontend-ci',
    status: 'Success',
    lastRun: '2026-04-29 08:00',
    duration: '3m 20s'
  },
  {
    id: 2,
    name: 'backend-ci',
    status: 'Running',
    lastRun: '2026-04-29 09:15',
    duration: '-'
  }
]

export const pipelineRuns = [
  { id: 1, pipeline: 'frontend-ci', status: 'Success', branch: 'main', time: '2026-04-29 08:00', duration: '3m 20s' },
  { id: 2, pipeline: 'frontend-ci', status: 'Failed', branch: 'dev', time: '2026-04-28 16:30', duration: '1m 45s' }
]
