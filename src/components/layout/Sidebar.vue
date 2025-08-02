<template>
  <aside
    id="sidebar"
    class="group hidden md:flex md:flex-col fixed top-0 right-0 z-40 h-screen w-20 hover:w-48 bg-primary text-white py-6 px-2 gap-8 transition-width duration-300 ease-in-out overflow-hidden shadow-lg"
  >
    <nav class="flex flex-col flex-grow">
      <!-- Dashboard -->
      <button
        type="button"
        class="flex items-center gap-4 px-4 py-3 rounded-l border-r-4 border-transparent hover:border-secondary hover:bg-cyan-700 transition-colors duration-300"
        :class="{ 'border-secondary bg-cyan-700': route.name === 'dashboard' }"
        @click="setActive('dashboard')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
        </svg>
        <span class="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none">لوحة التحكم</span>
      </button>

      <!-- Projects -->
      <button
        v-if="userRole === 'مشرف'"
        type="button"
        class="flex items-center gap-4 px-4 py-3 rounded-l border-r-4 border-transparent hover:border-secondary hover:bg-cyan-700 transition-colors duration-300"
        :class="{ 'border-secondary bg-cyan-700': route.name === 'projects' }"
        @click="setActive('projects')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m-6-8h6M9 5h6a2 2 0 012 2v1H7V7a2 2 0 012-2zM7 17h10a2 2 0 002-2v-5a2 2 0 00-2-2H7v9z" />
        </svg>
        <span class="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none">المشاريع</span>
      </button>

      <!-- Users -->
      <button
        v-if="userRole === 'مشرف'"
        type="button"
        class="flex items-center gap-4 px-4 py-3 rounded-l border-r-4 border-transparent hover:border-secondary hover:bg-cyan-700 transition-colors duration-300"
        :class="{ 'border-secondary bg-cyan-700': route.name === 'users' }"
        @click="setActive('users')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m2-8a4 4 0 11-8 0 4 4 0 018 0zm10 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <span class="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none">المستخدمين</span>
      </button>

      <!-- Reports -->
      <button
        type="button"
        class="flex items-center gap-4 px-4 py-3 rounded-l border-r-4 border-transparent hover:border-secondary hover:bg-cyan-700 transition-colors duration-300"
        :class="{ 'border-secondary bg-cyan-700': route.name === 'reports' }"
        @click="setActive('reports')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v18h18" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-6M13 17v-4M17 17v-8" />
        </svg>
        <span class="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none">التقارير</span>
      </button>

      <!-- Calendar -->
      <button
        type="button"
        class="flex items-center gap-4 px-4 py-3 rounded-l border-r-4 border-transparent hover:border-secondary hover:bg-cyan-700 transition-colors duration-300"
        :class="{ 'border-secondary bg-cyan-700': route.name === 'calendar' }"
        @click="setActive('calendar')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span class="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none">التقويم</span>
      </button>

      <!-- Settings -->
      <button
        type="button"
        class="flex items-center gap-4 px-4 py-3 rounded-l border-r-4 border-transparent hover:border-secondary hover:bg-cyan-700 transition-colors duration-300"
        :class="{ 'border-secondary bg-cyan-700': route.name === 'settings' }"
        @click="setActive('settings')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.4 15a1.65 1.65 0 01.33 1.82l-1.43 2.48a1.65 1.65 0 01-2.19.69l-2.18-1.18a1.65 1.65 0 00-1.54 0l-2.18 1.18a1.65 1.65 0 01-2.19-.69l-1.43-2.48a1.65 1.65 0 01.33-1.82l1.74-1.74a1.65 1.65 0 000-2.34l-1.74-1.74a1.65 1.65 0 01-.33-1.82l1.43-2.48a1.65 1.65 0 012.19-.69l2.18 1.18a1.65 1.65 0 001.54 0l2.18-1.18a1.65 1.65 0 012.19.69l1.43 2.48a1.65 1.65 0 01-.33 1.82l-1.74 1.74a1.65 1.65 0 000 2.34z" />
        </svg>
        <span class="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none">الإعدادات</span>
      </button>

      <!-- Logout -->
      <button
        type="button"
        class="mt-auto flex items-center gap-4 px-4 py-3 rounded-l border-r-4 border-transparent hover:border-secondary hover:bg-cyan-700 transition-colors duration-300"
        :class="{ 'border-secondary bg-cyan-700': route.name === 'logout' }"
        @click="setActive('logout')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 11-4 0v-1m0-8v-1a2 2 0 114 0v1" />
        </svg>
        <span class="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none">تسجيل الخروج</span>
      </button>
    </nav>
  </aside>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const route = useRoute()
const userRole = ref(null)

onMounted(() => {
  userRole.value = localStorage.getItem('userRole') || 'guest'
})

function setActive(name) {
  if (name === 'logout') {
    localStorage.removeItem('username')
    localStorage.removeItem('userRole')
    // إذا خزنت كلمة المرور محلياً احذفها أيضاً
    localStorage.removeItem('password')

    router.push({ name: 'login' })
  } else {
    router.push({ name })
  }
}
</script>
