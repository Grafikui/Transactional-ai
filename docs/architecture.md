

# Architecture: Transaction Engine

## Core Concept: The Saga Log
Instead of a complex "Control Plane," the system is built around a lightweight `Transaction` class that maintains an in-memory (and eventually persistent) stack of executed steps.

## Components

### 1. Transaction Manager
* Maintains the `Stack` of completed steps.
* Handles the `try/catch` block around the workflow.
* Triggers the `Rollback` sequence upon failure.

### 2. The Step Interface
Every action must implement:
* `name`: Unique ID for the step.
* `do()`: The forward action (returns data).
* `undo(result)`: The compensating action (receives the result of `do`).

### 3. State Persistence (Roadmap)
* **Adapter Pattern:** Pluggable backend (Memory, Redis, Postgres) to store the transaction log for resumption after process crashes.

## Flow Diagram
[Start] -> [Step 1: Do] -> [Success?]
							| Yes -> [Stack Push] -> [Step 2: Do] ...
							| No  -> [Stack Pop] -> [Step 1: Undo] -> [Throw Error]
