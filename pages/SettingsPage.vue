<script setup lang="ts">
  import { useSupabaseUserStore } from '~~/stores/userStore'

  definePageMeta({
    title: 'Nuxt-starter | Settings',
    alias: ['/settings'],
    middleware: ['auth'],
    // or middleware: 'auth'
  })

  const userStore = useSupabaseUserStore()
  const isLoading = ref(false)
  const resetPassword = () => {
    isLoading.value = true
    userStore.resetPassword()
    isLoading.value = false
  }
</script>

<template>
  <div>
    <div class="m-10 flex justify-center">
      <button class="btn btn-warning" @click="resetPassword">
        requst password change
      </button>
      <progress v-if="isLoading" class="progress progress-warning mt-3 w-56" />
    </div>
  </div>
</template>

<style scoped></style>
