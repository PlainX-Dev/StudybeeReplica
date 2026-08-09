import 'package:flutter/material.dart';

import '../../core/l10n.dart';
import '../../models/content.dart';

const ch20 = Chapter(
  id: 'ch20',
  number: 20,
  title: T('Provdagen och pluggtekniken', 'Test day and how to study'),
  summary: T(
    'Hur provet är uppbyggt, hur du pluggar så det fastnar, och exakt vad du gör de '
        'sista 48 timmarna.',
    'How the test is built, how to study so it sticks, and exactly what to do in the last 48 hours.',
  ),
  icon: Icons.emoji_events_rounded,
  colorIndex: 4,
  minutes: 10,
  sections: [
    Section(
      'ch20.1',
      T('Så är provet byggt', 'How the test is built'),
      [
        Facts([
          (T('Antal frågor', 'Number of questions'),
              T('70 — varav 65 räknas', '70 — of which 65 count')),
          (T('Testfrågor', 'Trial questions'),
              T('5 stycken, de påverkar inte resultatet',
                  '5, and they do not affect your result')),
          (T('Tid', 'Time'), T('50 minuter', '50 minutes')),
          (T('Godkänt', 'Pass'), T('52 rätt av 65', '52 correct out of 65')),
          (T('Felmarginal', 'Margin for error'), T('13 fel', '13 wrong')),
          (T('Resultat', 'Result'), T('direkt efter provet', 'immediately after the test')),
          (T('Giltigt i', 'Valid for'), T('4 månader', '4 months')),
        ]),
        Head(T('Frågorna fördelas så här', 'The questions are distributed like this')),
        TableBlock(
          [T('Område', 'Area'), T('Antal frågor', 'Questions'), T('Kapitel här', 'Chapters here')],
          [
            [T('Trafikregler', 'Traffic rules'), T.same('32'), T.same('2, 3, 4, 5–11, 18')],
            [T('Trafiksäkerhet', 'Traffic safety'), T.same('16'), T.same('12, 17, 19')],
            [T('Fordonskännedom och manövrering', 'Vehicle knowledge and handling'),
                T.same('7'), T.same('13, 14')],
            [T('Miljö', 'Environment'), T.same('5'), T.same('15')],
            [T('Personliga förutsättningar', 'Personal prerequisites'), T.same('5'), T.same('1, 16')],
          ],
        ),
        Para(T(
          'Nästan halva provet är trafikregler. Är du osäker på var du ska lägga din tid — '
              'lägg den där. Provsimulatorn i appen drar frågor i exakt den här fördelningen.',
          'Almost half the test is traffic rules. If you are unsure where to spend your time — spend it '
              'there. The exam simulator in this app draws questions in exactly this distribution.',
        )),
      ],
    ),
    Section(
      'ch20.2',
      T('Pluggtekniker som faktiskt fungerar', 'Study techniques that actually work'),
      [
        Head(T('1. Aktiv återhämtning (retrieval practice)', '1. Active recall')),
        Para(T(
          'Att läsa om ett kapitel känns produktivt men ger svag inlärning. Att försöka minnas '
              'utan att titta ger dubbelt så stark effekt. Därför ska du alltid svara på frågor '
              'innan du läser om — även när du gissar.',
          'Re-reading a chapter feels productive but teaches you little. Trying to remember without looking '
              'is roughly twice as effective. So always answer questions before re-reading — even when you '
              'are guessing.',
        )),
        Head(T('2. Spridd repetition (spaced repetition)', '2. Spaced repetition')),
        Para(T(
          'Samma timme uppdelad på fem dagar slår fem timmar på en dag. Minneskorten i appen '
              'schemalägger varje kort automatiskt: kort du kan kommer tillbaka om en vecka, '
              'kort du missar kommer tillbaka imorgon.',
          'The same hour split across five days beats five hours in one. The flashcards in this app schedule '
              'themselves: cards you know come back in a week, cards you miss come back tomorrow.',
        )),
        Head(T('3. Blandad träning (interleaving)', '3. Interleaving')),
        Para(T(
          'Blanda kapitel i stället för att köra ett i taget. Det känns svårare — och det är '
              'precis därför det fungerar. Provet blandar också.',
          'Mix chapters instead of drilling one at a time. It feels harder — which is exactly why it works. '
              'The test mixes too.',
        )),
        Head(T('4. Förklara högt', '4. Explain out loud')),
        Para(T(
          'Kan du förklara varför ett svar är rätt för någon annan, kan du det. Kan du bara känna '
              'igen det rätta svaret, kan du det inte.',
          'If you can explain to somebody else why an answer is right, you know it. If you can only recognise '
              'the right answer, you do not.',
        )),
        Head(T('5. Sifferramsor och bilder', '5. Number chants and images')),
        Para(T(
          'Siffror fastnar som ramsor: 10-10-30-20-5-3 för parkering, 0,8-0,4-0,2-0,1 för friktion, '
              '24-5-16-5 för handledaren. Läs dem högt tills de låter som en refräng.',
          'Numbers stick as chants: 10-10-30-20-5-3 for parking, 0.8-0.4-0.2-0.1 for friction, 24-5-16-5 for '
              'the supervisor. Say them aloud until they sound like a chorus.',
        )),
        Hook(T(
          'Den enda pluggregel du behöver: testa dig själv först, läs sedan det du missade, '
              'och kom tillbaka till det imorgon. Appen gör alla tre åt dig om du bara öppnar den.',
          'The only study rule you need: test yourself first, then read what you missed, then come back to it '
              'tomorrow. The app does all three for you if you just open it.',
        )),
      ],
    ),
    Section(
      'ch20.3',
      T('Din plan för en månad', 'Your one-month plan'),
      [
        Steps([
          T('Vecka 1 — Läs kapitel 1–6 och kör kapitelquiz efter varje. Mål: 25 frågor om dagen.',
              'Week 1 — Read chapters 1–6 and take the chapter quiz after each. Target: 25 questions a day.'),
          T('Vecka 2 — Kapitel 7–13. Börja med minneskorten varje morgon, de tar fem minuter.',
              'Week 2 — Chapters 7–13. Start each morning with flashcards; they take five minutes.'),
          T('Vecka 3 — Kapitel 14–20 och första provsimuleringen. Räkna med att missa — det är poängen.',
              'Week 3 — Chapters 14–20 and your first full mock test. Expect to fail it — that is the point.'),
          T('Vecka 4 — Bara svaga punkter, vägmärken och provsimuleringar. Sikta på tre godkända '
              'simuleringar i rad innan provdagen.',
              'Week 4 — Only weak spots, road signs and mock tests. Aim for three passed mocks in a row before '
                  'test day.'),
          T('Sista 48 timmarna — inget nytt. Repetera siffror, vägmärken och dina flaggade frågor. Sov.',
              'Last 48 hours — nothing new. Revise numbers, signs and your flagged questions. Sleep.'),
        ]),
        Facts([
          (T('Rimligt dagligt mål', 'Reasonable daily target'), T('25–40 frågor', '25–40 questions')),
          (T('Före provet', 'Before the test'),
              T('minst 3 godkända provsimuleringar', 'at least 3 passed mock tests')),
          (T('Kvällen före', 'The night before'),
              T('sov 8 timmar — trötthet kostar fler poäng än en timmes plugg ger',
                  'sleep 8 hours — fatigue costs more marks than an hour of cramming gains')),
        ]),
      ],
    ),
    Section(
      'ch20.4',
      T('På provdagen', 'On test day'),
      [
        Bullets([
          T('Ta med giltig legitimation. Utan den får du inte skriva provet.',
              'Bring valid photo ID. Without it you cannot sit the test.'),
          T('Kom i god tid — provet startar på utsatt tid.',
              'Arrive early — the test starts at the appointed time.'),
          T('Läs frågan två gånger. Leta efter "inte", "alltid", "aldrig" och "minst".',
              'Read the question twice. Look for "not", "always", "never" and "at least".'),
          T('50 minuter på 70 frågor är ungefär 40 sekunder per fråga. Fastnar du — flagga och gå vidare.',
              '50 minutes for 70 questions is about 40 seconds each. Stuck? Flag it and move on.'),
          T('Ändra inte ett svar om du inte kommer på ett konkret skäl. Första magkänslan är oftast rätt.',
              'Do not change an answer without a concrete reason. The first instinct is usually right.'),
          T('Extrema alternativ ("alltid", "aldrig", "det spelar ingen roll") är oftast fel. '
              'Alternativ om hänsyn, lägre fart och större avstånd är oftast rätt.',
              'Extreme options ("always", "never", "it does not matter") are usually wrong. Options about '
                  'consideration, lower speed and greater distance are usually right.'),
          T('Du får gå tillbaka och ändra innan du lämnar in. Använd tiden som blir över.',
              'You may go back and change answers before submitting. Use any time left over.'),
        ]),
        Hook(T(
          'Om två alternativ känns rätt: välj det som skyddar den svagaste trafikanten. '
              'Om alla känns fel: välj det försiktigaste. Det är så provet är skrivet.',
          'If two options feel right: choose the one that protects the most vulnerable road user. If all feel '
              'wrong: choose the most cautious. That is how the test is written.',
        )),
      ],
    ),
  ],
);
