<script setup lang="ts">
import type { repoCard } from "~/schema";
defineProps<{
  props: repoCard;
}>();
</script>

<template>
  <div
    class="w-[100%] rounded-[12px] border border-[#c7c7c7] bg-[#f1f2f4] dark:border-[#34343a] p-3 dark:bg-[#232425]"
  >
    <NuxtLink target="_blank" :href="props.url">
      <div class="flex items-center">
        <IconsRepoIcon />
        <h2 class="text-2xl font-recoleta font-semibold">
          {{
            props.name.length > 17
              ? props.name.slice(0, 17) + "..."
              : props.name
          }}
        </h2>
      </div>
      <p
        class="mb-3 min-h-[39px] mt-1 text-[13px] text-[#6f6f6f] dark:text-[#9ba1a6]"
      >
        {{ props.description }}
      </p>

      <div class="flex">
        <div class="mr-2 flex items-center">
          <IconsStarIcon />
          {{ props.stars }}
        </div>

        <div class="flex items-center">
          <IconsForkIcon />
          {{ props.forks }}
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
