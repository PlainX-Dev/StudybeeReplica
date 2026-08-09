import 'package:flutter/material.dart';

import '../../core/l10n.dart';
import '../../models/content.dart';

const ch04 = Chapter(
  id: 'ch04',
  number: 4,
  title: T('Hastighet och stoppsträcka', 'Speed and stopping distance'),
  summary: T(
    'Bashastigheter, hastighetsanpassning, reaktions- och bromssträcka, och varför fart '
        'straffar sig kvadratiskt.',
    'Default limits, adapting your speed, reaction and braking distance, and why speed punishes '
        'you by the square.',
  ),
  icon: Icons.speed_rounded,
  colorIndex: 3,
  minutes: 15,
  sections: [
    Section(
      'ch04.1',
      T('Bashastigheter', 'Default speed limits'),
      [
        Para(T(
          'Utan skylt gäller bashastigheten. Den avgörs av om du är inom eller utanför '
              'tättbebyggt område — vilket i sin tur avgörs av skylten E5/E6, inte av hur många '
              'hus du ser.',
          'With no sign, the default limit applies. It depends on whether you are inside or outside a '
              'built-up area — which is decided by signs E5/E6, not by how many houses you can see.',
        )),
        Facts([
          (T('Inom tättbebyggt område', 'Inside a built-up area'), T.same('50 km/h')),
          (T('Utanför tättbebyggt område', 'Outside a built-up area'), T.same('70 km/h')),
          (T('Motorväg', 'Motorway'), T('skyltat, ofta 110–120 km/h', 'signed, usually 110–120 km/h')),
          (T('Gångfartsområde', 'Walking-speed zone'), T('gångfart, ca 7 km/h', 'walking pace, about 7 km/h')),
          (T('Bogsering', 'Towing'), T.same('30 km/h')),
          (T('Bil med släp (obromsat, lätt släp)', 'Car with unbraked light trailer'), T.same('80 km/h')),
          (T('Bil med bromsat släp', 'Car with braked trailer'), T.same('80 km/h')),
          (T('Husvagn/släp på motorväg', 'Caravan/trailer on a motorway'),
              T('högst 80 km/h', 'max 80 km/h')),
          (T('Terrängskoter på väg', 'Snowmobile on a road'), T.same('20 km/h')),
        ]),
        Hook(T(
          '50 inne, 70 ute, 80 med släp, 30 vid bogsering. Fyra tal: 5-7-8-3. '
              'Släpet gör dig aldrig snabbare än 80 — oavsett vad skylten säger.',
          '50 in town, 70 out of town, 80 with a trailer, 30 when towing a broken-down car. Four numbers: '
              '5-7-8-3. A trailer never lets you go faster than 80 — whatever the sign says.',
        )),
        Trap(T(
          'Skylten anger högsta tillåtna hastighet — inte rekommenderad. I regn, mörker eller kö '
              'kan lagligt vara alldeles för fort. Du ska alltid anpassa farten.',
          'The sign is the maximum permitted speed — not a recommendation. In rain, darkness or queues, '
              'legal can be far too fast. You must always adapt.',
        )),
      ],
    ),
    Section(
      'ch04.2',
      T('Hastighetsanpassning', 'Adapting your speed'),
      [
        Para(T(
          'Lagen säger att hastigheten alltid ska anpassas till vad trafiksäkerheten kräver. '
              'Det finns en lista på situationer där du uttryckligen ska ha låg fart.',
          'The law says speed must always be adapted to what traffic safety requires. There is an explicit '
              'list of situations where you must go slowly.',
        )),
        Bullets([
          T('Vid skymd sikt, i kurvor och över krön.', 'Where visibility is limited, in bends and over crests.'),
          T('Vid halt väglag, dimma, regn, snö eller bländande sol.',
              'On slippery roads, in fog, rain, snow or blinding sun.'),
          T('Vid möte med barn, äldre eller personer med funktionsnedsättning.',
              'When meeting children, the elderly or people with disabilities.'),
          T('Nära buss som stannat vid hållplats, och vid övergångsställen.',
              'Near a bus stopped at a stop, and at pedestrian crossings.'),
          T('I korsningar, vid vägarbeten och där vägen är smal.',
              'At junctions, roadworks and where the road narrows.'),
          T('Vid mörkerkörning — du ska kunna stanna inom den sträcka du ser.',
              'When driving in darkness — you must be able to stop within the distance you can see.'),
        ]),
        LawBox(
          T('Trafikförordningen 3 kap. 14 §', 'Traffic Ordinance ch. 3 § 14'),
          T(
            'Ett fordons hastighet skall anpassas till vad trafiksäkerheten kräver. Hänsyn skall tas '
                'till väg-, terräng-, väderleks- och siktförhållandena, fordonets skick och belastning '
                'samt trafikförhållandena i övrigt.',
            'The speed of a vehicle shall be adapted to what traffic safety requires, taking into account '
                'road, terrain, weather and visibility conditions, the condition and load of the vehicle and '
                'traffic conditions generally.',
          ),
        ),
      ],
    ),
    Section(
      'ch04.3',
      T('Reaktions-, broms- och stoppsträcka', 'Reaction, braking and stopping distance'),
      [
        Para(T(
          'Stoppsträckan är summan av två saker: sträckan du kör medan du reagerar, och sträckan '
              'bilen rullar medan den bromsar. Bara den andra växer med kvadraten på farten — '
              'och det är där olyckorna finns.',
          'Stopping distance is the sum of two things: how far you travel while you react, and how far the '
              'car rolls while braking. Only the second grows with the square of speed — and that is where '
              'the crashes live.',
        )),
        Facts([
          (T('Reaktionstid (normal)', 'Reaction time (normal)'), T('ca 1 sekund', 'about 1 second')),
          (T('Reaktionssträcka', 'Reaction distance'),
              T('(hastighet ÷ 10) × 3, vid 1 sekund', '(speed ÷ 10) × 3, at 1 second')),
          (T('Bromssträcka (torr asfalt)', 'Braking distance (dry asphalt)'),
              T('(hastighet ÷ 10)² × 0,4', '(speed ÷ 10)² × 0.4')),
          (T('Stoppsträcka', 'Stopping distance'),
              T('reaktionssträcka + bromssträcka', 'reaction + braking distance')),
          (T('Dubbel hastighet', 'Double the speed'),
              T('fyrdubbel bromssträcka', 'four times the braking distance')),
          (T('Halkigt väglag', 'Slippery road'),
              T('bromssträckan kan bli 2–10 gånger längre', 'braking distance 2–10 times longer')),
        ]),
        Head(T('Räkna själv: 90 km/h på torr asfalt', 'Work it out: 90 km/h on dry asphalt')),
        Steps([
          T('Reaktionssträcka: 90 ÷ 10 = 9, 9 × 3 = 27 meter.',
              'Reaction distance: 90 ÷ 10 = 9, 9 × 3 = 27 metres.'),
          T('Bromssträcka: 9² = 81, 81 × 0,4 = 32,4 meter.',
              'Braking distance: 9² = 81, 81 × 0.4 = 32.4 metres.'),
          T('Stoppsträcka: 27 + 32,4 ≈ 59 meter — längre än en fotbollsplans halva.',
              'Stopping distance: 27 + 32.4 ≈ 59 metres — longer than half a football pitch.'),
        ]),
        TableBlock(
          [
            T('Hastighet', 'Speed'),
            T('Reaktion', 'Reaction'),
            T('Broms', 'Braking'),
            T('Stopp', 'Stop')
          ],
          [
            [T.same('30 km/h'), T.same('9 m'), T.same('3,6 m'), T.same('≈ 13 m')],
            [T.same('50 km/h'), T.same('15 m'), T.same('10 m'), T.same('≈ 25 m')],
            [T.same('70 km/h'), T.same('21 m'), T.same('19,6 m'), T.same('≈ 41 m')],
            [T.same('90 km/h'), T.same('27 m'), T.same('32,4 m'), T.same('≈ 59 m')],
            [T.same('110 km/h'), T.same('33 m'), T.same('48,4 m'), T.same('≈ 81 m')],
          ],
        ),
        Hook(T(
          'Två formler, en gång för alla: reaktion = ta bort nollan, gånger tre. '
              'Broms = ta bort nollan, kvadrera, gånger 0,4. Öva på 50, 70 och 90 — de kommer på provet.',
          'Two formulas, once and for all: reaction = drop the zero, times three. Braking = drop the zero, '
              'square it, times 0.4. Practise 50, 70 and 90 — those are the ones the test asks.',
        )),
        Trap(T(
          'Reaktionssträckan blir längre av trötthet, alkohol, mobil och hög musik — men '
              'bromssträckan förändras inte av dem. Bromssträckan ändras av fart, väglag, däck och last.',
          'Reaction distance grows with fatigue, alcohol, phones and loud music — braking distance does not '
              'care about any of those. Braking distance changes with speed, grip, tyres and load.',
        )),
      ],
    ),
    Section(
      'ch04.4',
      T('Krockvåld — varför 30 är gränsen', 'Crash forces — why 30 is the line'),
      [
        Para(T(
          'Rörelseenergin växer med kvadraten på hastigheten. Kör du dubbelt så fort har du fyra '
              'gånger så mycket energi som måste ta vägen någonstans i en krock.',
          'Kinetic energy grows with the square of speed. Drive twice as fast and you carry four times the '
              'energy that has to go somewhere in a crash.',
        )),
        Facts([
          (T('Gående påkörd i 30 km/h', 'Pedestrian hit at 30 km/h'),
              T('ca 9 av 10 överlever', 'about 9 in 10 survive')),
          (T('Gående påkörd i 50 km/h', 'Pedestrian hit at 50 km/h'),
              T('ca 2 av 10 överlever', 'about 2 in 10 survive')),
          (T('Krock i 50 km/h', 'Crash at 50 km/h'),
              T('motsvarar fall från 4:e våningen', 'equals a fall from the 4th floor')),
          (T('Krock i 90 km/h', 'Crash at 90 km/h'),
              T('motsvarar fall från 10:e våningen', 'equals a fall from the 10th floor')),
          (T('Obältad passagerare i 50 km/h', 'Unbelted passenger at 50 km/h'),
              T('slungas med ca 3,5 tons kraft', 'is thrown with a force of about 3.5 tonnes')),
        ]),
        Hook(T(
          '30 räddar liv, 50 tar dem. Det är därför skolor, bostadsområden och övergångsställen '
              'får 30 — inte för att irritera dig.',
          '30 saves lives, 50 takes them. That is why schools, residential areas and crossings get 30 — '
              'not to annoy you.',
        )),
      ],
    ),
    Section(
      'ch04.5',
      T('Fortkörning och konsekvenser', 'Speeding and consequences'),
      [
        Bullets([
          T('Böterna börjar runt 2 000 kronor och stiger med överskridandet.',
              'Fines start around SEK 2 000 and rise with the excess.'),
          T('Körkortet kan återkallas redan vid 21 km/h för fort där gränsen är 30 km/h.',
              'The licence can be revoked at just 21 km/h over where the limit is 30 km/h.'),
          T('På vägar med 70 km/h eller högre går gränsen ofta vid 31 km/h över.',
              'On roads of 70 km/h and above the line is often 31 km/h over.'),
          T('Spärrtiden vid fortkörning är oftast 1–3 månader.',
              'The disqualification period for speeding is usually 1–3 months.'),
          T('Under prövotid betyder återkallelse att hela förarprovet måste göras om.',
              'During probation, revocation means retaking the entire test.'),
        ]),
        Trap(T(
          'Ju lägre hastighetsgräns, desto mindre marginal innan körkortet ryker. På en 30-väg '
              'räcker det med drygt 20 km/h för mycket.',
          'The lower the limit, the smaller your margin before the licence goes. On a 30 road, just over '
              '20 km/h too much is enough.',
        )),
      ],
    ),
  ],
);
