import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ApiResponse, KanbanStage } from '@/types/KanbanTypes'

export const useKanbanStagesStore = defineStore('kanbanStages', () => {
  const stages = ref<KanbanStage[]>([])
  const list = computed(() => stages.value)

  const fetchStages = async () => {
    try {
      const res = await fetch('http://localhost:3000/stages')
      if (!res.ok) throw new Error('Failed to fetch stages')
      const data: ApiResponse<KanbanStage> = await res.json()

      if (stages.value.length === 0) {
        stages.value = data.results
      }
    } catch (error) {
      console.error('Error fetching stages:', error)
    }
  }

  return { stages, list, fetchStages }
})
