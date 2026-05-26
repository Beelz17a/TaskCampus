import { getSummary } from "../services/taskService";

export function renderSummary(containerId: string) {
  const container = document.getElementById(containerId);

  if (!container) return;

  const summary = getSummary();

  container.innerHTML = `
    <div class="summary-grid md:grid-cols-4 gap-4">

      <div class="summary-card summary-primary p-4 rounded-xl">
        <h3 class="text-lg font-bold">
          Total
        </h3>

        <p class="text-3xl">
          ${summary.total}
        </p>
      </div>

      <div class="summary-card summary-warning p-4 rounded-xl">
        <h3 class="text-lg font-bold">
          Pendientes
        </h3>

        <p class="text-3xl">
          ${summary.pending}
        </p>
      </div>

      <div class="summary-card summary-success p-4 rounded-xl">
        <h3 class="text-lg font-bold">
          Finalizadas
        </h3>

        <p class="text-3xl">
          ${summary.completed}
        </p>
      </div>

      <div class="summary-card summary-danger p-4 rounded-xl">
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