import { images } from '../mock/registry'

export const getImages = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve([...images]), 300)
  })
}
