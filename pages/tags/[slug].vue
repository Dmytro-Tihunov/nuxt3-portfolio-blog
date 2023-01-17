<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
const {
  params: { slug },
} = useRoute();

const query: QueryBuilderParams = {
  path: "/posts",
  where: { tags: { $contains: slug } },
  only: ["_path", "title", "description", "publishDate", "tags", "readingTime"],
};

useHead({
  title: slug + " - Dmytro Tihunov",
});
</script>

<template>
  <div
    class="mb-10 text-center mt-10 border-dashed border-b border-[#c7c7c7] pb-10 dark:border-[#34343a] font-recoleta"
  >
    Tag:
    <h1 class="text-4xl justify-center flex sm:text-6xl mb-2 font-semibold">
      <IconsTagsIcon class="w-12 mr-3" /> {{ slug }}
    </h1>
  </div>

  <ContentList :query="query">
    <template v-slot="{ list }">
      <div class="gap-4 pb-4 block columns-1 md:columns-2">
        <div v-for="article in list" :key="article._path">
          <BlogPost class="mb-4" :data="article" />
        </div>
      </div>
    </template>
    <template #not-found>
      <p class="text-center mb-5">🤷🏼‍♂️ No articles found.</p>
    </template>
  </ContentList>
</template>
