<template>
  <Layout>
    <template #doc-before>
      <div style="padding-top:20px;" class='post-info' v-if="!$frontmatter.page">
        {{ $frontmatter.date?.substring(0, 10) }} &nbsp;&nbsp; <span v-for="item in $frontmatter.tags"><a
            :href="withBase(`/pages/tags.html?tag=${item}`)"> {{ item }}</a></span>
      </div>
    </template>
  </Layout>
  <Copyright />
</template>
<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import Copyright from './Copyright.vue'
import { withBase } from "vitepress";
import { useData } from 'vitepress'
import { nextTick, provide } from 'vue'
import { useMediumZoom } from '../useMediumZoom';
const { isDark } = useData()
const { Layout } = DefaultTheme

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )

})

useMediumZoom()
</script>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>