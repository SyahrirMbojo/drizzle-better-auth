import TodosForm from "./todos-form";
import { getTodos } from "./todos-server";

export default async function TodosPage() {
  const todos = await getTodos();
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 leading-loose">
        <h1 className="font-medium">Todos</h1>
        <div className="flex flex-col gap-2">
          {todos.map((todo) => {
            return <div key={todo.id}>{todo.title}</div>;
          })}
        </div>
        <TodosForm />
      </div>
    </div>
  );
}
