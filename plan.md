```markdown
# Plan de Implementación – Gestión de Proyectos (Mockup Web)

Este plan abarca la creación y ajuste de componentes y páginas para satisfacer los requisitos del mockup, incluyendo autenticación, dashboards basados en rol, gestión de proyectos, tareas (tablero Kanban), gestión de incidencias y generación de informes. Se aplicarán validaciones básicas, manejo de errores y un diseño minimalista moderno con paleta de colores neutrales.

---

## 1. Autenticación (Pantalla de Login/Registro)

### Archivos a crear:
- **src/app/auth/page.tsx**

### Cambios y consideraciones:
- **Interfaz:**  
  - Incluir un logo en la parte superior usando `<img>` con atributo `src` configurado a  
    `https://placehold.co/300x100?text=Company+Logo+Mockup`  
    y un `alt` descriptivo como "Modern+minimalist+company+logo+mockup+with+neutral+tones".   
  - Incluir campos para “correo” y “contraseña”.
  - Dos botones: “Iniciar Sesión” y “Registrarse”.  
- **Validaciones:**  
  - Implementar validación de campos vacíos antes de enviar el formulario y mostrar mensajes de error.
- **Código de ejemplo:**  
  ```typescript
  // Ejemplo de logo con manejo de error en la carga
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "https://placehold.co/300x100?text=Default+Logo";
  };
  
  // Uso en JSX:
  <img 
    src="https://placehold.co/300x100?text=Company+Logo+Mockup" 
    alt="Modern minimalist company logo mockup with neutral tones" 
    onError={handleImageError} 
  />
  ```
- **UX:**  
  - Se usará un sistema de toggle (con useState) para cambiar entre formularios de Login y Registro.

---

## 2. Componente Sidebar (Menús según Rol)

### Archivo a crear:
- **src/components/Sidebar.tsx**

### Cambios y consideraciones:
- **Props:**  
  - Recibirá una prop `role` (string) para determinar el menú a mostrar.
- **Lógica de roles:**  
  - Si `role === "Administrador"`, listar: “Usuarios”, “Proyectos”, “Configuración”.
  - Si `role === "Gestor"`, listar: “Proyectos”, “Tareas”, “Recursos”, “Informes”, “Riesgos”.
  - Si `role === "Colaborador"`, listar: “Mis Tareas”, “Incidencias”, “Progreso”.
  - Si `role === "Cliente"`, listar: “Estado del Proyecto”, “Informes”.
- **Manejo de errores:**  
  - Mostrar mensaje por defecto o una lista vacía si el rol no es reconocido o no se proporciona.
- **Estilos:**  
  - Diseñar el sidebar con un layout fijo, tipografía limpia y márgenes adecuados.

---

## 3. Dashboard (Página Principal Post-Login)

### Archivo a crear:
- **src/app/dashboard/page.tsx**

### Cambios y consideraciones:
- **Integración:**  
  - Importar y utilizar el componente Sidebar pasando el rol desde el estado (dummy o autenticación simulada).
  - Incluir una cabecera de bienvenida y un área para contenidos resumen.
- **Diseño:**  
  - Utilizar un layout de dos columnas: sidebar fijo y área principal flexible.
- **Manejo de estado:**  
  - Dummy estado para simular el rol actual (modificable posteriormente con autenticación real).

---

## 4. Gestión de Proyectos

### Archivo a crear:
- **src/app/proyectos/page.tsx**

### Cambios y consideraciones:
- **Interfaz:**  
  - Mostrar una tabla que contenga columnas: Nombre, Estado, Fecha inicio, Fecha fin.
  - Botones “Crear”, “Editar” y “Eliminar” (pueden ser botones de texto estilizados).
- **Validaciones:**  
  - Validar la existencia de proyectos; mostrar un mensaje “No hay proyectos” en caso de lista vacía.
- **Uso de componentes UI:**  
  - Reutilizar componentes de `src/components/ui/table.tsx` o construir una tabla personalizada.
- **Estilo:**  
  - Diseñar la tabla con bordes sutiles y colores neutros.

---

## 5. Gestión de Tareas (Tablero Kanban)

### Archivo a crear:
- **src/app/tareas/page.tsx**

### Cambios y consideraciones:
- **Interfaz:**  
  - Tres columnas tituladas: “Por Hacer”, “En Progreso” y “Completado”.
  - Cada columna renderizará tarjetas (cards) para tareas; cada tarjeta contendrá título, descripción, colaborador asignado y fechas.
  - Incluir el botón “Añadir Tarea” (posiblemente en la parte superior o inferior del tablero).
- **Funcionalidad:**  
  - Se pueden utilizar componentes de diálogo (`src/components/ui/dialog.tsx`) para mostrar un formulario para agregar nuevas tareas.
- **Estilo:**  
  - Diseño responsivo con grid/flex para ajustar columnas en dispositivos móviles.

---

## 6. Gestión de Riesgos / Incidencias

### Archivo a crear:
- **src/app/incidencias/page.tsx**

### Cambios y consideraciones:
- **Interfaz:**  
  - Listar incidencias con campos: título, descripción, estado (abierto/cerrado) y responsable.
  - Botón “Reportar incidencia” que abra un formulario modal o inline.
- **Validaciones:**  
  - Validar que los campos del formulario de reporte no estén vacíos.
- **Estilo:**  
  - Uso de cajas y separación clara entre incidencias, con colores que indiquen estados (por ejemplo, gris para cerrados, azul para abiertos).

---

## 7. Generación de Informes

### Archivo a crear:
- **src/app/informes/page.tsx**

### Cambios y consideraciones:
- **Interfaz:**  
  - Incluir un menú desplegable (select) para elegir un proyecto.
  - Botón “Generar Informe PDF” que simule la creación de un PDF.
  - Vista previa que muestre una tabla con resumen de tareas, recursos y progreso.
- **UX:**  
  - Se puede utilizar un modal o un contenedor expandible para mostrar la vista previa.
- **Validaciones:**  
  - Verificar que se haya seleccionado un proyecto antes de permitir la generación del informe.

---

## 8. Actualización de Estilos Globales

### Archivo a modificar:
- **src/app/globals.css**

### Cambios y consideraciones:
- **Diseño minimalista y moderno:**  
  - Establecer tipografía limpia y colores base: fondo blanco, texto gris y acentos en azul.
  - Definir estilos para el sidebar (fijo) y área de contenido principal.
  - Incorporar media queries para asegurar la responsividad (desktop y móvil).
- **Espaciado y layout:**  
  - Uso de márgenes, paddings y grid/flexbox para una distribución armónica de elementos.

---

## 9. Consideraciones Adicionales y Mejores Prácticas

- **Validación y manejo de errores:**  
  - Todos los formularios deberán incluir validación de campos vacíos y mecanismos de retroalimentación para el usuario.
  - Utilizar bloques try-catch en las funciones de envío de formularios para capturar y mostrar errores.
- **Uso de componentes reutilizables:**  
  - Aprovechar los componentes UI existentes en `src/components/ui/` (por ejemplo, button, dialog, form, table) para mantener la consistencia.
- **Documentación y README:**  
  - Actualizar el README.md con instrucciones de uso, navegación y descripción de la arquitectura implementada.
- **Tipos y configuración:**  
  - Verificar que el archivo tsconfig.json incluya los nuevos directorios y componentes sin afectar la compilación.
- **Pruebas y depuración:**  
  - Realizar pruebas manuales para validar la responsividad y la correcta navegación entre páginas y secciones.

---

## Resumen

- Se crearán nuevas páginas: autenticación, dashboard, proyectos, tareas (Kanban), incidencias e informes.  
- Se implementará un componente Sidebar que adapta el menú según el rol del usuario.  
- Cada formulario contará con validaciones básicas y manejo de errores mediante funciones y mensajes visibles.  
- Se actualizará el archivo globals.css para lograr un diseño minimalista y responsivo usando colores neutros.  
- Se reutilizarán componentes UI existentes y se crearán nuevos modales/dialog para formularios dinámicos.  
- La arquitectura respeta la separación de responsabilidades y mantiene la consistencia visual en todo el proyecto.
