export interface Stage {
  id: string
  name: string
  header_color: string
  order: number
}

export interface Contact {
  id: string
  full_name: string
  stage: string
}
