import Vue from "vue";
import IncaConfirm from "./index.vue";

const ConfirmConstructor = Vue.extend(IncaConfirm);
const Confirm = function(options) {
  return new Promise((resolve, reject) => {
    options = options || {};
    const instance = new ConfirmConstructor({
      data: {
        ...options,
        resolve,
        reject,
      },
    });
    instance.$mount();
    document.body.appendChild(instance.$el);
  });
};

export default Confirm;
