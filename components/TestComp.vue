<script setup lang='ts'>
import { useStore } from '../stores/counter'
const counterStore = useStore()
</script>

<template>
    <div>
        <h1 class="text-lime-600 text-4xl">Home view</h1>
        <h1>Home view: {{ counterStore.counter }}</h1>
        <button class="btn btn-primary">daisy</button>

    </div>


    <div class="container mx-auto items-center mt-8">
        <FormKit
            type="text"
            label="Your username"
            value="calypso"
            help="Pick a username people will remember!" />
        <br>
        <FormKit
            type="button"
            label="Checkout my label"
            help="You can use the label prop."
            input-class="btn btn-secondary" />
    </div>
</template>

<style scoped>
</style>