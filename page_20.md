---
page: true
title: page_20
aside: false
---
<script setup>
import Page from "./.vitepress/theme/components/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(190,200)
</script>
<Page :posts="posts" :pageCurrent="20" :pagesNum="22" />