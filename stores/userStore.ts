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
    }
  },

  getters: {
    getUid: (state) => state.uid,
    getEmail: (state) => state.email,
    getName: (state) => state.name,
    getConfirmed: (state) => state.confirmed,
    getError: (state) => state.error,
  },

  actions: {
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
        const {
          data: { user },
          error,
        } = await client.auth.signInWithPassword({
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
        const { data, error } = await client.auth.signInWithOAuth({ provider })
        if (data) {
          // const { data } = await client
          // client.from('profiles')
          // .select('username')
          // .eq('id', user.id)
          // .single()

          // userStore.name = data.username
          // userStore.email = user.email
          userStore.error = ''

          // if (user.role === 'authenticated') {
          //   userStore.confirmed = true
          // }
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
        const { error } = await client.auth.signUp({
          email: value.email,
          password: value.password,
        })
        this.email = value.email
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
      await client.auth.signOut()

      const sbAccessCookie = useCookie('sb-access-token')
      sbAccessCookie.value = null

      const sbRefreshCookie = useCookie('sb-refresh-token')
      sbRefreshCookie.value = null

      this.$reset()
    },
  },

  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSupabaseUserStore, import.meta.hot))
}
