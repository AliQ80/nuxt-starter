<script setup lang="ts">
  definePageMeta({
    title: 'Nuxt-starter | verify',
    alias: ['/verify'],
  })
</script>

<template>
  <section
    class="flex h-full items-center p-16 dark:bg-gray-900 dark:text-gray-100">
    <div
      class="container mx-auto my-8 flex flex-col items-center justify-center px-5">
      <div class="max-w-md text-center">
        <h2 class="mb-8 text-7xl font-extrabold dark:text-gray-600">
          <span class="sr-only">Attention</span>Verify
        </h2>
        <h2 class="mb-8 text-7xl font-extrabold dark:text-gray-600">
          Your Email
        </h2>
        <p class="mb-8 text-2xl font-semibold md:text-3xl">
          click the link we sent to your email.
        </p>
        <NuxtLink
          rel="noopener noreferrer"
          href="/"
          class="btn btn-info px-8 py-3 font-semibold dark:text-gray-900">
          resend verification email
        </NuxtLink>
        <p class="mt-10 mb-8 dark:text-gray-400">
          But dont worry, you can find plenty of other things on our homepage.
        </p>

        <NuxtLink
          rel="noopener noreferrer"
          href="/"
          class="rounded px-8 py-3 font-semibold dark:bg-violet-400 dark:text-gray-900">
          Back to homepage
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
