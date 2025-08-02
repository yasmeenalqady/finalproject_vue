<template>
  <header class="md:hidden fixed top-0 left-0 right-0 z-[80] bg-primary h-16 flex items-center px-4 shadow-lg">

  
    <button
      @click="$emit('toggleMenu')"
      class="text-white rounded focus:outline-none"
      aria-label="فتح القائمة"
    >
      <!-- SVG أيقونة الهامبرغر -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        z-70
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </header>
</template>

<script setup></script>
