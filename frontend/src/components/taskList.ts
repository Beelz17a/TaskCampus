import type { Task } from "../models/task";
import {
  deleteTask,
  getTasks,
} from "../services/taskService";

export function renderTaskList(
  containerId: string,
  onEdit: (task: Task) => void,
  onRefresh: () => void
) {
  const container = document.getElementById(containerId);

  if (!container) return;

  const tasks = getTasks();

  if (tasks.length === 0) {
    container.innerHTML = `
      <div class="bg-white p-4 rounded-xl shadow-md">
        <p class="text-gray-500">
          No hay tareas registradas.
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="bg-white p-6 rounded-xl shadow-md overflow-auto">

      <h2 class="text-2xl font-bold mb-4">
        Lista de Tareas
      </h2>

      <table class="w-full border-collapse">

        <thead>
          <tr class="bg-gray-200">
            <th class="p-2 text-left">Título</th>
            <th class="p-2 text-left">Materia</th>
            <th class="p-2 text-left">Prioridad</th>
            <th class="p-2 text-left">Estado</th>
            <th class="p-2 text-left">Fecha</th>
            <th class="p-2 text-left">Acciones</th>
          </tr>
        </thead>

        <tbody>
          ${tasks
            .map(
              (task) => `
                <tr class="border-b">

                  <td class="p-2">${task.title}</td>

                  <td class="p-2">${task.subject}</td>

                  <td class="p-2">
                    <span class="
                      px-2 py-1 rounded text-white
                      ${
                        task.priority === "Alta"
                          ? "bg-red-500"
                          : task.priority === "Media"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }
                    ">
                      ${task.priority}
                    </span>
                  </td>

                  <td class="p-2">${task.status}</td>

                  <td class="p-2">${task.dueDate}</td>

                  <td class="p-2 flex gap-2">

                    <button
                      class="edit-btn bg-blue-500 text-white px-3 py-1 rounded"
                      data-id="${task.id}"
                    >
                      Editar
                    </button>

                    <button
                      class="delete-btn bg-red-500 text-white px-3 py-1 rounded"
                      data-id="${task.id}"
                    >
                      Eliminar
                    </button>

                  </td>

                </tr>
              `
            )
            .join("")}
        </tbody>

      </table>

    </div>
  `;

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(
        (button as HTMLButtonElement).dataset.id
      );

      deleteTask(id);

      onRefresh();
    });
  });

  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(
        (button as HTMLButtonElement).dataset.id
      );

      const task = tasks.find((t) => t.id === id);

      if (task) {
        onEdit(task);
      }
    });
  });
}