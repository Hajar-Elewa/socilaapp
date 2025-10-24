Project-specific guidance for AI coding assistants

Keep the edits small and focused. This project is a TypeScript + Express API with Mongoose. The source code lives in `src/` and builds to `dist/` using `tsc`.

Key files and patterns
- Entry point: `src/index.ts` calls `src/bootsatrap.ts` which wires Express, DB, routes, error handlers and starts the server.
- Router composition: `src/Modules/routes.ts` mounts module routers (example: `src/Modules/authModule/auth.controller.ts`). Add or modify routes there.
- DB layer: `src/DB/DBRepo.ts` defines an abstract repository with common CRUD methods. Concrete repos extend it (example: `src/DB/repos/user.repo.ts`). Follow this pattern when adding new models/repos.
- Mongoose models: `src/DB/Models/*.ts` contain schemas and exports (example: `user.model.ts`). Use `models.ModelName || model(...)` pattern to avoid recompilation issues.
- Validation: Zod schemas live alongside modules (example: `src/Modules/authModule/auth.validation.ts`) and are used by `src/middlewares/validation.middleware.ts`. Validation middleware merges body/params/query before parsing.
- Errors: `src/utiles/errors/types.ts` provides `ApplicationError` and `IError`. The global error handler in `bootsatrap.ts` expects `statusCode` on errors.
- Utilities: helpers like `successHandler`, `hash/compare`, and `SendEmail` are in `src/utiles/` — reuse these for consistent responses and security.

Development, build and run
- Build: npm run build (runs `tsc` -> outputs `dist/`).
- Dev (watch): npm run dev; it runs `tsc --watch` and `node --watch dist/index.js` concurrently.
- Start (production): npm start -> `node dist/index.js`.

Conventions and gotchas
- Use the DBRepo pattern for data access; prefer extending `DBRepo<T>` rather than directly using models in services.
- Routes are grouped per module under `src/Modules/*Module/` — controller files export an Express Router.
- DTOs use Zod and types are inferred with `z.infer<typeof schema>` (example: `auth.DTO.ts`). Keep DTOs next to their validation.
- Validation middleware uses `schema.safeParseAsync(data)` and returns status 422 with `validationErr` on failure. Tests and fixes should account for this response shape.
- Mongoose connection string is read from `process.env.LOCAL_DATA_BASE_URI` in `src/DB/Models/connectioDB.ts`. Ensure .env has that key when running locally.
- Error handling: throw `new ApplicationError(message, statusCode)` in services to return structured errors handled by the global handler.

Where to change behavior
- To add global middleware (CORS, logging) edit `src/bootsatrap.ts` before `app.use('/api/v1', router)`.
- To add endpoints, create a new module folder under `src/Modules` with `*.controller.ts`, `*.services.ts`, `*.validation.ts`, `*.DTO.ts` and register its router in `src/Modules/routes.ts`.
- To add a model and repo: add schema in `src/DB/Models`, create repo in `src/DB/repos` extending `DBRepo`, and use the repo in module services.

Examples (copyable patterns)
- Repo method:
  - findOne: `this.model.findOne(filter, projection, options)`
- Service throwing error:
  - `throw new ApplicationError('email already exist', 400)`
- Success response helper:
  - `return successHandler({ res, data: user })`

Testing and verification
- After changes, run `npm run build` and `node dist/index.js` (or `npm run dev`) and verify the server starts and connects to the DB. Watch for TypeScript compile errors.

If something isn't discoverable
- If an environment variable, external service, or CI configuration isn't present in the repo, ask the human for values (DB URI, SMTP creds). Don't guess secrets.

Questions for maintainers (when unclear)
- Preferred folder structure for larger modules (single folder vs. feature slices)?
- Any linting or formatting rules (prettier/ESLint) not present in this repo?

If you need changes beyond 30 lines, summarize the intent and ask before modifying large areas.
