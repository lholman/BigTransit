/// <reference path="./.sst/platform/config.d.ts" />

/**
 * ## Big Transit monorepo
 *
 * A TypeScript monorepo that deploys a database and an API to AWS.
 *
 * #### Project structure
 *
 * The app is split into separate `packages/` and an `infra/` directory.
 * 
 * ```txt {2}
 * bigtransit
 * ├─ sst.config.ts
 * ├─ package.json
 * ├─ packages
 * │  ├─ core
 * │  └─ functions
 * └─ infra
 * ```
 *
 * The `packages/` directory includes:
 *
 * - `core/` 
 * 
 *  The core directory includes the business logic implementation for Big Transit, exported 
 *  as modules and used within the function implementations.
 *
 * - `functions/`
 *
 *  The functions directory includes the Big Transit API Lambda function implementations.
 *  Wherever possible domain specific business logic will be imported from /core, making  
 *  the Lambda and API code unaware of these details, simply calling into these modules 
 *  to compose the logic together.
 *
 *  #### Infrastructure
 *
 *  The `infra/` directory logically splits the infrastructure for Big Transit into
 *  separate files.
 *
 *  We have an `api.ts` that exports resources that can be used in any other future
 *  infrastructure files.
 *
 *  They are also re-exported in the `infra/index.ts` file.
 *
 *  ```ts title="infra/index.ts"
 *  export * from "./api";
 *  ```
 *
 *  To use them in the `sst.config.ts` we do a dynamic import. This ensures that the
 *  infrastructure is only created in the `run` function.
 *
 */

export default $config({
  app(input) {
    return {
      name: "bigtransit",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const infra = await import("./infra");

    return {
      api: infra.api.url,
    };
  },
});
