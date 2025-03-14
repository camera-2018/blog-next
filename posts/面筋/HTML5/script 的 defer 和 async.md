# `<script>` 的 `defer` 和 `async`

在 HTML 中，`<script>` 标签的 `defer` 和 `async` 属性用于优化脚本加载和执行的行为，避免阻塞页面解析。它们的执行时机有以下区别：

---

### **1. 无属性：普通 `<script>`**
```html
<script src="script.js"></script>
```
- **行为**：
  1. **同步下载和执行**，阻塞 HTML 解析。
  2. 遇到脚本标签时，暂停解析 HTML，直到脚本下载完成并执行完毕。
- **适用场景**：需立即执行的脚本，或脚本需操作未解析的 DOM。

---

### **2. `defer`：延迟执行**
```html
<script defer src="script.js"></script>
```
- **行为**：
  1. **异步下载**：HTML 解析继续，不阻塞。
  2. **延迟执行**：脚本延迟到 **HTML 解析完成** (`DOMContentLoaded` 事件之前) 执行。
  3. **顺序执行**：多个 `defer` 脚本严格按照其在文档中的顺序执行。
- **适用场景**：需要操作完整 DOM 的脚本，或有依赖关系的多个脚本（如库和插件）。

---

### **3. `async`：异步执行**
```html
<script async src="script.js"></script>
```
- **行为**：
  1. **异步下载**：HTML 解析继续，不阻塞。
  2. **立即执行**：脚本下载完成后立即执行，**可能中断 HTML 解析**。
  3. **无序执行**：多个 `async` 脚本的执行顺序不确定，取决于下载速度。
- **适用场景**：独立脚本且无依赖（如统计代码或广告）。

---

### **执行流程对比**  
| **阶段**         | **无属性**                    | **`defer`**                         | **`async`**                     |
|------------------|------------------------------|-------------------------------------|---------------------------------|
| **下载**         | 阻塞 HTML 解析               | 异步，不阻塞 HTML 解析              | 异步，不阻塞 HTML 解析          |
| **执行时机**      | 立即执行（阻塞解析）          | 所有 HTML 解析完成后执行            | 下载完成后立即执行（可能阻塞解析）|
| **顺序性**        | 按文档顺序执行                | 按文档顺序执行                      | 无序执行                        |
| **DOMContentLoaded** | 脚本执行完才触发             | 在 `defer` 脚本执行后触发           | 不等待 `async` 脚本触发         |

---

### **视觉化流程**
```
HTML 解析开始
|
|—— 遇到普通 <script> → 暂停解析 → 下载脚本 → 执行 → 继续解析
|
|—— 遇到 defer <script> → 异步下载 → 解析完成后按顺序执行
|
|—— 遇到 async <script> → 异步下载 → 下载完成后立即执行（可能中断解析）
```

---

### **最佳实践**
1. **使用 `defer`**  
   - 脚本需要操作完整 DOM。
   - 确保依赖关系（如引入 `jQuery` 后使用插件）。
   - _示例_：
     ```html
     <script defer src="jquery.js"></script>
     <script defer src="jquery-plugin.js"></script>
     ```

2. **使用 `async`**  
   - 无依赖的独立脚本。
   - 可优先加载不影响关键渲染的脚本（如埋点分析、广告）。
   - _示例_：
     ```html
     <script async src="analytics.js"></script>
     ```

3. **避免混用 `defer` 和 `async`**  
   - 若两者同时存在，现代浏览器会优先按 `async` 处理。
   - 可能导致依赖关系混乱。

---

### **注意事项**
- **`defer` 与 `DOMContentLoaded`**：  
  所有 `defer` 脚本执行完毕才会触发 `DOMContentLoaded` 事件。
  
- **`async` 的执行时机**：  
  脚本可能在解析过程中执行，应避免在此时操作未解析的 DOM。

- **内联脚本（无 `src`）**：  
  `defer` 和 `async` 对没有 `src` 的脚本无效，始终同步执行。

---

通过合理选择 `defer` 或 `async`，可显著提升页面加载性能和用户体验。