<script setup lang='ts'>

</script>

<template>
    <div class="flex justify-center items-center m-10">
        <FormKit
            type="form"
            id="registration-example"
            submit-label="Register"
            :actions="false"
            #default="{ value }">
            <h1>Register!</h1>
            <hr />
            <FormKit
                type="text"
                name="name"
                label="Your name"
                placeholder="Jane Doe"
                help="What do people call you?"
                validation="required" />
            <FormKit
                type="text"
                name="email"
                label="Your email"
                placeholder="jane@example.com"
                help="What email should we use?"
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
                    placeholder="Your password"
                    help="Choose a password" />
                <FormKit
                    type="password"
                    name="password_confirm"
                    label="Confirm password"
                    placeholder="Confirm password"
                    validation="required|confirm"
                    help="Confirm your password" />
            </div>

            <FormKit
                type="submit"
                label="Register" />
            <pre wrap>{{ value }}</pre>
        </FormKit>
        <!-- <div v-if="submitted">
            <h2>Submission successful!</h2>
        </div> -->
    </div>
</template>

<style scoped>
</style>