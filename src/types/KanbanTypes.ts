export type PaginationType = {
  count: number
  next: null | string
  previous: null | string
  page_size: number
}

export type ApiResponse<T> = PaginationType & {
  results: T[]
}

export type KanbanStage = {
  id: string
  name: string
  header_color: string
  description: string
  pipeline: string
  order: 1
  created_at: string
}

export type KanbanContact = {
  id: string
  full_name: string
  first_name: string
  last_name: string
  email: string
  nationality_code: string
  country_code: string
  phone_number: null | string
  status: string
  lost_reason: null | string
  lost_reason_comments: null | string
  held_by: null | string
  hold_expired_at: null | string
  stage: string
  assigned_to: string
  source: null | string
  created_at: string
}
