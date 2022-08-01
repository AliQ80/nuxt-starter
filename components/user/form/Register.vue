<script setup>
import { ref } from 'vue'
const submitted = ref(false)
const submitHandler = async () => {
    // Let's pretend this is an ajax request:
    await new Promise((r) => setTimeout(r, 1000))
    submitted.value = true
}
</script>

<template>
    <div class="flex justify-center items-center m-10">
        <FormKit
            type="form"
            id="registration-example"
            :form-class="submitted ? 'hide' : 'show'"
            submit-label="Register"
            @submit="submitHandler"
            :actions="false"
            #default="{ value }">
            <h1 class="mt-6 text-center text-3xl font-extrabold text-gray-300">Register!</h1>
            <hr class="mb-8" />
            <FormKit
                type="text"
                name="name"
                label="Your name"
                placeholder="Jane Doe"
                validation="required" />
            <FormKit
                type="text"
                name="email"
                label="Your email"
                placeholder="jane@example.com"
                validation="required|email" />
            <div class="double">
                <FormKit
                    type="password"
                    name="password"
                    label="Password"
                    validation="required|length:6|matches:/[^a-zA-Z]/"
                    :validation-messages="{
                        matches: 'Please include at least one symbol',
                    }"
                    placeholder="Your password" />
                <FormKit
                    type="password"
                    name="password_confirm"
                    label="Confirm password"
                    placeholder="Confirm password"
                    validation="required|confirm" />
            </div>

            <FormKit
                type="submit"
                label="Register" />
            <pre wrap>{{ value }}</pre>
        </FormKit>
        <div v-if="submitted">
            <h2>Submission successful!</h2>
        </div>
    </div>

</template>
