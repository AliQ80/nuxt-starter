<script setup lang="ts">
  import { useSupabaseUserStore } from '~~/stores/userSupaStore'
  import { logout } from '~~/composables/useSupabase'

  const userStore = useSupabaseUserStore()

  const openModal = () => {
    userStore.reset()
    userStore.authModalOn()
  }

  const handleLogout = async () => {
    await logout()
    userStore.authModalOff()
    return navigateTo('/')
  }
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
        <div v-if="userStore.getAuthenticated">
          {{ userStore.name }}
          <br />
          {{ userStore.email }}
        </div>
      </transition>

      <!-- The button to open modal -->
      <div v-if="!userStore.getAuthenticated">
        <NuxtLink
          to="#modal-start"
          class="btn btn-info btn-xs mx-2 mt-2 h-10 w-24"
          @click="openModal">
          Start Here
        </NuxtLink>
      </div>

      <!-- The button to logout -->
      <div v-else>
        <transition>
          <NuxtLink
            class="btn btn-secondary btn-sm mx-2 mt-2 h-10 w-24"
            @click="handleLogout">
            Log Out
          </NuxtLink>
        </transition>
      </div>

      <!-- Start Modal -->
      <div
        v-if="userStore.getAuthModal"
        id="modal-start"
        class="modal"
        :class="{ 'modal-open': userStore.getAuthModal }">
        <div class="modal-box relative">
          <NuxtLink
            to="#"
            for="modal-login"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            @click="userStore.authModalOff()">
            ✕
          </NuxtLink>
          <FormStart />
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
