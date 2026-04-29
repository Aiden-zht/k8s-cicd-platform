export const apps = [
  {
    id: 1,
    name: 'nginx-app',
    cluster: 'dev01-1',
    image: 'nginx:1.25',
    status: 'Running',
    replicas: 3,
    createdAt: '2026-03-10',
    yaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.25
        ports:
        - containerPort: 80`,
    logs: `2026-04-29 10:00:00 Starting nginx 1.25
2026-04-29 10:00:01 Listening on port 80
2026-04-29 10:05:23 Connection from 10.0.0.1`
  },
  {
    id: 2,
    name: 'redis-cache',
    cluster: 'dev01-2',
    image: 'redis:7.2',
    status: 'Running',
    replicas: 1,
    createdAt: '2026-03-12',
    yaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis-cache
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
      - name: redis
        image: redis:7.2
        ports:
        - containerPort: 6379`,
    logs: `2026-04-29 09:30:00 Redis 7.2 started
2026-04-29 09:30:01 Ready to accept connections
2026-04-29 10:10:15 Client connected`
  }
]

export const deployments = [
  { app: 'nginx-app', version: 'v1.2.0', status: 'Success', time: '2026-04-28 10:30', operator: 'admin' },
  { app: 'nginx-app', version: 'v1.1.9', status: 'Success', time: '2026-04-27 15:20', operator: 'admin' }
]
