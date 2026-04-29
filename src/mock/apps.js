export const apps = [
  {
    name: 'nginx-app',
    image: 'nginx:1.25',
    status: 'Running',
    replicas: '3/3',
    createdAt: '2026-03-10'
  },
  {
    name: 'redis-cache',
    image: 'redis:7.2',
    status: 'Running',
    replicas: '1/1',
    createdAt: '2026-03-12'
  }
]

export const deployments = [
  { app: 'nginx-app', version: 'v1.2.0', status: 'Success', time: '2026-04-28 10:30', operator: 'admin' },
  { app: 'nginx-app', version: 'v1.1.9', status: 'Success', time: '2026-04-27 15:20', operator: 'admin' }
]
