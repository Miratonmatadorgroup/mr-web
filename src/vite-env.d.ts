/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string; // Define your environment variable here
}

interface ImportMeta {
    readonly env: ImportMetaEnv; // Extend the ImportMeta interface
}