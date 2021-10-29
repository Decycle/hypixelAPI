import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const hypixelServerApiKey = process.env.HYPIXELAPIKEY
const hypixelServerApi = axios.create({
  baseURL: 'https://api.hypixel.net/',
  params: {
    key: hypixelServerApiKey,
  },
  timeout: 3000,
})

const playerStatsApi = axios.create({
  baseURL: 'https://api.ashcon.app/mojang/v2/user/',
  timeout: 3000,
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios

  // app.config.globalProperties.$hypixelApi = hypixelApi
  // app.config.globalProperties.$uuidApi = uuidApi
})

export { hypixelServerApi, playerStatsApi }
