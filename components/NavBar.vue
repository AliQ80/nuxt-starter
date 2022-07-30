<script setup lang="ts">
import { useFirebaseUserStore } from '~~/stores/userState'

const firebaseUser = useFirebaseUserStore()
const credentials = ref()

const signIn = async () => {
    const email = 'ali@google.com'
    const password = '123456'
    credentials.value = await signInUser(email, password)
    firebaseUser.user = credentials.value

    console.log(firebaseUser.user);
}

const signOut = async () => {
    credentials.value = await signOutUser()
    firebaseUser.user = credentials.value

    console.log(firebaseUser.user);
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
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact us</a></li>
                </ul>
            </div>
            <a href="/" class="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal p-0">
                <li><a class="underline underline-offset-8 ml-2" href="/about">About</a></li>
                <li><a class="underline underline-offset-8 ml-2" href="/contact">Contact us</a></li>
            </ul>
        </div>
        <div class="navbar-end">
            <div v-if="!firebaseUser.user">
                <a class="btn btn-secondary btn-sm w-24 h-10 mx-2">signup</a>
                <a class="btn btn-primary btn-sm w-24 h-10 mx-2" @click="signIn">Login</a>
            </div>
            <div v-else>
                <a class="btn btn-info btn-sm w-24 h-10 mx-2" @click="signOut">Logout</a>
            </div>

        </div>
    </div>

    <div v-if="firebaseUser.user">
        <pre>
                {{ firebaseUser.user }}
        </pre>
    </div>
    <div v-else>
        user is logged out
    </div>

</template>