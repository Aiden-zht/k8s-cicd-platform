import { apps, deployments } from '../mock/apps'

export const getApps = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve([...apps]), 300)
  })
}

export const getDeployments = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve([...deployments]), 300)
  })
}
