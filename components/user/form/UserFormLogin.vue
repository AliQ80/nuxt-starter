<script setup>
import autoAnimate from '@formkit/auto-animate'
import { signInUser, signOutUser } from '~~/composables/useFirebase'
import { useFirebaseUserStore } from '~~/stores/userStore'

// --- auto animate form ---
const ccform = ref()
onMounted(() => {
  ccform.value.querySelectorAll('.formkit-outer').forEach(autoAnimate)
})

// --- FormKit styles ---
const formStyles = ref({
  // outer: 'mb-5',
  // label: 'block mb-1 font-bold text-xl text-gray-500',
  // inner: 'w-full border-b border-gray-900 mb-1 overflow-hidden focus-within:border-ct-blue-500',
  input:
    '$reset block border border-grey-light w-full p-3 rounded text-gray-500'
  // message: 'text-xs text-red-500 font-light'
})

const firebaseUser = useFirebaseUserStore()
const errorCode = ref('')

const login = async (value) => {
  await signOutUser()
  await signInUser(value.email, value.password)

  if (firebaseUser.email) {
    setTimeout(() => {
      return navigateTo('/')
    }, 5000)
  }

  if (firebaseUser.error !== '') {
    errorCode.value =
      firebaseUser.error.charAt(5).toUpperCase() +
      firebaseUser.error.slice(6).replaceAll('-', ' ')
  }
}
</script>

<template>
  <div
    ref="ccform"
    class="grid grid-cols-1 w-96 mx-auto justify-items-center py-10">
    <FormKit
      id="login"
      type="form"
      form-class="lg:w-96"
      submit-label="Login"
      :actions="false"
      @submit="login">
      <h1 class="mb-6 text-center text-3xl font-extrabold text-gray-300">
        Login to your account
      </h1>
      <hr class="flex mx-auto mb-8">
      <FormKit
        type="email"
        prefix-icon="email"
        name="email"
        label="Your email"
        validation="required|email"
        :classes="formStyles" />
      <div class="double">
        <FormKit
          type="password"
          prefix-icon="hidden"
          name="password"
          label="Password"
          validation="required|length:6|matches:/[^a-zA-Z]/"
          :validation-messages="{
            matches: 'Please include at least one symbol',
          }"
          :classes="formStyles" />
      </div>

      <FormKit
        type="submit"
        label="Login"
        input-class="$reset btn btn-info btn-block mt-4"
        @submit.prevent="login" />
    </FormKit>
    <div
      v-if="firebaseUser.email"
      class="grid grid-cols-1 w-96 mx-auto justify-items-center">
      <h2 class="text-2xl font-semibold text-emerald-400">
        Login successful!
      </h2>
      <progress class="progress progress-success w-56 mt-4" />
    </div>
    <div
      v-if="firebaseUser.error"
      class="grid grid-cols-1 w-96 mx-auto justify-items-center">
      <h2 class="text-2xl font-semibold text-rose-600">
        Login Failed!
      </h2>
      <h2 class="font-medium">
        {{ errorCode }}
      </h2>
    </div>
  </div>
</template>
