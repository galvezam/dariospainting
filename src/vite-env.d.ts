/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_PUBLIC_KEY: string
  readonly VITE_EMAILJS_SERVICE_ID: string
  readonly VITE_EMAILJS_TEMPLATE_CONTACT: string
  readonly VITE_EMAILJS_TEMPLATE_QUOTE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 