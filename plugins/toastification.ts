import Toast, { PluginOptions, POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const options: PluginOptions = {
  // You can set your default options here
  position: POSITION.TOP_LEFT,
}
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, options)
})
