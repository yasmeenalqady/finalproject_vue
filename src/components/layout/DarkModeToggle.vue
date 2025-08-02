<template>
  <button
    @click="toggleDarkMode"
    class="fixed bottom-4 left-4 z-50 w-10 h-10 flex items-center justify-center
           rounded-full border border-gray-300 dark:border-gray-600
           bg-secondary dark:bg-secondary text-white shadow hover:shadow-lg
           transition-all duration-300 hover:scale-110"
    aria-label="تبديل الوضع الداكن"
    title="تبديل الوضع الداكن"
  >
    <i :class="iconClass"></i>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const html = document.documentElement
const darkModeEnabled = ref(false)
const iconClass = ref('fa-solid fa-moon text-2xl')

onMounted(() => {
  darkModeEnabled.value = localStorage.getItem('darkMode') === 'enabled'
  if (darkModeEnabled.value) {
    html.classList.add('dark')
    iconClass.value = 'fa-solid fa-sun text-2xl'
  }
})

function toggleDarkMode() {
  darkModeEnabled.value = !darkModeEnabled.value
  if (darkModeEnabled.value) {
    html.classList.add('dark')
    localStorage.setItem('darkMode', 'enabled')
    iconClass.value = 'fa-solid fa-sun text-2xl'
  } else {
    html.classList.remove('dark')
    localStorage.setItem('darkMode', 'disabled')
    iconClass.value = 'fa-solid fa-moon text-2xl'
  }
}
</script>
