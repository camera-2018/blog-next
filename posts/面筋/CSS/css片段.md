
```css
.navbar-wrapper {
	/*一个无限重复的小点点背景*/
    background-image: radial-gradient(transparent 1px, var(--bg-color) 1px);
    /*有点儿间隔 重复填充这个区域*/
    background-size: 4px 4px;
    /*一个奇奇怪怪的透明滤镜*/
    backdrop-filter: saturate(50%) blur(4px);
    -webkit-backdrop-filter: saturate(50%) blur(4px);
}
```

