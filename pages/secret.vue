<script setup lang='ts'>
definePageMeta({
    middleware: ["auth"]
    // or middleware: 'auth'
})
</script>

<template>
    <div>
        secret page
    </div>
</template>
