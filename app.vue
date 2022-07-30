<script setup lang="ts">
import { async } from '@firebase/util';

console.log('--- App ---');

onMounted(async () => {
  // const email = 'ali@google.com'
  // const password = '123456'
  // const credentials = await creatUser(email, password)
  // console.log('credentials: ', credentials);

  // const email = 'ali@google.com'
  // const password = '123456'
  // const credentials = await signInUser(email, password)
  // console.log('credentials: ', credentials);

  // const result = await signOutUser()
  // console.log('result: ', result);
})


</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>