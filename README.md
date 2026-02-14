# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/62a69c91-fff4-4881-8f91-3d65af5a2d74

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/62a69c91-fff4-4881-8f91-3d65af5a2d74) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Persistência do carrossel (Supabase)

O carrossel da Home (`Hero`) e a tela de administração (`/admin/carrossel`) agora usam Supabase para persistir textos e URLs das imagens.

### 1) Configure variáveis de ambiente

No frontend, adicione:

```sh
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Você pode colocar em `.env.local` (desenvolvimento) e no ambiente de produção.

### Segurança de credenciais

- Nunca coloque senha de banco no frontend (variáveis `VITE_*` são públicas no build).
- Use `SUPABASE_DB_PASSWORD` e `SUPABASE_SERVICE_ROLE_KEY` somente em backend/CI/infra.
- Use o arquivo [.env.example](.env.example) como referência de nomes de variáveis.
- Se uma senha já foi exposta, faça rotação imediata no Supabase e atualize os ambientes (local e Vercel).

### 2) Crie a tabela no Supabase

Execute o SQL de [supabase/hero_slides.sql](supabase/hero_slides.sql).

### 3) Imagens no GitHub

As imagens continuam hospedadas no GitHub. Basta salvar no admin uma URL pública, de preferência `raw.githubusercontent.com`.

Se você colar uma URL `github.com/.../blob/...`, o sistema converte automaticamente para URL raw.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/62a69c91-fff4-4881-8f91-3d65af5a2d74) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
