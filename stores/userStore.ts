import { defineStore, acceptHMRUpdate } from 'pinia'

export const useFirebaseUserStore = defineStore('userStore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      user: {},
      email: '',
      name: '',
      verified: false,
      error: '',
    }
  },

  getters: {
    getUser: (state) => state.user,
    getEmail: (state) => state.email,
    getName: (state) => state.name,
    getVerified: (state) => state.verified,
    getError(state) {
      const errorMessage =
        state.error.charAt(5).toUpperCase() +
        state.error.slice(6).replaceAll('-', ' ')
      return errorMessage
    },
  },

  actions: {},

  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFirebaseUserStore, import.meta.hot))
}
