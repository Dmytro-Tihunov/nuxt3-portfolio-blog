<script setup lang="ts">
import type { post } from "~/schema";
const props = defineProps<{
  data: post;
}>();
</script>

<template>
  <div
    class="rounded-lg w-full border overflow-hidden flex border-[#c7c7c7] dark:border-[#34343a]"
  >
    <div class="p-4">
      <div class="flex mb-2 items-center justify-between">
        <div class="flex">
          <div
            class="rounded-lg text-[#6f6f6f] dark:text-[#9ba1a6] mr-2 text-[12px]"
            v-for="(e, i) in props.data.tags"
            :key="i"
          >
            <NuxtLink :to="'/tags/' + e" class="hover:underline"
              >#{{ e }}</NuxtLink
            >
          </div>
        </div>
      </div>

      <div>
        <h1 class="text-2xl sm:text-3xl mt-2 flex items-center mb-2">
          <NuxtLink
            :to="props.data._path"
            class="font-recoleta font-semibold"
            >{{ props.data.title }}</NuxtLink
          >
        </h1>
      </div>

      <div class="mb-3">{{ props.data.description }}</div>

      <div
        class="text-[#6f6f6f] text-[12px] justify-between flex-row items-center flex dark:text-[#9ba1a6]"
      >
        <div class="flex items-center mr-1">
          <img
            class="w-5 h-5 mr-2 rounded-full"
            src="/img/my_logo.png"
            alt=""
          />
          <div>
            <a href="#">@Tihunov</a>
          </div>
        </div>
        <div class="flex">
          {{ props.data.publishDate }}
          <IconsReadIcon class="w-3 mr-1 ml-1" />
          {{ props.data.readingTime.text }}
        </div>
      </div>
    </div>
  </div>
</template>
