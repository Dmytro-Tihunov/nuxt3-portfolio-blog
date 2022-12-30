<script setup land="ts">
import { useMagicKeys } from "@vueuse/core";

const showTags = ref(false);
const searchType = ref("");
const searchTypeRef = ref(null);

const searchTypes = computed(() => {
  return [
    searchType.value.charAt(0).toUpperCase() +
      searchType.value.slice(1).toLowerCase(),
    searchType.value.toLowerCase(),
    searchType.value.toUpperCase(),
  ];
});

const { data: postsList, pending: isPostsLoading } = await useAsyncData(
  "/posts",
  () =>
    queryContent("/posts")
      .only([
        "_path",
        "title",
        "description",
        "publishDate",
        "tags",
        "readingTime",
      ])
      .where({
        title: {
          $containsAny: searchTypes.value,
        },
      })
      .sort({ date: -1 })
      .find()
);

const { data: tagsList, pending: isTagsLoading } = await useAsyncData(
  "tags",
  () => queryContent("/posts").only("tags").find()
);

watchEffect(async () => {
  const { data: postsList, pending: isPostsLoading } = await useAsyncData(
    "/posts",
    () =>
      queryContent("/posts")
        .only([
          "_path",
          "title",
          "description",
          "publishDate",
          "tags",
          "readingTime",
        ])
        .where({
          title: {
            $containsAny: searchTypes.value,
          },
        })
        .sort({ date: -1 })
        .find()
  );
});

const flatten = (tags, key) => {
  let _tags = tags
    .map((tag) => {
      let _tag = tag;
      if (tag[key]) {
        let flattened = flatten(tag[key]);
        _tag = flattened;
      }
      return _tag;
    })
    .flat(1);
  return _tags;
};

const articleTags = [...new Set(flatten(tagsList.value, "tags"))];

const { meta_k } = useMagicKeys();

watch(meta_k, (v) => {
  if (v) searchTypeRef.value.focus();
});

useHead({
  title: "Blog • Dmytro Tihunov",
  meta: [
    {
      name: "description",
      content:
        "been writing online since 2022, mostly about web development and tech careers. In total, written 51 articles on my blog. Use the search below to filter by title.",
    },
  ],
});
</script>

<template>
  <div
    class="mb-10 mt-10 border-dashed border-b border-[#c7c7c7] pb-10 dark:border-[#475584]"
  >
    <h1 class="text-4xl sm:text-6xl mb-3 font-semibold font-recoleta">
      Latest posts
    </h1>
    <p class="mb-5 font-recoleta">
      I've been writing online since 2023, about web development, new
      technologies, <br />useful tools and improving. I hope some of the
      articles you will find useful for you :)
    </p>

    <div class="flex items-center justify-between gap-4">
      <div class="relative">
        <IconsSearch class="w-4 left-[8px] top-[12px] absolute" />
        <input
          ref="searchTypeRef"
          type="text"
          placeholder="Search article (⌘ + K)"
          v-model="searchType"
          class="input-search"
        />
      </div>

      <div
        class="border border-[#c7c7c7] h-[40px] bg-[#ffffff] flex-col sm:flex-row rounded-lg flex px-4 py-2 dark:border-[#475584] dark:bg-[#171C34]"
      >
        <button @click="showTags = !showTags" class="flex items-center">
          <IconsTagsIcon class="w-4 mr-1" />
          <span class="font-recoleta sm:mr-2"
            >Tags<span v-if="showTags">:</span></span
          >
        </button>

        <span v-if="isTagsLoading">Loading</span>

        <div class="text-1xl" v-if="showTags">
          [
          <span class="font-recoleta" v-for="(t, i) in articleTags" :key="i">
            '<NuxtLink
              class="hover:text-[#9CA3AF] duration-100"
              :to="'/tags/' + t"
              >{{ t }}</NuxtLink
            >'{{ articleTags.length - 1 !== i ? "," : "" }}
          </span>
          ]
        </div>
      </div>
    </div>
  </div>

  <div v-if="isPostsLoading" class="flex pb-5 justify-center">
    <IconsLoader />
  </div>

  <div
    v-if="postsList.length > 0 && !isPostsLoading"
    class="gap-4 block pb-4 columns-1 md:columns-2"
  >
    <template v-for="(post, index) in postsList" :key="index">
      <BlogPost class="mb-4" :data="post" />
    </template>
  </div>

  <div class="text-center mb-5" v-if="postsList.length <= 0 && !isPostsLoading">
    🤷🏼‍♂️ No articles found.
  </div>
</template>
