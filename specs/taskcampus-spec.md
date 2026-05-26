# Especificación del sistema TaskCampus

## Problema

Los estudiantes necesitan organizar sus tareas académicas.

## Objetivo

Desarrollar una aplicación web para registrar, consultar, actualizar y eliminar tareas académicas.

## Usuarios

Estudiantes universitarios.

## Historias de usuario

- Como estudiante, quiero registrar tareas para organizar mis actividades.
- Como estudiante, quiero filtrar tareas por estado para identificar mis pendientes.
- Como estudiante, quiero marcar tareas como finalizadas para controlar mi avance.
- Como estudiante, quiero eliminar tareas que ya no necesito.

## Requisitos funcionales

RF01. Registrar tareas.
RF02. Listar tareas.
RF03. Editar tareas.
RF04. Eliminar tareas.
RF05. Filtrar tareas.
RF06. Mostrar resumen estadístico.

## Requisitos no funcionales

RNF01. La interfaz debe ser clara y sencilla.
RNF02. El sistema debe usar LocalStorage para persistencia.
RNF03. El código debe estar versionado en GitHub.
RNF04. El proyecto debe incluir documentación de instalación.

## Tecnologías

- TypeScript
- HTML
- TailwindCSS
- LocalStorage
- GitHub

## Persistencia

Las tareas se almacenarán en LocalStorage del navegador.