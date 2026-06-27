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

The repository tracks only the Flutter source. The native `android/` project is
generated during CI by `flutter create`, so it is intentionally git-ignored.

```
lib/
  main.dart                     app entry
  theme.dart                    colours sampled from the screenshots
  models/course.dart            course model + JSON
  services/course_store.dart    SharedPreferences storage
  screens/                      splash, courses, connection-failed
  widgets/                      drawer, grade badge, add-course dialog
assets/
  images/logo.png               in-app splash logo
  icon/                         launcher icon + adaptive foreground + splash
tool/generate_assets.py         regenerates the bee artwork
```

## Building the APK with Codemagic

`codemagic.yaml` defines an **android-release** workflow that:

1. runs `flutter create --platforms=android` to scaffold the native project,
2. sets the app label to *Study Bee*,
3. generates the launcher icon (`flutter_launcher_icons`) and the native
   splash (`flutter_native_splash`),
4. builds `flutter build apk --release`.

The installable APK is published as a build artifact
(`build/**/outputs/**/*.apk`). Point a new Codemagic app at this repository,
select the `android-release` workflow and start a build.

## Building locally (optional)

```bash
flutter create --platforms=android --org com.studybeereplica .
flutter pub get
dart run flutter_launcher_icons
dart run flutter_native_splash:create
flutter build apk --release
```
