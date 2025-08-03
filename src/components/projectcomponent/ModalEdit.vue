<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto px-2 py-6"
    @click.self="close"
  >
    <div
      class="bg-white dark:bg-gray-800 w-full max-w-lg rounded-lg shadow-lg p-4 sm:p-6 relative mx-auto mt-16"
    >
      <button
        @click="close"
        class="absolute top-2 left-2 text-gray-400 hover:text-gray-700 text-3xl font-bold"
        aria-label="إغلاق المودال"
      >
        &times;
      </button>

      <h2 class="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">
        تعديل بيانات المشروع
      </h2>

      <form @submit.prevent="updateProject" class="text-right text-gray-900 dark:text-gray-100">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="name" class="block mb-1 font-semibold">اسم المشروع</label>
            <input
              v-model="form.name"
              id="name"
              type="text"
              required
              class="w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <label for="manager" class="block mb-1 font-semibold">مدير المشروع</label>
            <input
              v-model="form.manager"
              id="manager"
              type="text"
              required
              class="w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <label for="field" class="block mb-1 font-semibold">المجال</label>
            <input
              v-model="form.field"
              id="field"
              type="text"
              required
              class="w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <label for="startDate" class="block mb-1 font-semibold">تاريخ البداية</label>
            <input
              v-model="form.startDate"
              id="startDate"
              type="date"
              required
              class="w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <label for="endDate" class="block mb-1 font-semibold">تاريخ الانتهاء</label>
            <input
              v-model="form.endDate"
              id="endDate"
              type="date"
              required
              class="w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <label for="status" class="block mb-1 font-semibold">الحالة</label>
            <select
              v-model="form.status"
              id="status"
              required
              class="w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700"
            >
              <option disabled value="">اختر الحالة</option>
              <option>جاري التنفيذ</option>
              <option>تحت المراجعة</option>
              <option>مكتمل</option>
              <option>مؤجل</option>
            </select>
          </div>
        </div>

        <!-- 🖼️ حقل تعديل الصورة -->
        <div class="mt-4">
          <label for="image" class="block mb-1 font-semibold">تعديل صورة المشروع</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            @change="handleImageChange"
            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-200"
          />

          <div v-if="form.image" class="mt-2">
            <img
              :src="form.image"
              alt="معاينة الصورة"
              class="w-24 h-24 rounded-full object-cover border mx-auto"
            />
          </div>
        </div>

        <div class="flex flex-col sm:flex-row justify-between gap-2 mt-6">
          <button
            type="button"
            @click="close"
            class="w-full sm:w-auto px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200"
          >
            إلغاء
          </button>
          <button
            type="submit"
            class="w-full sm:w-auto px-4 py-2 rounded bg-primary hover:bg-primary-200 text-white"
          >
            حفظ التعديلات
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, reactive } from "vue";

const props = defineProps({
  project: Object,
  visible: Boolean,
});

const emit = defineEmits(["close", "update"]);

const form = reactive({
  id: null,
  name: "",
  manager: "",
  field: "",
  startDate: "",
  endDate: "",
  status: "",
  image: "",
});

watch(
  () => props.project,
  (newProject) => {
    if (newProject) {
      Object.assign(form, newProject);
    }
  },
  { immediate: true }
);

function close() {
  emit("close");
}


function updateProject() {
  emit("update", { ...form });
  close(); // ← هذا يغلق المودال مباشرة بعد التعديل
}
function handleImageChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      form.image = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
</script>
