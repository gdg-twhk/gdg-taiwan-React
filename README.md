# GDG Taiwan Official Website

This is the official website for Google Developer Groups (GDG) Taiwan, built with Next.js, TypeScript, Tailwind CSS, and i18n. The site aims to promote Google technologies, foster developer community connections, and encourage learning and growth among developers in Taiwan and beyond.

---

## 🚀 Features

- **Next.js 14**: Modern React framework with SSR/SSG/ISR and SEO support.
- **TypeScript**: Static typing for better maintainability.
- **Tailwind CSS**: Utility-first, responsive UI design.
- **i18n**: Multi-language support (Traditional Chinese, Simplified Chinese, English, Japanese, Korean).
- **Automatic Sitemap & robots.txt**: SEO-friendly with automated generation.
- **Hydration Optimization**: Prevents SSR/CSR mismatch using custom hooks.
- **Component-based Architecture**: Modular and maintainable codebase.
- **Unit Testing**: Ensures core feature quality.

---

## 📦 Directory Structure

```
src/
  components/         # Shared components (Header, Footer, UI, useClientOnly, etc.)
    page-section/     # Main page section components
    ui/               # Basic UI components
  hooks/              # Custom React hooks
  i18n/               # i18n config and locale files
    locales/          # Translation files for each language
  pages/              # Next.js pages (404, index, etc.)
public/               # Static assets (favicon, images, etc.)
next-sitemap.config.js# Sitemap configuration
```

---

## 🛠️ Getting Started

1. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run locally**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Build and generate sitemap**
   ```bash
   npm run build
   # Generates sitemap.xml and robots.txt
   ```

---

## 🌏 Internationalization (i18n)

- Translation files are in `src/i18n/locales/`
- Managed with [react-i18next](https://react.i18next.com/)
- To add a new language, create a new folder and translation file in `locales/`

---

## 🧩 Hydration Optimization

- All components that depend on client-only state (e.g., useTheme, useIsMobile, useTranslation) use the `useClientOnly` hook to ensure client-side rendering only, preventing SSR/CSR mismatch.

---

## 🗺️ Sitemap & SEO

- [next-sitemap](https://github.com/iamvishnusankar/next-sitemap) is used to automatically generate `sitemap.xml` and `robots.txt`.
- Configuration is in `next-sitemap.config.js`. Please update `siteUrl` to your production domain.

---

## 🧪 Testing

- All core features should have unit tests.
- To run tests:
  ```bash
  npm run test
  ```

---

## ⚙️ Development Guidelines

- See `/fixes/` for major bug fix records.
- Do not commit `.env` files to version control.
- Do not make large-scale architecture changes without review.
- Follow code comments and PRD documentation for detailed rules.

---

## 📚 Tech & Patterns

- All design patterns, technologies, and components used should be documented in this README.
- For repeated errors, check the fixes and log records first.

---

## 📝 References

- [Next.js Documentation](https://nextjs.org/docs)
- [react-i18next Documentation](https://react.i18next.com/)
- [next-sitemap Documentation](https://github.com/iamvishnusankar/next-sitemap)

---

We welcome all developers interested in Google technologies to join us, learn, share, and grow together!

