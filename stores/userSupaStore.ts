import { defineStore, acceptHMRUpdate } from 'pinia'

export const useSupabaseUserStore = defineStore('userSupaStore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      email: '',
      name: '',
      confirmed: false,
      error: '',
      authModalOpen: false,
    }
  },

  getters: {
    getEmail: (state) => state.email,
    getName: (state) => state.name,
    getConfirmed: (state) => state.confirmed,
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
      this.confirmed = false
      this.error = ''
      this.authModalOpen = false
    },
    setStore(email: string, name: string, auth: boolean, error: string) {
      this.email = email
      this.name = name
      this.confirmed = auth
      this.error = error
    },
  },

  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSupabaseUserStore, import.meta.hot))
}
