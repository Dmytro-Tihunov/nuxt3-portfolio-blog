<script setup lang="ts">
const props = defineProps({
  links: Object,
});
</script>

<template>
  <div
    class="w-[100%] rounded-[12px] border border-[#c7c7c7] bg-[#ffffff] dark:border-[#475584] p-4 dark:bg-[#171C34]"
  >
    <h2
      class="text-[13px] text-[#6f6f6f] dark:text-[#6372a5] mb-3 pb-2 text-bold border-[#c7c7c7] dark:border-[#475584] border-b font-recoleta font-semibold"
    >
      Table of Contents
    </h2>
    <ul class="text-[13px] mb-4">
      <li class="mb-1" v-for="(link, index) in props.links" :key="link.text">
        <a class="font-recoleta" :href="`#${link.id}`">
          {{ index + 1 }}. {{ link.text }}
        </a>
      </li>
    </ul>

    <a
      class="text-[#6f6f6f] items-center hover:underline flex text-[13px] dark:text-[#6372a5]"
      href="#"
      ><IconsArrowUp class="w-4" /> Back to top</a
    >
  </div>
</template>

<style scoped></style>
