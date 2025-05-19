# Welcome to your Project

## Project Setup

This project is a web application built with modern JavaScript technologies.

## How can I edit this code?

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
# git clone <YOUR_GIT_URL> # Replace with your actual Git URL

# Step 2: Navigate to the project directory.
# cd <YOUR_PROJECT_NAME> # Replace with your project directory name

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

You will also need to set up your environment variables. Copy the `.env.example` file to a new file named `.env` (or `.env.local`) and fill in the required API keys and URLs:
```sh
cp .env.example .env
# Then edit .env with your actual credentials
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
- Supabase (for backend integration)

## How can I deploy this project?

You can deploy this project to any static site hosting provider or a platform that supports Node.js applications, such as:
- Vercel
- Netlify
- AWS Amplify
- Google Firebase Hosting
- GitHub Pages (for static builds)

Ensure your build process includes setting the necessary environment variables for production.

## Environment Variables

This project requires the following environment variables to be set:

- `VITE_SUPABASE_URL`: Your Supabase project URL.
- `VITE_SUPABASE_PUBLISHABLE_KEY`: Your Supabase project's anonymous publishable key.

Refer to the `.env.example` file for a template.
