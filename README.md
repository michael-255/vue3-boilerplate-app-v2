# Vue 3 Boilerplate App V2

## Changes

- Add `README.md` for folders with a `core` directory
- Have seperate `__tests__` for `core` and `root` files
- Convert `Setting` over to extending from `Entity` and having a `CreatedDate`
- Make a generic `isItemValid(fields)` getter for `validate-item.ts` store
- Move DB calls out of `store` files and into `LocalDatabase`
  - `settings = await DB.initSettings()`

## Table of Contents

- [Usage](#usage)
- [Project Information](#project-information)
- [Additional Notes](#additional-notes)

## Models

- `/models/core`

  - `Entity.ts`
  - `Activity.ts`
  - `Log.ts`
  - `Setting.ts`

- `/models`

  - `Exercise.ts`
  - `ExerciseRecord.ts`

## Services

- `/services/core`

  - `PrettyLogger.ts`
  - `DexieWrapper.ts`

- `/services`

  - `LocalDatabase.ts`

## Components

- `/components/shared`

  - `SimpleDialog.vue`

- `/components/layout`

  - `DrawerItem.vue`

- `/components/data-table`

  - `Create.vue`
  - `Update.vue`
  - `Inspect.vue`
  - `Report.vue`
  - `MainTable.vue`
  - `MainTabs.vue`
  - `DataTableDialog.vue`
  - `... (Item*.vue)`

- `/components/settings`

  - `...`

## Utils

- `/utils/core`

  - `common.ts`
  - `validators.ts`

- `/utils`

  - `...`

## Project Creation Details

- `npm init vue@latest` (selecting YES for most options)
- ``
- ``
- ``
- ``
- ``
- ``
- ``

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) +
[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) +
[TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI
with `vue-tsc` for type checking. In editors, we need
[TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a
[Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669)
that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select
      `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
