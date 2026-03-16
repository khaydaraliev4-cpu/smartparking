# Aqlli avtoturargoh (SmartParking)

SmartParking is a production-ready full-stack web platform for global parking and truck-space discovery, reservation, subscription, and guided support.

## 1) Full project architecture overview
- **Frontend**: Next.js App Router + TailwindCSS + Framer Motion style micro-animations and liquid-glass UI.
- **Backend**: Next.js route handlers (`app/api/*`) implementing auth, verification, search, reservation locking, subscriptions, contact, and AI support.
- **Database**: PostgreSQL via Prisma ORM with normalized models for users, verifications, parking, reservations, payments, messages, logs, and settings.
- **Services**:
  - Email verification and contact dispatch via SMTP/Nodemailer.
  - Support AI via OpenAI API with strict topical guardrails.
  - Click payment integration scaffold with fixed tariff amount logic.
  - Google Maps route launching with geolocation-aware UX.

## 2) Full folder structure
```text
smartparking/
  app/
    (marketing)/page.tsx
    (app)/dashboard/page.tsx
    (app)/truck/page.tsx
    (app)/contact/page.tsx
    (auth)/login/page.tsx
    (auth)/register/page.tsx
    (auth)/forgot-password/page.tsx
    api/auth/*
    api/parking/*
    api/truck/*
    api/subscriptions/buy/route.ts
    api/contact/route.ts
    api/chat/route.ts
    globals.css
    layout.tsx
  components/
    Header.tsx
    LanguageSwitcher.tsx
    ThemeToggle.tsx
    ParkingSearch.tsx
  lib/
    auth.ts
    email.ts
    i18n.ts
    prisma.ts
    validation.ts
  prisma/
    schema.prisma
    seed.ts
  messages/
    en.json
    uz.json
  public/
    smartparking-logo.png
  .env.example
  package.json
  tailwind.config.ts
  next.config.mjs
```

## 3) Database schema/models
Implemented in `prisma/schema.prisma` with:
- `User`
- `EmailVerification`
- `ParkingLocation`
- `Reservation`
- `Subscription`
- `ContactMessage`
- `ChatLog`
- `UserSetting`

## 4) Frontend implementation files
- Premium liquid glass landing page and navigation.
- Dashboard with parking search, nearest recommendations, and tariff purchase cards.
- Truck-specific page with same UX pattern.
- Contact page with message form and scoped AI support chat.
- Authentication pages with registration verification UX.
- Theme toggle + searchable language dropdown in top-right.

## 5) Backend implementation files
- Auth: register/login/verify/forgot-password routes.
- Search + recommendation routes for car and truck parking.
- Reservation/cancellation routes with anti-double booking strategy.
- Subscription buying endpoint with fixed amount by tariff.
- Contact endpoint storing message and emailing recipient.
- AI chat endpoint with scope restrictions and refund policy rule.

## 6) Authentication and email verification logic
- Registration validates required fields, geolocation consent, and strong password.
- Creates user with hashed password (`bcryptjs`).
- Generates random 6-digit verification code and persists with expiration.
- Verification endpoint requires exact 6 digits and marks user verified.
- Login requires verified account and sets signed JWT cookie.

## 7) Reservation and locking logic
- Available inventory filter requires `reservedByUserId = null`.
- Reserve action atomically updates parking row to set `reservedByUserId`.
- Conflict returns `409` if already reserved.
- Cancel action clears reservation and marks active reservation released.

## 8) Payment integration structure
- Tariffs are fixed and mapped server-side:
  - 1 day = 20,000 so'm
  - 1 week = 100,000 so'm
  - 1 month = 400,000 so'm
- Client only sends selected plan; amount computed in backend and cannot be manually changed.
- Integration env placeholders provided for Click (`CLICK_*`).

## 9) AI support chat scope/restriction logic
- Endpoint rejects unrelated prompts.
- Refund policy hardcoded to required response:
  - **"No, refunds are not provided after purchase."**
- Uses OpenAI if key is present; otherwise provides deterministic local support response.

## 10) Environment variables needed
Use `.env.example` and configure:
- `DATABASE_URL`
- `JWT_SECRET`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`
- `OPENAI_API_KEY`
- `NEXT_PUBLIC_GOOGLE_MAPS_KEY`
- `CLICK_MERCHANT_ID`, `CLICK_SERVICE_ID`, `CLICK_SECRET_KEY`

## 11) Setup instructions
1. Install Node.js 20+ and PostgreSQL.
2. Copy env file:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```
5. Run migrations:
   ```bash
   npm run prisma:migrate
   ```
6. Seed starter parking data:
   ```bash
   npm run prisma:seed
   ```

## 12) Run instructions
```bash
npm run dev
```
Then open `http://localhost:3000`.

## 13) Deployment instructions
- Deploy on Vercel or any Node hosting with PostgreSQL.
- Set all production environment variables.
- Run `npm run build` in CI.
- Run Prisma migrations against production DB before switching traffic.

## 14) Notes about security, scalability, and future improvements
- Current JWT auth should be extended with refresh token/session rotation for high-security workloads.
- Add rate limiting and captcha on auth/contact endpoints.
- Add queue for email dispatch and webhook-verified Click payment callbacks.
- Implement proper geospatial nearest calculation with PostGIS.
- Add admin role and admin UI for parking/content moderation.
- Add audit logs and SIEM integration for enterprise operations.

## Branding note
The platform loads `public/smartparking-logo.png` as the official logo in the header and brand areas. Replace this file with the uploaded SmartParking logo asset for final branded deployment.
