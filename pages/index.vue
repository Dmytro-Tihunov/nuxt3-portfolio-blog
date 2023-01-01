<script setup lang="ts">
const { data: repoList, pending: isReposLoading } = await useAsyncData(
  "/gihub",
  () => $fetch("/api/github")
);

const repoListSorted = computed(() => {
  return repoList.value
    .slice(0, 6)
    .sort((a, b) => new Date(b.created) - new Date(a.created));
});

useHead({
  title: "Home • Dmytro Tihunov",
  meta: [
    {
      property: "og:title",
      content: "Dmytro Tihunov",
    },
    {
      property: "og:description",
      content: "I'm a frontend developer and javascript enthusiast.",
    },
    {
      property: "og:url",
      content: "https://tihunov.com",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:image",
      content: "https://tihunov.com/img/open-graph-preview.png",
    },
    {
      property: "og:image:alt",
      content: "Dmytro Tihunov",
    },
    {
      property: "og:image:width",
      content: "1260",
    },
    {
      property: "og:image:height",
      content: "630",
    },
    {
      name: "twitter:image",
      content: "https://tihunov.com/img/open-graph-preview.png",
    },
    {
      name: "twitter:image:alt",
      content: "Dmytro Tihunov",
    },
  ],
});
</script>

<template>
  <div class="max-w-5xl sm:px-4 xl:px-0 items-center py-8 mx-auto">
    <div class="sm:w-5/6 pt-10 sm:pt-20 pb-16">
      <h1 class="text-4xl sm:text-6xl font-recoleta font-semibold">
        Dmytro Tihunov
      </h1>
      <p class="text-2xl sm:text-3xl font-recoleta mt-10 font-light">
        Hey, I'm a frontend developer and javascript enthusiast. My interests
        include programming, web development, computer sience and blogging from
        time to time about my journey as a developer.
      </p>
      <div class="flex items-center font-recoleta mt-14">
        Follow me:
        <a
          target="_blank"
          href="https://twitter.com/tihunov"
          class="social-home-button mr-2 ml-3"
        >
          <IconsTwitter class="w-4"
        /></a>
        <a
          target="_blank"
          href="https://github.com/Dmytro-Tihunov"
          class="social-home-button"
        >
          <IconsGithub class="w-4 flex-inline" />
        </a>
      </div>
    </div>

    <div
      class="flex border-dashed border-t border-[#c7c7c7] dark:border-[#34343a] pt-10 flex-col"
    >
      <h1 class="title mb-6">Latest posts:</h1>
      <div
        class="border rounded-[12px] p-4 pb-0 border-[#c7c7c7] dark:border-[#34343a]"
      >
        <div class="grid grid-cols-1 gap-4">
          <ContentList
            path="/posts"
            :query="{
              only: [
                '_path',
                'title',
                'description',
                'publishDate',
                'img',
                'tags',
                'readingTime',
              ],
              limit: 3,
              sort: { date: -1 },
              $sensitivity: 'base',
            }"
          >
            <template v-slot="{ list }">
              <div
                class="pb-4 flex border-b border-[#c7c7c7] dark:border-[#34343a] items-center"
                v-for="article in list"
                :key="article._path"
              >
                <HomeBlogPost :data="article" />
              </div>
            </template>
            <template #not-found>
              <p>No articles found.</p>
            </template>
          </ContentList>
        </div>

        <a class="button-more-outlined" href="/blog">
          <div
            class="mr-[11px] h-[36px] flex justify-center items-center bg-[#E8E8E8] w-[36px] rounded-full dark:bg-[#171C34]"
          >
            <IconsRightArrow />
          </div>
          <div class="text-[14px]">See more posts</div>
        </a>
      </div>
    </div>

    <div
      class="flex border-dashed border-b dark:border-[#475584] border-[#c7c7c7] pb-10 flex-col mt-10"
    >
      <h1 class="title mb-6">Github:</h1>
      <div v-if="isReposLoading">Loading...</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <span v-for="(item, index) in repoListSorted" :key="index">
          <HomeRepoCard :props="item" />
        </span>
      </div>
    </div>

    <div class="flex flex-col mt-10">
      <h1 class="title mb-6">Get In touch</h1>
      <HomeContactForm />
    </div>
  </div>
</template>
