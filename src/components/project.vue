



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
     
      <headermain/>
    <div>
    <Project
      @openAddModal="openModal('add')"
      @openEditModal="openModal('edit', $event)"
      @openViewModal="openModal('view', $event)"
    />
    <ModalAdd v-if="modalType === 'add'" @close="closeModal" @save="saveProject" />
    <ModalEdit v-if="modalType === 'edit'" :project="selectedProject" @close="closeModal" @update="updateProject" />
    <ModalView v-if="modalType === 'view'" :project="selectedProject" @close="closeModal" />
  </div>
    </main>

    <DarkModeToggle />
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MobileHeader from './layout/MobileHeader.vue'
import MobileMenu from './layout/MobileMenu.vue'
import Sidebar from './layout/Sidebar.vue'
import DarkModeToggle from './layout/DarkModeToggle.vue'

import Project from './projectcomponent/ProjectsTable.vue'
import ModalAdd from './projectcomponent/ModalAdd.vue'
import ModalEdit from './projectcomponent/ModalEdit.vue'
import ModalView from './projectcomponent/ModalView.vue'

const showMenu = ref(false)
const showSidebar = ref(false)

const modalType = ref(null)
const selectedProject = ref(null)

function openModal(type, project = null) {
  modalType.value = type
  selectedProject.value = project
}

function closeModal() {
  modalType.value = null
  selectedProject.value = null
}

function saveProject(newProject) {
  console.log('حفظ مشروع:', newProject)
  closeModal()
}

function updateProject(updatedProject) {
  console.log('تحديث مشروع:', updatedProject)
  closeModal()
}
</script>
