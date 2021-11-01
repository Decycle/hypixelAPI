import {
  playerStatsApi,
  hypixelServerApi,
} from 'boot/axios.js'
import { Notify } from 'quasar'

export const getPlayerStats = async user => {
  try {
    const resPlayer = await playerStatsApi.get(user)
    console.log(resPlayer.data)
    return resPlayer.data
  } catch (err) {
    Notify.create({
      type: 'negative',
      message: `Player <strong>${user}</strong> not found`,
      html: true,
    })
  }
}

export const getPlayerServerStats = async (uuid, type) => {
  try {
    let resHypixel = await hypixelServerApi.get(type, {
      params: { uuid: uuid },
    })
    return resHypixel.data
  } catch (err) {
    Notify.create({
      type: 'negative',
      message: `Player <strong>${uuid}</strong> not found in hypixel server`,
      html: true,
    })
  }
}

export const getPlayerServerStatsCard = async uuid => {
  try {
    let serverStatsCard = {}
    serverStatsCard.online = (
      await getPlayerServerStats(uuid, 'status')
    ).session.online

    serverStatsCard.player = (
      await getPlayerServerStats(uuid, 'player')
    ).player
    return serverStatsCard
  } catch (err) {
    console.log(err)
  }
}
