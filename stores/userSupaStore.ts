import { defineStore, acceptHMRUpdate } from 'pinia'

export const useSupabaseUserStore = defineStore('userSupaStore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      email: '',
      name: '',
      authenticated: false,
      error: '',
      authModalOpen: false,
    }
  },

  getters: {
    getEmail: (state) => state.email,
    getName: (state) => state.name,
    getAuthenticated: (state) => state.authenticated,
    getError: (state) => state.error,
    getAuthModal: (state) => state.authModalOpen,
  },

  actions: {
    authModalOff() {
      this.authModalOpen = false
    },
    authModalOn() {
      this.authModalOpen = true
    },

    reset() {
      this.email = ''
      this.name = ''
      this.authenticated = false
      this.error = ''
      this.authModalOpen = false
    },
  },

  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSupabaseUserStore, import.meta.hot))
}
