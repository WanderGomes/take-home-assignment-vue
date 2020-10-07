import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    redirect: '/dashboard'
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/dashboard/dashboard.vue"),
    children: [
      {
        path: "",
        name: "Simulation",
        component: () =>
            import(/* webpackChunkName: "simulation" */ "../views/dashboard/simulation/simulation.vue"),
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
