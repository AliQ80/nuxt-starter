<!-- eslint-disable no-console -->
<script setup lang="ts">
  import { POSITION, useToast } from 'vue-toastification'
  import { useFirebaseUserStore } from '~~/stores/userStore'

  const firebaseUser = useFirebaseUserStore()

  const route = useRoute()

  const isModalRegOpen = ref(false)
  const isModalLogOpen = ref(false)

  const signOut = async () => {
    isModalRegOpen.value = false
    isModalLogOpen.value = false
    await signOutUser()
  }

  // toast
  const toast = useToast()

  const toastSuccess = () => {
    console.log('before toastSuccess')
    toast.success('Registration Successful', {
      timeout: 3500,
      position: POSITION.BOTTOM_CENTER,
    })
    console.log('after toastSuccess')
  }
  // const toastError = () => {
  //   toast.error("Registration Failed")
  // }
</script>

<template>
  <div class="navbar bg-base-200">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
          <li>
            <NuxtLink to="/about"> About </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contact"> Contact us </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/secret"> secret </NuxtLink>
          </li>
        </ul>
      </div>
      <NuxtLink to="/" class="btn btn-ghost text-xl normal-case">
        daisyUI
      </NuxtLink>
    </div>

    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal p-0">
        <li>
          <NuxtLink class="ml-2 underline underline-offset-8" to="/about">
            About
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="ml-2 underline underline-offset-8" to="/contact">
            Contact us
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="ml-2 underline underline-offset-8" to="/secret">
            secret
          </NuxtLink>
        </li>
      </ul>
    </div>

    <div class="navbar-end">
      <!-- display username and email if logged in -->
      <transition>
        <div v-if="firebaseUser.email">
          {{ firebaseUser.name }}
          <br />
          {{ firebaseUser.email }}
        </div>
      </transition>

      <!-- The button to open modal -->
      <div v-if="!firebaseUser.email">
        <NuxtLink
          v-if="route.name !== 'register'"
          to="#modal-register"
          class="btn btn-success btn-xs mx-2 mt-2 h-10 w-24"
          @click="isModalRegOpen = !isModalRegOpen">
          Register
        </NuxtLink>
        <NuxtLink
          v-if="route.name !== 'login'"
          to="#modal-Login"
          class="btn btn-info btn-xs mx-2 mt-2 h-10 w-24"
          @click="isModalLogOpen = !isModalLogOpen">
          Login
        </NuxtLink>
      </div>
      <div v-else>
        <transition>
          <NuxtLink
            class="btn btn-secondary btn-sm mx-2 mt-2 h-10 w-24"
            @click="signOut">
            Logout
          </NuxtLink>
        </transition>
      </div>

      <!-- Register Modal -->
      <div
        v-if="!firebaseUser.email"
        id="modal-register"
        class="modal"
        :class="{ 'modal-open': isModalRegOpen }">
        <div class="modal-box relative">
          <NuxtLink
            to="#"
            for="modal-register"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            @click="isModalRegOpen = !isModalRegOpen">
            ✕
          </NuxtLink>
          <FormRegister />
        </div>
      </div>

      <!-- Login Modal -->
      <div
        v-if="!firebaseUser.email"
        id="modal-login"
        class="modal"
        :class="{ 'modal-open': isModalLogOpen }">
        <div class="modal-box relative">
          <NuxtLink
            to="#"
            for="modal-login"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            @click="isModalLogOpen = !isModalLogOpen">
            ✕
          </NuxtLink>
          <FormLogin @login-success="toastSuccess" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
