import Home from "../views/home";
export default [
  {
    path: "/",
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
];
