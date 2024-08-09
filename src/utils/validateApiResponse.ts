import { z, ZodError } from 'zod'

function formatErrorPath(path: (string | number)[]): string {
  return path
    .map((segment, index) => {
      if (typeof segment === 'number') {
        return `[${segment}]`
      }

      if (index > 0) {
        return `.${segment}`
      }

      return segment
    })
    .join('')
}

export function validateApiResponse<T>(schema: z.ZodSchema<T>, data: unknown): T | null {
  try {
    return schema.parse(data)
  } catch (error) {
    if (error instanceof ZodError) {
      const missingProperties = error.errors.map((e) => formatErrorPath(e.path))
      alert(`Validation Error: Missing or invalid properties: ${missingProperties}`)

      console.error('Validation Error:', error.errors)
    } else {
      console.error('An unexpected error occurred:', error)
    }

    return null
  }
}
