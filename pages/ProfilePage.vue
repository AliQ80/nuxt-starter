<script setup lang="ts">
  definePageMeta({
    title: 'Nuxt-starter | profile Page',
    alias: ['/profile'],
    middleware: ['auth'],
    // or middleware: 'auth'
  })
</script>

<template>
  <div class="prose my-10 mx-auto flex justify-center">
    <h1>profile page</h1>
  </div>
</template>

<style scoped></style>
