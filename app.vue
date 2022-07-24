<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <div class="flex justify-center items-center m-10">
      <h1 class="text-3xl font-bold text-green-500">
        Tailwind CSS 3 in Nuxt 3
      </h1>
    </div>
    <div class="flex justify-center items-center m-10">
      <button class="btn btn-primary">Button</button>
    </div>
    <div class="flex justify-center items-center m-10">
      <FormKit
        label="Username"
        type="text"
        help="Pick a new username"
        validation="required|matches:/^@[a-zA-Z]+$/|length:5"
        value="@useFormKit" />
    </div>
  </div>
</template>
