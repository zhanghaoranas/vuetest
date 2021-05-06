import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import Avue from "@smallwei/avue";
import router from "./router";
import "element-ui/lib/theme-chalk/index.css";
import "@smallwei/avue/lib/index.css";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(Avue);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
