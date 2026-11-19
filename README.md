# UnitedHealth Group India Tech Jobs Directory

An independent job directory curated by Product with Sasi. Search Indian technology roles and open each posting on the official UnitedHealth Group careers site.

## Local development

Use Node.js 22.18 or newer on the 22 release line, or Node.js 24.

```sh
npm ci
npm test
npm run dev
```

To build and verify the same static files Vercel serves:

```sh
SITE_URL=https://example.org npm run build
npm run test:export
python3 -m http.server 8080 --directory dist
```

Use your actual HTTPS origin for a production build. The Python preview serves the export on localhost. Vercel applies the response headers in `vercel.json`.

## Deploy on Vercel

1. Open the Vercel project connected to `sksasikumar0712-cell/UnitedHealth-Group-India-Tech-Jobs-Directory`.
2. Use the repository root, the **Other** framework preset, `npm run build`, and `dist` as the output directory. Next.js generates the static export during that build. These settings are declared in `vercel.json`.
3. Set `SITE_URL` to the project's public HTTPS origin for share previews, canonical URLs and the sitemap. If Vercel exposes `VERCEL_PROJECT_PRODUCTION_URL`, the build can use that as its default.
4. Push to `main` to trigger a production deployment. Git-triggered deployment is enabled in `vercel.json`. For a manual deploy, link this checkout to the existing project with `npx vercel link` and run `npx vercel --prod`.
5. If an old deployment still shows 404, confirm the Root Directory is the repository root (leave it blank), then redeploy the latest commit. Do not set the root to `app` or `dist`.
6. Check the public site, `/robots.txt`, `/sitemap.xml`, the sharing image and security headers.

## Maintain the listings

Edit `data/jobs.json`. Before adding a listing, open the specific official careers page and verify its title, company, primary location, requisition ID if available, and Apply button. Categories are directory labels based on the job function. Remove closed or unverifiable listings. The build validates the data shape, duplicate IDs, and exact HTTPS job URL format. The build works offline after dependencies are installed.

The profile photo comes from the header of the supplied SurveySparrow reference. The LinkedIn shortcuts use the direct profile URL resolved from the reference’s OpeninApp link, avoiding an extra redirect.

## Security

The site ships static files. Search runs in the browser. The Vercel CSP limits scripts and assets to the site origin, and the export step puts Next.js bootstrap scripts in local files. Run `npm audit` and `npm audit --omit=dev` after dependency updates.
