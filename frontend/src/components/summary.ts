import { getSummary } from "../services/taskService";

export function renderSummary(containerId: string) {
  const container = document.getElementById(containerId);

  if (!container) return;

  const summary = getSummary();

  container.innerHTML = `
    <div class="grid md:grid-cols-4 gap-4">

      <div class="bg-blue-500 text-white p-4 rounded-xl shadow-md">
        <h3 class="text-lg font-bold">
          Total
        </h3>

        <p class="text-3xl">
          ${summary.total}
        </p>
      </div>

      <div class="bg-yellow-500 text-white p-4 rounded-xl shadow-md">
        <h3 class="text-lg font-bold">
          Pendientes
        </h3>

        <p class="text-3xl">
          ${summary.pending}
        </p>
      </div>

      <div class="bg-green-500 text-white p-4 rounded-xl shadow-md">
        <h3 class="text-lg font-bold">
          Finalizadas
        </h3>

        <p class="text-3xl">
          ${summary.completed}
        </p>
      </div>

      <div class="bg-red-500 text-white p-4 rounded-xl shadow-md">
        <h3 class="text-lg font-bold">
          Alta prioridad
        </h3>

        <p class="text-3xl">
          ${summary.highPriority}
        </p>
      </div>

    </div>
  `;
}