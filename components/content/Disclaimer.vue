<template>
  <div
    class="w-[100%] rounded-[12px] mt-[3rem] border border-[#c7c7c7] bg-[#ffffff] dark:border-[#34343a] p-4 dark:bg-[#232425] font-recoleta"
  >
    <h5 class="text-2xl font-semibold mb-2">⚠️ Disclaimer</h5>
    <ContentSlot :use="$slots.default" unwrap="p" />
  </div>
</template>
