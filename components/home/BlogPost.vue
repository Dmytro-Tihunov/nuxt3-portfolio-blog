<script setup lang="ts">
import type { post } from "~/schema";
const props = defineProps<{
  data: post;
}>();
</script>

<template>
  <div class="hidden w-[350px] md:flex">
    <NuxtLink :to="props.data._path">
      <img class="w-[100%] rounded-[10px]" src="/img/cover-1.png" alt="" />
    </NuxtLink>
  </div>
  <div class="md:ml-4 w-full">
    <div class="flex mb-2 items-center justify-between">
      <div class="text-[#6f6f6f] text-[12px] flex dark:text-[#6372a5]">
        {{ props.data.publishDate }} •
        <IconsReadIcon class="w-3 mr-2 ml-1" />

        {{ props.data.readingTime.text }}
      </div>
      <div class="flex">
        <div
          class="rounded-lg text-[#6f6f6f] dark:text-[#6372a5] mr-2 text-[12px]"
          v-for="(e, i) in props.data.tags"
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
        <NuxtLink :to="props.data._path" class="font-recoleta font-semibold">{{
          props.data.title
        }}</NuxtLink>
      </h1>
    </div>

    <div class="mb-3">{{ props.data.description }}</div>

    <NuxtLink class="items-center flex" :to="props.data._path"
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
