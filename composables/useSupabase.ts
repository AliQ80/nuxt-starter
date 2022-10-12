import type { User } from '@supabase/gotrue-js'

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
