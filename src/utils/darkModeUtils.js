import { Dark } from 'quasar'
import { setCssVar } from 'quasar'

const primaryLightColor = '#856d65'
const secondaryLightColor = '#c2afa5'
const primaryDarkColor = '#574742'
const secondaryDarkColor = '#70645d'

const setColorSceme = () => {
  if (Dark.isActive) {
    setCssVar('primary', primaryDarkColor)
    setCssVar('secondary', secondaryDarkColor)
  } else {
    setCssVar('primary', primaryLightColor)
    setCssVar('secondary', secondaryLightColor)
  }
}

export const setDarkMode = mode => {
  Dark.set(mode)
  setColorSceme()
}
export const linkDarkMode = modeRef => {
  Dark.set(modeRef.value)
  setColorSceme()
}
