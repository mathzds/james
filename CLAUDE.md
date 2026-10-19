# Regras

- Nunca faça commits. Alterações ficam no working tree para o usuário revisar e commitar.
- Nunca trabalhe em outra branch: não crie, não troque de branch e não use worktrees. Trabalhe sempre na branch atual.
- UI usa shadcn/ui (`apps/web/components/ui`). Antes de criar markup próprio, use um componente existente ou adicione com `pnpm dlx shadcn@latest add <componente> -c apps/web`.
