# Vue 3 - Task Tracker

This project was developed during the Formation Vue 3 powered by Alura.
Along the course, it turns possible to know new features of Vue 3 and the powerfulls Typescript and Vuex to state managment.

How does it works 🔍

- The task tracker project allow you to track tasks you need to complete and as come the project were evolving it was possible to manage tasks inside different projects that were possible to register new projects, update or delete them (CRUD).
- As this is a front project, for registering new tasks and projects we used the Json Server, that bring us a Rest API persisting the data on a json file inside the project (db.json).
- Adding the object we need to treats on front-end, this lib allow us to use the REST methods to the operations we need execute, like finish a task or update a project.
- The first screen its the task router where you can add a new one by typing the description, select a project (if aren’t projects registered you need to add at least one to add a new task) and after start the stopwatch.
- When you click on stop button to finish a task, automatically the task will be displayed on task list with the time it took to be completed.

🌐 [Vue.js](https://vuejs.org/).

🌐 [Vuex](https://vuex.vuejs.org/)

🌐 [Typescript](https://www.typescriptlang.org/)

🌐 [Json Server](https://github.com/typicode/json-server)

---

## Setup 🏗️

```bash
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Json server

```bash
json-server --watch db.json
```

## Features 📜

- [x]  Create a Vue 3 app
- [x]  Responsive layout
- [x]  Routing
- [x]  Tasks - CRUD
- [x]  Projects - CRUD
- [x]  State management (tasks and projects)
- [x]  API communication
- [x]  Composition API uses
