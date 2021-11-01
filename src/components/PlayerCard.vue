<template>
  <q-card square class="q-pa-sm q-mt-md player-card">
    <q-card-section horizontal>
      <q-card-section>
        <q-img :src="playerBodyRenderURL" width="100px" />
      </q-card-section>
      <q-card-section class="col-shrink">
        <q-list dense>
          <q-item>
            <q-item-label>
              <div class="text-bold text-subtitle2">
                {{ player.username }}
              </div>
              <div
                :class="[
                  'text-caption',
                  $q.dark.isActive
                    ? 'text-grey-5'
                    : 'text-grey-8',
                ]"
              >
                {{ player.created_at }}
              </div>
            </q-item-label>
          </q-item>
          <q-item v-if="playerNameHistoryText">
            <q-item-label lines="3">
              Previous Names: {{ playerNameHistoryText }}
            </q-item-label>
          </q-item>
          <q-item>
            <q-btn
              color="primary"
              label="Copy UUID"
              no-caps
              @click="copyUUID"
            >
              <q-tooltip v-if="$q.platform.is.desktop">
                Copy UUID to Clipboard
              </q-tooltip>
            </q-btn>
          </q-item>
          <q-item>
            <PlayerHypixelCard
              v-if="player.hypixel.player"
              :hypixel="player.hypixel"
            />
            <div
              v-else
              class="text-negative text-subtitle2"
            >
              Player Record Not Found in Hypixel
            </div>
          </q-item>
        </q-list>
      </q-card-section>
      <q-space />
      <q-btn
        icon="mdi-chevron-right"
        flat
        size="lg"
      ></q-btn>
    </q-card-section>
    <q-btn
      icon="mdi-delete"
      class="absolute delete-btn q-pa-md"
      color="negative"
      flat
      dense
      @click="deleteCard"
    ></q-btn>
  </q-card>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue'
import { copyToClipboard, useQuasar } from 'quasar'
import { useStore } from 'vuex'
import PlayerHypixelCard from 'components/PlayerHypixelCard'

export default defineComponent({
  name: 'PlayerCard',
  components: { PlayerHypixelCard },
  props: {
    player: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const $q = useQuasar()
    const $store = useStore()
    const { player } = toRefs(props)
    const playerBodyRenderURL = computed(
      () =>
        `https://crafatar.com/renders/body/${player.value.uuid}?scale=6&overlay`
    )

    const playerNameHistoryText = computed(() => {
      return Array.from(
        player.value.username_history,
        u => u.username
      )
        .filter(u => u !== player.value.username)
        .join(', ')
    })

    const copyUUID = async () => {
      try {
        await copyToClipboard(player.value.uuid)
        $q.notify({
          type: 'positive',
          message: `${player.value.username}'s UUID copied successfully`,
          group: false,
          timeout: 1000,
        })
      } catch (e) {
        $q.notify({
          type: 'negative',
          message: e.message,
        })
      }
    }

    const deleteCard = () => {
      $store.commit('playerList/removePlayer', {
        uuid: player.value.uuid,
      })
    }

    return {
      playerBodyRenderURL,
      playerNameHistoryText,
      copyUUID,
      deleteCard,
    }
  },
})
</script>

<style lang="sass">
.delete-btn
  top: 15px
  right: 15px
</style>
