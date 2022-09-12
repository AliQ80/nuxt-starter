<script setup lang="ts">
  import autoAnimate from '@formkit/auto-animate'
  import { POSITION, useToast } from 'vue-toastification'
  //   import { useSupabaseUserStore } from '~~/stores/userSupaStore'

  //   const userStore = useSupabaseUserStore()
  const client = useSupabaseClient()
  const isLoading = ref(false)
  const username = ref('')
  const website = ref('')
  const avatarPath = ref('')
  const toast = useToast()

  // --- auto animate form ---
  const ccform = ref()

  onMounted(() => {
    ccform.value.querySelectorAll('.formkit-outer').forEach(autoAnimate)
  })

  // --- FormKit styles ---
  const formStyles = ref({
    // outer: 'mx-2',
    // label: 'block mb-1 font-bold text-xl text-gray-500',
    // inner: 'w-full border-b border-gray-900 mb-1 overflow-hidden focus-within:border-ct-blue-500',
    input:
      '$reset block border border-grey-light w-full p-3 rounded text-gray-500',
    // message: 'text-xs text-red-500 font-light'
  })

  //   isLoading.value = true
  //   const user = useUser()
  //   let { data } = await client
  //     .from('profiles')
  //     .select(`username, website, avatar_url`)
  //     .eq('id', user.value.id)
  //     .single()
  //   if (data) {
  //     username.value = data.username
  //     website.value = data.website
  //     // eslint-disable-next-line camelcase
  //     avatarPath.value = data.avatar_url
  //   }
  //   isLoading.value = false

  const handleProfileUpdate = async () => {
    try {
      isLoading.value = true
      const user = useUser()
      const updates = {
        id: user.value.id,
        username: username.value,
        website: website.value,
        // eslint-disable-next-line camelcase
        avatar_url: avatarPath.value,
        updated_at: new Date(),
      }
      // eslint-disable-next-line prefer-const
      let { error } = await client.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })
      if (error) throw error
    } catch (error) {
      toast.success(error.message, {
        timeout: 3500,
        position: POSITION.BOTTOM_CENTER,
      })
    } finally {
      isLoading.value = false
    }
  }
</script>

<template>
  <div>
    <div class="flex justify-center">
      <FormKit
        id="Profile"
        type="form"
        form-class="lg:w-96"
        submit-label="Register"
        :actions="false"
        @submit="handleProfileUpdate">
        <h1 class="mb-4 text-center text-xl font-semibold text-gray-300">
          Update your profile
        </h1>

        <div class="flex">
          <div class="mx-2">
            <FormKit
              type="text"
              name="firstName"
              label="First Name"
              validation="required"
              :classes="formStyles" />
          </div>
          <div class="mx-2">
            <FormKit
              type="text"
              name="lastName"
              label="Last Name"
              validation="required"
              :classes="formStyles" />
          </div>
        </div>

        <FormKit
          type="password"
          prefix-icon="hidden"
          name="password_confirm"
          label="Confirm password"
          validation="required|confirm"
          :classes="formStyles" />

        <!-- submit button -->
        <div class="mt-5">
          <FormKit
            type="submit"
            label="Register"
            input-class="$reset btn btn-info btn-block mt-4"
            @submit.prevent="handleProfileUpdate" />
        </div>
      </FormKit>
    </div>
  </div>
</template>

<style scoped></style>
