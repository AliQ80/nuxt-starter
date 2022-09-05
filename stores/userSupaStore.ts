import { defineStore, acceptHMRUpdate } from 'pinia'

export const useSupabaseUserStore = defineStore('userSupaStore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      user: {},
      email: '',
      name: '',
      authenticated: false,
      error: '',
    }
  },

  getters: {
    getUser: (state) => state.user,
    getEmail: (state) => state.email,
    getName: (state) => state.name,
    getAuthenticated: (state) => state.authenticated,
    getError: (state) => state.error,
  },

  actions: {},

  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSupabaseUserStore, import.meta.hot))
}
