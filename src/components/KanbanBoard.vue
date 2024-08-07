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
import { ref, onMounted } from 'vue'
import Stage from './KanbanStage.vue'
import { Stage as StageType, Contact } from './types'

const stages = ref<StageType[]>([])
const contacts = ref<Contact[]>([])

const fetchStages = async () => {
  try {
    const res = await fetch('http://localhost:3000/stages')
    if (!res.ok) throw new Error('Failed to fetch stages')
    stages.value = await res.json()
  } catch (error) {
    console.error('Error fetching stages:', error)
  }
}

const fetchContacts = async () => {
  try {
    const res = await fetch('http://localhost:3000/contacts')
    if (!res.ok) throw new Error('Failed to fetch contacts')
    contacts.value = await res.json()
  } catch (error) {
    console.error('Error fetching contacts:', error)
  }
}

const getContactsByStage = (stageId: string) => {
  return contacts.value.filter((contact) => contact.stage === stageId)
}

const moveContact = (contactId: string, newStageId: string) => {
  const contact = contacts.value.find((c) => c.id === contactId)
  if (contact) {
    contact.stage = newStageId
  } else {
    console.error(`Contact with id ${contactId} not found`)
  }
}

onMounted(() => {
  fetchStages()
  fetchContacts()
})
</script>

<style>
.kanban-board {
  display: flex;
  gap: 1rem;
}
</style>
