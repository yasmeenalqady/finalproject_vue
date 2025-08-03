import { createRouter, createWebHistory } from 'vue-router'

// استيراد المكونات عند الحاجة (Lazy Loading)
const Login = () => import('@/components/Login.vue')
const DashboardLayout = () => import('@/components/DashboardLayout.vue')
const DeletedProjects = () => import('@/components/DeletedProjects.vue')
const Projects = () => import('@/components/project.vue')

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true }
  },
  {
    path: '/deleted-projects',
    name: 'DeletedProjects',
    component: DeletedProjects,
    meta: { requiresAuth: true }
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  // هنا حددت الـ base path ليطابق إعداد Vite
  history: createWebHistory('/finalproject_vue/'),
  routes,
})

// حماية المسارات التي تحتاج تسجيل دخول
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('userRole') // أو تحقق من حالة الدخول بطريقة أخرى
  if (to.meta.requiresAuth && !isLoggedIn) {
    // إذا الصفحة تحتاج تسجيل دخول واليوزر غير مسجل يدخل => إعادة توجيه لتسجيل الدخول
    next({ name: 'login' })
  } else if (to.name === 'login' && isLoggedIn) {
    // إذا اليوزر مسجل دخول وحاول يدخل صفحة تسجيل الدخول => يعيد توجيه للداشبورد
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
