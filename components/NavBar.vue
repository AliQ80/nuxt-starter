<script setup lang="ts">

const credentials = ref()

const signIn = async () => {
    const email = 'ali@google.com'
    const password = '123456'
    credentials.value = await signInUser(email, password)
    // console.log('credentials: ', credentials);
}

const signOut = async () => {
    credentials.value = await signOutUser()
    // console.log('result: ', result);
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
            <a class="btn btn-primary mx-2" @click="signIn">Login</a>
            <a class="btn btn-info mx-2" @click="signOut">Logout</a>
            <a class="btn btn-secondary mx-2">signup</a>
        </div>
    </div>
    <pre>
            {{ credentials }}
        </pre>
</template>