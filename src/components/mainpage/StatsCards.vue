<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-xs md:text-sm"
  >
    <!-- Projects -->
    <div
      class="bg-white dark:bg-gray-800 p-4 rounded shadow flex items-center justify-between"
    >
      <div>
        <h3 class="text-sm md:text-base font-semibold mb-1">عدد المشاريع</h3>
        <p class="text-2xl md:text-3xl font-bold text-primary">{{ totalProjects }}</p>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" class="text-primary h-10 w-10 md:h-16 md:w-16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a4 4 0 00-4-4h-8z"/>
      </svg>
    </div>

    <!-- Users -->
    <div
      class="bg-white dark:bg-gray-800 p-4 rounded shadow flex items-center justify-between"
    >
      <div>
        <h3 class="text-sm md:text-base font-semibold mb-1">عدد المستخدمين</h3>
        <p class="text-2xl md:text-3xl font-bold text-secondary">{{ totalUsers }}</p>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" class="text-secondary h-10 w-10 md:h-16 md:w-16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
      </svg>
    </div>

    <!-- New Reports -->
    <div
      class="bg-white dark:bg-gray-800 p-4 rounded shadow flex items-center justify-between"
    >
      <div>
        <h3 class="text-sm md:text-base font-semibold mb-1">التقارير الجديدة</h3>
        <p class="text-2xl md:text-3xl font-bold text-green-600">{{ newReports }}</p>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" class="text-green-600 h-10 w-10 md:h-16 md:w-16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zM14 3.5V9h5.5L14 3.5z"/>
      </svg>
    </div>

    <!-- Open Tasks -->
    <div
      class="bg-white dark:bg-gray-800 p-4 rounded shadow flex items-center justify-between"
    >
      <div>
        <h3 class="text-sm md:text-base font-semibold mb-1">المهام المفتوحة</h3>
        <p class="text-2xl md:text-3xl font-bold text-yellow-500">{{ openTasks }}</p>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" class="text-yellow-500 h-10 w-10 md:h-16 md:w-16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 11l3 3 7-7-1.5-1.5L10 12l-1.5-1.5L7 11zm-4 5h14v2H3v-2zM3 5h18v2H3V5z"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const projects = ref([]);
const users = ref([]);

onMounted(() => {
  // جلب المشاريع من localStorage
  const storedProjects = localStorage.getItem("projects");
  if (storedProjects) {
    projects.value = JSON.parse(storedProjects).filter(p => !p.deleted);
  }

  // جلب المستخدمين من localStorage
  const storedUsers = localStorage.getItem("users");
  if (storedUsers) {
    users.value = JSON.parse(storedUsers);
  }
});

// احسب عدد المشاريع
const totalProjects = computed(() => projects.value.length);

// احسب عدد المستخدمين
const totalUsers = computed(() => users.value.length);

// افترض أن لكل مشروع مفتاح reportsNew وعدد التقارير الجديدة
const newReports = computed(() =>
  projects.value.reduce((sum, p) => sum + (p.reportsNew || 0), 0)
);

// افترض أن لكل مشروع مفتاح tasksOpen وعدد المهام المفتوحة
const openTasks = computed(() =>
  projects.value.reduce((sum, p) => sum + (p.tasksOpen || 0), 0)
);
</script>
