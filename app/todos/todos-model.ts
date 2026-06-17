import z from "zod"

export const createTodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
})

export type CreateTodoFormData = z.infer<typeof createTodoSchema>
