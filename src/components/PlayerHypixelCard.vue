<template>
  <q-card class="q-mt-md">
    <q-card-section class="row">
      <div class="col text-primary text-bold">Hypixel</div>
      <div
        :class="[
          hypixel.online
            ? 'text-positive'
            : 'text-negative',
          'col',
        ]"
      >
        {{ hypixel.online ? 'online' : 'offline' }}
      </div>
    </q-card-section>
    <q-card-section v-if="lastLogout">
      Last Online:
      <strong>{{ lastLogout }}</strong>
    </q-card-section>
  </q-card>
</template>

<script>
import { date } from 'quasar'
import { computed, toRefs } from 'vue'

export default {
  name: 'PlayerHypixelCard',
  props: {
    hypixel: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { hypixel } = toRefs(props)

    const { formatDate } = date
    const lastLogout = computed(() =>
      formatDate(
        hypixel.value.player.lastLogout,
        'YYYY-MM-DD'
      )
    )

    return { lastLogout }
  },
}
</script>
