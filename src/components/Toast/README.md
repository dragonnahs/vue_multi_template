
### 维护人
<zhangsong><zhangsong@bayread.com>

### toast.vue
> toast组件主体

### toast.js
> toast组件插件

### 如何引入？
> 在项目的index.js中引入并通过 `Vue.use(Toast)` 安装toast插件

### 如何调用？

```js
// index.js
import Toast from '@/components/toast/plugins.js'
Vue.use(Toast)
```
#### $showToast(text, time)
| 参数名 | 值类型 | 是否必须 |
| --- | --- | --- |
| text | String | 必须 |
| time | Number | 非必须 |

```js
// example:
this.$showToast('send a toast', 1000) // send a toast
```

#### $clearToast()
```js
// example:
this.$clearToast() // 清除所有toast
```