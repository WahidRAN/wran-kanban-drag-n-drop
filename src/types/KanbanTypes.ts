import { z } from 'zod'

const PaginationSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  page_size: z.number()
})
export type PaginationType = z.infer<typeof PaginationSchema>

const KanbanStageSchema = z.object({
  id: z.string(),
  name: z.string(),
  header_color: z.string(),
  description: z.string(),
  pipeline: z.string(),
  order: z.number(),
  created_at: z.string()
})
export type KanbanStage = z.infer<typeof KanbanStageSchema>

const KanbanContactSchema = z.object({
  id: z.string(),
  full_name: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  nationality_code: z.string(),
  country_code: z.string().nullable(),
  phone_number: z.string().nullable(),
  status: z.string(),
  lost_reason: z.string().nullable(),
  lost_reason_comments: z.string().nullable(),
  held_by: z.string().nullable(),
  hold_expired_at: z.string().nullable(),
  stage: z.string(),
  assigned_to: z.string(),
  source: z.string().nullable(),
  created_at: z.string()
})
export type KanbanContact = z.infer<typeof KanbanContactSchema>

const ApiResponseSchema = <T extends z.ZodTypeAny>(T: T) =>
  PaginationSchema.extend({
    results: z.array(T)
  })
export type ApiResponse<T> = PaginationType & {
  results: T[]
}
export const StagesApiResponseSchema = ApiResponseSchema(KanbanStageSchema)
export const ContactsApiResponseSchema = ApiResponseSchema(KanbanContactSchema)
