<template>
  <div class="card" draggable="true" @dragstart="onDragStart">
    {{ contact.full_name }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  contact: Object
})

const onDragStart = (event) => {
  event.dataTransfer.setData('contactId', props.contact.id)
}
</script>

<style>
.card {
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: grab;
}
</style>
