import { initialize } from './functions/setupConsistentRepliesByConfig/index.js'

try {
  initialize()
} catch (e) {
  console.error(e)
}