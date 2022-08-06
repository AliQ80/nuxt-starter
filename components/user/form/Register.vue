<script setup>
import { createUser } from "~~/composables/useFirebase";
import autoAnimate from '@formkit/auto-animate'
import { useFirebaseUserStore } from '~~/stores/userStore'

// --- auto animate form ---
const ccform = ref()
onMounted(() => {
    ccform.value.querySelectorAll(".formkit-outer").forEach(autoAnimate)
})

// --- FormKit styles ---
const formStyles = ref({
    // outer: 'mb-5',
    // label: 'block mb-1 font-bold text-xl text-gray-500',
    // inner: 'w-full border-b border-gray-900 mb-1 overflow-hidden focus-within:border-ct-blue-500',
    input: '$reset block border border-grey-light w-full p-3 rounded text-gray-500',
    // message: 'text-xs text-red-500 font-light'
})

const firebaseUser = useFirebaseUserStore()
const submitted = ref(false)
const error = ref(false)
const errorCode = ref('')

const register = async (value) => {
    const credentials = await createUser(value.email, value.password, value.name);

    if (credentials && errorCode.value === '') {
        submitted.value = true
        error.value = false
        setTimeout(() => {
            return navigateTo('/')
        }, 5000);
    }

    if (firebaseUser.error !== '') {
        if (firebaseUser.error === 'auth/email-already-in-use') {
            errorCode.value = 'Email already in use'
        }
        // errorCode.value = firebaseUser.error
        console.log('errorCode register.vue: ', errorCode.value);
        submitted.value = false
        error.value = true

    }
};
</script>

<template>
    <div ref="ccform" class="grid grid-cols-1 w-96 mx-auto justify-items-center py-10">
        <FormKit
            type="form"
            id="registration"
            form-class="lg:w-96"
            submit-label="Register"
            @submit="register"
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
                :classes="formStyles" />
            <FormKit
                type="email"
                prefix-icon="email"
                name="email"
                label="Your email"
                validation="required|email"
                :classes="formStyles" />
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
                    :classes="formStyles" />
                <FormKit
                    type="password"
                    prefix-icon="hidden"
                    name="password_confirm"
                    label="Confirm password"
                    validation="required|confirm"
                    :classes="formStyles" />
            </div>

            <FormKit
                type="submit"
                label="Register"
                @submit.prevent="register"
                input-class="$reset btn btn-success btn-block mt-4" />
        </FormKit>
        <div class="grid grid-cols-1 w-96 mx-auto justify-items-center" v-if="submitted">
            <h2 class="text-2xl font-semibold text-emerald-400">Registeration successful!</h2>
            <progress class="progress progress-success w-56 mt-4"></progress>
        </div>
        <div class="grid grid-cols-1 w-96 mx-auto justify-items-center" v-if="errorCode !== ''">
            <h2 class="text-2xl font-semibold text-rose-600">Registeration Failed!</h2>
            <h2 class="font-medium">{{ errorCode }}</h2>
        </div>
    </div>
</template>