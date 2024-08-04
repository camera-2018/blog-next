// import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";
import { nav } from './nav.js';
import PanguPlugin from 'markdown-it-pangu'
import { fileURLToPath, URL } from 'node:url'
import VueMacros from 'unplugin-vue-macros/vite'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { generateSidebar } from 'vitepress-sidebar';
import { RssPlugin } from 'vitepress-plugin-rss'

function addDocsPrefix(data) {
  data.forEach(item => {
    if (item.items) {
      addDocsPrefix(item.items);
    }
    if (item.link) {
      item.link = '/docs' + item.link;
    }
  });
  return data;
}

const RSS = {
  title: 'xyxsw 的博客',
  baseUrl: 'https://xyxsw.site',
  copyright: 'Copyright (c) 2024-present, xyxsw 的博客',
  filename: 'feed.xml',
  log: true,
  language: 'zh-cn',
  icon: true,
}

const vitepressSidebarOptions = {
  documentRootPath: "/docs",
  hyphenToSpace: true,
  useTitleFromFileHeading: true,
};

const config = {
  title: "xyxsw's blog",
  description: "xyxsw's blog",
  url: "xyxsw.site",
}

// https://vitepress.dev/reference/site-config
export default withMermaid({
  lang: 'zh-CN',
  title: "xyxsw's blog",
  description: "xyxsw's blog",
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ['script', { async: "async", src: 'https://cloud.umami.is/script.js', "data-website-id": "9bd40f69-cec9-4b65-b832-481fbbe3e917", "data-domains": "xyxsw.site,xyxsw.ltd" }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ["meta", { "name": "description", "content": config.description }],
    ["meta", { "name": "viewport", "content": "width=device-width,initial-scale=1" }],
    ["meta", { "property": "og:url", "content": "https://xyxsw.site/" }],
    ["meta", { "property": "og:type", "content": "website" }],
    ["meta", { "property": "og:title", "content": "xyxsw site" }],
    ["meta", { "property": "og:description", "content": "xyxsw 博客" }],
    // ["meta", { "property": "og:image", "content": "" }],
    ["meta", { "name": "twitter:card", "content": "summary_large_image" }],
    ["meta", { "property": "twitter:domain", "content": "xyxsw.site" }],
    ["meta", { "property": "twitter:url", "content": "https://xyxsw.site/" }],
    ["meta", { "name": "twitter:title", "content": "xyxsw 博客" }],
    ["meta", { "name": "twitter:description", "content": "xyxsw 博客" }],
    // ["meta", { "name": "twitter:image", "content": "" }],
    // ["link", { "rel": "apple-touch-icon", "sizes": "180x180", "href": "/apple-touch-icon-180x180.png" }],
    // ["link", { "rel": "icon", "type": "image/png", "sizes": "32x32", "href": "/favicon-32x32.png" }],
    // ["link", { "rel": "icon", "type": "image/png", "sizes": "16x16", "href": "/favicon-16x16.png" }],
    ["link", { "rel": "manifest", "href": "/manifest.webmanifest" }],
    ["link", { "rel": "mask-icon", "href": "/safari-pinned-tab.svg", "color": "#5bbad5" }],
    ["meta", { "name": "msapplication-TileColor", "content": "#2b5797" }],
    ["meta", { "name": "theme-color", "content": "#ffffff" }],
    ["link", { "rel": "dns-prefetch", "href": "https://fonts.googleapis.com" }],
    ["link", { "rel": "dns-prefetch", "href": "https://fonts.gstatic.com" }],
    ["link", { "rel": "preconnect", "href": "https://fonts.googleapis.com" }],
    ["link", { "rel": "preconnect", "href": "https://fonts.gstatic.com", "crossorigin": "anonymous"}],
    ["link", { "rel": "stylesheet", "href": "https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&family=Noto+Sans+Mono:wght@400;600;700&family=Noto+Sans+SC:wght@400;600;700&display=swap" }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),

    sidebar: addDocsPrefix(generateSidebar(vitepressSidebarOptions)),
    outline: [2, 6],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/camera-2018/' }
    ],
    footer: {
      message: '<a href="https://beian.miit.gov.cn/" target="_blank">津ICP备2021004845号</a>',
      copyright: 'Copyright © 2024 xyxsw'
    },
    lastUpdatedText: '上次更改',
    docFooter: {
      prev: '上一小节',
      next: '下一小节'
    },
    search: {
      provider: 'local'
    },
    externalLinkIcon: true,
  },
  markdown: {
    lineNumbers: true,
    config: (md) => {
      md.use(PanguPlugin);
    },
    math: true,
    codeTransformers: [
      transformerTwoslash() 
    ]
  },
  sitemap: {
    hostname: 'https://xyxsw.site'
  },
  vite: {
    plugins: [
      VueMacros(),
      RssPlugin(RSS)
    ],
    resolve: {
      alias: [
        {
          find: /^.*\/NotFound\.vue$/,
          replacement: fileURLToPath(
            new URL('./components/CustomNotFound.vue', import.meta.url)
          )
        }
      ]
    }
  }
})

