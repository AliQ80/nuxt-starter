<script setup lang="ts">
import { useFirebaseUserStore } from '~~/stores/userStore'

const route = useRoute()

const firebaseUser = useFirebaseUserStore()
const credentials = ref()

const signIn = async () => {
    const email = 'ali@google.com'
    const password = '123456'
    credentials.value = await signInUser(email, password)
    firebaseUser.user = credentials.value
}

const signOut = async () => {
    credentials.value = await signOutUser()
    firebaseUser.user = credentials.value
}
</script>

<template>
    <div class="navbar bg-base-200">
        <div class="navbar-start">
            <div class="dropdown">
                <label tabindex="0" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </label>
                <ul tabindex="0"
                    class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <NuxtLink to="/about">About</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/contact">Contact us</NuxtLink>
                    </li>
                </ul>
            </div>
            <NuxtLink to="/" class="btn btn-ghost normal-case text-xl">daisyUI</NuxtLink>
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal p-0">
                <li>
                    <NuxtLink class="underline underline-offset-8 ml-2" to="/about">About</NuxtLink>
                </li>
                <li>
                    <NuxtLink class="underline underline-offset-8 ml-2" to="/contact">Contact us</NuxtLink>
                </li>
                <li>
                    <NuxtLink class="underline underline-offset-8 ml-2" to="/secret">secret</NuxtLink>
                </li>
            </ul>
        </div>
        <div class="navbar-end">
            <client-only>
                <div v-if="firebaseUser.email">
                    {{ firebaseUser.email }}
                </div>

                <div v-if="!firebaseUser.user">
                    <NuxtLink to="/register" v-if="route.name !== 'register'"
                        class="btn btn-success btn-xs h-10 w-24 mx-2 mt-2">Register</NuxtLink>
                    <NuxtLink class="btn btn-info btn-xs w-24 h-10 mx-2 mt-2" @click="signIn">Login</NuxtLink>
                </div>
                <div v-else>
                    <NuxtLink class="btn btn-secondary btn-sm h-10 w-24 mx-2 mt-2" @click="signOut">Logout</NuxtLink>
                </div>
            </client-only>
        </div>
    </div>
    <!-- <div v-if="firebaseUser.user">
        <pre>
                {{ firebaseUser.user }}
        </pre>
    </div>
    <div v-else>
        user is logged out
    </div> -->

</template>