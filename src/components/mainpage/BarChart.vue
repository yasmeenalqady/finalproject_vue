<template>
  <canvas ref="barChartRef" style="height: 300px;"></canvas>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'

const barChartRef = ref(null)

// دالة لجلب المشاريع من localStorage مع معالجة الأخطاء
function getProjectsFromLocalStorage() {
  const stored = localStorage.getItem('projects')
  if (!stored) return []
  try {
    return JSON.parse(stored)
  } catch (e) {
    console.error('خطأ في قراءة بيانات المشاريع من التخزين المحلي:', e)
    return []
  }
}

// دالة لحساب عدد المشاريع التي تبدأ في كل شهر (حسب startDate)
function countProjectsByMonth(projects) {
  const monthLabels = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ]
  const counts = new Array(12).fill(0)

  projects.forEach(p => {
    if (p.startDate) {
      const month = new Date(p.startDate).getMonth() // قيمة من 0 إلى 11
      counts[month]++
    }
  })

  return { monthLabels, counts }
}

onMounted(() => {
  const projects = getProjectsFromLocalStorage()
  const { monthLabels, counts } = countProjectsByMonth(projects)

  new Chart(barChartRef.value, {
    type: 'line',
    data: {
      labels: monthLabels,
      datasets: [{
        label: 'عدد المشاريع حسب شهر البداية',
        data: counts,
        borderColor: '#00a0af',
        backgroundColor: 'rgba(0, 160, 175, 0.2)',
        fill: true,
        tension: 0.3 // لجعل الخطوط منحنية بشكل لطيف
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          stepSize: 1,
          title: {
            display: true,
            text: 'عدد المشاريع'
          }
        },
        x: {
          title: {
            display: true,
            text: 'الشهر'
          }
        }
      }
    }
  })
})
</script>
