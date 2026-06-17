"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { CreateTodoFormData, createTodoSchema } from "./todos-model";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTodo } from "./todos-server";
import { useRouter } from "next/navigation";

export default function TodosForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTodoFormData>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (formdata: CreateTodoFormData) => {
    const { success, message } = await createTodo(formdata);
    if (success) {
      reset();
      router.refresh();
    } else {
      console.log(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-2 flex flex-row gap-2">
        <Input
          id="title"
          placeholder="Input here....."
          {...register("title")}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.title)}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
