import { serverQueryContent } from "#content/server";
import { SitemapStream, streamToPromise } from "sitemap";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

export default defineEventHandler(async (event) => {
  const sitemap = new SitemapStream({
    hostname: "https://tihunov.com",
  });

  const docs = await serverQueryContent(event).find();

  const staticEndpoints = getStaticEndpoints();

  const dynamicTags: string[] = [
    ...new Set(
      flatten(
        docs.map((el) => el.tags),
        "tags"
      )
    ),
  ];

  for (const staticEndpoint of staticEndpoints) {
    sitemap.write({ url: staticEndpoint, changefreq: "monthly" });
  }

  for (const doc of docs) {
    sitemap.write({
      url: doc._path,
      changefreq: "monthly",
    });
  }

  for (const tags of dynamicTags) {
    sitemap.write({ url: `/tags/${tags}`, changefreq: "monthly" });
  }

  sitemap.end();
  return streamToPromise(sitemap);
});

function flatten(tags: any[], key: string) {
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
}

function getStaticEndpoints(): string[] {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const files = getFiles(`${__dirname}/../../pages`);
  return files
    .filter((file) => !file.includes("slug")) // exclude dynamic content
    .map((file) => file.split("pages")[1])
    .map((file) => {
      return file.endsWith("index.vue")
        ? file.split("/index.vue")[0]
        : file.split(".vue")[0];
    });
}

function getFiles(dir: string): string[] {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return files.flat();
}
