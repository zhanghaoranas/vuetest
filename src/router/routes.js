import Home from '../views/home';
export default [
  {
    path: '/',
    component: () => import('../views/Nav.vue'),
  },
  {
    path: '/testRadio',
    component: () => import('../views/TestRadio.vue'),
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/eltableshow',
    component: () => import('../views/tableShow'),
  },
  {
    path: '/form',
    component: () => import('../views/portsHasRule'),
  },
  {
    path: '/eltabs',
    component: () => import('../views/elTabsSetName'),
  },
  {
    path: '/compositionapi',
    name: '组合式API',
    component: () => import('../views/CompositionAPI'),
  },
  {
    path: '/testavue',
    name: '自定义下拉组件',
    component: () => import('../views/aVueTest'),
  },
  {
    path: '/tabs',
    name: 'elmentUI Tab 组件 的value 需要是字符串',
    component: () => import('../views/tabs.vue'),
  },
  {
    path: '/form-arr',
    name: 'elementUI Form 数组转对象',
    component: () => import('../views/FormArr.vue'),
  },
];
