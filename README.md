# Prueba técnica — Frontend React

App con React, TypeScript y Vite que consume la API pública de [JSONPlaceholder](https://jsonplaceholder.typicode.com): listado de usuarios con búsqueda, publicaciones por usuario y alta de publicaciones con formulario validado.

## Cómo ejecutarlo

Requiere Node 20+ y pnpm.

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm test     # Vitest + Testing Library
pnpm build    # tsc -b && vite build
pnpm lint
```

No hay variables de entorno: la API está definida en `src/services/endpoints.ts`.

## Decisiones

- **Zustand en vez de Context o Redux.** El estado lo comparten la lista, el panel de publicaciones y el formulario. Con Context arrastraba re-renders de todo el árbol y Redux es para proyectos mas robustos. 

- **Tests con la API mockeada.** Los tests no dependen de la red ni de datos remotos que pueden cambiar.

## Qué haría con más tiempo

- Usaria una libreria de componentes como shadcn para mejorar la interface
- Usaria para la gestion de formulario react hook form
- CI con `lint` + `test` + `build` en cada push.
- Prepararia la interface para la paginacion de una lista mayor de usuario y post

## Cómo usé la IA

### Qué le pedí

Revise algunos detalles del diseño y le pedi que me implemetara los test.





