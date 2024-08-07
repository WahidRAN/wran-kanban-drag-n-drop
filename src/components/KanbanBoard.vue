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

const stages = ref([])
const contacts = ref([])

const fetchStages = async () => {
  const res = await fetch('http://localhost:3000/stages')
  stages.value = await res.json()
}

const fetchContacts = async () => {
  const res = await fetch('http://localhost:3000/contacts')
  contacts.value = await res.json()
}

const getContactsByStage = (stageId: string) => {
  return contacts.value.filter((contact) => contact.stage === stageId)
}

const moveContact = (contactId: string, newStageId: string) => {
  const contact = contacts.value.find((c) => c.id === contactId)
  if (contact) {
    contact.stage = newStageId
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
