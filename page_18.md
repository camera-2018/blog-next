---
page: true
title: page_18
aside: false
---
<script setup>
import Page from "./.vitepress/theme/components/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(170,180)
</script>
<Page :posts="posts" :pageCurrent="18" :pagesNum="22" />