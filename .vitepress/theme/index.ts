// https://vitepress.dev/guide/custom-theme
import { createMediumZoomProvider } from './useMediumZoom'
import DefaultTheme from 'vitepress/theme-without-fonts'
import Download from '../../components/Download.vue'
import Bilibili from '../../components/Bilibili.vue'
import Parallax from '../../components/Parallax.vue'
import NewLayout from './components/NewLayout.vue'
import Archives from './components/Archives.vue'
import Category from './components/Category.vue'
import Tags from './components/Tags.vue'
import Page from './components/Page.vue'
import './style.css'
import './custom.css'
import './houdini.css'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import '@shikijs/vitepress-twoslash/style.css'
import vitepressNprogress from 'vitepress-plugin-nprogress'
import 'vitepress-plugin-nprogress/lib/css/index.css'
import { withBase } from 'vitepress'

export default {
  ...DefaultTheme,
  Layout: NewLayout,

  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('Download', Download)
    ctx.app.component('Bilibili', Bilibili)
    ctx.app.component('Parallax', Parallax)
    ctx.app.component('Tags', Tags)
    ctx.app.component('Category', Category)
    ctx.app.component('Archives', Archives)
    ctx.app.component('Page', Page)
    ctx.app.use(TwoslashFloatingVue)
    vitepressNprogress(ctx)
    if (typeof window === 'undefined')
      return
    const paintWorklet = typeof CSS === 'undefined'
      ? undefined
      : (CSS as typeof CSS & {
          paintWorklet?: { addModule: (url: string) => Promise<void> }
    }).paintWorklet
    paintWorklet?.addModule(withBase('/houdini/blog-texture.js')).catch(() => {})
    createMediumZoomProvider(ctx.app, ctx.router)
  },
}

if (typeof window !== 'undefined') {
  const browser = navigator.userAgent.toLowerCase()
  if (browser.includes('chrome'))
    document.documentElement.classList.add('browser-chrome')
  else if (browser.includes('firefox'))
    document.documentElement.classList.add('browser-firefox')
  else if (browser.includes('safari'))
    document.documentElement.classList.add('browser-safari')
}
