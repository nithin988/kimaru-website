# kimaru-website

Design preview of the kimaru.ai homepage, positioned as the Enterprise Decision Operating System.
Built with Vite, React, Tailwind v4 and lucide-react, using the Kimaru design tokens (Inter, slate neutrals, teal = approved, purple = agent) and the kimaru.ai logo.

Product screens in `public/screens/` are captured from the Kimaru platform demo build and use synthetic data only.

```bash
pnpm install
pnpm dev        # http://localhost:5173/kimaru-website/
pnpm build
```

Deploys to GitHub Pages on every push to `main` (see `.github/workflows/deploy.yml`).
The page is marked `noindex` while it is a design preview.

Sections: hero, problem timeline, EDOS definition and interactive stack, six-step loop slides, decisions to start with, pilot result, shadow-mode pilot, trust, FAQ, closing CTA.
