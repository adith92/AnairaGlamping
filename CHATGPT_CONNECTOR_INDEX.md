# ChatGPT Connector Index

This file exists to make the repository easier for ChatGPT GitHub Connector, Codex, and other AI coding agents to identify, summarize, and navigate.

## Repository

- **Repository:** `adith92/AnairaGlamping`
- **Default branch:** `develop`
- **Visibility:** public
- **Project type:** QloApps-based hotel booking and reservation web application
- **Purpose:** Anaira Glamping / hotel, glamping, room booking, reservation management, guest management, and property website foundation

## Main Context

AnairaGlamping is based on QloApps, an open-source hotel reservation and booking engine. The codebase is PHP/MySQL based and follows the QloApps/PrestaShop-style architecture with core classes, controllers, modules, templates, overrides, cache, and configuration files.

## Important Files for AI Agents

- `README.md` — original QloApps project overview, requirements, installation, docs, license, and demo references.
- `AGENTS.md` — AI coding agent guide for this repository, including architecture, conventions, safety rules, and workflow guidance.
- `config/` — configuration files. Do not expose secrets from this directory.
- `modules/` — feature modules and payment-related extensions.
- `themes/` — frontend templates and UI customization area.
- `classes/` — core models and business logic.
- `controllers/` — admin and frontend request handling.
- `override/` — custom override logic. Use carefully because overrides can conflict.

## AI / ChatGPT Usage Notes

When using this repository from ChatGPT GitHub Connector:

1. Prefer reading `AGENTS.md` first for repo-specific rules.
2. Read `README.md` for installation requirements and QloApps baseline context.
3. For frontend work, inspect `themes/` and related template files.
4. For hotel booking logic, inspect `classes/`, `controllers/`, and relevant `modules/`.
5. Avoid editing secrets or generated cache files.
6. Make changes through branches/PRs when possible unless the user explicitly asks for direct commits.

## Indexing Keywords

AnairaGlamping, Anaira Glamping, hotel booking, hotel reservation, glamping website, QloApps, property management system, room booking, guest management, booking engine, hotel management system, PHP, MySQL, Smarty, modules, themes, controllers, classes, payment gateway, frontend, responsive hotel website.
