# DevTree — Frontend

DevTree es una aplicación tipo **Linktree**: cada usuario obtiene un perfil público con un único enlace donde puede centralizar y compartir todos sus enlaces importantes (redes sociales, portafolio, proyectos, etc.), con la posibilidad de **reordenarlos mediante drag & drop** y activarlos o desactivarlos individualmente.

Este repositorio contiene **únicamente el frontend** de la aplicación. Se conecta a una API REST a través de [`devtree_backend`](#) para la autenticación, gestión de usuarios y persistencia de los enlaces.

> ⚠️ Reemplaza el enlace anterior por la URL real de tu repositorio de backend.

---

## ✨ Funcionalidades

- **Autenticación de usuarios**: registro e inicio de sesión.
- **Perfil público**: cada usuario tiene una URL única (`/usuario`) con su información y enlaces.
- **Gestión de enlaces**: agregar, activar/desactivar y eliminar enlaces a redes sociales y sitios externos.
- **Reordenamiento con drag & drop** de los enlaces usando `@dnd-kit`.
- **Edición de perfil**: foto, biografía, nombre de usuario (slug) y enlace de descripción.
- **Notificaciones** en tiempo real de las acciones del usuario (éxito/error) con `sonner`.
- **Formularios validados** con `react-hook-form`.
- **Gestión de estado del servidor** (cache, refetching, mutaciones) con `@tanstack/react-query`.

---

## 🛠️ Stack tecnológico

| Categoría            | Tecnología |
|-----------------------|------------|
| Librería UI           | [React 19](https://react.dev/) |
| Lenguaje              | [TypeScript](https://www.typescriptlang.org/) |
| Bundler / Dev server  | [Vite](https://vitejs.dev/) |
| Estilos               | [Tailwind CSS](https://tailwindcss.com/) + `@tailwindcss/forms` |
| Enrutamiento          | [React Router DOM](https://reactrouter.com/) |
| Fetching de datos     | [TanStack React Query](https://tanstack.com/query/latest) |
| Cliente HTTP          | [Axios](https://axios-http.com/) |
| Formularios           | [React Hook Form](https://react-hook-form.com/) |
| Drag & Drop           | [`@dnd-kit/core`](https://dndkit.com/), `@dnd-kit/sortable`, `@dnd-kit/utilities` |
| Componentes accesibles| [Headless UI](https://headlessui.com/) + [Heroicons](https://heroicons.com/) |
| Notificaciones        | [Sonner](https://sonner.emilkowal.ski/) |
| Slugs                 | `react-slugify` |
| Linter / Formato      | ESLint + Prettier |

---

## 📋 Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- npm (o pnpm/yarn si prefieres adaptar los comandos)
- Tener corriendo localmente el repositorio de backend (`devtree_backend`) o acceso a una instancia desplegada de la API

---

## 🚀 Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/AuraLRestrepo/devtree_frontend.git
   cd devtree_frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con la URL de tu API de backend:

   ```env
   VITE_API_URL=http://localhost:4000
   ```

   > Ajusta el puerto/dominio según donde esté corriendo `devtree_backend`.

4. Levanta el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 📦 Scripts disponibles

| Script             | Descripción |
|---------------------|-------------|
| `npm run dev`       | Inicia el servidor de desarrollo con Vite (HMR). |
| `npm run build`     | Compila TypeScript y genera el build de producción en `dist/`. |
| `npm run preview`   | Sirve localmente el build de producción para probarlo. |
| `npm run lint`      | Ejecuta ESLint sobre todo el proyecto. |

---

## 📁 Estructura del proyecto

```
devtree_frontend/
├── public/              # Archivos estáticos
├── src/
│   ├── components/      # Componentes reutilizables de la UI
│   ├── pages/            # Vistas / páginas de la aplicación
│   ├── layouts/           # Layouts compartidos (auth, app, perfil público)
│   ├── hooks/             # Custom hooks
│   ├── api/               # Llamadas a la API con Axios
│   ├── types/             # Tipos e interfaces de TypeScript
│   └── main.tsx           # Punto de entrada de la aplicación
├── index.html
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

> 📝 Esta estructura es orientativa. Ajústala para que coincida exactamente con las carpetas reales de tu proyecto.

---

## 🔗 Proyecto relacionado

- **Backend**: [`devtree_backend`](#) — API REST encargada de la autenticación, usuarios y persistencia de los enlaces.

---

## 📸 Capturas de pantalla

> Agrega aquí imágenes o GIFs del perfil público, el panel de administración de enlaces y el drag & drop en acción. Ejemplo:
>
> ```markdown
> ![Panel de administración de enlaces](./docs/screenshot-admin.png)
> ![Vista pública del perfil](./docs/screenshot-profile.png)
> ```

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si quieres colaborar:

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad o corrección: `git checkout -b feature/nombre-funcionalidad`.
3. Realiza tus cambios y haz commit: `git commit -m "feat: descripción del cambio"`.
4. Sube tu rama: `git push origin feature/nombre-funcionalidad`.
5. Abre un Pull Request describiendo los cambios propuestos.

Antes de enviar tu PR, asegúrate de que el código pase el linter:

```bash
npm run lint
```

---

## 📄 Licencia

Este proyecto no especifica una licencia actualmente. Si deseas que sea de uso abierto, considera agregar un archivo `LICENSE` (por ejemplo, [MIT](https://choosealicense.com/licenses/mit/)).

---

## 👤 Autora

**Aura Restrepo**
[GitHub](https://github.com/AuraLRestrepo)
