import 'package:flutter/material.dart';

import '../../core/l10n.dart';
import '../../models/content.dart';

const ch16 = Chapter(
  id: 'ch16',
  number: 16,
  title: T('Människan bakom ratten', 'The human behind the wheel'),
  summary: T(
    'Alkohol, droger, mediciner, trötthet, stress, grupptryck, syn och de personliga '
        'förutsättningar provet frågar om.',
    'Alcohol, drugs, medicines, fatigue, stress, peer pressure, vision — the personal factors the '
        'test asks about.',
  ),
  icon: Icons.psychology_rounded,
  colorIndex: 0,
  minutes: 15,
  sections: [
    Section(
      'ch16.1',
      T('Alkohol', 'Alcohol'),
      [
        Facts([
          (T('Rattfylleri från', 'Drink-driving from'),
              T('0,2 promille i blodet (0,10 mg/l i utandningsluften)',
                  '0.2 ‰ in the blood (0.10 mg/l in breath)')),
          (T('Grovt rattfylleri från', 'Aggravated drink-driving from'),
              T('1,0 promille (0,50 mg/l)', '1.0 ‰ (0.50 mg/l)')),
          (T('Straff rattfylleri', 'Penalty, drink-driving'),
              T('böter eller fängelse i högst 6 månader', 'fines or up to 6 months in prison')),
          (T('Straff grovt rattfylleri', 'Penalty, aggravated'),
              T('fängelse i högst 2 år', 'up to 2 years in prison')),
          (T('Körkortet', 'The licence'),
              T('återkallas — normalt 12 månader, vid grovt minst 24',
                  'revoked — normally 12 months, at least 24 for aggravated')),
          (T('Kroppen förbränner', 'The body burns off'),
              T('ca 0,1 promille per timme — inget påskyndar det',
                  'about 0.1 ‰ per hour — nothing speeds it up')),
        ]),
        Bullets([
          T('Kaffe, dusch, mat och frisk luft gör dig piggare men inte nyktrare.',
              'Coffee, showers, food and fresh air make you feel more awake but not more sober.'),
          T('Alkohol försämrar först omdömet, sedan reaktionsförmågan, sist motoriken — '
              'och du märker det inte själv.',
              'Alcohol degrades judgement first, then reaction time, then motor skills — and you are the last '
                  'to notice.'),
          T('Alkohol ger falsk självsäkerhet: risktagandet ökar samtidigt som förmågan minskar.',
              'Alcohol brings false confidence: risk-taking rises exactly as ability falls.'),
          T('Efter en kväll med mycket alkohol kan du vara straffbar långt in på nästa dag.',
              'After a heavy evening you can still be over the limit far into the next day.'),
          T('Som handledare räknas du som förare — samma gräns gäller dig.',
              'As a supervisor you count as the driver — the same limit applies to you.'),
        ]),
        Hook(T(
          'Räkna baklänges: en normalstor person förbränner ungefär 0,1 promille i timmen. '
              'Ligger du på 1,0 promille vid midnatt är du laglig först runt kl. 08 — om du haft tur.',
          'Count backwards: an average person burns about 0.1 ‰ per hour. At 1.0 ‰ at midnight you are legal '
              'around 8 a.m. — if you are lucky.',
        )),
        Trap(T(
          'Frågan "vad gör att alkoholen försvinner snabbare?" har ett enda svar: tid. '
              'Allt annat i svarsalternativen är fel.',
          'The question "what makes alcohol leave your body faster?" has exactly one answer: time. '
              'Everything else in the options is wrong.',
        )),
      ],
    ),
    Section(
      'ch16.2',
      T('Droger och läkemedel', 'Drugs and medicines'),
      [
        Bullets([
          T('För narkotika gäller nolltolerans — varje mätbar mängd är drograttfylleri.',
              'For narcotics there is zero tolerance — any measurable amount is drug-driving.'),
          T('Cannabis kan påverka körförmågan i ett dygn eller mer efter att ruset avklingat.',
              'Cannabis can affect driving for a day or more after the high has faded.'),
          T('Läkemedel med varningstriangel på förpackningen påverkar körförmågan.',
              'Medicines marked with a warning triangle affect your ability to drive.'),
          T('Sömnmedel, starka smärtstillande, allergimedicin och lugnande är de vanligaste bovarna.',
              'Sleeping pills, strong painkillers, antihistamines and sedatives are the usual culprits.'),
          T('Kombinationen alkohol + läkemedel förstärker effekten kraftigt.',
              'Alcohol plus medication multiplies the effect dramatically.'),
          T('Att köra påverkad av läkemedel kan bedömas som rattfylleri.',
              'Driving under the influence of medication can be judged as drink-driving.'),
        ]),
      ],
    ),
    Section(
      'ch16.3',
      T('Trötthet', 'Fatigue'),
      [
        Para(T(
          'Trötthet är lika farlig som alkohol och betydligt vanligare. Att vara vaken i 18 timmar '
              'motsvarar ungefär 0,5 promille i påverkan på reaktionsförmågan.',
          'Fatigue is as dangerous as alcohol and far more common. Being awake for 18 hours affects your '
              'reactions roughly like 0.5 ‰ of alcohol.',
        )),
        Bullets([
          T('Varningstecken: gäspningar, tunga ögonlock, att du missar avfarter, att du inte minns '
              'de senaste kilometrarna, att du driver mot vägkanten.',
              'Warning signs: yawning, heavy eyelids, missing exits, not remembering the last few kilometres, '
                  'drifting towards the edge.'),
          T('Mikrosömn på 4 sekunder i 90 km/h betyder 100 meter helt utan förare.',
              'A four-second microsleep at 90 km/h means 100 metres with nobody driving.'),
          T('Det enda som hjälper är sömn. Stanna, sov 15–20 minuter, drick kaffe innan tuppluren '
              'så verkar det när du vaknar.',
              'Sleep is the only cure. Stop, nap for 15–20 minutes, drink coffee before the nap so it kicks '
                  'in as you wake.'),
          T('Kör inte mellan kl. 02 och 06 om du kan undvika det — där ligger dygnsrytmens botten.',
              'Avoid driving between 2 and 6 a.m. if you can — that is the bottom of the body clock.'),
          T('Ta paus varannan timme, även om du känner dig pigg.',
              'Take a break every two hours, even when you feel fine.'),
          T('Öppet fönster, kall luft och hög musik håller dig vaken i några minuter — inte längre.',
              'An open window, cold air and loud music keep you awake for minutes — no longer.'),
        ]),
        Hook(T(
          'Tre B för trötthet: Bensinmack, Bänk, Blunda. Stanna, luta stolen, 20 minuter. '
              'Allt annat är förhandling med något du inte kan förhandla med.',
          'Three steps for fatigue: pull in, recline, close your eyes for 20 minutes. Everything else is '
              'negotiating with something that does not negotiate.',
        )),
      ],
    ),
    Section(
      'ch16.4',
      T('Stress, känslor och grupptryck', 'Stress, emotions and peer pressure'),
      [
        Bullets([
          T('Stress smalnar av synfältet och gör att du missar det som händer i periferin.',
              'Stress narrows your field of view so you miss what happens at the edges.'),
          T('Ilska och sorg försämrar omdömet lika effektivt som alkohol.',
              'Anger and grief impair judgement about as effectively as alcohol.'),
          T('Passagerare i din ålder ökar statistiskt risken för unga förare — särskilt flera samtidigt.',
              'Passengers your own age statistically raise the risk for young drivers — especially several at once.'),
          T('Att bli tutad på eller pressad bakifrån är ingen anledning att köra fortare. '
              'Släpp förbi i stället.',
              'Being honked at or pressured from behind is no reason to speed up. Let them past instead.'),
          T('Mobiltelefon: det är förbjudet att hålla telefonen i handen under körning. '
              'Handsfree är tillåtet men stjäl ändå uppmärksamhet.',
              'Mobile phone: holding the phone in your hand while driving is prohibited. Hands-free is legal '
                  'but still steals attention.'),
          T('Att läsa ett meddelande i 5 sekunder i 90 km/h = 125 meter blind körning.',
              'Reading a message for 5 seconds at 90 km/h = 125 metres driven blind.'),
        ]),
        Facts([
          (T('Mobil i handen under körning', 'Phone in hand while driving'),
              T('förbjudet — böter', 'prohibited — fine')),
          (T('Unga förare 18–24 år', 'Young drivers 18–24'),
              T('kraftigt överrepresenterade i olycksstatistiken',
                  'heavily over-represented in crash statistics')),
          (T('Vanligaste orsaken till singelolyckor bland unga', 'Most common cause of single-vehicle crashes among the young'),
              T('för hög hastighet efter förmåga', 'speed beyond ability')),
        ]),
      ],
    ),
    Section(
      'ch16.5',
      T('Syn, hörsel och hälsa', 'Vision, hearing and health'),
      [
        Bullets([
          T('Synen står för omkring 90 procent av all information du använder när du kör.',
              'Vision provides around 90 percent of everything you use while driving.'),
          T('Skarpsynen är liten — bara några grader. Därför måste blicken hela tiden röra sig.',
              'Sharp vision covers only a few degrees. That is why your eyes must keep moving.'),
          T('Synfältet smalnar när farten ökar — i 100 km/h ser du en tunnel.',
              'Your field of view narrows as speed rises — at 100 km/h you see a tunnel.'),
          T('Mörkerseendet försämras med åldern och av rökning, och tar 20–30 minuter att anpassa.',
              'Night vision worsens with age and smoking, and takes 20–30 minutes to adapt.'),
          T('Har du villkor om glasögon i körkortet måste du använda dem — annars kan körkortet återkallas.',
              'If your licence carries a glasses condition you must wear them — otherwise the licence can be revoked.'),
          T('Sjukdomar som epilepsi, diabetes med allvarliga hypoglykemier, sömnapné och vissa '
              'hjärtsjukdomar ska anmälas.',
              'Conditions such as epilepsy, diabetes with severe hypoglycaemia, sleep apnoea and certain heart '
                  'conditions must be reported.'),
          T('Läkare är skyldiga att anmäla om en patient är medicinskt olämplig att köra.',
              'Doctors are obliged to report a patient who is medically unfit to drive.'),
        ]),
        Hook(T(
          'Blicken: långt fram, brett, och i rörelse. Fixerar du blicken på ett hinder styr du '
              'rakt in i det — titta dit du vill åka.',
          'Your gaze: far ahead, wide, and moving. Fix your eyes on an obstacle and you steer straight into '
              'it — look where you want to go.',
        )),
      ],
    ),
  ],
);
