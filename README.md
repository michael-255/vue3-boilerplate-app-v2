# Vue 3 Boilerplate App V2

## Todos

- [ ] Build `Measurements` route

  - [ ] Clear input after saving
  - [ ] Show `log.info(...)` after saving
  - [ ] Reload data after saving

- [ ] Rename some view list components to `*Container`
- [ ] Create `ActiveView` route for a simple `ActivityTimer` (can expand on in later apps)

- [ ] Organize `Composables` (use) with components in `~/src/components/...`

  - [ ] All reusable components should be in `~/src/components/shared/use`
  - [ ] Split Vue `<script>` and Vue `<template>` up

    - [ ] Create a `use` directory in each component folder with its own `__tests__`

- [ ] Build the `ActiveView` as a simple timer in the footer (rest will be in fitness app)

- [ ] `Commenting` Clean up and create comments throughout the app (reasons why you did certain
      things)
- [ ] `Tests` Rebuild tests for all files
- [ ] Go through post cloning task list (double check)

## Post Cloning Steps

- [ ] Update `package.json`

  - [ ] `name`
  - [ ] `description`
  - [ ] `version`
  - [ ] `repository`
  - [ ] `bugs`
  - [ ] `homepage`

- [ ] Update `base` in `~/vite.config.ts` to your repository name for deployments to work
- [ ] Update `AppString` in `~/src/constants/ui/string-enums.ts` to represent your app
- [ ] Update `title` in `~/index.html` to reflect the app name you use in `ui-enums.ts`

- [ ] Update `GitHub` repository settings

  - [ ] Add a short Description
  - [ ] Add the GitHub Pages website
  - [ ] Add Topics
  - [ ] Update the `Include in the home page` section

    - [ ] Uncheck `Releases`
    - [ ] Uncheck `Packages`
    - [ ] Uncheck `Environments`

- [ ] Update `README.md`

  - [ ] Add detailed project description
  - [ ] Remove unneeded sections (even this one)

## Table of Contents

- [Usage](#usage)
- [Project Creation Steps](#project-creation-steps)
- [Package JSON Changes](package-json-changes)
- [ES2020 Support](#es2020-support)
- [Misc Setup Notes](#misc-setup-notes)
- [Additional Notes](#additional-notes)

## Usage

Install the project dependencies.

```sh
npm i
```

Launch the dev server site.

```sh
npm run dev
```

Build the project `dist` directory.

```sh
npm run build
```

Run tests and coverage report (press `q` to quit).

```sh
npm test
```

Build and deploy the `dist` directory.

```sh
npm run deploy
```

Check for outdated packages.

```sh
npm outdated
```

Update packages based on `package.json` version settings. Test updates to ensure they worked.

```sh
npm upgrade
```

## Project Creation Steps

These are the general steps I took to create the initial project (vue3-boilerplate-app).

- `npm init vue@latest` (selecting YES for most options)
- `npm i uuid` (random ids)
- `npm i -D @types/uuid`
- `npm i luxon` (Javascript date utilities)
- `npm i -D @types/luxon`
- `npm i dexie` (IndexedDB wrapper)
- `npm i -D gh-pages` (GitHub Pages deployment)
- `npm i -D @vitest/coverage-c8` (test coverage output)
- `npm i @vueuse/core` (Vue component utilities)
- `npm i chart.js vue-chart-3` (charts with a Vue wrapper)
- `npm i quasar @quasar/extras` (Vue component framework)
- `npm i -D @quasar/vite-plugin`

Use the configurator tool to help setup Quasar for your specific project. It generates the files
you'll need to copy over based on your selections.

<https://quasar.dev/start/vite-plugin>

These following files will need to be updated based on the configurator tool.

- `mains.ts`
- `vite.config.ts`

## Package JSON Changes

Updated or added lines for testing and deployment. The deployment script makes a copy of the
`index.html` in `dist` as `404.html` to address complications related to routing. This let's you
avoid using hash based routing.

```json
{
  "scripts": {
    "test": "vitest --environment jsdom",
    "test:coverage": "vitest --environment jsdom --coverage",
    "deploy": "npm run build && cd dist && cp index.html 404.html && cd .. && gh-pages -d dist -m Deployment"
  }
}
```

## ES2020 Support

Support for ES2020 language features was achieved by adding `es2020` to the following files.

- `tsconfig.vitest.json`
- `tsconfig.app.json`

## Misc Setup Notes

Please note the setup of the following when using this project.

- `.gitignore`
- `.eslintrc.cjs`
- `.prettierignore`
- `.prettierre.json`
- `/.vscode/extensions.json`

## Additional Notes

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) +
[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) +
[TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Type Support for `.vue` Imports in TS

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

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).
