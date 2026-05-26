import "./styles/style.css";

import { renderTaskForm } from "./components/taskFrom";
import { renderTaskList } from "./components/taskList";
import { renderFilters } from "./components/filters";
import { renderSummary } from "./components/summary";

import type { Task } from "./models/task";
import { getTasks, deleteTask } from "./services/taskService";

/**
 * Manejo de pestañas (mini-pestañas) para mostrar paneles CRUD
 */
function setupTabs() {
  const buttons = Array.from(document.querySelectorAll<HTMLElement>(".tab-btn"));
  const panels = Array.from(document.querySelectorAll<HTMLElement>(".tab-panel"));

  function activate(button: HTMLElement) {
    const target = button.dataset.target;
    const mode = button.dataset.mode;
    if (!target) return;

    // botones
    buttons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    // paneles
    panels.forEach((p) => {
      if (p.id === target) {
        p.classList.remove("hidden");
        // modo eliminar
        if (mode === "delete") {
          p.classList.add("delete-mode");
        } else {
          p.classList.remove("delete-mode");
        }

        // Si es la pestaña de formulario, alternar entre add/edit
        if (p.id === "tab-form") {
          const add = document.getElementById("task-form-add");
          const edit = document.getElementById("task-form-edit");
          if (mode === "edit") {
            add?.classList.add("hidden");
            edit?.classList.remove("hidden");
          } else {
            add?.classList.remove("hidden");
            edit?.classList.add("hidden");
          }
        }
      } else {
        p.classList.add("hidden");
        p.classList.remove("delete-mode");
      }
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => activate(btn));
  });
}

function setActiveTab(targetId: string, mode?: string) {
  // intenta encontrar un botón que coincida con target y modo
  const selector = mode
    ? `.tab-btn[data-target="${targetId}"][data-mode="${mode}"]`
    : `.tab-btn[data-target="${targetId}"]`;
  const btn = document.querySelector<HTMLElement>(selector) || document.querySelector<HTMLElement>(`.tab-btn[data-target="${targetId}"]`);
  if (btn) btn.click();
}

function renderFilteredTasks(tasks: Task[], onEdit: (t: Task) => void, onRefresh: () => void) {
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

  // Attach listeners para botones en la vista filtrada
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number((button as HTMLButtonElement).dataset.id);

      deleteTask(id);

      onRefresh();
    });
  });

  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number((button as HTMLButtonElement).dataset.id);

      const task = tasks.find((t) => t.id === id);

      if (task) {
        onEdit(task);
      }
    });
  });
}

function refreshUI() {
  renderSummary("summary");

  renderTaskList(
    "task-list",
    (taskToEdit) => {
      // Renderizar formulario de edición en su contenedor específico
      renderTaskForm(
        "task-form-edit",
        () => {
          refreshUI();
          setActiveTab("tab-list");
        },
        taskToEdit
      );

      // Al solicitar editar, mostrar la pestaña de formulario en modo edit
      setTimeout(() => setActiveTab("tab-form", "edit"), 50);
    },
    refreshUI
  );
}

function init() {
  // inicializar manejo de pestañas
  setupTabs();

  // Renderizar formulario vacío para agregar en su contenedor
  renderTaskForm(
    "task-form-add",
    () => {
      refreshUI();
      setActiveTab("tab-list");
    }
  );

  renderFilters(
    "filters-container",
    (tasks) => renderFilteredTasks(tasks, (taskToEdit) => {
      // al editar desde vista filtrada, renderizar en contenedor de edición
      renderTaskForm("task-form-edit", () => {
        refreshUI();
        setActiveTab("tab-list");
      }, taskToEdit);
      setTimeout(() => setActiveTab("tab-form", "edit"), 50);
    }, refreshUI)
  );

  refreshUI();

  console.log("TaskCampus iniciado");
  console.log(getTasks());
}

init();