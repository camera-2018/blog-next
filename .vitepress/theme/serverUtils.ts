import { globby } from "globby";
import matter from "gray-matter";
import fs from "fs-extra";
import { resolve, dirname, basename } from "path";
import { categories } from "@vueuse/core/metadata.cjs";

async function getPosts(pageSize: number) {
  let paths = await globby(["posts/**/**.md"]);

  //生成分页页面markdown
  await generatePaginationPages(paths.length, pageSize);

  let posts = await Promise.all(
    paths.map(async (item) => {
      const content = await fs.readFile(item, "utf-8");
      const { data } = matter(content);
      
      // 获取文件状态
      const stats = await fs.stat(item);
      
      // 从路径获取tags
      const pathParts = dirname(item).split('/');
      const tags = pathParts.slice(1); // 排除 'posts' 目录
      
      // 如果没有frontmatter，使用默认值
      const frontMatter = {
        title: data.title || basename(item, '.md'),
        date: data.date ? _convertDate(data.date) : _convertDate(stats.mtime),
        tags: data.tags || tags,
        category: data.category || '',
        description: data.description || "",
      };

      return {
        frontMatter,
        regularPath: `/${item.replace(".md", ".html")}`,
      };
    })
  );
  posts.sort(_compareDate as any);
  return posts;
}

async function generatePaginationPages(total: number, pageSize: number) {
  //  pagesNum
  let pagesNum =
    total % pageSize === 0
      ? total / pageSize
      : Math.floor(total / pageSize) + 1;
  const paths = resolve("./");
  if (total > 0) {
    for (let i = 1; i < pagesNum + 1; i++) {
      const page = `
---
page: true
title: ${i === 1 ? "home" : "page_" + i}
aside: false
---
<script setup>
import Page from "./.vitepress/theme/components/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(${pageSize * (i - 1)},${pageSize * i})
</script>
<Page :posts="posts" :pageCurrent="${i}" :pagesNum="${pagesNum}" />
`.trim();
      const file = paths + `/page_${i}.md`;
      await fs.writeFile(file, page);
    }
  }
  // rename page_1 to index for homepage
  await fs.move(paths + "/page_1.md", paths + "/index.md", { overwrite: true });
}

function _convertDate(date = new Date().toString()) {
  const json_date = new Date(date).toJSON();
  return json_date.split("T")[0];
}

function _compareDate(
  obj1: { frontMatter: { date: number } },
  obj2: { frontMatter: { date: number } }
) {
  return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1;
}

export { getPosts };
