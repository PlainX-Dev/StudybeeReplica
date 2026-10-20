# Körkort 30: Swedish theory test trainer

A website for passing the **Swedish B-licence theory test** (Trafikverket kunskapsprov) in 30 days.

## Host it on Vercel

The repo root has a `vercel.json` that serves the prebuilt `website/dist/` folder. Nothing is built on Vercel.

1. Go to vercel.com → **Add New… → Project** and import this GitHub repository.
2. Leave **Root Directory** as the repository root and keep the framework preset as **Other**. `vercel.json` sets the rest.
3. Deploy. Under **Settings → Git**, choose the branch that holds the site as the production branch, or merge it into `main` first.

Every push after that redeploys automatically. Run `python3 website/build.py` and commit `website/dist/` whenever you change `src/`.

## Use it on your PC without hosting

Open **`dist/index.html`** in Chrome, Edge or Firefox. It is one self-contained file and works offline;
only the web font falls back to the system font. Progress is saved in that browser. Use
**Progress → Copy backup code** to move it to another browser or device.

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
python3 build.py            # writes dist/index.html
```

`tools/AUTHORING.md` describes the question format and the picture specs
(junctions, roundabouts, roads, driver views, signs) drawn by `src/scenes.js`.

The questions follow Swedish traffic rules as the authors understand them. They do not come from
Trafikverket. Check anything that seems off against Trafikverket's own material or a current
körkortsbok.
