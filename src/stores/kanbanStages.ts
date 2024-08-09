import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { StagesApiResponseSchema, type ApiResponse, type KanbanStage } from '@/types/KanbanTypes'
import { validateApiResponse } from '@/utils/validateApiResponse'

export const useKanbanStagesStore = defineStore('kanbanStages', () => {
  const stages = ref<KanbanStage[]>([])
  const list = computed(() => stages.value)

  const fetchStages = async () => {
    try {
      const res = await fetch('http://localhost:3000/stages')
      if (!res.ok) throw new Error('Failed to fetch stages')
      const jsonData = await res.json()
      const data: ApiResponse<KanbanStage> = jsonData

      const isValidData = validateApiResponse(StagesApiResponseSchema, data)
      if (stages.value.length === 0 && isValidData) {
        stages.value = data.results
      }
    } catch (error) {
      console.error('Error fetching stages:', error)
    }
  }

  return { stages, list, fetchStages }
})
