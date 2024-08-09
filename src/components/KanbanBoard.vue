<template>
  <div class="kanban-board">
    <Stage
      v-for="stage in stages"
      :key="stage.id"
      :stage="stage"
      :contacts="getContactsByStage(stage.id)"
      @move-contact="moveContact"
    />
  </div>
</template>

<script setup lang="ts">
import Stage from './KanbanStage.vue'

import { onMounted, computed } from 'vue'
import { useKanbanStagesStore } from '@/stores/kanbanStages'
import { useKanbanContactsStore } from '@/stores/kanbanContacts'

const kanbanStageStore = useKanbanStagesStore()
const stages = computed(() => kanbanStageStore.list)

const kanbanContactStore = useKanbanContactsStore()
const contactsList = computed(() => kanbanContactStore.list)

const fetchContacts = () => {
  stages.value.forEach((stage) => {
    kanbanContactStore.fetchContactsByStage(stage.id)
  })
}

const getContactsByStage = (stageId: string) => {
  return contactsList.value.filter((contact) => contact.stage === stageId)
}

const moveContact = (contactId: string, newStageId: string) => {
  const contact = contactsList.value.find((c) => c.id === contactId)
  if (contact) {
    contact.stage = newStageId
  } else {
    console.error(`Contact with id ${contactId} not found`)
  }
}

onMounted(async () => {
  await kanbanStageStore.fetchStages()
  fetchContacts()
})
</script>

<style>
.kanban-board {
  display: flex;
  gap: 1rem;
}
</style>
