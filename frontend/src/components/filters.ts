import { filterTasks } from "../services/taskService";
import type { Task } from "../models/task";

export function renderFilters(
  containerId: string,
  onFilter: (tasks: Task[]) => void
) {
  const container = document.getElementById(containerId);

  if (!container) return;

  container.innerHTML = `
    <div class="bg-white p-6 rounded-xl shadow-md">

      <h2 class="text-2xl font-bold mb-4">
        Filtros
      </h2>

      <div class="grid md:grid-cols-3 gap-4">

        <select
          id="filter-status"
          class="border p-2 rounded"
        >
          <option value="">Todos los estados</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En proceso">En proceso</option>
          <option value="Finalizada">Finalizada</option>
        </select>

        <select
          id="filter-priority"
          class="border p-2 rounded"
        >
          <option value="">Todas las prioridades</option>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>

        <input
          type="text"
          id="filter-subject"
          placeholder="Asignatura"
          class="border p-2 rounded"
        />

      </div>

      <button
        id="filter-btn"
        class="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Filtrar
      </button>

    </div>
  `;

  const filterBtn = document.getElementById(
    "filter-btn"
  ) as HTMLButtonElement;

  filterBtn.addEventListener("click", () => {
    const status = (
      document.getElementById("filter-status") as HTMLSelectElement
    ).value;

    const priority = (
      document.getElementById("filter-priority") as HTMLSelectElement
    ).value;

    const subject = (
      document.getElementById("filter-subject") as HTMLInputElement
    ).value;

    const filteredTasks = filterTasks({
      status,
      priority,
      subject,
    });

    onFilter(filteredTasks);
  });
}