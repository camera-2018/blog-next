<template>
  <div class="tags">
    <button
      v-for="(_, key) in data"
      :key="String(key)"
      type="button"
      class="tag"
      :class="{ active: selectTag === String(key) }"
      :aria-pressed="selectTag === String(key)"
      @click="toggleTag(String(key))"
    >
      {{ key }} <strong>{{ data[key].length }}</strong>
    </button>
  </div>
  <div class="tag-header">{{ selectTag }}</div>
  <a :href="withBase(article.regularPath)" v-for="(article, index) in selectTag ? data[selectTag] : []" :key="index"
    class="posts">
    <div class="post-container">
      <div class="post-dot"></div>
      {{ article.frontMatter.title }}
    </div>
    <div class="date">{{ article.frontMatter.date }}</div>
  </a>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { initTags } from '../functions'

let url = location.href.split('?')[1]
let params = new URLSearchParams(url)
const { theme } = useData()
const data = computed(() => initTags(theme.value.posts))
let selectTag = ref(params.get('tag') ? params.get('tag') : '')
const toggleTag = (tag: string) => {
  selectTag.value = tag
}
</script>

<style scoped>
.tags {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tag {
  display: inline-block;
  padding: 4px 16px;
  border: 1px solid var(--mono-line);
  font-size: 0.875rem;
  font-family: inherit;
  line-height: 25px;
  background-color: transparent;
  transition:
    color 180ms ease,
    border-color 180ms ease,
    background-color 180ms ease;
  border-radius: 8px;
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.tag:hover,
.tag:focus-visible {
  border-color: var(--mono-emphasis);
  background-color: var(--mono-wash);
  outline: none;
}

.tag.active {
  border-color: var(--vp-c-neutral);
  color: var(--vp-c-neutral-inverse);
  background-color: var(--vp-c-neutral);
}

.tag strong {
  color: inherit;
  opacity: 0.62;
}

.tag-header {
  font-size: 1.5rem;
  font-weight: 500;
  margin: 1rem 0;
  text-align: left;
}

@media screen and (max-width: 768px) {
  .tag-header {
    font-size: 1.5rem;
  }

  .date {
    font-size: 0.75rem;
  }
}
</style>
