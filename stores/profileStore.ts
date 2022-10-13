import { defineStore, acceptHMRUpdate } from 'pinia'

export const useProfileStore = defineStore('ProfileStore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      username: '',
      firstName: '',
      lastName: '',
      description: '',
      avatarPath: '',
      avatarUrl: '',
      currentAvatar: '',
    }
  },

  getters: {
    getInitials: (state) =>
      state.firstName.charAt(0).concat(state.lastName.charAt(0)),
  },

  actions: {
    // authModalOff() {
    //   this.authModalOpen = false
    // },
    // authModalOn() {
    //   this.authModalOpen = true
    // },
  },

  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot))
}
