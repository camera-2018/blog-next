---
page: true
title: page_19
aside: false
---
<script setup>
import Page from "./.vitepress/theme/components/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(180,190)
</script>
<Page :posts="posts" :pageCurrent="19" :pagesNum="22" />