export interface Task {
  id: number;
  title: string;
  description: string;
  subject: string;
  dueDate: string;
  priority: "Baja" | "Media" | "Alta";
  status: "Pendiente" | "En proceso" | "Finalizada";
}