# Project 03 — JavaScript Bootcamp

**Summary**: In this project, you'll learn how to build a web application using JavaScript, Node.js, and the Nest.js framework.

💡 [Click here](https://new.oprosso.net/p/4cb31ec3f47a4596bc758ea1861fb624) **to leave anonymous feedback on this project**. It only takes a moment and helps our team improve your learning experience. We recommend filling it out right after completing the project.

## Contents

1. [Chapter I](#chapter-i)   
    - [Guidelines](#instructions)
2. [Chapter II](#chapter-ii)
    - [General Information](#general-information)
3. [Chapter III](#chapter-iii)
    - [Task 0: Project setup and dependency installation](#task-0-setting-up-the-project-and-installing-dependencies)
    - [Task 1: Creating the project structure](#task-1-creating-the-project-structure)
    - [Task 2: Implementing the domain layer](#task-2-implementing-the-domain-layer)
    - [Task 3: Implementing the datasource layer](#task-3-implementing-the-datasource-layer)
    - [Task 4: Implementing the web layer](#task-4-implementing-the-web-layer)
    - [Task 5: Module registration and app launch](#task-5-module-registration-and-application-launch)

## Chapter I 
## Instructions

How to learn at “School 21”:

- Here, you’ll find a unique learning experience with a lot of freedom. You’re given a task and left to find your own way to solve it, using whatever resources work best for you — whether that’s the Internet or AI tools like GigaChat. Just be mindful of information quality: verify, think critically, analyze, and compare.
- Peer-to-peer (P2P) learning is the exchange of knowledge and experience with peers, where everyone acts as both mentor and student. This approach allows you to gain a deeper understanding of the material by learning from one another.
- Feel free to ask for help: around you are peers who are also navigating this path for the first time. Share your own experience and ideas with others.  Join Rocket.Chat to stay updated with the latest community announcements. 
- Your learning is meaningless if you just copy someone else’s solutions. When receiving help from others, always make sure you fully understand the “why”, “how”, and “purpose” behind the solution. Don’t be afraid to make mistakes. 
- Does the task seem impossible? Take a break, get some fresh air and clear your mind — this has helped many people. Maybe after that, the solution will come to you naturally.
- The learning process is just as important as the result. It’s not just about completing the task — it’s about understanding HOW to solve it. 

How to work with the project:

- Before starting, clone the project from GitLab into a repository with the same name.
- All files should be created inside the _src/_ folder of the cloned repository.
- After cloning the project, create a _develop_ branch and do all your development there. Then, push the _develop_ branch to GitLab.
- Your directory should not contain any files other than those specified in the assignments.

## Chapter II
## General Information

A **web application** is a software program or service accessible via a web browser that typically interacts with users through a web interface. Web applications feature dynamic content and can provide a variety of functionalities such as data processing, collaboration, real-time updates, and other forms of interaction.

## Topics to explore:

- Web applications
- Node.js
- Nest.js
- API
- Minimax algorithm
- MVC (Model-View-Controller)

## Chapter III
### Project: Tic-Tac-Toe

This project introduces the fundamentals of creating a web application using Node.js and the Nest.js framework.  
To complete the assignments, you will need the current versions of Node.js and NestJS, as well as an IDE such as VS Code.

The project is created **once** and will be reused for all following tasks.

## Task 0. Setting up the project and installing dependencies

- If Node.js or NestJS is not installed yet, you’ll need to:
  - Install Node.js: either via a version manager like **nvm**, or directly from the [official website](https://nodejs.org"%20\t%20"_new).
  - Install NestJS globally: run the following command in your terminal:

```bash
npm i -g @nestjs/cli
```

- Choose a directory to store your project.
- Navigate to this directory in the terminal and create a project using the Nest CLI:

```bash
nest new tic-tac-toe-api
```

- To start the project, use the appropriate script as defined in your package.json, e.g.: npm start or npm run start:dev

## Task 1. Creating the project structure

- Your project should follow this architectural layout: `modules` (modular structure), `models` (data models), `services` (business logic), `controllers` (route handlers). The application should be split into the following layers: `web` layer, `domain` layer, `datasource` layer.
- Each layer must be implemented as a separate module.
- A module may contain nested modules.
- The `web` layer must include the following packages (at least): model, controller, mapper for communication with the client.
- The `domain` layer must include the following packages (at least): model, service for implementing the business logic.
- The `datasource` layer must include at least: model, repository, mapper for handling data access (e.g., working with databases).

## Task 2. Implementing the domain layer

- Create a `game board model` as a matrix of integers.
- Create a `game model` that contains a UUID and a game board.
- Define a `service interface` with the following methods:
  - A method to calculate the next move using the `Minimax` algorithm;
  - A method to `validate the game board` (ensure previous moves haven’t been altered);
  - A method to check if the `game is over`.

All models, interfaces, and implementations must be placed in `separate files`.

## Task 3. Implementing the datasource layer

- Implement a **storage class` to persist the current games.
- Define the `models` for the game board and the current game.
- Implement `mappers` to convert between `domain` and `datasource` models (domain<->datasource).
- Implement a `repository` for interacting with the storage class. It should include methods for:
  - `Saving` the current game;
  - `Retrieving` the current game.
- Create a `class that implements the service interface`, taking the repository as a parameter for interacting with the storage.
- All `models`, `interfaces`, and `implementations` must be placed in `separate files`.

## Task 4. Implementing the web layer

- Define the `models` for the game board and the current game.
- Implement `mappers` to convert between `domain` and `web` models (domain<->web).
- Implement a `controller` with the following method: POST /game/{UUID of the current game} — this endpoint receives a current game object with an updated game board from the `user`, and responds with a current game object updated with the `computer’s move`.
- If the submitted game state or move is invalid, the system must return an `error message` with a description.
- The application must `support multiple games running in parallel`.
- All `models`, `interfaces`, and `implementations` must be placed in `separate files`.

## Task 5. Module registration and application launch

- Register all `modules (layers)` in the `global module`:
  - Define import and export settings for modules;
  - Set up application `routing`;
  - Specify how the `application should be launched`.