/// <reference types="vite/client" />

declare module '*.module.scss' {
  const classes: Record<string, string>;
  export default classes;
}

interface ImportMetaEnv {
  readonly VITE_LASTFM_API_KEY: string;
  readonly VITE_LASTFM_USER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}