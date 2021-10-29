import { LocalStorage } from 'quasar'

const storeUUIDs = players => {
  LocalStorage.set(
    'playerUUIDs',
    players.map(player => player.uuid)
  )
}

export const setPlayers = (state, players) => {
  state.players = players
  storeUUIDs(state.players)
}

export const addPlayer = (state, player) => {
  state.players.unshift(player)
  storeUUIDs(state.players)
}

export const removePlayer = (state, uuid) => {
  state.players.splice(
    state.players.findIndex(p => p.uuid === uuid),
    1
  )
  storeUUIDs(state.players)
}

export const addPlayerSorted = (state, player) => {}
