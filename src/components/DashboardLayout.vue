<template>
    
  <div class="flex flex-col md:flex-row min-h-screen relative">
    <MobileHeader @toggleMenu="showMenu = !showMenu" />
    <MobileMenu :show="showMenu" />

    <!-- Sidebar يظهر على md وما فوق -->
    <Sidebar 
      class="hidden md:block" 
      :class="{ 'w-64': showSidebar, 'w-20': !showSidebar }" 
      @mouseenter="showSidebar = true"
      @mouseleave="showSidebar = false"
    />
    
    <main
      id="mainContent"
      class="flex-1 p-4 pt-24 md:pt-2 relative transition-all duration-500 overflow-auto  text-gray-900 dark:text-gray-100"
      :class="{
        'opacity-50 pointer-events-none': showMenu,
        'mr-0': showMenu,
        'md:mr-48': showSidebar && !showMenu,
        'md:mr-20': !showSidebar && !showMenu,
      }"
    >
     
      <headermain/>
      <StatsCards />
      <DashboardCharts />
    </main>

    <DarkModeToggle />
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MobileHeader from './layout/MobileHeader.vue'
import MobileMenu from './layout/MobileMenu.vue'
import Sidebar from './layout/Sidebar.vue'
import StatsCards from './mainpage/StatsCards.vue'
import DashboardCharts from './mainpage/DashboardCharts.vue'
import DarkModeToggle from './layout/DarkModeToggle.vue'
import headermain from './mainpage/headermain.vue'

const showMenu = ref(false)
const showSidebar = ref(false)
</script>
