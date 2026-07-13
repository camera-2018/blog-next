<template>
  <div
    v-for="article in posts"
    :key="article.regularPath"
    class="post-list"
    @click="openArticle(article.regularPath, $event)"
  >
    <div class="post-header">
      <div class="post-title">
        <a :href="withBase(article.regularPath)"> {{ article.frontMatter.title }}</a>
      </div>
    </div>
    <p class="describe" v-html="article.frontMatter.description"></p>
    <div class='post-info'>
      {{ article.frontMatter.date }} <span v-for="item in article.frontMatter.tags"><a
          :href="withBase(`/pages/tags.html?tag=${item}`)"> {{ item }}</a></span>
    </div>
  </div>

  <nav class="pagination" aria-label="文章分页">
    <template v-for="item in paginationItems" :key="item">
      <span v-if="typeof item !== 'number'" class="ellipsis" aria-hidden="true">…</span>
      <a
        v-else
        class="link"
        :class="{ active: pageCurrent === item }"
        :aria-current="pageCurrent === item ? 'page' : undefined"
        :href="withBase(item === 1 ? '/index.html' : `/page_${item}.html`)"
      >{{ item }}</a>
    </template>
  </nav>
</template>

<script lang="ts" setup>

import { useRouter, withBase } from 'vitepress'
import { computed, type PropType } from 'vue'

const router = useRouter()

function openArticle(path: string, event: MouseEvent) {
  const target = event.target
  if (target instanceof Element && target.closest('a'))
    return

  void router.go(withBase(path))
}

interface Article {
  regularPath: string
  frontMatter: {
    title: string
    description: string
    date: string
    tags: string[]
  }
}
const props = defineProps({
  posts: {
    type: Array as PropType<Article[]>,
    required: true
  },
  pageCurrent: {
    type: Number as PropType<number>,
    required: true
  },
  pagesNum: {
    type: Number as PropType<number>,
    required: true
  }
})

const paginationItems = computed(() => {
  const visiblePages = new Set([1, props.pagesNum])
  const start = Math.max(1, props.pageCurrent - 2)
  const end = Math.min(props.pagesNum, props.pageCurrent + 2)

  for (let page = start; page <= end; page += 1)
    visiblePages.add(page)

  const pages = [...visiblePages].sort((a, b) => a - b)
  const items: Array<number | string> = []

  pages.forEach((page, index) => {
    const previous = pages[index - 1]
    if (index > 0 && page - previous > 1)
      items.push(`ellipsis-${previous}`)
    items.push(page)
  })

  return items
})
</script>

<style scoped>
.post-list {
  border-bottom: 1px dashed var(--vp-c-divider-light);
  padding: 14px 0 14px 0;
  display: flex;
  flex-direction: column;
  padding: 36px;
  cursor: pointer;
}

.post-list:hover {
  background: var(--vp-c-gray-soft);
  border-radius: 2px;
  transition: background 0.3s;
}

.post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post-title {
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0.1rem 0;
}

.describe {
  font-size: 0.9375rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  color: var(--vp-c-text-2);
  margin: 10px 0;
  line-height: 1.5rem;
}

.pagination {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 30px auto 6px;
  padding: 6px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: color-mix(in srgb, var(--vp-c-bg) 86%, transparent);
  backdrop-filter: blur(12px) saturate(115%);
}

.link {
  display: inline-grid;
  place-items: center;
  min-width: 36px;
  height: 36px;
  padding: 0 9px;
  border: 0;
  border-radius: 9px;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
  transition:
    color 180ms ease,
    background-color 180ms ease;
}

.link:hover,
.link:focus-visible {
  color: var(--vp-c-brand-1);
  background: var(--mono-wash);
  outline: none;
}

.link.active {
  color: var(--vp-c-neutral-inverse);
  background: var(--vp-c-neutral);
  font-weight: 650;
}

.ellipsis {
  display: inline-grid;
  place-items: center;
  width: 28px;
  height: 36px;
  color: var(--vp-c-text-3);
  font-size: 0.875rem;
}

@media screen and (max-width: 768px) {
  .post-list {
    padding: 14px 0 14px 0;
  }

  .post-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .post-title {
    font-size: 1.0625rem;
    font-weight: 400;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    width: 17rem;
  }

  .describe {
    font-size: 0.9375rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    margin: 0.5rem 0 1rem;
  }

  .pagination {
    margin-top: 22px;
    padding: 4px;
    gap: 2px;
    border-radius: 12px;
  }

  .link {
    min-width: 32px;
    height: 32px;
    padding: 0 7px;
    border-radius: 8px;
  }

  .ellipsis {
    width: 22px;
    height: 32px;
  }
}
</style>
