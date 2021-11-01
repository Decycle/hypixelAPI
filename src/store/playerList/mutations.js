import { LocalStorage } from 'quasar'

const storeUUIDs = store => {
  store.playerUUIDs = store.players.map(
    player => player.uuid
  )
  LocalStorage.set('playerUUIDs', store.playerUUIDs)
}

export const setPlayers = (store, { players }) => {
  store.players = players
  storeUUIDs(store)
}

export const addPlayer = (store, { player, index }) => {
  if (typeof index === 'number') {
    store.players[index] = player
  } else {
    store.players.unshift(player)
  }
  storeUUIDs(store)
}

export const removePlayer = (store, { uuid }) => {
  store.players.splice(
    store.players.findIndex(p => p.uuid === uuid),
    1
  )
  storeUUIDs(store)
}
