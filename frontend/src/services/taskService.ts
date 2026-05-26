import type { Task } from "../models/task";

const STORAGE_KEY = "tasks";

/**
 * Obtener todas las tareas
 */
export function getTasks(): Task[] {
  const tasks = localStorage.getItem(STORAGE_KEY);

  return tasks ? JSON.parse(tasks) : [];
}

/**
 * Guardar todas las tareas en LocalStorage
 */
function saveTasksToStorage(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Crear nueva tarea
 */
export function saveTask(task: Task): void {
  const tasks = getTasks();

  tasks.push(task);

  saveTasksToStorage(tasks);
}

/**
 * Actualizar tarea existente
 */
export function updateTask(
  id: number,
  updatedTask: Partial<Task>
): void {
  const tasks = getTasks();

  const updatedTasks = tasks.map((task) =>
    task.id === id
      ? { ...task, ...updatedTask }
      : task
  );

  saveTasksToStorage(updatedTasks);
}

/**
 * Eliminar tarea
 */
export function deleteTask(id: number): void {
  const tasks = getTasks();

  const filteredTasks = tasks.filter(
    (task) => task.id !== id
  );

  saveTasksToStorage(filteredTasks);
}

/**
 * Obtener tarea por ID
 */
export function getTaskById(id: number): Task | undefined {
  const tasks = getTasks();

  return tasks.find((task) => task.id === id);
}

/**
 * Filtrar tareas
 */
export function filterTasks(filters: {
  status?: string;
  priority?: string;
  subject?: string;
}): Task[] {
  let tasks = getTasks();

  if (filters.status) {
    tasks = tasks.filter(
      (task) => task.status === filters.status
    );
  }

  if (filters.priority) {
    tasks = tasks.filter(
      (task) => task.priority === filters.priority
    );
  }

  if (filters.subject) {
    tasks = tasks.filter(
      (task) =>
        task.subject
          .toLowerCase()
          .includes(filters.subject!.toLowerCase())
    );
  }

  return tasks;
}

/**
 * Resumen estadístico
 */
export function getSummary() {
  const tasks = getTasks();

  const total = tasks.length;

  const pending = tasks.filter(
    (task) => task.status === "Pendiente"
  ).length;

  const completed = tasks.filter(
    (task) => task.status === "Finalizada"
  ).length;

  const highPriority = tasks.filter(
    (task) => task.priority === "Alta"
  ).length;

  return {
    total,
    pending,
    completed,
    highPriority,
  };
}