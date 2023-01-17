<script setup lang="ts">
const { path } = useRoute();

const { data: post } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({ _path: path }).findOne();
});

const [prev, next] = await queryContent()
  .only(["_path", "title"])
  .sort({ date: 1 })
  .findSurround(path);

const shareOnTwitter = () => {
  window.open(
    "https://twitter.com/intent/tweet?text=" +
      encodeURIComponent(document.title) +
      "&url=" +
      encodeURIComponent(window.location.href.replace(/([^#]*)#.+/, "$1")),
    "",
    "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=350,width=600"
  );
};

const copyLink = () =>
  navigator.clipboard.writeText(
    window.location.href.replace(/([^#]*)#.+/, "$1")
  );

useHead({
  title: post.value?.title,
  meta: [
    {
      name: "twitter:image",
      content: `https://tihunov.com${post.value?.img}`,
    },
    {
      name: "twitter:title",
      content: post.value?.title,
    },
    {
      name: "twitter:description",
      content: post.value?.description,
    },
    {
      name: "description",
      content: post.value?.description,
    },
    {
      name: "og:title",
      content: post.value?.title,
    },
    {
      name: "og:description",
      content: post.value?.description,
    },
  ],
});
</script>

<template>
  <div
    class="sm:hidden fixed left-0 dark:bg-[#232425] py-2 border-t dark:border-[#34343a] bottom-0 bg-[white] flex w-full shadow-md z-10"
  >
    <div class="w-1/4 border-r dark:border-[#34343a]">
      <button
        @click="copyLink"
        class="py-3 w-full flex align-center text-center h-full"
      >
        <IconsLink class="w-4 mx-auto" />
      </button>
    </div>
    <div class="w-1/4 border-r dark:border-[#34343a]">
      <button
        @click="shareOnTwitter"
        class="py-3 w-full flex align-center text-center h-full"
      >
        <IconsTwitter class="w-4 mx-auto" />
      </button>
    </div>
    <div v-if="prev" class="w-1/4 border-r dark:border-[#34343a]">
      <NuxtLink
        :to="prev._path"
        class="py-3 w-full flex align-center text-center h-full"
      >
        <IconsArrowLeft class="w-5 mx-auto" />
      </NuxtLink>
    </div>
    <div v-if="next" class="w-1/4 border-r dark:border-[#34343a]">
      <NuxtLink
        :to="next._path"
        class="py-3 w-full flex align-center text-center h-full"
      >
        <IconsArrowRight class="w-5 mx-auto" />
      </NuxtLink>
    </div>
  </div>

  <div class="grid grid-cols-8">
    <div
      v-if="post?.title"
      class="pt-10 col-span-8 pb-4 border-[#c7c7c7] border-dashed border-b dark:border-[#34343a]"
    >
      <div class="flex mb-4">
        <div class="mr-2 last:mr-0" v-for="(t, i) in post.tags" :key="i">
          <div class="text-[13px]">#{{ t }}</div>
        </div>
      </div>

      <h1 class="text-4xl sm:text-6xl mb-5 font-recoleta font-semibold">
        {{ post.title }}
      </h1>
      <p class="font-recoleta">{{ post.description }}</p>
      <Info
        v-if="post.title"
        :reading-time="post.readingTime.text"
        :publish-date="post.publishDate"
      />
    </div>

    <article
      :class="[
        post?.body.toc.links.length <= 0
          ? 'col-span-8'
          : 'col-span-8  sm:col-span-6',
      ]"
      class="pr-4 pb-6"
    >
      <ContentRenderer :value="post">
        <ContentRendererMarkdown :value="post" />
        <template #empty>
          <p class="text-center mt-6">🤷🏼‍♂️ No content.</p>
        </template>
      </ContentRenderer>
      <PrevNext
        v-if="prev || next"
        class="hidden sm:flex"
        :prev="prev"
        :next="next"
      />
    </article>

    <div
      v-if="post?.title && post.body.toc.links.length > 0"
      class="hidden sm:block col-span-2 pl-6"
    >
      <aside class="sticky top-10 mt-[3rem] h-[auto]">
        <Toc :links="post.body.toc.links" />
      </aside>
    </div>
  </div>
</template>

<style scoped>
h2 a {
  @apply font-recoleta;
}
</style>
