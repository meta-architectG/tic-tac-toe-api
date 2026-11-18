[English] | [Русский](./README_RUS.md)

# Tic-Tac-Toe API

REST API for a Tic-Tac-Toe game against a computer opponent. Built with NestJS and TypeScript.

## Tech Stack

- Node.js
- NestJS
- TypeScript
- Vitest, Supertest (testing)

## Architecture

The application is divided into layers:

- **Web:** Controllers and DTOs for handling HTTP requests.
- **Domain:** Game business logic and the Minimax algorithm for the computer's moves.
- **Datasource:** Repositories and storage handling.

Mappers are used between layers to convert models (Domain <-> Web, Domain <-> Datasource). The application supports multiple parallel games simultaneously (identified by UUID).

## Run Locally

Install dependencies:

```bash
npm install

