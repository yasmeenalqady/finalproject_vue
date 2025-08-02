<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="close"
  >
    <div
      class="bg-white dark:bg-gray-800 w-full max-w-lg mx-4 rounded-lg shadow-lg p-6 relative"
      @click.stop
    >
      <button
        @click="close"
        class="absolute top-2 left-2 text-gray-400 hover:text-gray-700 text-3xl font-bold"
        aria-label="إغلاق المودال"
      >&times;</button>

      <h2 class="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">
        إضافة مشروع جديد
      </h2>

      <form
        @submit.prevent="submitProject"
        class="text-right text-gray-900 dark:text-gray-100"
        enctype="multipart/form-data"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="projectName" class="block mb-1 font-semibold">اسم المشروع</label>
            <input
              id="projectName"
              v-model="form.name"
              type="text"
              required
              class="w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <label for="projectManager" class="block mb-1 font-semibold">مدير المشروع</label>
            <input
              id="projectManager"
              v-model="form.manager"
              type="text"
              required
              class="w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <label for="projectField" class="block mb-1 font-semibold">المجال</label>
            <input
              id="projectField"
              v-model="form.field"
              type="text"
              required
              class="w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <label for="startDate" class="block mb-1 font-semibold">تاريخ البداية</label>
            <input
              id="startDate"
              v-model="form.startDate"
              type="date"
              required
              class="w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <label for="endDate" class="block mb-1 font-semibold">تاريخ الانتهاء</label>
            <input
              id="endDate"
              v-model="form.endDate"
              type="date"
              required
              class="w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <label for="projectStatus" class="block mb-1 font-semibold">الحالة</label>
            <select
              id="projectStatus"
              v-model="form.status"
              required
              class="w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700"
            >
              <option value="">اختر الحالة</option>
              <option value="جاري التنفيذ">جاري التنفيذ</option>
              <option value="تحت المراجعة">تحت المراجعة</option>
              <option value="مكتمل">مكتمل</option>
              <option value="مؤجل">مؤجل</option>
            </select>
          </div>

          <!-- حقل الصورة -->
          <div class="sm:col-span-2">
            <label for="projectImage" class="block mb-1 font-semibold">صورة المشروع</label>
            <input
              id="projectImage"
              type="file"
              accept="image/*"
              @change="handleFileChange"
              class="w-full rounded border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-700"
            />
          </div>

          <!-- معاينة الصورة -->
          <div v-if="form.image" class="sm:col-span-2 mt-2">
            <img
              :src="form.image"
              alt="معاينة الصورة"
              class="w-24 h-24 rounded-full object-cover border mx-auto"
            />
          </div>
        </div>

        <div class="flex justify-between mt-6">
          <button
            type="button"
            @click="close"
            class="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200"
          >
            إلغاء
          </button>
          <button
            type="submit"
            class="px-4 py-2 rounded bg-secondary hover:bg-secondary-200 text-white"
          >
            حفظ
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const emit = defineEmits(["close", "save"]);

const visible = ref(true);

const form = reactive({
  name: "",
  manager: "",
  field: "",
  startDate: "",
  endDate: "",
  status: "",
  image: null,
});

function close() {
  visible.value = false;
  emit("close");
}

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      form.image = reader.result; // Base64 URL
    };
    reader.readAsDataURL(file); // يحول الصورة إلى Base64
  } else {
    form.image = null;
  }
}

function submitProject() {
  emit("save", { ...form });
  close();
}
</script>
