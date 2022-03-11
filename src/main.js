import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import Avue from "@smallwei/avue";
import router from "./router";
import "element-ui/lib/theme-chalk/index.css";
// import '@smallwei/avue/lib/index.css';
import VueCompositionAPI from "@vue/composition-api";
// import VueSocketIO from "vue-socket.io";
// import store from "./store";
import Message from "@/components/Message";
import Confirm from "@/components/Confirm";
import "xe-utils";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";

Vue.use(VXETable);
Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(ElementUI);
Vue.use(Avue);
Vue.use(VueCompositionAPI);
Vue.prototype.$XModal = VXETable.modal;
Vue.prototype.$msg = Message;
Vue.prototype.$confirm = Confirm;
// Vue.use(
//   new VueSocketIO({
//     debug: true,
//     connection: "http://localhost:3000/",
//     vuex: {
//       store,
//       actionPrefix: "SOCKET_",
//       mutationPrefix: "SOCKET_",
//     },
//     options: { path: "/my-app/" }, //Optional options
//   })
// );

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
