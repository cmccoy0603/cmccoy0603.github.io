
Agent Guidelines
================

Purpose
-------
This file documents conventions and practical guidance for the coding agent working in this repository.

Before starting any task
------------------------
- Always read `agents/best-practices.md` and `agents/instructions.md` before beginning work.
- Confirm the scope of the change and look for existing patterns/components to reuse.

Styling
-------
- Prefer Bootstrap utility and component classes for layout and styling where possible instead of adding new CSS/SCSS.
- If custom styles are required, add them only within the affected component's SCSS file and keep selectors scoped and minimal.
- When making custom styles, there are set variables for the color scheme in the global SCSS file. Directly reference those variables instead of hard coding and colors.
- Avoid broad global style changes unless explicitly necessary.

Code & Implementation
---------------------
- Follow existing repository patterns for modules, components, and naming.
- Keep changes small and focused; implement the smallest change that addresses the task.
- Write or update tests for any new behavior when feasible. Run `npm test` locally before finalizing changes.

Tooling & Agent Workflow
------------------------
- Always send a concise preamble before running automated or workspace-altering tool calls (for example: "I'll add a TODO plan, then update agents/agent.md").
- Use the `manage_todo_list` process for multi-step tasks to track progress and statuses.
- After groups of related tool calls or any large edit, post a short progress update describing what was done and next steps.
- Use the provided VS Code tasks for dev and tests (see `npm start` and `npm test`). Prefer running tasks via the task runner when available.

Commits & Reviews
-----------------
- Use small, descriptive commits; prefer multiple focused commits over a single large one.
- Keep commit messages clear about intent and scope.
- When submitting PRs, summarize the approach, files changed, and test coverage in the PR description.

Verification
------------
- Run the app locally with `npm start` and run the test suite with `npm test` where applicable.
- Ensure linters and existing tests pass; do not attempt to fix unrelated failing tests.

When You Are Blocked
--------------------
- Check `agents/instructions.md` for agent-specific rules.
- If the issue is unclear or requires access/permissions, leave a clear note in the PR or issue and request review from a maintainer.

Good Practices Summary
----------------------
- Read the guidance files first.
- Reuse patterns and Bootstrap classes.
- Use `manage_todo_list` for multi-step tasks and provide short progress updates.
- Keep changes small, tested, and well-documented.

