# Study Bee (offline replica)

A fully offline Flutter replica of the Study Bee app UI. It ships with an
**empty** course list; courses (and their grades) are added through a hidden
gesture. Every other action behaves as if the device cannot reach the server.

## Features

- **Launch logo** – yellow splash with the Study Bee bee logo, plus a native
  launch screen and a matching app launcher icon. The app is named *Study Bee*.
- **Courses screen** – a pixel-faithful copy of the original: yellow header,
  hamburger menu, black *Filter* pill, the *Current courses* section and the
  split grade/status badges (letter grade + Green/Yellow/Red dot).
- **Hidden gesture** – **long-press the “Courses” title** (or the
  *Current courses* bar) to open the *Add course* dialog. Enter the course
  name, description, optional initials, grade (A–F / –) and status colour.
  Long-press an existing course row to **edit or delete** it. Courses are saved
  locally and persist between launches.
- **Offline everywhere else** – tapping *Filter*, any drawer item
  (Calendar / Communication / Bulletin Board / Log out) or a course row shows a
  brief loading spinner, then: *“Connection to server failed at the time.”*

## Project layout

The complete native `android/` project (launcher icons, adaptive icon and
native splash included) is committed, so the build only needs `pub get` +
`build apk` — nothing is generated at build time.

```
lib/
  main.dart                     app entry
  theme.dart                    colours sampled from the screenshots
  models/course.dart            course model + JSON
  services/course_store.dart    SharedPreferences storage
  screens/                      splash, courses, connection-failed
  widgets/                      drawer, grade badge, add-course dialog
android/                        full Android project (named "Study Bee")
  app/src/main/res/mipmap-*     committed launcher icons + adaptive foreground
  app/src/main/res/drawable-*   committed native splash logo
assets/images/logo.png          in-app Flutter splash logo
tool/generate_assets.py         regenerates the Flutter bee artwork
tool/generate_android_res.py    regenerates the Android mipmaps / splash
```

## Building the APK with Codemagic

`codemagic.yaml` defines an **android-release** workflow that simply runs
`flutter pub get` then `flutter build apk --release`. The installable APK is
published as a build artifact (`build/**/outputs/**/*.apk`).

Point a new Codemagic app at this repository, choose **Use codemagic.yaml**,
select the `android-release` workflow and start a build. The finished APK is at
`build/app/outputs/flutter-apk/app-release.apk`. It is signed with the debug
key so it installs directly; swap in a real keystore for store distribution.

## Building locally (optional)

```bash
flutter pub get
flutter build apk --release
```
