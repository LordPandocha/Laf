---
name: codebase-memory
description: Use codebase-memory-mcp graph/indexing tools for repository exploration and impact analysis when the MCP server is actually connected.
---

# Codebase Memory MCP Workflow

This is an agent-use guide, not the server binary or client configuration.

- Activate only when codebase-memory-mcp tools are present and connected.
- For unfamiliar work, query project overview and relevant symbols/callers before broad edits.
- Index this repository when requested or on first setup, then inspect the server's coverage status.
- Use graph evidence for navigation; read source files for exact details. Graph summaries do not replace source inspection.
- After structural changes, refresh/re-index and check relevant call paths.
- Never claim the graph is up to date unless the server confirms it.
- If tools are absent, continue with ordinary repository inspection and say the MCP layer is not activated.
