<template>
  <nav>
    <div
      class="max-w-4xl overflow-hidden border-b border-[#c7c7c7] dark:border-[#475584] py-4 px-4 xl:px-0 flex flex-wrap justify-between items-center mx-auto"
    >
      <a href="/" class="flex items-center">
        <IconsLogo class="w-6 mr-3" />
        <span class="font-recoleta font-semibold">D.Tihunov.</span></a
      >

      <div class="flex items-center">
        <ul class="mr-5 flex">
          <li class="mr-5">
            <NuxtLink
              :class="[$route.path === '/' ? 'underline' : '']"
              class="flex hover:text-[#9CA3AF] duration-100 items-center"
              to="/"
            >
              Home</NuxtLink
            >
          </li>
          <li class="mr-3">
            <NuxtLink
              :class="[$route.path === '/blog' ? 'underline' : '']"
              class="flex hover:text-[#9CA3AF] duration-100 items-center"
              to="/blog"
            >
              Blog</NuxtLink
            >
          </li>
          <!-- <li class="mr-3">
            <NuxtLink
              :class="[$route.path === 'snippets' ? 'underline' : '']"
              class="flex hover:text-[#9CA3AF] duration-100 items-center"
              to="/snippets"
            >
              Snippets</NuxtLink
            >
          </li> -->
        </ul>
        <ColorTheme />
      </div>
    </div>
  </nav>
</template>
