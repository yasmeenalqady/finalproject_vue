<template>
<div id="viewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
  <div class="bg-white dark:bg-gray-800 w-full max-w-md mx-4 rounded-lg shadow-lg p-6 relative" onclick="event.stopPropagation()">
    <button onclick="closeViewModal()" class="absolute top-2 left-2 text-gray-400 hover:text-gray-700 text-3xl font-bold" aria-label="إغلاق المودال">&times;</button>
    <h2 class="text-xl font-bold mb-6 text-center text-gray-800 dark:text-white">تفاصيل المشروع</h2>

    <div class="space-y-4 text-right text-gray-900 dark:text-gray-100">
      <div><span class="font-semibold">اسم المشروع: </span><span id="viewProjectName"></span></div>
      <div><span class="font-semibold">مدير المشروع: </span><span id="viewProjectManager"></span></div>
      <div><span class="font-semibold">المجال: </span><span id="viewProjectField"></span></div>
      <div><span class="font-semibold">تاريخ البداية: </span><span id="viewStartDate"></span></div>
      <div><span class="font-semibold">تاريخ الانتهاء: </span><span id="viewEndDate"></span></div>
      <div><span class="font-semibold">الحالة: </span><span id="viewProjectStatus"></span></div>

      <!-- عرض صورة المشروع -->
      <div>
        <span class="font-semibold">صورة المشروع: </span>
        <img id="viewProjectImage" src="" alt="صورة المشروع" class="mt-2 max-w-full h-auto rounded border border-gray-300 dark:border-gray-600" />
      </div>
    </div>

    <div class="mt-6 text-center">
      <button onclick="closeViewModal()" class="px-6 py-2 rounded bg-primary hover:bg-primary-200 text-white">إغلاق</button>
    </div>
  </div>
</div>

</template>

<script setup>
defineProps(['project']);
defineEmits(['close']);
</script>

<style scoped>
@import '@/assets/css/Style.css';

</style>
