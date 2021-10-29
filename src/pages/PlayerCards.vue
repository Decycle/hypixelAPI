<template>
  <q-page padding>
    <q-input
      v-model="playerSearchField"
      autofocus
      label="Player Name / UUID"
      class="col"
      @keydown.enter.prevent="searchPlayerCard"
      @blur="searchPlayerCard"
    >
      <template #prepend>
        <q-icon name="mdi-magnify"></q-icon>
      </template>
      <template #append>
        <q-btn
          icon="mdi-plus"
          color="secondary"
          @click="searchPlayerCard"
        ></q-btn>
      </template>
    </q-input>

    <PlayerList />
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useStore } from 'vuex'
import PlayerList from 'components/PlayerList'
import {
  getPlayerStats,
  getPlayerServerStatsCard,
} from 'src/utils/playerStatsUtils'

export default defineComponent({
  name: 'PlayerCards',
  components: {
    PlayerList,
  },
  setup() {
    const $q = useQuasar()
    const $store = useStore()
    const players = computed({
      get: () => $store.state.playerList.players,
      set: players => $store.state.setPlayers(players),
    })

    const playerSearchField = ref('')

    const searchPlayer = async uuid => {
      let playerStats = await getPlayerStats(uuid)
      if (!playerStats) return
      if (
        players.value.some(p => p.uuid === playerStats.uuid)
      ) {
        $q.notify({
          type: 'negative',
          message: `Player <strong>${playerStats.username}</strong> is already in the list`,
          html: true,
        })
        return
      }
      let serverStatsCard = await getPlayerServerStatsCard(
        playerStats.uuid
      )
      playerStats.hypixel = serverStatsCard
      return playerStats
    }

    const searchPlayerCard = async () => {
      if (playerSearchField.value.length <= 0) return
      const playerStats = await searchPlayer(
        playerSearchField.value
      )
      playerSearchField.value = ''
      if (!playerStats) return
      $store.commit('playerList/addPlayer', playerStats)
    }

    let playerUUIDs = $q.localStorage.getItem('playerUUIDs')
    if (!playerUUIDs) {
      $q.localStorage.set('playerUUIDs', [])
      playerUUIDs = []
    }

    // playerUUIDs.forEach(async uuid => {
    //   const playerStats = await searchPlayer(uuid)
    //   if (playerStats) {
    //     const pushIndex = orderedArrayPushIndex(
    //       playerUUIDs,
    //       players.value.map(p => p.uuid),
    //       playerStats.uuid
    //     )
    //     players.value.splice(pushIndex, 0, playerStats)
    //   }
    // })

    return {
      playerSearchField,
      searchPlayerCard,
      players,
    }
  },
})
</script>
