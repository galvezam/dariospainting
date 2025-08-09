import emailjs from '@emailjs/browser'

// Initialize with public key at import time so we can call send() anywhere
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
if (PUBLIC_KEY) {
  emailjs.init(PUBLIC_KEY)
} else {
  // eslint-disable-next-line no-console
  console.warn('EmailJS public key is missing. Set VITE_EMAILJS_PUBLIC_KEY in your .env file.')
}

type Params = Record<string, string>

export async function sendEmail(params: Params, templateId: string) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS environment variables are missing.')
  }
  const result = await emailjs.send(serviceId, templateId, params, { publicKey })
  return result
}

export const TEMPLATES = {
  CONTACT: import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT as string,
  QUOTE: import.meta.env.VITE_EMAILJS_TEMPLATE_QUOTE as string,
}
