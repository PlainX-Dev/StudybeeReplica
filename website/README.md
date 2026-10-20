# Körkort 30: Swedish theory test trainer

A website for passing the **Swedish B-licence theory test** (Trafikverket kunskapsprov) in 30 days.

## Host it on Vercel

The repo root has `vercel.json`, `package.json` and an `api/` folder. Vercel serves the prebuilt
`website/dist/` folder and runs the functions in `api/` for sync and reminders.

1. **Import the repo.** On vercel.com choose **Add New… → Project** and import this repository. Keep the
   root directory as the repo root and the framework preset as **Other**. Deploy.
   If the site lives on a branch, merge it into `main` or set that branch as the production branch
   under **Settings → Git**.
2. **Add a database for sync.** In the project open **Storage → Create Database → Upstash for Redis**
   (free plan) and connect it to the project. This adds `KV_REST_API_URL` and `KV_REST_API_TOKEN`.
3. **Add keys for reminders.** Run `npx web-push generate-vapid-keys` on any computer with Node.
   In **Settings → Environment Variables** add:
   - `VAPID_PUBLIC_KEY`: the public key
   - `VAPID_PRIVATE_KEY`: the private key (keep it secret)
   - `VAPID_SUBJECT`: `mailto:` followed by your email address
   - `CRON_SECRET`: any long random string, so only Vercel can trigger the daily job
4. **Redeploy** (Deployments → ⋯ → Redeploy) so the new settings take effect.

The daily reminder runs at 17:00 UTC (18:00 Swedish winter time, 19:00 summer time) from the `crons`
entry in `vercel.json`. On the free Hobby plan Vercel runs it once a day, sometime within that hour.

### Linking your phone and PC

On the PC open **Progress → Sync between devices → Turn on sync**, then **Copy link for your phone**
and open that link on the phone (email or message it to yourself). Both devices now share streaks,
plan ticks, mistakes and mock results. They sync when you answer and when you reopen the app.

### Turning on reminders

- **iPhone (iOS 16.4 or later):** open the site in Safari, tap **Share → Add to Home Screen**, open
  Körkort 30 from the new icon, then **Progress → Turn on daily reminder** and allow notifications.
- **Android:** open the site in Chrome, **Progress → Turn on daily reminder**, allow notifications.
  Installing it via **⋮ → Add to Home screen** makes it feel like an app.

Use **Send a test now** to check it works. The reminder comes only on days you haven't studied yet
(fewer than 10 questions and no plan task done) and says which plan day you're on and how long your streak is.

## Use it on your PC without hosting

Open **`dist/index.html`** in Chrome, Edge or Firefox. It is one self-contained file and works offline;
only the web font falls back to the system font. Sync and reminders need the hosted site; opened from
a file, progress stays in that browser (use **Progress → Copy backup code** to move it).

## What is in it

- **Daily pull**: three activity rings (plan tasks, 30 questions, accuracy), a streak that needs 10 questions a day, XP levels from *L-plate* to *Licence ready*, 16 badges, answer combos, and confetti when you close a day.
- **30-day plan**: a daily task list of about an hour a day. Lessons come first, then drills, then six full mock exams from day 14 to day 29. Tasks tick themselves off when you finish them.
- **Lessons**: one per topic, with pictures and a key-facts box. A key-facts sheet puts every topic on one page.
- **Practice**: picture questions such as "You want to turn left here. Who goes first?", drawn as top-down junctions and roundabouts, road scenes and driver's-eye views. Every answer comes with an explanation.
- **Mock exam**: 65 scored questions in 50 minutes with a question map. You need 52 correct to pass, as in the real test.
- **Mistakes**: every wrong answer is saved here until you get it right twice in a row.
- **Signs**: every Swedish sign in the bank as flashcards, plus sign drills.

## Editing

The source is in `src/`. Rebuild `dist/index.html` after any change:

```bash
node tools/validate.js      # checks every question, lesson and picture
python3 build.py            # writes dist/, copies src/static/ and regenerates api/_plan.js
npm install && npm run dev  # local server with in-memory sync at http://localhost:3030
```

`tools/AUTHORING.md` describes the question format and the picture specs
(junctions, roundabouts, roads, driver views, signs) drawn by `src/scenes.js`.

The questions follow Swedish traffic rules as the authors understand them. They do not come from
Trafikverket. Check anything that seems off against Trafikverket's own material or a current
körkortsbok.
