<script setup lang="ts">
defineProps({
  prev: Object,
  next: Object,
});
</script>
<template>
  <div
    class="w-[100%] rounded-[12px] flex font-recoleta font-semibold justify-between border border-[#c7c7c7] bg-[#ffffff] dark:border-[#475584] p-4 dark:bg-[#171C34]"
  >
    <div>
      <NuxtLink class="flex items-center" v-if="prev" :to="prev._path">
        <IconsArrowLeft class="w-7" />{{
          prev.title.length > 20
            ? prev.title.substring(0, 20) + "..."
            : prev.title
        }}
      </NuxtLink>
    </div>
    <div>
      <NuxtLink class="flex items-center" v-if="next" :to="next._path"
        >{{
          next.title.length > 20
            ? next.title.substring(0, 20) + "..."
            : next.title
        }}
        <IconsArrowRight class="w-7" />
      </NuxtLink>
    </div>
  </div>
</template>
