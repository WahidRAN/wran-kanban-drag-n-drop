import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  ContactsApiResponseSchema,
  type ApiResponse,
  type KanbanContact
} from '@/types/KanbanTypes'
import { validateApiResponse } from '@/utils/validateApiResponse'

export const useKanbanContactsStore = defineStore('kanbanContacts', () => {
  const allContacts = ref<KanbanContact[]>([])
  const list = computed(() => allContacts.value)

  const setContacts = (contactData: KanbanContact[]) => {
    contactData.forEach((newContact) => {
      const existingContact = allContacts.value.find((contact) => contact.id === newContact.id)
      if (!existingContact) {
        allContacts.value.push(newContact)
      }
    })
  }

  const fetchContactsByStage = async (stageId: string) => {
    try {
      const res = await fetch(`http://localhost:3000/contacts-stage-${stageId}`)
      if (res.status === 404) return
      if (!res.ok) throw new Error('Failed to fetch contacts')

      const jsonData = await res.json()
      const data: ApiResponse<KanbanContact> = jsonData
      const isValidData = validateApiResponse(ContactsApiResponseSchema, jsonData)

      if (isValidData) setContacts(data.results)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
  }

  return { list, fetchContactsByStage }
})
