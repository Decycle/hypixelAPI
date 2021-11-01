import { Notify, LocalStorage } from 'quasar'
import {
  getPlayerStats,
  getPlayerServerStatsCard,
} from 'src/utils/playerStatsUtils'

export const searchPlayer = async (
  { commit, state },
  { identifier, index }
) => {
  let player = await getPlayerStats(identifier)
  if (!player) return
  if (state.players.some(p => p.uuid === player.uuid)) {
    Notify.create({
      type: 'negative',
      message: `Player <strong>${playerStats.username}</strong> is already in the list`,
      html: true,
    })
    return
  }
  let playerServer = await getPlayerServerStatsCard(
    player.uuid
  )

  player.hypixel = playerServer
  commit('addPlayer', { player: player, index: index })
}

export const initializePlayers = async ({ dispatch }) => {
  let playerUUIDs =
    LocalStorage.getItem('playerUUIDs') ?? []
  console.log(playerUUIDs)
  playerUUIDs.forEach(async (uuid, index) => {
    dispatch('searchPlayer', {
      identifier: uuid,
      index: index,
    })
  })
}

// export const orderedArrayPushIndex = (
//   originalArray,
//   currentArray,
//   newItem
// ) => {
//   const newItemIndex = originalArray.indexOf(newItem)
//   let insertIndex = currentArray.length
//   for (let [index, item] of currentArray.entries()) {
//     const itemIndex = originalArray.indexOf(item)
//     if (newItemIndex < itemIndex) {
//       insertIndex = index
//       break
//     }
//   }
//   return insertIndex
// }
