# Dario's Painting – Web App

Flashy, interactive blue & white site for a Memphis painting business — with dark mode, estimator, EmailJS forms, and an About page.

## Quickstart
```bash
npm install
npm run dev
```

## Configure EmailJS
1. Create an EmailJS account (emailjs.com) and add a **service** and **templates** (one for quotes, one for contact).
2. Copy your **Service ID**, **Public Key**, and **Template IDs**.
3. Create `.env` from `.env.example` and fill in the values.

## .env
- `VITE_EMAILJS_SERVICE_ID` – your EmailJS service ID
- `VITE_EMAILJS_PUBLIC_KEY` – your public key
- `VITE_EMAILJS_TEMPLATE_CONTACT` – template ID for contact form
- `VITE_EMAILJS_TEMPLATE_QUOTE` – template ID for quote modal

## Business Info
- Name: Dario's Painting
- Phone: (901) 550-4834
- Email: dariospainting79@gmail.com
