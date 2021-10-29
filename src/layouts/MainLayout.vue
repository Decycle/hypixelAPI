<template>
  <q-layout view="hHh LpR fFf">
    <q-header
      class="bg-primary text-white color-transition"
    >
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-avatar>
            <img
              src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
            />
          </q-avatar>
          Title
        </q-toolbar-title>
        <q-space />
        <q-toggle
          v-model="darkMode"
          color="secondary"
          label="Dark mode"
        ></q-toggle>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :show-if-above="$q.platform.is.desktop"
      behavior="desktop"
      class="bg-secondary color-transition"
      side="left"
      :mini="$q.platform.is.mobile"
      :width="200"
    >
      <q-list>
        <q-item v-ripple clickable to="player">
          <q-item-section avatar>
            <q-icon
              name="mdi-account"
              size="md"
              color="white"
            ></q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-white text-subtitle1">
              Players
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, watch, defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import { setDarkMode } from 'src/utils/darkModeUtils'

export default defineComponent({
  setup() {
    const $q = useQuasar()

    const leftDrawerOpen = ref(false)
    const darkMode = ref($q.dark.isActive)

    const darkModeWatcher = watch(darkMode, val => {
      setDarkMode(val)
      $q.localStorage.set('darkMode', val)
    })

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      darkMode,
      darkModeWatcher,
    }
  },
})
</script>

<style lang="sass">
.color-transition
  transition: background-color 0.3s linear
</style>
