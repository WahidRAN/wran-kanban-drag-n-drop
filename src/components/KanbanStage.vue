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
import { defineProps, defineEmits } from 'vue'
import Card from './KanbanCard.vue'

const props = defineProps({
  stage: Object,
  contacts: Array
})

const emit = defineEmits(['move-contact'])

const onDragStart = (event, contactId) => {
  event.dataTransfer.setData('contactId', contactId)
}

const onDragOver = (event) => {
  event.preventDefault()
}

const onDrop = (event) => {
  event.preventDefault()
  const contactId = event.dataTransfer.getData('contactId')
  emit('move-contact', contactId, props.stage.id)
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
