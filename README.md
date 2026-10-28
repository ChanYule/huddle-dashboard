# Community Care Huddle Dashboard

A localhost-only React + TypeScript dashboard with Vite, Tailwind CSS, Recharts, Express and SQLite.

## Run

Install Node.js 22 LTS (with npm), then open a terminal in this folder:

```sh
npm install
npm run dev
```

Open http://127.0.0.1:5173. Express listens on 127.0.0.1:3001. Both services bind only to loopback. No external APIs, fonts, analytics or cloud services are used. Installation requires internet access to fetch npm dependencies; use afterward is local.

```sh
npm run build
npm test
```

For a built application, run `npm run build` then `npm start` and open http://127.0.0.1:3001.

## Data

SQLite is stored in `data/huddle.sqlite` and created automatically. The application starts empty: all dashboard values come from uploaded Excel or CSV files. Generated demonstration records from earlier versions are removed automatically; user imports are preserved. Choose Data Management, download a template, upload your file, review the preview, and confirm the import.

Download templates from Data Management. XLSX and CSV use their first worksheet. Headers must match the template exactly. Preview appears before import; errors prevent the whole import. Replace applies to all records of the selected data type, across all centres and years. Imported batches can be deleted, and individual records can be edited or deleted. Back up the data folder with the app stopped.

KPI required fields: KPI Name, Target, Actual, Year, Month, Centre. Month is 1–12. Targets and actuals are non-negative. Zero targets have unavailable attainment. Traffic lights: green ≥100%, amber ≥90% and <100%, red <90%.

Participant required fields: Participant ID, Age, Gender, Ethnicity, Language, Living Arrangement, CFS Category, Centre. Optional Year defaults to the current calendar year. Annual snapshots enable historical insights. Use Male/Female for the pyramid; language categories are English, Mandarin, Malay, Tamil, Others; living arrangement categories are Living Alone, Living With Spouse, Living With Family, Others. CFS accepts 1-3, 4-6, 7-9 (with an optional CFS prefix).

Dashboard count KPIs sum monthly values; they are not unique people across months. Rate KPIs (names containing “rate” or “percent”) average reported observations. Overall attainment is an unweighted mean of nonzero-target KPI attainment. Comparisons apply the same centre/month filters to each year. Participant charts use the selected annual snapshot, independent of the month filter. Missing historical data produces no comparison rather than an invented trend. Age groups start at 50; younger records remain in totals.

Excel export includes filtered KPI and participant source records. PDF exports the current report, including its charts, to paginated A4. Search in Data Management spans years, with the centre filter applied. Data is held on this computer; this app has no account system or encryption at rest, so use normal device access controls for participant data.
