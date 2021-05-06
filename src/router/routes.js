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
];
