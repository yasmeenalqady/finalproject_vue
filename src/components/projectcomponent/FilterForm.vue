<template>
<div
  ref="popoverRef"
  class="absolute z-50 top-full left-0 mt-2 w-80 max-w-[90vw] bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border dark:border-gray-700"
  dir="rtl"
>



    <form @submit.prevent="applyFilters" class="space-y-3 text-sm">
      <!-- تاريخ البداية -->
      <div class="flex flex-col gap-1">
        <label for="dateFrom" class="font-semibold text-gray-700 dark:text-gray-300">
           تاريخ البداية من:
        </label>
        <input
          type="date"
          id="dateFrom"
          v-model="localFilters.dateFrom"
          class="form-input"
        />
      </div>

      <!-- تاريخ الانتهاء -->
      <div class="flex flex-col gap-1">
        <label for="dateTo" class="font-semibold text-gray-700 dark:text-gray-300">
           تاريخ الانتهاء إلى:
        </label>
        <input
          type="date"
          id="dateTo"
          v-model="localFilters.dateTo"
          class="form-input"
        />
      </div>

      <!-- الحالة -->
      <div class="flex flex-col gap-1">
        <label for="status" class="font-semibold text-gray-700 dark:text-gray-300">
           الحالة:
        </label>
        <select id="status" v-model="localFilters.status" class="form-input">
          <option value="">كل الحالات</option>
          <option value="مكتمل">مكتمل</option>
          <option value="جاري التنفيذ">جاري التنفيذ</option>
          <option value="متأخر">متأخر</option>
          <option value="تحت المراجعة">تحت المراجعة</option>
        </select>
      </div>

      <!-- القسم -->
      <div class="flex flex-col gap-1">
        <label for="department" class="font-semibold text-gray-700 dark:text-gray-300">
           القسم:
        </label>
        <select id="department" v-model="localFilters.department" class="form-input">
          <option value="">كل الأقسام</option>
          <option value="تقنية المعلومات">تقنية المعلومات</option>
          <option value="الموارد البشرية">الموارد البشرية</option>
          <option value="الاتصالات">الاتصالات</option>
        </select>
      </div>

      <!-- أزرار التحكم -->
      <div class="flex justify-between gap-3 pt-3">
        <button
          type="button"
          @click="clear"
          class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-2 rounded transition"
        >
           مسح
        </button>
        <button
          type="submit"
          class="flex-1 bg-primary hover:bg-primary-dark text-white px-3 py-2 rounded transition"
        >
           تطبيق
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch, defineProps, defineEmits, onMounted, onBeforeUnmount, ref } from "vue";

const props = defineProps({
  filters: Object,
  onClose: Function
});

const emit = defineEmits(["update:filters", "clearFilters"]);

const localFilters = reactive({ ...props.filters });

watch(
  () => props.filters,
  (newFilters) => {
    Object.assign(localFilters, newFilters);
  }
);

function applyFilters() {
  emit("update:filters", { ...localFilters });
  props.onClose?.();
}

function clear() {
  Object.assign(localFilters, {
    dateFrom: "",
    dateTo: "",
    status: "",
    department: "",
  });
  emit("clearFilters");
  props.onClose?.();
}

// إغلاق عند الضغط خارج الطبقة
const popoverRef = ref(null);

function handleClickOutside(event) {
  if (popoverRef.value && !popoverRef.value.contains(event.target)) {
    props.onClose?.();
  }
}

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});
</script>

<style scoped>
.form-input {
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  text-align: right;
  color: #111827;
  outline: none;
  transition: border 0.2s, box-shadow 0.2s;
  width: 100%;
}

.dark .form-input {
  background-color: #374151;
  border: 1px solid #4b5563;
  color: #f9fafb;
}

.form-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.bg-primary {
  background-color: #3b82f6;
}
.bg-primary-dark {
  background-color: #2563eb;
}
</style>
