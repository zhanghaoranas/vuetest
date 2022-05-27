# Message 组件

## 使用方法

```js
// 全局引用
import Message from "@/components/Message";
Vue.prototype.$msg = Message;

// 使用

this.$msg({
  type: "info", // info success warning error
  message: "",
  canClose: false, // 是否有关闭按钮
  zIndex: 1, // 层级
});
```

## 其他

1. 默认 3s 自动关闭，如果 canClose === true 则不会自动关闭。
2. 只能存在一个 Message 组件
3. 默认则层级（zIndex）为 1 ，如出现被覆盖的情况，请手动调整层级。
