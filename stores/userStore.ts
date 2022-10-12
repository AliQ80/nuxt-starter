import { defineStore, acceptHMRUpdate } from 'pinia'

export const useSupabaseUserStore = defineStore('userSupaStore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      uid: '',
      email: '',
      name: '',
      confirmed: false,
      error: '',
      authModalOpen: false,
    }
  },

  getters: {
    getUid: (state) => state.uid,
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

    setStore(
      uid: string,
      email: string,
      name: string,
      auth: boolean,
      error: string,
    ) {
      this.uid = uid
      this.email = email
      this.name = name
      this.confirmed = auth
      this.error = error
    },

    resetStore() {
      this.uid = ''
      this.email = ''
      this.name = ''
      this.confirmed = false
      this.error = ''
      this.authModalOpen = false
    },

    async emailLogin(value: { email: string; password: string }) {
      const client = useSupabaseClient()
      try {
        const { user, error } = await client.auth.signIn({
          email: value.email,
          password: value.password,
        })
        if (user) {
          const { data } = await client
            .from('profiles')
            .select('username,id')
            .eq('id', user.id)
            .single()

          this.uid = data.id
          this.name = data.username
          this.email = user.email
          this.error = ''
          if (user.confirmed_at) {
            this.confirmed = true
          }
        }
        if (error) throw error
      } catch (error) {
        this.name = ''
        this.email = ''
        this.error = error.message
        this.confirmed = false
      }
    },

    async providerLogin(provider: 'github' | 'google' | 'apple' | 'discord') {
      const userStore = useSupabaseUserStore()
      const client = useSupabaseClient()

      try {
        const { user, error } = await client.auth.signIn({ provider })
        if (user) {
          const { data } = await client
            .from('profiles')
            .select('username')
            .eq('id', user.id)
            .single()

          userStore.name = data.username
          userStore.email = user.email
          userStore.error = ''

          if (user.role === 'authenticated') {
            userStore.confirmed = true
          }
        }
        if (error) throw error
      } catch (error) {
        userStore.email = ''
        userStore.name = ''
        userStore.error = error.message
        userStore.confirmed = false
      }
    },

    async emailRegister(value: { email: string; password: string }) {
      const client = useSupabaseClient()
      try {
        const { user, error } = await client.auth.signUp({
          email: value.email,
          password: value.password,
        })
        if (user) {
          if (user.confirmed_at) {
            this.email = user.email
            this.error = ''
            this.confirmed = true
          }
          if (user.confirmation_sent_at) {
            this.email = user.email
            this.error = ''
            this.confirmed = false
          }
        }
        if (error) throw error
      } catch (error) {
        this.email = ''
        this.name = ''
        this.error = error.message
        this.confirmed = false
      }
    },

    async logout() {
      const client = useSupabaseClient()

      this.email = ''
      this.name = ''
      this.confirmed = false
      this.error = ''

      await client.auth.signOut()
    },
  },

  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSupabaseUserStore, import.meta.hot))
}
