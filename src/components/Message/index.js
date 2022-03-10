import Vue from "vue";
import VueMessage from "./index.vue";

const MessageConstructor = Vue.extend(VueMessage);
let messageIDNumber = 1;
const instances = [];
const Message = function(options) {
  // 将上一个关闭。
  instances.forEach((item) => {
    item.close();
  });
  options = options || {};
  const instance = new MessageConstructor({
    data: options,
  });
  instance.id = `message_${messageIDNumber++}`;
  instance.$mount();
  document.body.appendChild(instance.$el);
  instances.push(instance);
  return instance;
};

export default Message;
