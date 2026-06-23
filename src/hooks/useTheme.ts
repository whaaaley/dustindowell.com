import { ref } from 'vue'

// Global light/dark theme state, mirroring the original site's `theme` boolean.
// Dark is the default; flipping to light adds `class="light"` to <html>, which swaps the CSS custom properties in src/styles/theme.css.
const isLight = ref(false)

const applyTheme = () => {
  // vite-ssg runs this module at build time where document does not exist.
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.classList.toggle('light', isLight.value)
}

const setLight = (value: boolean) => {
  isLight.value = value
  applyTheme()
}

export const useTheme = () => {
  return { isLight, setLight }
}
