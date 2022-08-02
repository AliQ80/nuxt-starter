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
    <div class="grid grid-cols-1 w-96 mx-auto justify-items-center py-10">
        <FormKit
            type="form"
            form-class="lg:w-96"
            id="registration-example"
            :form-class="submitted ? 'hide' : 'show'"
            submit-label="Register"
            @submit="submitHandler"
            :actions="false"
            #default="{ value }">
            <h1 class="mt-6 text-center text-3xl font-extrabold text-gray-300">Register Now For Free!</h1>
            <hr class="mb-8" />
            <FormKit
                type="text"
                prefix-icon="avatarMan"
                name="name"
                label="Your name"
                validation="required"
                input-class="$reset block border border-grey-light w-full p-3 rounded text-gray-500" />
            <FormKit
                type="text"
                prefix-icon="email"
                name="email"
                label="Your email"
                validation="required|email"
                input-class="$reset block border border-grey-light w-full p-3 rounded text-gray-500" />
            <div class="double">
                <FormKit
                    type="password"
                    prefix-icon="hidden"
                    name="password"
                    label="Password"
                    validation="required|length:6|matches:/[^a-zA-Z]/"
                    :validation-messages="{
                        matches: 'Please include at least one symbol',
                    }"
                    input-class="$reset block border border-grey-light w-full p-3 rounded text-gray-500" />
                <FormKit
                    type="password"
                    prefix-icon="hidden"
                    name="password_confirm"
                    label="Confirm password"
                    validation="required|confirm"
                    input-class="$reset block border border-grey-light w-full p-3 rounded text-gray-500" />
            </div>

            <FormKit
                type="submit"
                label="Register"
                input-class="$reset btn btn-success btn-block mt-4" />
            <pre wrap>{{ value }}</pre>
        </FormKit>
        <div v-if="submitted">
            <h2>Submission successful!</h2>
        </div>
    </div>

</template>