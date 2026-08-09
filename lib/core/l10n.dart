/// Bilingual plumbing. Every piece of study content in this app exists in both
/// Swedish and English, because the real teoriprov can be written in either and
/// the signs on the road are only ever labelled in Swedish.
library;

enum Lang { sv, en }

extension LangX on Lang {
  String get code => this == Lang.sv ? 'sv' : 'en';
  String get label => this == Lang.sv ? 'Svenska' : 'English';
  String get flag => this == Lang.sv ? '🇸🇪' : '🇬🇧';
  Lang get other => this == Lang.sv ? Lang.en : Lang.sv;

  static Lang fromCode(String? code) => code == 'sv' ? Lang.sv : Lang.en;
}

/// A string that knows both languages.
class T {
  final String sv;
  final String en;
  const T(this.sv, this.en);

  /// Same text in both languages (numbers, sign codes, proper nouns).
  const T.same(String both)
      : sv = both,
        en = both;

  String call(Lang l) => l == Lang.sv ? sv : en;

  /// The version the user is *not* reading — used for the "peek" subtitles that
  /// teach the Swedish wording even when studying in English.
  String other(Lang l) => l == Lang.sv ? en : sv;

  @override
  String toString() => en;
}

/// Every fixed string in the interface.
class S {
  static const appName = T.same('Körkortskompis');
  static const appTagline =
      T('Din kompis fram till teoriprovet', 'Your buddy until the theory test');

  // ── Navigation ───────────────────────────────────────────────────────────
  static const navHome = T('Hem', 'Home');
  static const navChapters = T('Kapitel', 'Chapters');
  static const navPractice = T('Öva', 'Practice');
  static const navSigns = T('Vägmärken', 'Signs');
  static const navProgress = T('Framsteg', 'Progress');

  // ── Home ─────────────────────────────────────────────────────────────────
  static const goodMorning = T('God morgon', 'Good morning');
  static const goodAfternoon = T('God eftermiddag', 'Good afternoon');
  static const goodEvening = T('God kväll', 'Good evening');
  static const daysToExam = T('dagar till provet', 'days until your test');
  static const dayToExam = T('dag till provet', 'day until your test');
  static const examToday = T('Provdag! Du klarar det.', 'Test day! You’ve got this.');
  static const setExamDate = T('Ställ in provdatum', 'Set your test date');
  static const todaysGoal = T('Dagens mål', 'Today’s goal');
  static const questionsDone = T('frågor klara', 'questions done');
  static const goalReached = T('Dagens mål klart! 🎉', 'Daily goal done! 🎉');
  static const streak = T('dagars svit', 'day streak');
  static const continueStudying = T('Fortsätt plugga', 'Keep studying');
  static const quickStart = T('Snabbstart', 'Quick start');
  static const todaysPlan = T('Dagens plan', 'Today’s plan');
  static const planDone = T('Klart', 'Done');
  static const yourWeakSpots = T('Dina svaga punkter', 'Your weak spots');
  static const noWeakSpots = T(
      'Inga svaga punkter än — kör några frågor så hittar jag dem.',
      'No weak spots yet — answer some questions and I’ll find them.');
  static const reviewDue = T('att repetera idag', 'to review today');

  // ── Chapters ─────────────────────────────────────────────────────────────
  static const allChapters = T('Alla kapitel', 'All chapters');
  static const chapter = T('Kapitel', 'Chapter');
  static const mastery = T('Behärskning', 'Mastery');
  static const readChapter = T('Läs kapitlet', 'Read the chapter');
  static const keyFacts = T('Nyckelfakta', 'Key facts');
  static const memoryHook = T('Minnesknep', 'Memory hook');
  static const lawRef = T('Lagrum', 'In law');
  static const watchOut = T('Varning för fällan', 'Watch out for the trap');
  static const testChapter = T('Testa kapitlet', 'Test this chapter');
  static const chapterDone = T('Kapitel klart!', 'Chapter complete!');
  static const minRead = T('min läsning', 'min read');
  static const sectionsLabel = T('avsnitt', 'sections');
  static const jumpBack = T('Tillbaka till avsnittet', 'Back to the section');

  // ── Practice ─────────────────────────────────────────────────────────────
  static const practiceHub = T('Öva', 'Practice');
  static const modeClassic = T('Klassiskt quiz', 'Classic quiz');
  static const modeClassicSub =
      T('Blandade frågor i lugnt tempo', 'Mixed questions, no clock');
  static const modeSigns = T('Vägmärkesquiz', 'Sign quiz');
  static const modeSignsSub =
      T('Känn igen märket direkt', 'Recognise the sign instantly');
  static const modeSpeed = T('Blixtrunda', 'Speed round');
  static const modeSpeedSub = T('15 sekunder per fråga', '15 seconds per question');
  static const modeNumbers = T('Sifferdrill', 'Number drill');
  static const modeNumbersSub =
      T('Alla siffror provet älskar', 'Every number the test loves');
  static const modeTrueFalse = T('Sant eller falskt', 'True or false');
  static const modeTrueFalseSub = T('Snabba beslut', 'Snap decisions');
  static const modeWeak = T('Svaga punkter', 'Weak spots');
  static const modeWeakSub =
      T('Bara det du brukar missa', 'Only what you tend to miss');
  static const modeFlashcards = T('Minneskort', 'Flashcards');
  static const modeFlashcardsSub =
      T('Repetition med intervaller', 'Spaced repetition');
  static const modeExam = T('Provsimulator', 'Exam simulator');
  static const modeExamSub =
      T('65 frågor · 50 minuter · 52 rätt', '65 questions · 50 min · 52 to pass');

  // ── Quiz ─────────────────────────────────────────────────────────────────
  static const check = T('Rätta', 'Check');
  static const next = T('Nästa', 'Next');
  static const finish = T('Avsluta', 'Finish');
  static const correct = T('Rätt!', 'Correct!');
  static const wrong = T('Inte riktigt', 'Not quite');
  static const correctAnswer = T('Rätt svar', 'Correct answer');
  static const explanation = T('Förklaring', 'Why');
  static const selectAll = T('Välj alla som stämmer', 'Select all that apply');
  static const selectOne = T('Välj ett svar', 'Choose one answer');
  static const trueLabel = T('Sant', 'True');
  static const falseLabel = T('Falskt', 'False');
  static const questionOf = T('Fråga', 'Question');
  static const of = T('av', 'of');
  static const skip = T('Hoppa över', 'Skip');
  static const quitQuiz = T('Avbryta quizet?', 'Quit this quiz?');
  static const quitQuizBody = T('Dina svar hittills sparas.',
      'Your answers so far are saved.');
  static const stay = T('Stanna kvar', 'Stay');
  static const quit = T('Avbryt', 'Quit');
  static const flagQuestion = T('Flagga', 'Flag');
  static const noQuestions = T('Inga frågor här just nu.', 'No questions here right now.');

  // ── Results ──────────────────────────────────────────────────────────────
  static const results = T('Resultat', 'Results');
  static const youScored = T('Du fick', 'You scored');
  static const passed = T('GODKÄNT', 'PASSED');
  static const failed = T('UNDERKÄNT', 'NOT YET');
  static const passedBody = T('Så där ja! Det räckte över gränsen.',
      'There we go! That is over the line.');
  static const failedBody = T('Nästan. Titta på det du missade och kör igen.',
      'Close. Look at what you missed and go again.');
  static const reviewMistakes = T('Gå igenom misstagen', 'Review mistakes');
  static const tryAgain = T('Kör igen', 'Go again');
  static const backHome = T('Till startsidan', 'Back home');
  static const weakestAreas = T('Svagast områden', 'Weakest areas');
  static const timeUsed = T('Tid', 'Time');

  // ── Flashcards ───────────────────────────────────────────────────────────
  static const tapToFlip = T('Tryck för att vända', 'Tap to flip');
  static const again = T('Igen', 'Again');
  static const hard = T('Svårt', 'Hard');
  static const good = T('Bra', 'Good');
  static const easy = T('Lätt', 'Easy');
  static const deckDone = T('Kortleken klar!', 'Deck finished!');
  static const cardsLeft = T('kort kvar', 'cards left');
  static const nothingDue = T('Inget att repetera just nu — bra jobbat!',
      'Nothing due right now — nice work!');
  static const studyAhead = T('Plugga i förväg', 'Study ahead');

  // ── Signs ────────────────────────────────────────────────────────────────
  static const searchSigns = T('Sök vägmärke…', 'Search signs…');
  static const signMeaning = T('Betydelse', 'Meaning');
  static const signCategory = T('Kategori', 'Category');
  static const allSigns = T('Alla', 'All');
  static const signsCount = T('vägmärken', 'road signs');
  static const noSignsFound = T('Inga märken matchar.', 'No signs match.');

  // ── Progress ─────────────────────────────────────────────────────────────
  static const yourProgress = T('Dina framsteg', 'Your progress');
  static const readiness = T('Provberedskap', 'Test readiness');
  static const readinessHint = T(
      'Baserat på hur mycket du läst, hur rätt du svarar och hur väl du minns.',
      'Based on how much you have read, how well you answer and how well you recall.');
  static const answered = T('Besvarade', 'Answered');
  static const accuracy = T('Träffsäkerhet', 'Accuracy');
  static const cardsLearned = T('Kort inlärda', 'Cards learned');
  static const chaptersRead = T('Kapitel lästa', 'Chapters read');
  static const badges = T('Utmärkelser', 'Badges');
  static const byChapter = T('Per kapitel', 'By chapter');
  static const last7days = T('Senaste 7 dagarna', 'Last 7 days');
  static const examHistory = T('Provhistorik', 'Test history');
  static const noExamsYet =
      T('Inget provresultat än.', 'No test results yet.');

  // ── Settings ─────────────────────────────────────────────────────────────
  static const settings = T('Inställningar', 'Settings');
  static const language = T('Språk', 'Language');
  static const languageHint = T('Byt när du vill — allt innehåll finns på båda.',
      'Switch any time — all content exists in both.');
  static const showBothLanguages = T('Visa båda språken', 'Show both languages');
  static const showBothHint = T(
      'Visar den andra språkversionen i mindre text under.',
      'Shows the other language in smaller text underneath.');
  static const examDate = T('Provdatum', 'Test date');
  static const dailyGoal = T('Dagligt mål', 'Daily goal');
  static const darkMode = T('Mörkt läge', 'Dark mode');
  static const resetProgress = T('Nollställ framsteg', 'Reset progress');
  static const resetConfirm = T('Nollställa allt?', 'Reset everything?');
  static const resetBody = T('All statistik, alla kort och alla svar raderas.',
      'All stats, cards and answers will be erased.');
  static const cancel = T('Avbryt', 'Cancel');
  static const reset = T('Nollställ', 'Reset');
  static const about = T('Om appen', 'About');
  static const aboutBody = T(
      'Körkortskompis är ett studiehjälpmedel för teoriprovet för behörighet B. '
          'Innehållet bygger på trafikförordningen, vägmärkesförordningen, '
          'körkortslagen och Transportstyrelsens kursplan. Det är inte ett '
          'officiellt prov och ersätter inte trafikskolan.',
      'Körkortskompis is a study aid for the Swedish category B theory test. '
          'The content follows the traffic ordinance, the road sign ordinance, '
          'the driving licence act and the Transport Agency syllabus. It is not '
          'an official test and does not replace driving school.');

  // ── Encouragement (rotated) ──────────────────────────────────────────────
  static const List<T> cheers = [
    T('Snyggt!', 'Nice one!'),
    T('Precis så!', 'Exactly!'),
    T('Du har koll!', 'You’ve got this!'),
    T('Bra jobbat!', 'Great work!'),
    T('Guld!', 'Gold!'),
    T('Rätt igen!', 'Right again!'),
    T('Så ska det se ut!', 'That’s the way!'),
    T('Stark!', 'Strong!'),
  ];

  static const List<T> nudges = [
    T('Ingen fara — nu vet du.', 'No worries — now you know.'),
    T('Den där lurar många.', 'That one fools plenty of people.'),
    T('Läs förklaringen, så fastnar den.', 'Read the why and it will stick.'),
    T('Misstag nu, rätt på provet.', 'Miss it now, nail it on the test.'),
    T('Vi tar den igen senare.', 'We’ll come back to this one.'),
  ];

  static const List<T> homeGreetings = [
    T('Redo för en runda?', 'Ready for a round?'),
    T('Tio minuter räcker långt.', 'Ten minutes goes a long way.'),
    T('Lite varje dag vinner.', 'A little every day wins.'),
    T('Provet kommer — det gör du med.', 'The test is coming — so are you.'),
  ];
}
