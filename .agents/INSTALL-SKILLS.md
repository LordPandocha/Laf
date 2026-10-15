# Skill & MCP installation status

Portable project-scoped skills live under `.agents/skills/`; they can be loaded by compatible coding agents. This does **not** install binaries or change a local agent's global MCP configuration.

## Project-scoped skills
- `ui-ux-pro-max`: vendored UI/UX search script, supporting data, motion presets and reference docs. Requires Python 3 for local search.
- `brand-discovery`: selected ECC interview workflow and reference modules.
- `ponytail`: coding workflow guidance.
- `caveman`: concise coding-output skill available on demand; not forced as the conversation voice.
- `21st-ui`: component-catalog instructions, usable only after the 21st MCP server is connected.
- `grill-me`, `motion-design`, `codebase-memory`: project-specific guides.

## Native host installation still requires the agent/OS
The repo does not contain the full external runtime of ECC, Ponytail, Caveman, 21st MCP or codebase-memory-mcp. Install these using the official client-specific setup and review the configuration changes:
- Full ECC: use the official installer/plugin path from https://github.com/affaan-m/ecc. This repo contains its brand-discovery skill, not all ECC plugins/hooks/agents.
- Ponytail on Codex: `npx skills add DietrichGebert/ponytail --skill '*' --agent codex --yes`.
- UI UX Pro Max on Codex: `npx ui-ux-pro-max-cli init --ai codex`. The vendored search tool is also available at `python3 .agents/skills/ui-ux-pro-max/scripts/search.py`.
- Caveman: the full installer modifies local agent configuration; preview with its documented `--dry-run` before applying it.
- 21st MCP (formerly Magic MCP): requires a fresh API key from https://21st.dev/mcp and local client config. Never commit the key. Old Magic keys are invalid.
- codebase-memory-mcp: local server binary and client configuration must be installed, then restart the coding agent and index the project.

## Official sources
- ECC: https://github.com/affaan-m/ecc
- Ponytail: https://github.com/dietrichgebert/ponytail
- UI UX Pro Max: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- 21st MCP: https://github.com/21st-dev/magic-mcp
- codebase-memory-mcp: https://github.com/DeusData/codebase-memory-mcp
- Caveman: https://github.com/JuliusBrussee/caveman
