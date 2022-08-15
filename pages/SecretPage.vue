<script setup lang="ts">
  definePageMeta({
    title: 'Nuxt-starter | Secret Page',
    alias: ['/secret'],
    middleware: ['auth'],
    // or middleware: 'auth'
  })
</script>

<template>
  <div>secret page</div>
</template>
