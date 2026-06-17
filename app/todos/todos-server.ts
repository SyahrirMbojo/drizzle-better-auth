"use server"
import { db } from "@/db/db"
import { todos } from "@/db/schema"
import { CreateTodoFormData, createTodoSchema } from "./todos-model"

export const getTodos = async () => {
  const data = await db.select().from(todos)
  return data
}

export const createTodo = async (formdata: CreateTodoFormData) => {
  try {
    const validatedData = createTodoSchema.parse(formdata)
    await db
      .insert(todos)
      .values({
        title: validatedData.title,
      })
      .returning()

    return {
      message: "Todo created successfully",
      success: true,
      status: 201,
    }
  } catch (error) {
    return {
      message: "Internal server error",
      success: false,
      status: 500,
    }
  }
}
