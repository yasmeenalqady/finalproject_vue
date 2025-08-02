<template>
  <div :class="{ dark: isDark }" class="font-sans bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center transition-colors duration-500">
    <div class="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 space-y-6 relative">

      <!-- زر التبديل -->
      <div class="absolute top-4 left-4">
        <DarkModeToggle :isDark="isDark" @toggle="toggleDarkMode" />
      </div>

      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">تسجيل الدخول</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">مرحباً بك، الرجاء إدخال بياناتك</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label for="username" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">اسم المستخدم</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            placeholder="أدخل اسم المستخدم"
            class="w-full pl-3 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">كلمة المرور</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="أدخل كلمة المرور"
            class="w-full pl-3 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button type="submit" class="w-full py-3 bg-primary hover:bg-primary-200 text-white font-semibold rounded-lg transition duration-300 shadow-md">تسجيل الدخول</button>
      </form>

      <p v-if="error" class="text-red-600 mt-3 text-center font-semibold">{{ error }}</p>
      <p v-if="success" class="text-green-600 mt-3 text-center font-semibold">{{ success }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import DarkModeToggle from './layout/DarkModeToggle.vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const router = useRouter()

const users = [
  { username: 'admin', password: 'admin123', role: 'مشرف' },
  { username: 'user', password: 'user123', role: 'عادي' },
]

const isDark = ref(false)

onMounted(() => {
  const savedMode = localStorage.getItem('darkMode')
  if (savedMode === 'true') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  }
})

watch(isDark, (val) => {
  if (val) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('darkMode', 'true')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('darkMode', 'false')
  }
})

function toggleDarkMode() {
  isDark.value = !isDark.value
}

function handleSubmit() {
  error.value = ''
  success.value = ''

  const user = users.find(u => u.username === username.value && u.password === password.value)

  if (!user) {
    error.value = 'اسم المستخدم أو كلمة المرور غير صحيحة'
    return
  }

  success.value = `تم تسجيل الدخول بنجاح كـ ${user.role}`

  localStorage.setItem('userRole', user.role)
  localStorage.setItem('username', user.username)

  setTimeout(() => {
    router.push('/dashboard')
  }, 1000)
}
</script>
