<script setup>
const props = defineProps({
  error: Object,
});

const error = useError();

if (error.value.statusCode === 404 || "404") {
  error.value.message = "Oops! Page not found";
}

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <NuxtLayout>
    <div
      class="max-w-4xl text-center py-16 px-4 xl:px-0 flex flex-col justify-between items-center mx-auto"
    >
      <p class="font-semibold mb-2 text-2xl">¯\_(ツ)_/¯</p>
      <h1 class="text-6xl sm:text-8xl font-recoleta font-semibold">
        {{ error.statusCode }}
      </h1>

      <p class="text-2xl mb-6">
        {{ error.statusCode === 404 || "404" ? error.message : "Oops! Error" }}
      </p>

      <button @click="handleError" class="button">
        <div
          class="mr-[11px] h-[36px] flex justify-center items-center bg-[#E8E8E8] w-[36px] rounded-full dark:bg-[#171C34]"
        >
          <IconsArrowLeft class="w-6" />
        </div>
        <div class="top-[5px] relative">Go back home</div>
      </button>
    </div>
  </NuxtLayout>
</template>
