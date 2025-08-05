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
      class="flex-1 p-4 pt-24 md:pt-2 transition-all duration-500 overflow-auto text-gray-900 dark:text-gray-100"
      :class="{
        'opacity-50 pointer-events-none': showMenu,
        'mr-0': showMenu,
        'md:mr-48': showSidebar && !showMenu,
        'md:mr-20': !showSidebar && !showMenu,
      }"
    >
      <div class="p-4" dir="rtl">
        <!-- رأس الصفحة -->
        <div
          class="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6 transition-colors duration-500 flex items-end justify-between"
        >
         <div class="text-right flex-1">
      <h1 class="text-2xl font-bold">  المشاريع المحذوفة</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">هنا يمكنك استعادة أو حذف المشاريع نهائيًا</p>
    </div>

          <div class="flex-shrink-0 ml-4">
            <img
              src="https://i.pravatar.cc/100?img=13"
              alt="صورة المستخدم"
              class="w-12 h-12 rounded-full object-cover border-2 border-primary"
            />
          </div>
        </div>

        <div
          class="overflow-x-auto max-w-full mt-4 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg"
        >
          <table class="min-w-[700px] w-full table-fixed text-sm md:text-base text-right border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr class="bg-primary text-white text-sm">
                <th class="px-2 py-1 w-8">#</th>
                <th class="px-2 py-4 whitespace-nowrap break-words">اسم المشروع</th>
                <th class="px-2 py-4 whitespace-nowrap break-words">مدير المشروع</th>
                <th class="px-2 py-4 whitespace-nowrap break-words">الحالة</th>
                <th class="px-2 py-4 whitespace-nowrap break-words">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(project, index) in deletedProjects"
                :key="project.id"
                class="border-b border-gray-300 dark:border-gray-700"
              >
                <td class="px-2 py-4 text-center">{{ index + 1 }}</td>
                <td class="px-2 py-4 break-words">{{ project.name }}</td>
                <td class="px-2 py-4 break-words">{{ project.manager }}</td>
                <td
                  class="px-2 py-4 break-words"
                  :class="statusClassColor(project.status)"
                >
                  {{ project.status }}
                </td>
                <td class="px-2 py-1 flex flex-row-reverse gap-2 justify-end">
                  <button
                    @click="restoreProject(project.id)"
                    class="hover:bg-green-700 text-green-600 px-3 py-4 rounded transition flex items-center gap-2"
                    title="استعادة المشروع"
                  >
                    <i class="fa-solid fa-rotate-left"></i>
                    
                  </button>
                  <button
                    @click="confirmPermanentDelete(project.id)"
                    class=" hover:bg-red-700 text-red-700 px-3 py-4 rounded transition flex items-center gap-2"
                    title="حذف نهائي"
                  >
                    <i class="fa-solid fa-trash"></i>
                    
                  </button>
                </td>
              </tr>
              <tr v-if="deletedProjects.length === 0">
                <td colspan="5" class="text-center py-4 text-gray-500 dark:text-gray-400">
                  لا توجد مشاريع محذوفة
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex justify-start mt-6">
          <button
            @click="goBack"
            class="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition flex items-center gap-2"
          >
            <i class="fa-solid fa-arrow-left"></i>
            العودة إلى المشاريع
          </button>
        </div>
      </div>
    </main>

    <DarkModeToggle />

    <!-- مودال تأكيد الحذف النهائي -->
    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
    >
      <div
        class="bg-white dark:bg-gray-700 rounded p-6 max-w-sm w-full shadow-lg text-right"
        dir="rtl"
      >
        <h3 class="text-lg font-semibold mb-4">تأكيد الحذف النهائي</h3>
        <p class="mb-6">هل أنت متأكد من حذف المشروع نهائيًا؟ لن يمكنك استعادته بعد الحذف.</p>
        <div class="flex justify-end gap-4">
          <button
            @click="showDeleteConfirm = false"
            class="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 transition flex items-center gap-2"
          >
            <i class="fa-solid fa-xmark"></i>
            إلغاء
          </button>
          <button
            @click="performPermanentDelete"
            class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2"
          >
            <i class="fa-solid fa-trash"></i>
            حذف نهائي
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MobileHeader from "./layout/MobileHeader.vue";
import MobileMenu from "./layout/MobileMenu.vue";
import Sidebar from "./layout/Sidebar.vue";
import DarkModeToggle from "./layout/DarkModeToggle.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const deletedProjects = ref([]);
const showSidebar = ref(false);
const showMenu = ref(false);

const showDeleteConfirm = ref(false);
const deleteId = ref(null);

onMounted(() => {
  loadDeletedProjects();
});

function loadDeletedProjects() {
  const stored = localStorage.getItem("projects");
  if (stored) {
    const allProjects = JSON.parse(stored);
    deletedProjects.value = allProjects.filter((p) => p.deleted);
  }
}

function restoreProject(id) {
  const stored = localStorage.getItem("projects");
  if (!stored) return;

  const allProjects = JSON.parse(stored);
  const index = allProjects.findIndex((p) => p.id === id);
  if (index !== -1) {
    allProjects[index].deleted = false;
    localStorage.setItem("projects", JSON.stringify(allProjects));
    loadDeletedProjects();
  }
}

function confirmPermanentDelete(id) {
  deleteId.value = id;
  showDeleteConfirm.value = true;
}

function performPermanentDelete() {
  if (!deleteId.value) return;

  const stored = localStorage.getItem("projects");
  if (!stored) return;

  let allProjects = JSON.parse(stored);
  allProjects = allProjects.filter((p) => p.id !== deleteId.value);
  localStorage.setItem("projects", JSON.stringify(allProjects));
  loadDeletedProjects();
  showDeleteConfirm.value = false;
  deleteId.value = null;
}

function statusClassColor(status) {
  switch (status) {
    case "مكتمل":
      return "text-green-600";
    case "جاري التنفيذ":
      return "text-yellow-600";
    case "متأخر":
      return "text-red-600";
    case "تحت المراجعة":
      return "text-blue-600";
    default:
      return "text-gray-600";
  }
}

function goBack() {
  router.push("/projects"); // عدل المسار حسب اسم صفحة المشاريع عندك
}
</script>
