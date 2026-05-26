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
    <div class="card p-6 rounded-xl">
      <h2 class="text-2xl font-bold mb-4 text-primary">
        ${taskToEdit ? "Editar Tarea" : "Nueva Tarea"}
      </h2>

      <form class="task-form space-y-4">

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
          <option value="Baja" ${taskToEdit?.priority === "Baja" ? "selected" : ""}>Baja</option>
          <option value="Media" ${taskToEdit?.priority === "Media" ? "selected" : ""}>Media</option>
          <option value="Alta" ${taskToEdit?.priority === "Alta" ? "selected" : ""}>Alta</option>
        </select>

        <select
          id="status"
          class="w-full border p-2 rounded"
        >
          <option value="Pendiente" ${taskToEdit?.status === "Pendiente" ? "selected" : ""}>Pendiente</option>
          <option value="En proceso" ${taskToEdit?.status === "En proceso" ? "selected" : ""}>En proceso</option>
          <option value="Finalizada" ${taskToEdit?.status === "Finalizada" ? "selected" : ""}>Finalizada</option>
        </select>

        <button
          type="submit"
          class="btn-primary-filled px-4 py-2 rounded"
        >
          ${taskToEdit ? "Actualizar" : "Guardar"} tarea
        </button>

      </form>
    </div>
  `;

  const form = container.querySelector<HTMLFormElement>(".task-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = container.querySelector<HTMLInputElement>("#title");
    const description = container.querySelector<HTMLTextAreaElement>("#description");
    const subject = container.querySelector<HTMLInputElement>("#subject");
    const dueDate = container.querySelector<HTMLInputElement>("#dueDate");
    const priority = container.querySelector<HTMLSelectElement>("#priority");
    const status = container.querySelector<HTMLSelectElement>("#status");

    if (!title || !description || !subject || !dueDate || !priority || !status) {
      return;
    }

    const task: Task = {
      id: taskToEdit?.id || Date.now(),
      title: title.value,
      description: description.value,
      subject: subject.value,
      dueDate: dueDate.value,
      priority: priority.value as Task["priority"],
      status: status.value as Task["status"],
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