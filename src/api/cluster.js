import { clusters, nodes } from '../mock/cluster'

export const getClusters = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve([...clusters]), 300)
  })
}

export const getNodes = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve([...nodes]), 300)
  })
}
