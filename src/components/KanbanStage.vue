<template>
  <div class="stage" @drop="onDrop" @dragover="onDragOver">
    <h3 :style="{ backgroundColor: stage.header_color }">{{ stage.name }}</h3>
    <div>
      <Card
        v-for="contact in contacts"
        :key="contact.id"
        :contact="contact"
        @dragstart="(event) => onDragStart(event, contact.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from './KanbanCard.vue'
import type { KanbanStage, KanbanContact } from '@/types/KanbanTypes'

const props = defineProps<{
  stage: KanbanStage
  contacts: KanbanContact[]
}>()

const emit = defineEmits<{
  (e: 'move-contact', contactId: string, stageId: string): void
}>()

const onDragStart = (event: DragEvent, contactId: string) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('contactId', contactId)
  }
}

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
}

const onDrop = (event: DragEvent) => {
  event.preventDefault()
  const contactId = event.dataTransfer?.getData('contactId')
  if (contactId) {
    emit('move-contact', contactId, props.stage.id)
  }
}
</script>

<style>
.stage {
  width: 200px;
  padding: 1rem;
  background-color: #f4f4f4;
  border-radius: 8px;
}
</style>
