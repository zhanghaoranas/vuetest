import Home from "../views/home";
export default [
  {
    path: "/",
    component: () => import("../views/Nav.vue"),
  },
  {
    path: "/testRadio",
    component: () => import("../views/TestRadio.vue"),
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/eltableshow",
    component: () => import("../views/tableShow"),
  },
  {
    path: "/form",
    component: () => import("../views/portsHasRule"),
  },
  {
    path: "/eltabs",
    component: () => import("../views/elTabsSetName"),
  },
  {
    path: "/compositionapi",
    name: "组合式API",
    component: () => import("../views/CompositionAPI"),
  },
  {
    path: "/testavue",
    name: "自定义下拉组件",
    component: () => import("../views/aVueTest"),
  },
  {
    path: "/tabs",
    name: "elmentUI Tab 组件 的value 需要是字符串",
    component: () => import("../views/tabs.vue"),
  },
  {
    path: "/form-arr",
    name: "elementUI Form 数组转对象",
    component: () => import("../views/FormArr.vue"),
  },
  {
    path: "/vue-drop",
    name: "vuedraggable 的简单使用",
    component: () => import("../views/vuedraggable"),
  },
  {
    path: "/v-bind",
    name: "v-bind的验证",
    component: () => import("../views/vbind"),
  },
  {
    path: "/vxe-table",
    name: "vxe-table page组件",
    component: () => import("../views/VxeTablePage"),
  },
  {
    path: "/cell-user",
    name: "表格内部选择",
    component: () => import("../views/CellUser.vue"),
  },
  {
    path: "/table-edit",
    name: "表格编辑操作",
    component: () => import("../views/TableEdit"),
  },
];
