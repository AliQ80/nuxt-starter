<script setup lang='ts'>
import { useStore } from '../stores/counter'
const counterStore = useStore()

const plus = () => {
    counterStore.hit()
}

const items = ref(["😏", "😐", "😑", "😒", "😕"])
function removeItem(toRemove) {
    items.value = items.value.filter((item) => item !== toRemove)
}
</script>

<template>

    <div class="flex justify-center items-center m-10">
        <h1 class="text-3xl font-bold text-green-500">
            Test Component
        </h1>
    </div>
    <div class="grid grid-cols-1 w-96 mx-auto justify-items-center py-10">
        <h1 class="text-yellow-500 text-3xl py-4">DaisyUI</h1>
        <button class="btn btn-primary">Button</button>
    </div>
    <div class="grid grid-cols-1 w-96 mx-auto justify-items-center py-10">
        <h1 class="text-orange-500 text-3xl py-4">FormKit</h1>

        <FormKit
            label="Username"
            type="text"
            help="Pick a new username"
            validation="required|matches:/^@[a-zA-Z]+$/|length:5"
            value="@useFormKit" />
        <FormKit
            type="button"
            label="formKit button"
            input-class="btn btn-secondary my-4" />
    </div>
    <div>

    </div>

    <div class="grid grid-cols-1 w-96 mx-auto justify-items-center py-10">
        <h1 class="text-lime-500 text-3xl py-4">pinia store</h1>
        <h1 class="py-4">Home view: {{ counterStore.counter }}</h1>
        <button @click="counterStore.hit()" class="btn">++</button>
    </div>

    <div class="grid grid-cols-1 w-96 mx-auto justify-items-center py-10">
        <h1 class="text-lg">Auto Animate</h1>
        <h5>Click emojis to remove them.</h5>
        <ul v-auto-animate>
            <li
                v-for="item in items"
                :key="item"
                @click="removeItem(item)">
                {{ item }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
</style>

<script setup>


</script>

<template>
    <h5>Click emojis to remove them.</h5>
    <ul v-auto-animate>
        <li
            v-for="item in items"
            :key="item"
            @click="removeItem(item)">
            {{ item }}
        </li>
    </ul>
</template>