<template>
  <header class="md:hidden fixed top-0 left-0 right-0 z-50 bg-primary h-16 flex items-center px-4 shadow-lg">
    <button @click="$emit('toggleMenu')" class="text-white">
      <i class="fa-solid fa-bars text-3xl"></i>
    </button>
  </header>
</template>
