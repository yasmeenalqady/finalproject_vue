<template>
  <div
    class="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6 transition-colors duration-500 flex items-end justify-between sticky top-0 z-30"
  >
    <div class="text-right flex-1">
      <h1 class="text-2xl font-bold">المشاريع</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">مرحباً بعودتك</p>
    </div>
    <div class="flex-shrink-0 ml-4">
      <img
        src="/1.png"
        alt="صورة المستخدم"
        class="w-12 h-12 rounded-full object-cover border-2 border-primary"
      />
    </div>
  </div>

  <!-- أزرار التحكم -->
  <div
    class="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3 px-4 relative font-sans"
    dir="rtl"
  >
    <!-- البحث -->
    <div class="relative w-full sm:w-64" dir="rtl">
      <input
        v-model="searchQuery"
        type="text"
        id="searchInput"
        placeholder="ابحث هنا..."
        class="border border-gray-300 dark:border-gray-600 rounded pr-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary transition text-right bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      />
      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          class="w-5 h-5 text-gray-400 dark:text-gray-300"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      </div>
    </div>

    <!-- زر إضافة مشروع -->
    <button
      @click="showAddModal = true"
      class="bg-secondary hover:bg-secondary-200 text-white px-4 py-2 rounded w-full sm:w-auto flex items-center justify-center gap-2 transition"
    >
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
      </svg>
      إضافة مشروع
    </button>
  </div>

  <!-- قسم بيانات المشاريع -->
  <div class="bg-white dark:bg-gray-800 rounded shadow py-2 px-2">
    <div class="flex flex-row justify-between items-center mb-6 px-1 relative" dir="rtl">
      <h2 class="text-right font-extrabold text-xl">بيانات المشاريع</h2>

      <!-- زر تصفية -->
      <div class="relative inline-block">
        <button
          @click="showFilter = !showFilter"
          class="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition flex items-center gap-2"
        >
          <i class="fa-solid fa-filter"></i>
          تصفية
        </button>

        <FilterForm
          v-if="showFilter"
          :filters="filters"
          @update:filters="handleFilterUpdate"
          @clearFilters="handleFilterClear"
          :onClose="() => (showFilter = false)"
        />
      </div>
    </div>

    <!-- جدول عرض المشاريع -->
    <div
      class="overflow-x-auto max-w-full mt-4 md:mt-4 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg"
    >
      <table
        id="projectsTable"
        class="min-w-[700px] w-full table-fixed text-sm md:text-base text-right border-collapse"
      >
        <thead>
          <tr class="bg-primary text-white text-sm">
            <th class="px-2 py-1 w-8">#</th>
            <th class="px-2 py-1 whitespace-nowrap break-words">الصورة</th>
            <th class="px-2 py-1 whitespace-nowrap break-words">اسم المشروع</th>
            <th class="px-2 py-1 whitespace-nowrap break-words">مدير المشروع</th>
            <th class="px-2 py-1 whitespace-nowrap break-words hidden md:table-cell">المجال</th>
            <th class="px-2 py-1 whitespace-nowrap break-words hidden md:table-cell">تاريخ البداية</th>
            <th class="px-2 py-1 whitespace-nowrap break-words hidden md:table-cell">تاريخ الانتهاء</th>
            <th class="px-2 py-1 whitespace-nowrap break-words hidden lg:table-cell">الحالة</th>
            <th class="px-2 py-1 whitespace-nowrap break-words">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(project, index) in paginatedProjects"
            :key="project.id"
            class="border-b border-gray-300 dark:border-gray-700 border-b-[0.5px]"
          >
            <td class="px-2 py-1 text-center">{{ (currentPage - 1) * rowsPerPage + index + 1 }}</td>
            <td class="px-2 py-1">
              <img
                :src="project.image || defaultImage"
                alt="صورة المشروع"
                class="w-10 h-10 rounded-full object-cover"
              />
            </td>
            <td class="px-2 py-1 break-words">{{ project.name }}</td>
            <td class="px-2 py-1 break-words">{{ project.manager }}</td>
            <td class="px-2 py-1 break-words hidden md:table-cell">{{ project.field }}</td>
            <td class="px-2 py-1 break-words hidden md:table-cell">{{ formatDate(project.startDate) }}</td>
            <td class="px-2 py-1 break-words hidden md:table-cell">{{ formatDate(project.endDate) }}</td>
            <td
              class="px-2 py-1 break-words hidden lg:table-cell"
              :class="statusClassColor(project.status)"
            >
              {{ project.status }}
            </td>
            <td class="px-2 py-1 flex flex-row-reverse gap-1 justify-end">
              <button
                class="hover:bg-gray-300 text-green-600 hover:text-green-800 p-1 rounded"
                @click="openEditModal(project)"
                title="تعديل المشروع"
              >
                <i class="fa-solid fa-pen-to-square text-xl"></i>
              </button>
              <button
                class="hover:bg-gray-300 text-red-600 hover:text-red-800 p-1 rounded"
                @click="confirmDelete(project.id)"
                title="حذف المشروع"
              >
                <i class="fa-solid fa-trash text-xl"></i>
              </button>
              <button
                class="hover:bg-gray-300 text-blue-600 hover:text-blue-800 p-1 rounded"
                title="عرض تفاصيل المشروع"
              >
                <i class="fa-solid fa-info-circle text-xl"></i>
              </button>
            </td>
          </tr>
          <tr v-if="paginatedProjects.length === 0">
            <td colspan="9" class="text-center py-4 text-gray-500">
              لا توجد مشاريع لعرضها
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- أزرار التصفح -->
    <div class="flex justify-center gap-2 mt-6" dir="ltr">
      <button
        :disabled="currentPage === 1"
        @click="currentPage--"
        class="w-8 h-8 bg-primary text-white hover:bg-primary-200 flex items-center justify-center text-xs md:text-sm rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <i class="fas fa-chevron-left"></i>
      </button>
      <span class="flex items-center px-3 text-sm">
        الصفحة {{ currentPage }} من {{ totalPages }}
      </span>
      <button
        :disabled="currentPage === totalPages"
        @click="currentPage++"
        class="w-8 h-8 bg-secondary text-white hover:bg-secondary-200 flex items-center justify-center text-xs md:text-sm rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>

  <!-- زر عرض المشاريع المحذوفة -->
  <div class="flex justify-start mt-4">
    <button
      @click="goToDeletedProjects"
      class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition flex items-center gap-2"
    >
      <i class="fa-solid fa-trash"></i>
      عرض المشاريع المحذوفة
    </button>
  </div>

  <!-- مودال إضافة مشروع -->
  <ModalAdd v-if="showAddModal" @close="showAddModal = false" @save="addProject" />

  <!-- مودال تعديل مشروع -->
  <ModalEdit
    :project="editProject"
    :visible="showEditModal"
    @close="showEditModal = false"
    @update="updateProject"
  />

  <!-- مودال تأكيد الحذف -->
  <div
    v-if="showDeleteConfirm"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
  >
    <div class="bg-white dark:bg-gray-700 rounded p-6 max-w-sm w-full shadow-lg text-right" dir="rtl">
      <h3 class="text-lg font-semibold mb-4">تأكيد الحذف</h3>
      <p class="mb-6">هل أنت متأكد من حذف هذا المشروع؟</p>
      <div class="flex justify-end gap-4">
        <button
          @click="showDeleteConfirm = false"
          class="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
        >
          إلغاء
        </button>
        <button
          @click="performDelete"
          class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
        >
          حذف
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import FilterForm from "./FilterForm.vue";
import ModalAdd from './ModalAdd.vue';
import ModalEdit from "./ModalEdit.vue";
import { useRouter } from "vue-router";

const router = useRouter();

function goToDeletedProjects() {
  router.push("/deleted-projects");
}

// الحالة الرئيسية للمشاريع والبحث والفلترة
const projects = ref([]);
const searchQuery = ref("");
const showFilter = ref(false);
const showAddModal = ref(false);
const showEditModal = ref(false);
const editProject = ref(null);

// الفلاتر
const filters = ref({
  dateFrom: "",
  dateTo: "",
  status: "",
  department: "",
});

// تأكيد الحذف
const showDeleteConfirm = ref(false);
const deleteProjectId = ref(null);

// الترقيم والصفحات
const currentPage = ref(1);
const rowsPerPage = 8;

const defaultImage = "https://via.placeholder.com/40?text=No+Img";

// دوال مساعدة
function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("ar-EG");
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

// حذف مشروع (وضع علامة حذف فقط)
function confirmDelete(id) {
  deleteProjectId.value = id;
  showDeleteConfirm.value = true;
}

function performDelete() {
  projects.value = projects.value.map((p) =>
    p.id === deleteProjectId.value ? { ...p, deleted: true } : p
  );
  saveProjects();
  showDeleteConfirm.value = false;
  deleteProjectId.value = null;

  // تأكد أن الصفحة الحالية لا تتجاوز عدد الصفحات الجديدة
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }
}

// حفظ المشاريع في التخزين المحلي
function saveProjects() {
  localStorage.setItem("projects", JSON.stringify(projects.value));
}

// التحديثات على الفلاتر
function handleFilterUpdate(newFilters) {
  filters.value = newFilters;
}

function handleFilterClear() {
  filters.value = {
    dateFrom: "",
    dateTo: "",
    status: "",
    department: "",
  };
  showFilter.value = false;
}

// مشاريع مفلترة حسب البحث والفلاتر مع استبعاد المحذوفة
const filteredProjects = computed(() => {
  let filtered = projects.value.filter((p) => !p.deleted);

  if (searchQuery.value.trim() !== "") {
    const q = searchQuery.value.trim().toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.manager.toLowerCase().includes(q)
    );
  }

  if (filters.value.dateFrom) {
    const from = new Date(filters.value.dateFrom);
    filtered = filtered.filter((p) => new Date(p.startDate) >= from);
  }

  if (filters.value.dateTo) {
    const to = new Date(filters.value.dateTo);
    filtered = filtered.filter((p) => new Date(p.endDate) <= to);
  }

  if (filters.value.status) {
    filtered = filtered.filter((p) => p.status === filters.value.status);
  }

  if (filters.value.department) {
    filtered = filtered.filter((p) => p.field === filters.value.department);
  }

  return filtered;
});

// حساب عدد الصفحات الكلي
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredProjects.value.length / rowsPerPage))
);

// المشاريع المعروضة في الصفحة الحالية
const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage;
  return filteredProjects.value.slice(start, start + rowsPerPage);
});

// إعادة تعيين الصفحة الحالية عند تغير البحث أو الفلترة
watch([searchQuery, filters], () => {
  currentPage.value = 1;
});

// تحميل المشاريع من التخزين المحلي عند بدء المكون
onMounted(() => {
  const storedProjects = localStorage.getItem("projects");

  if (!storedProjects) {
    // مشاريع افتراضية عند أول تحميل
    const defaultProjects = [
      {
        id: 1,
        name: "مشروع التعليم",
        manager: "محمد أحمد",
        field: "تعليمي",
        startDate: "2024-01-01",
        endDate: "2024-06-01",
        status: "جاري التنفيذ",
        image: "",
        deleted: false,
      },
      {
        id: 2,
        name: "مشروع الصحة",
        manager: "علي سعيد",
        field: "صحي",
        startDate: "2024-02-15",
        endDate: "2024-07-15",
        status: "مكتمل",
        image: "",
        deleted: false,
      },
    ];
    localStorage.setItem("projects", JSON.stringify(defaultProjects));
    projects.value = defaultProjects;
  } else {
    projects.value = JSON.parse(storedProjects).map((p) => ({
      ...p,
      deleted: p.deleted ?? false,
    }));
  }
});

// إضافة مشروع جديد مع إعطاء ID تلقائي
function addProject(newProject) {
  const newId = projects.value.length
    ? Math.max(...projects.value.map((p) => p.id)) + 1
    : 1;

  projects.value.unshift({
    id: newId,
    name: newProject.name,
    manager: newProject.manager,
    field: newProject.field,
    startDate: newProject.startDate,
    endDate: newProject.endDate,
    status: newProject.status,
    image: newProject.image || defaultImage,
    deleted: false,
  });

  saveProjects();
  showAddModal.value = false;
  currentPage.value = 1; // للانتقال للصفحة الأولى بعد الإضافة
}

// تحديث مشروع موجود
function updateProject(updatedProject) {
  const index = projects.value.findIndex((p) => p.id === updatedProject.id);
  if (index !== -1) {
    projects.value[index] = { ...updatedProject };
    saveProjects();
  }
  showEditModal.value = false;
}

// فتح مودال التعديل مع تمرير نسخة من المشروع
function openEditModal(project) {
  editProject.value = { ...project };
  showEditModal.value = true;
}
</script>
