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

    <PLayerCardList />
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import PLayerCardList from 'components/PLayerCardList'

export default defineComponent({
  name: 'PlayerListPage',
  components: {
    PLayerCardList,
  },
  setup() {
    const $store = useStore()
    const playerSearchField = ref('')

    $store.dispatch('playerList/initializePlayers')

    const searchPlayerCard = async () => {
      if (playerSearchField.value.length <= 0) return
      await $store.dispatch('playerList/searchPlayer', {
        identifier: playerSearchField.value,
      })
      playerSearchField.value = ''
    }
    return {
      playerSearchField,
      searchPlayerCard,
    }
  },
})
</script>
