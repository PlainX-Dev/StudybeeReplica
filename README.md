# Körkortskompis 🐝

A bilingual (Swedish / English) study app for the **Swedish driving licence theory
test** — *teoriprov, behörighet B*. Offline, no account, no ads.

The real test is 70 questions (65 scored + 5 trial), 50 minutes, and you need
**52 of 65** to pass. This app mirrors that, including the topic mix
Trafikverket draws from: 32 traffic rules, 16 traffic safety, 7 vehicle
knowledge, 5 environment, 5 personal prerequisites.

## What is in it

| | |
|---|---|
| Chapters | 20, covering the whole B syllabus |
| Sections | 80+, each one a jump-back target from any question |
| Questions | 350+, in five formats |
| Road signs | 160+, drawn as vector art |
| Flashcards | 250+, on SM-2 spaced repetition |

Every chapter section carries the hard numbers in a key-facts box, the statute
it comes from, a memory hook, and the trap the exam likes to set.

## The idea

Three things make the difference between reading about traffic law and passing
the test, and the app is built around them:

1. **Active recall.** You answer before you read. Every quiz mode is retrieval
   practice, not review.
2. **Spaced repetition.** Cards you miss come back tomorrow; cards you know
   drift a week, then a month.
3. **No dead ends.** Miss a question and you get a link straight to the exact
   section that teaches it — opened, expanded and highlighted. Weak spots are
   tracked and can be drilled on their own.

Both languages exist for every single string, so you can study in English while
still learning the Swedish wording that will be on the screen at the test
centre. Turn on *show both languages* and each line carries its translation
underneath.

## Study modes

- **Classic quiz** — mixed questions, weighted towards what you are new to or
  keep missing
- **Sign quiz** — recognise the sign, with distractors from the same family
- **Number drill** — the figures the test loves (10-10-30-20-5-3, 0.2 ‰, 1.6 mm…)
- **True or false** — snap decisions
- **Speed round** — 15 seconds a question
- **Weak spots** — only what you tend to get wrong
- **Flashcards** — spaced repetition over numbers, terms, rules and signs
- **Exam simulator** — 65 questions, 50 minutes, 52 to pass, real topic mix

## Building

Flutter stable, Android SDK, then:

```bash
flutter pub get
flutter test          # content graph + widget smoke tests
flutter build apk --release
```

The APK lands in `build/app/outputs/flutter-apk/app-release.apk`. It is signed
with the debug key so it installs by sideload; swap in a real keystore in
`android/app/build.gradle.kts` for store distribution.

A web build works too and needs no Android SDK:

```bash
flutter build web --release --no-web-resources-cdn
```

## Tests

`flutter test` runs two suites. One validates the content graph — unique ids,
every question and card pointing at a section that exists, every referenced
sign present, answer indices in range, both languages filled in, and the mock
exam matching the real distribution exactly. The other boots the app and walks
every tab.

## Accuracy

Content follows trafikförordningen (1998:1276), vägmärkesförordningen (2007:90),
körkortslagen (1998:488) and Transportstyrelsen's syllabus for category B. It is
a study aid, not an official test, and it does not replace driving school.
