<script setup lang="ts">
  definePageMeta({
    title: 'Nuxt-starter | profile Page',
    alias: ['/profile'],
    middleware: ['auth'],
    // or middleware: 'auth'
  })
</script>

<template>
  <div>
    <h1>profile page</h1>
  </div>
</template>

<style scoped></style>
