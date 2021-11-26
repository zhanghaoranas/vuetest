import Home from '../views/home';
export default [
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
    component: () => import('../views/CompositionAPI'),
  },
  {
    path: '/testavue',
    component: () => import('../views/aVueTest'),
  },
  {
    path: '/tabs',
    component: () => import('../views/tabs'),
  },
  {
    path: '/form-arr',
    name: 'formArr',
    component: () => import('../views/FormArr.vue'),
  },
];
