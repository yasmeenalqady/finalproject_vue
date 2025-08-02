<template>
  <div
    class="rounded shadow px-4 py-6 flex flex-col md:flex-row gap-6 text-xs md:text-sm w-full transition-colors duration-500"
  >
    <!-- المخطط الأول -->
    <div
      class="bg-white dark:bg-gray-800 w-full md:w-1/2 md:h-[400px] h-[280px] p-4 flex flex-col justify-between rounded border border-gray-100 dark:border-gray-700"
    >
      <h3
        class="text-base font-semibold text-center mb-3 text-gray-800 dark:text-gray-100"
      >
        نشاط المستخدمين الشهري
      </h3>
      <canvas ref="userActivityChart" class="w-full h-full p-4"></canvas>
    </div>

    <!-- المخطط الثاني -->
    <div
      class="bg-white dark:bg-gray-800 w-full md:w-1/2 md:h-[400px] h-[280px] bg-gray-50 dark:bg-gray-700 rounded p-4 shadow-inner flex flex-col justify-between border border-gray-200 dark:border-gray-600"
    >
      <h3
        class="text-base font-semibold text-center mb-3 text-gray-800 dark:text-gray-100"
      >
        توزيع المشاريع حسب الحالة
      </h3>
      <canvas ref="projectStatusChart" class="w-full h-full p-4"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import Chart from 'chart.js/auto'

const userActivityChart = ref(null)
const projectStatusChart = ref(null)

function getProjectsFromLocalStorage() {
  try {
    const stored = localStorage.getItem('projects')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function countProjectsByMonth(projects) {
  const monthLabels = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ]
  const counts = new Array(12).fill(0)
  projects.forEach(p => {
    if (p.startDate) {
      const month = new Date(p.startDate).getMonth()
      counts[month]++
    }
  })
  return { monthLabels, counts }
}

function countProjectsByStatus(projects) {
  const statusLabels = ['مكتمل', 'جاري التنفيذ', 'مؤجل', 'ملغي']
  const counts = statusLabels.map(status =>
    projects.filter(p => p.status === status).length
  )
  return { statusLabels, counts }
}

let userChartInstance = null
let statusChartInstance = null
let observer = null

onMounted(() => {
  const html = document.documentElement

  const projects = getProjectsFromLocalStorage()

  const { monthLabels, counts: monthlyCounts } = countProjectsByMonth(projects)
  const { statusLabels, counts: statusCounts } = countProjectsByStatus(projects)

  userChartInstance = new Chart(userActivityChart.value.getContext('2d'), {
    type: 'line',
    data: {
      labels: monthLabels.slice(0, 7), // عرض 7 أشهر فقط مثل المثال السابق
      datasets: [{
        label: 'نشاط المستخدمين',
        data: monthlyCounts.slice(0, 7),
        borderColor: '#00a0af',
        backgroundColor: 'rgba(0, 160, 175, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: '#00a0af',
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 },
          title: { display: true, text: 'عدد المشاريع' }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: html.classList.contains('dark') ? '#d1d5db' : '#374151'
          }
        }
      }
    }
  })

  statusChartInstance = new Chart(projectStatusChart.value.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: statusLabels,
      datasets: [{
        label: 'حالة المشاريع',
        data: statusCounts,
        backgroundColor: [
          '#10B981', // أخضر
          '#3B82F6', // أزرق
          '#F59E0B', // أصفر
          '#EF4444'  // أحمر
        ],
        hoverOffset: 30
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: html.classList.contains('dark') ? '#d1d5db' : '#374151'
          }
        }
      }
    }
  })

  observer = new MutationObserver(() => {
    const color = html.classList.contains('dark') ? '#d1d5db' : '#374151'
    if (userChartInstance) userChartInstance.options.plugins.legend.labels.color = color
    if (statusChartInstance) statusChartInstance.options.plugins.legend.labels.color = color
    userChartInstance.update()
    statusChartInstance.update()
  })
  observer.observe(html, { attributes: true, attributeFilter: ['class'] })
})

onBeforeUnmount(() => {
  if (userChartInstance) userChartInstance.destroy()
  if (statusChartInstance) statusChartInstance.destroy()
  if (observer) observer.disconnect()
})
</script>
