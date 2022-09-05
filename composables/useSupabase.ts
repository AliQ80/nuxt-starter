/* eslint-disable no-console */
import type { User } from '@supabase/gotrue-js'
import { useSupabaseUserStore } from '~~/stores/userSupaStore'

export const useAuth = () => {
  const { $supabase } = useNuxtApp()
  const user = useState<User | null>('user')

  $supabase.auth.onAuthStateChange((event: string) => {
    if (event === 'SIGNED_IN') {
      user.value = $supabase.auth.user()
    }

    if (event === 'SIGNED_OUT') {
      user.value = null
    }
  })
}

export const emailLogin = async (value: {
  email: string
  password: string
}) => {
  const supabaseUser = useSupabaseUserStore()
  const client = useSupabaseClient()

  try {
    const { user, error } = await client.auth.signIn({
      email: value.email,
      password: value.password,
    })
    if (user) {
      const { data } = await client
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single()

      supabaseUser.name = data.username
      supabaseUser.email = user.email
      supabaseUser.error = ''

      if (user.role === 'authenticated') {
        supabaseUser.authenticated = true
      }
    }
    if (error) throw error
  } catch (error) {
    supabaseUser.name = ''
    supabaseUser.email = ''
    supabaseUser.error = error.message
    supabaseUser.authenticated = false
  }
}

export const providerLogin = async (
  provider: 'github' | 'google' | 'apple' | 'discord',
) => {
  // const supabaseUser = useSupabaseUserStore()
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const { error } = await client.auth.signIn({ provider })
  //   supabaseUser.email = user.value.email
  console.log(
    `🚀 => file: useSupabase.ts => line 64 => user.value.email`,
    user.value.email,
  )
  console.log(`🚀 => file: useSupabase.ts => line 64 => user.value`, user.value)
  console.log(`🚀 => file: useSupabase.ts => line 64 => user`, user)
  //   supabaseUser.error = ''
  if (error) {
    return alert('Something went wrong !')
  }
}
