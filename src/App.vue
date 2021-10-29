<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import { setDarkMode } from 'src/utils/darkModeUtils'

export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar()
    const darkMode = $q.localStorage.getItem('darkMode')

    if (darkMode === true || darkMode === false) {
      setDarkMode(darkMode)
    } else {
      setDarkMode('auto')
    }
    $q.loadingBar.setDefaults({
      color: 'purple',
      size: '5px',
      position: 'bottom',
    })
  },
})
</script>
