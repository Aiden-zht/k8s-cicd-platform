export const clusters = [
  {
    name: 'dev01-1',
    status: 'Running',
    version: 'v1.28.2',
    nodes: 3,
    createdAt: '2026-01-15'
  },
  {
    name: 'dev01-2',
    status: 'Running',
    version: 'v1.28.2',
    nodes: 2,
    createdAt: '2026-02-20'
  },
  {
    name: 'unite-1',
    status: 'Running',
    version: 'v1.27.8',
    nodes: 2,
    createdAt: '2026-03-10'
  }
]

export const nodes = [
  { name: 'node-1', status: 'Ready', roles: ['master'], cpu: '2/4 Core', memory: '4/8 GB' },
  { name: 'node-2', status: 'Ready', roles: ['worker'], cpu: '1/4 Core', memory: '3/8 GB' },
  { name: 'node-3', status: 'Ready', roles: ['worker'], cpu: '2/4 Core', memory: '4/8 GB' }
]
