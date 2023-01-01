<script setup lang="ts">
import type { post } from "~/schema";
defineProps<{
  data: post;
}>();
</script>

<template>
  <div
    class="hidden border border-[#c7c7c7] dark:border-[#34343a] rounded-[10px] w-[350px] md:flex"
  >
    <NuxtLink :to="data._path">
      <img class="w-[100%] rounded-[10px]" :src="data.img" alt="" />
    </NuxtLink>
  </div>
  <div class="md:ml-4 w-full">
    <div class="flex mb-2 items-center justify-between">
      <div class="text-[#6f6f6f] text-[12px] flex dark:text-[#9ba1a6]">
        {{ data.publishDate }}
        <div class="ml-2 flex">
          <IconsReadIcon class="w-3 mr-1 ml-1" />
          {{ data.readingTime.text }}
        </div>
      </div>
      <div class="flex">
        <div
          class="rounded-lg text-[#6f6f6f] dark:text-[#9ba1a6] mr-2 text-[12px]"
          v-for="(e, i) in data.tags"
          :key="i"
        >
          <NuxtLink class="hover:underline" :to="'/tags/' + e"
            >#{{ e }}</NuxtLink
          >
        </div>
      </div>
    </div>

    <div>
      <h1 class="title__post flex items-center mb-2">
        <NuxtLink :to="data._path" class="font-recoleta font-semibold">{{
          data.title
        }}</NuxtLink>
        {{ data.date }}
      </h1>
    </div>

    <div class="mb-3">{{ data.description }}</div>

    <NuxtLink class="items-center flex" :to="data._path"
      ><div class="mr-2">Read now</div>
      <div><IconsRightArrow /></div
    ></NuxtLink>
  </div>
</template>

<style scoped>
.title__post {
  @apply text-2xl sm:text-3xl;
}
.arrow {
  @apply w-7 ml-2 duration-200;
}
.title__post:hover .arrow {
  @apply ml-4 duration-200;
}
</style>
