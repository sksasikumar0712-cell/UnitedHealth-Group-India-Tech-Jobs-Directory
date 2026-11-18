# UnitedHealth Group India Tech Jobs Directory

Independent, mobile-first job directory curated by Product with Sasi. Search curated roles and visit the official UnitedHealth Group/Optum application page for each job.

## Local setup

Requires Node.js 22.

```sh
npm test
npm run build
```

The build produces **`dist/`** with only public web assets. To preview locally, serve the output directory (for example, `python3 -m http.server 8080 --directory dist`).

## Deploy or redeploy on Vercel

1. Import `sksasikumar0712-cell/UnitedHealth-Group-India-Tech-Jobs-Directory` from GitHub or open the existing Vercel project.
2. Keep **Root Directory** at the repository root (`./`).
3. Use **Other** framework preset; `vercel.json` explicitly sets `framework: null`, `buildCommand: npm run build`, and `outputDirectory: dist`.
4. Deploy or select the newest commit and **Redeploy**. A connected GitHub project should automatically start a fresh deployment after a push.
5. Check that the build log says `Built 5 public assets in dist/ for Vercel.` and that the URL loads the job directory with styling and filters.

**Fix for `STATIC_BUILD_NO_OUT_DIR`:** An earlier build script only verified files and never generated an output folder. The explicit static build now copies its allowlisted assets to `dist/`, which matches Vercel's output setting.

## Maintenance

Keep job entries in `app.js` accurate and remove expired jobs. Never publish application links outside the approved official careers domain. The site is not associated with UnitedHealth Group or Optum.

## Security

Only the public assets in `dist/` are deployed. No user accounts, DB, API keys or tracking. Strict Vercel HTTP security headers, DOM text rendering and approved job links are enforced. Periodically audit dependencies and GitHub access.
