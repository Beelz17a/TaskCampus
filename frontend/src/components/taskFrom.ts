import type { Task } from "../models/task";
import { saveTask, updateTask } from "../services/taskService";

export function renderTaskForm(
  containerId: string,
  onTaskSaved: () => void,
  taskToEdit?: Task
) {
  const container = document.getElementById(containerId);

  if (!container) return;

  container.innerHTML = `
    <div class="bg-white p-6 rounded-xl shadow-md">
      <h2 class="text-2xl font-bold mb-4">
        ${taskToEdit ? "Editar Tarea" : "Nueva Tarea"}
      </h2>

      <form id="task-form" class="space-y-4">

        <input
          type="text"
          id="title"
          placeholder="Título"
          class="w-full border p-2 rounded"
          value="${taskToEdit?.title || ""}"
          required
        />

        <textarea
          id="description"
          placeholder="Descripción"
          class="w-full border p-2 rounded"
          required
        >${taskToEdit?.description || ""}</textarea>

        <input
          type="text"
          id="subject"
          placeholder="Asignatura"
          class="w-full border p-2 rounded"
          value="${taskToEdit?.subject || ""}"
          required
        />

        <input
          type="date"
          id="dueDate"
          class="w-full border p-2 rounded"
          value="${taskToEdit?.dueDate || ""}"
          required
        />

        <select
          id="priority"
          class="w-full border p-2 rounded"
        >
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>

        <select
          id="status"
          class="w-full border p-2 rounded"
        >
          <option value="Pendiente">Pendiente</option>
          <option value="En proceso">En proceso</option>
          <option value="Finalizada">Finalizada</option>
        </select>

        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ${taskToEdit ? "Actualizar" : "Guardar"} tarea
        </button>

      </form>
    </div>
  `;

  const form = document.getElementById("task-form") as HTMLFormElement;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task: Task = {
      id: taskToEdit?.id || Date.now(),
      title: (document.getElementById("title") as HTMLInputElement).value,
      description: (document.getElementById("description") as HTMLTextAreaElement).value,
      subject: (document.getElementById("subject") as HTMLInputElement).value,
      dueDate: (document.getElementById("dueDate") as HTMLInputElement).value,
      priority: (document.getElementById("priority") as HTMLSelectElement)
        .value as Task["priority"],
      status: (document.getElementById("status") as HTMLSelectElement)
        .value as Task["status"],
    };

    if (taskToEdit) {
      updateTask(task.id, task);
    } else {
      saveTask(task);
    }

    form.reset();

    onTaskSaved();
  });
}