# Körkort 30: Swedish theory test trainer

A website for passing the **Swedish B-licence theory test** (Trafikverket kunskapsprov) in 30 days.

## Use it on your PC

Open **`index.html`** in Chrome, Edge or Firefox: double-click it, or drag it into a browser window.
It is one self-contained file. Everything works offline except the two web fonts, which fall back to
system fonts. Your progress is saved in that browser on that computer. Use **Progress → Backup** to copy
a backup code, and restore it in another browser or on another PC.

## What is in it

- **30-day plan**: a daily task list of about an hour a day. Lessons come first, then drills, then six full mock exams from day 14 to day 29. Tasks tick themselves off when you finish them.
- **Lessons**: one per topic, with pictures and a key-facts box. A key-facts sheet puts every topic on one page.
- **Practice**: picture questions such as "You want to turn left here. Who goes first?", drawn as top-down junctions and roundabouts, road scenes and driver's-eye views. Every answer comes with an explanation.
- **Mock exam**: 65 scored questions in 50 minutes with a question map. You need 52 correct to pass, as in the real test.
- **Mistakes**: every wrong answer is saved here until you get it right twice in a row.
- **Signs**: every Swedish sign in the bank as flashcards, plus sign drills.

## Editing

The source is in `src/`. Rebuild `index.html` after any change:

```bash
node tools/validate.js      # checks every question, lesson and picture
python3 build.py            # writes index.html
```

`tools/AUTHORING.md` describes the question format and the picture specs
(junctions, roundabouts, roads, driver views, signs) drawn by `src/scenes.js`.

The questions follow Swedish traffic rules as the authors understand them. They do not come from
Trafikverket. Check anything that seems off against Trafikverket's own material or a current
körkortsbok.
