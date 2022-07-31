import { useFirebaseUserStore } from '~~/stores/userStore'
const firebaseUser = useFirebaseUserStore()

export default defineNuxtRouteMiddleware(() => {
  console.log('running global middleware')
  //   if (firebaseUser.email) {
  //     console.log('contact page')
  //   } else {
  //     return '/'
  //   }
})
