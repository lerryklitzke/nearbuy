// Composables
import { createRouter, createWebHistory } from 'vue-router';
import superagent from 'superagent';

// Views
const Register = () => import('@/views/Register.vue');
const Login = () => import('@/views/Login.vue');
const Dashboard = () => import('@/views/Dashboard.vue');

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/register',
        name: 'Register',
        component: Register
      },
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

const protectedRoutes = ['Dashboard']

router.beforeEach(async (to, from, next) => {
  if (protectedRoutes.includes(String(to.name))) {

    await superagent
      .get('http://localhost:2000/is-authorized')
      .withCredentials()
      .then(() => next())
      .catch(() => next({ name: 'Login' }))
  } else {
    next();
  }
})

export default router
