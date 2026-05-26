import "./styles/style.css";

import { renderTaskForm } from "./components/taskFrom";
import { renderTaskList } from "./components/taskList";
import { renderFilters } from "./components/filters";
import { renderSummary } from "./components/summary";

import type { Task } from "./models/task";
import { getTasks } from "./services/taskService";

function renderFilteredTasks(tasks: Task[]) {
  const container = document.getElementById("task-list");

  if (!container) return;

  if (tasks.length === 0) {
    container.innerHTML = `
      <div class="bg-white p-4 rounded-xl shadow-md">
        <p class="text-gray-500">
          No se encontraron tareas.
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="bg-white p-6 rounded-xl shadow-md overflow-auto">

      <h2 class="text-2xl font-bold mb-4">
        Resultado de filtros
      </h2>

      <table class="w-full border-collapse">

        <thead>
          <tr class="bg-gray-200">
            <th class="p-2 text-left">Título</th>
            <th class="p-2 text-left">Materia</th>
            <th class="p-2 text-left">Prioridad</th>
            <th class="p-2 text-left">Estado</th>
            <th class="p-2 text-left">Fecha</th>
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
                </tr>
              `
            )
            .join("")}
        </tbody>

      </table>

    </div>
  `;
}

function refreshUI() {
  renderSummary("summary");

  renderTaskList(
    "task-list",
    (taskToEdit) => {
      renderTaskForm(
        "task-form-container",
        refreshUI,
        taskToEdit
      );
    },
    refreshUI
  );
}

function init() {
  renderTaskForm(
    "task-form-container",
    refreshUI
  );

  renderFilters(
    "filters-container",
    renderFilteredTasks
  );

  refreshUI();

  console.log("TaskCampus iniciado");
  console.log(getTasks());
}

init();