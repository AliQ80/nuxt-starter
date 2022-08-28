import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const firebaseConfig = {
    apiKey: config.FIREBASE_API_KEY,
    authDomain: 'nuxt3-firebase-dc332.firebaseapp.com',
    projectId: 'nuxt3-firebase-dc332',
    storageBucket: 'nuxt3-firebase-dc332.appspot.com',
    messagingSenderId: '312739286586',
    appId: '1:312739286586:web:1f50e148f5e50ed4caef03',
  }

  // Initialize Firebase
  initializeApp(firebaseConfig)
  initUser()

  const auth = getAuth()

  nuxtApp.vueApp.provide('auth', auth)
  nuxtApp.provide('auth', auth)
})
