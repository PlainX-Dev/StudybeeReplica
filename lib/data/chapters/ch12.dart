import 'package:flutter/material.dart';

import '../../core/l10n.dart';
import '../../models/content.dart';

const ch12 = Chapter(
  id: 'ch12',
  number: 12,
  title: T('Oskyddade trafikanter och samspel', 'Vulnerable road users and interaction'),
  summary: T(
    'Gående, cyklister, mopedister, barn, äldre, motorcyklister, tunga fordon och '
        'konsten att bli förstådd i trafiken.',
    'Pedestrians, cyclists, mopeds, children, the elderly, motorcyclists, heavy vehicles and '
        'the art of being understood in traffic.',
  ),
  icon: Icons.groups_rounded,
  colorIndex: 6,
  minutes: 14,
  sections: [
    Section(
      'ch12.1',
      T('Gående och övergångsställen', 'Pedestrians and crossings'),
      [
        Bullets([
          T('Vid ett obevakat övergångsställe har du väjningsplikt mot gående som gått ut på, '
              'eller står i begrepp att gå ut på, övergångsstället.',
              'At an unsignalled crossing you must give way to pedestrians who have stepped onto it, or are '
                  'about to step onto it.'),
          T('Du ska närma dig i sådan fart att du kan stanna — det räcker inte att kunna svänga undan.',
              'You must approach at a speed that lets you stop — being able to swerve is not enough.'),
          T('Kör aldrig om ett fordon som stannat vid ett övergångsställe.',
              'Never overtake a vehicle that has stopped at a crossing.'),
          T('Gående som redan gått ut på en körbana har alltid förtur framför fordon — även utanför '
              'övergångsställe är du skyldig att inte köra på någon.',
              'A pedestrian already on the carriageway always comes first — even away from a crossing you are '
                  'obliged not to run anyone over.'),
          T('Gående ska gå på gångbana; saknas den, i vägrenen eller på vänster sida mot trafiken.',
              'Pedestrians use the footway; without one, the verge or the left-hand side facing traffic.'),
        ]),
        Facts([
          (T('Väjningsplikt vid obevakat övergångsställe', 'Duty at an unsignalled crossing'),
              T('ja — mot gående på eller på väg ut', 'yes — to pedestrians on it or stepping on')),
          (T('Gående har väjningsplikt', 'Pedestrians must give way'),
              T('när de korsar utanför övergångsställe', 'when crossing away from a crossing')),
          (T('Stanna före övergångsställe', 'Stopping before a crossing'),
              T('förbjudet inom 10 meter före', 'prohibited within 10 metres before')),
        ]),
        Trap(T(
          'Väjningsplikten gäller "gående som står i begrepp att gå ut". Väntar någon vid kanten '
              'och tittar på dig — det räknas. Kör inte förbi bara för att foten inte satts ner än.',
          'The duty covers pedestrians "about to step out". Someone waiting at the edge looking at you '
              'counts. Do not drive past just because the foot has not landed yet.',
        )),
      ],
    ),
    Section(
      'ch12.2',
      T('Cyklister och mopedister', 'Cyclists and mopeds'),
      [
        Bullets([
          T('Håll minst 1,5 meter sidoavstånd vid omkörning av cyklist.',
              'Keep at least 1.5 metres of side clearance when passing a cyclist.'),
          T('Cyklar får köra två i bredd om det inte hindrar trafiken.',
              'Cyclists may ride two abreast if it does not obstruct traffic.'),
          T('Moped klass I (EU-moped, 45 km/h) körs på körbanan och får inte köras på cykelbana. '
              'Moped klass II (25 km/h) körs på cykelbana om sådan finns.',
              'Moped class I (EU moped, 45 km/h) rides on the carriageway and not on cycle paths. '
                  'Moped class II (25 km/h) uses the cycle path where one exists.'),
          T('Barn under 15 år måste använda cykelhjälm. Vuxna bör.',
              'Children under 15 must wear a cycle helmet. Adults should.'),
          T('Cyklister får korsa körbanan på cykelpassage — då har cyklisten väjningsplikt, '
              'men du måste anpassa farten.',
              'Cyclists may cross at a cycle passage — there the cyclist gives way, but you must adapt your speed.'),
          T('Vid cykelöverfart (skyltad, ofta med farthinder) har DU väjningsplikt mot cyklisten.',
              'At a cycle crossing (signed, usually with a hump) YOU give way to the cyclist.'),
          T('Titta alltid efter cyklister i högersvängen — de kommer rakt fram i din döda vinkel.',
              'Always look for cyclists when turning right — they come straight on through your blind spot.'),
        ]),
        SignRow(['B8', 'D4', 'D6'],
            caption: T('Cykelöverfart, cykelbana, gång- och cykelbana',
                'Cycle crossing, cycle path, shared foot and cycle path')),
        Hook(T(
          'CykelPASSAGE = cyklisten passar sig (väjer). CykelÖVERFART = du överlämnar företrädet. '
              'Ö som i "Överlämna".',
          'Cycle PASSAGE = the cyclist gives way. Cycle CROSSING (överfart) = you hand over priority. '
              'Ö as in "Over to you".',
        )),
      ],
    ),
    Section(
      'ch12.3',
      T('Barn, äldre och personer med funktionsnedsättning',
          'Children, the elderly and people with disabilities'),
      [
        Bullets([
          T('Barn under 12 år har ofta inte utvecklat förmågan att bedöma hastighet och avstånd, '
              'och de tittar sällan åt sidan.',
              'Children under 12 often cannot yet judge speed and distance, and rarely look sideways.'),
          T('Ett barn som ser dig kan ändå springa ut — de tror att bilen stannar direkt.',
              'A child who has seen you may still run out — they believe cars stop instantly.'),
          T('Vid skolskjuts som blinkar med varningsblinkers: sänk farten kraftigt och var beredd '
              'på barn framför och bakom bussen.',
              'At a school bus with hazard lights: slow right down and expect children in front of and behind it.'),
          T('Äldre trafikanter kan ha sämre syn, hörsel och rörlighet — ge dem tid, tuta inte.',
              'Older road users may see, hear and move less well — give them time, do not sound the horn.'),
          T('Personer med vit käpp eller ledarhund kan inte se dig. Stanna helt och vänta.',
              'People with a white cane or guide dog cannot see you. Stop completely and wait.'),
          T('Grundregeln kräver särskild hänsyn mot just dessa grupper.',
              'The ground rules demand particular care towards exactly these groups.'),
        ]),
        Trap(T(
          'En boll som rullar ut i gatan är en fråga på provet, och svaret är alltid detsamma: '
              'bakom bollen kommer ett barn. Bromsa, täck bromsen, förvänta dig det värsta.',
          'A ball rolling into the street is a test question, and the answer is always the same: a child '
              'follows the ball. Brake, cover the brake, expect the worst.',
        )),
      ],
    ),
    Section(
      'ch12.4',
      T('Motorcyklister och tunga fordon', 'Motorcyclists and heavy vehicles'),
      [
        Bullets([
          T('Motorcyklar är smala och svåra att bedöma avstånd till — de är oftast närmare och '
              'snabbare än de ser ut.',
              'Motorcycles are narrow and hard to judge — they are usually closer and faster than they look.'),
          T('Titta två gånger innan du svänger vänster; en MC försvinner lätt bakom A-stolpen.',
              'Look twice before turning left; a motorcycle hides easily behind the A-pillar.'),
          T('Tunga fordon har stora döda vinklar: framför hytten, direkt bakom, och längs hela '
              'högersidan.',
              'Heavy vehicles have huge blind spots: in front of the cab, directly behind, and along the '
                  'whole right-hand side.'),
          T('Ser du inte förarens ansikte i lastbilens spegel — då ser inte hen dig heller.',
              'If you cannot see the driver’s face in the truck’s mirror, they cannot see you either.'),
          T('En lastbil som ska svänga höger svänger först ut åt vänster. Kryp aldrig upp på '
              'insidan i högersvängen.',
              'A truck turning right first swings out to the left. Never creep up the inside on a right turn.'),
          T('Håll långt avstånd bakom tunga fordon — både för sikten och för stenskott och vattendimma.',
              'Keep a long distance behind heavy vehicles — for visibility and for stones and spray.'),
        ]),
        Facts([
          (T('Tung lastbils bromssträcka', 'A heavy truck’s braking distance'),
              T('betydligt längre än en personbils', 'considerably longer than a car’s')),
          (T('Tung lastbil, högsta hastighet på motorväg', 'Heavy truck, max speed on a motorway'),
              T.same('90 km/h')),
          (T('Tung lastbil med släp', 'Heavy truck with trailer'), T.same('80 km/h')),
          (T('Buss, högsta hastighet', 'Bus, maximum speed'),
              T('90 km/h (100 km/h om alla har bälte)', '90 km/h (100 km/h if everyone is belted)')),
        ]),
      ],
    ),
    Section(
      'ch12.5',
      T('Samspel: att bli förstådd', 'Interaction: being understood'),
      [
        Para(T(
          'Trafik fungerar bara om andra kan förutsäga vad du tänker göra. Kommunikation sker med '
              'placering, fart, tecken och blickkontakt — i den ordningen.',
          'Traffic works only when others can predict what you intend. You communicate with position, speed, '
              'signals and eye contact — in that order.',
        )),
        Bullets([
          T('Var tydlig och tidig. Tveksamhet är farligare än fel beslut.',
              'Be clear and early. Hesitation is more dangerous than a wrong decision.'),
          T('Vinka inte fram andra — du kan inte se hela situationen och du tar över deras ansvar.',
              'Do not wave people through — you cannot see the whole situation and you take on their responsibility.'),
          T('Ögonkontakt är en bekräftelse, inte ett avtal. Vänta tills fordonet faktiskt saktar in.',
              'Eye contact is an acknowledgement, not a contract. Wait until the vehicle actually slows.'),
          T('Anpassa dig efter den svagaste i situationen, inte efter den snabbaste.',
              'Adapt to the most vulnerable person in the situation, not the fastest.'),
        ]),
        Hook(T(
          'Provets favoritsvar när det gäller oskyddade trafikanter: sänk farten, öka avståndet, '
              'var beredd att stanna. Är ett alternativ formulerat så — det är nästan alltid rätt.',
          'The test’s favourite answer about vulnerable road users: slow down, increase the distance, be '
              'ready to stop. If an option is phrased like that — it is almost always right.',
        )),
      ],
    ),
  ],
);
