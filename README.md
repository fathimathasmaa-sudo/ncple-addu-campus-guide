# NCPLE Addu Campus — Welcome Guide

Production-oriented, mobile-first digital campus concierge for international participants, facilitators and guests staying at NCPLE Addu Campus.

## Current foundation
- Next.js + React + TypeScript
- Tailwind institutional blue design system
- Mobile bottom navigation + desktop sidebar
- Centralised authoritative guide data
- Live opening-hours status
- Global guide search
- Click-to-call contacts
- Persistent checkout checklist
- PWA manifest, icon and offline service worker
- Firebase client configuration prepared through environment variables
- Admin-ready content models for future Firestore management and announcements

## Firebase
Create `.env.local` from `.env.example` and provide the Firebase web configuration values. Never commit service-account private keys or other server-side secrets.

## Run
```bash
npm install
npm run dev
```

## Source policy
Initial content follows the supplied NCPLE Addu Campus Welcome Guide. Unknown values marked `[To be confirmed]` remain unfilled, and no geographic map is fabricated where the source only states that a map exists.
