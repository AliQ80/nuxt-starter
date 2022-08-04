<script setup>
import { useFirebaseUserStore } from '~~/stores/userStore';
import { signOutUser, createUser } from "~~/composables/useFirebase";
import autoAnimate from '@formkit/auto-animate'

const props = defineProps({
    form: Object,
    title: String,
    message: String
});


const submitted = ref(false)
const submitHandler = async () => {
    // Let's pretend this is an ajax request:
    await new Promise((r) => setTimeout(r, 1000))
    submitted.value = true
}

const ccform = ref()
const formStyles = ref({
    // outer: 'mb-5',
    // label: 'block mb-1 font-bold text-xl text-gray-500',
    // inner: 'w-full border-b border-gray-900 mb-1 overflow-hidden focus-within:border-ct-blue-500',
    input: '$reset block border border-grey-light w-full p-3 rounded text-gray-500',
    // message: 'text-xs text-red-500 font-light'
})
onMounted(() => {
    ccform.value.querySelectorAll(".formkit-outer").forEach(autoAnimate)
})


const registerForm = ref({ email: "", password: "" });
const signinForm = ref({ email: "", password: "" });
const firebaseUser = useFirebaseUserStore();
const registerMessage = ref();

// const signin = () => {
//     console.log(signinForm.value);
//     signInUser(signinForm.value.email, signinForm.value.password);
//     signinForm.value = { email: "", password: "" };
// };

const register = async () => {
    console.log(registerForm.value);
    const credentials = await createUser(registerForm.value.email, registerForm.value.password);
    registerForm.value = { email: "", password: "" };
    if (credentials) {
        registerMessage.value = `Successfully registered: ${credentials.user.email}`
        setTimeout(() => {
            registerMessage.value = ""
        }, 3000);
    }
};

</script>

<template>
    <div ref="ccform" class="grid grid-cols-1 w-96 mx-auto justify-items-center py-10">
        <FormKit
            type="form"
            id="registration"
            form-class="lg:w-96"
            :form-class="submitted ? 'hide' : 'show'"
            :form="registerForm"
            :message="registerMessage"
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
                input-class="$reset btn btn-success btn-block mt-4" />
            <pre wrap>{{ value }}</pre>
        </FormKit>
        <div v-if="submitted">
            <h2>Submission successful!</h2>
        </div>
    </div>

</template>