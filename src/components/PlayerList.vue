<template>
  <draggable
    v-model="players"
    tag="transition-group"
    :component-data="{
      tag: 'div',
      type: 'transition-group',
      name: !playerCardDrag ? 'flip-list' : null,
    }"
    item-key="uuid"
    @start="playerCardDrag = true"
    @end="playerCardDrag = false"
  >
    <template #item="{ element }">
      <PlayerCard :player="element" />
    </template>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import PlayerCard from 'components/PlayerCard'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'PlayerList',
  components: {
    PlayerCard,
    draggable,
  },
  setup() {
    const $store = useStore()
    const players = computed({
      get: () => $store.state.playerList.players,
      set: players => $store.state.setPlayers(players),
    })
    const playerCardDrag = ref(false)
    return {
      playerCardDrag,
      players,
    }
  },
}
</script>
