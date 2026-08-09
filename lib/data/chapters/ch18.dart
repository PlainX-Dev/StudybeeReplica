import 'package:flutter/material.dart';

import '../../core/l10n.dart';
import '../../models/content.dart';

const ch18 = Chapter(
  id: 'ch18',
  number: 18,
  title: T('Vägtyper: motorväg till plankorsning', 'Road types: motorway to level crossing'),
  summary: T(
    'Motorväg och motortrafikled, landsväg, tätort, tunnel, järnvägskorsning, färja och '
        'vägarbete — varje miljö har sina egna regler.',
    'Motorways and clearways, country roads, towns, tunnels, level crossings, ferries and roadworks — '
        'each environment has rules of its own.',
  ),
  icon: Icons.alt_route_rounded,
  colorIndex: 5,
  minutes: 15,
  sections: [
    Section(
      'ch18.1',
      T('Motorväg och motortrafikled', 'Motorway and clearway'),
      [
        Bullets([
          T('Motorväg har skilda körbanor för de två riktningarna. Motortrafikled kan ha mötande '
              'trafik men är i övrigt lika reglerad.',
              'A motorway has separated carriageways for the two directions. A clearway can have oncoming '
                  'traffic but is otherwise regulated the same way.'),
          T('Fordon som inte kan eller får köra minst 40 km/h är förbjudna.',
              'Vehicles that cannot or may not do at least 40 km/h are prohibited.'),
          T('Förbjudet: gående, cykel, moped, traktor, U-sväng, backning och att stanna annat än '
              'på parkeringsplats.',
              'Prohibited: pedestrians, bicycles, mopeds, tractors, U-turns, reversing, and stopping anywhere '
                  'but a lay-by.'),
          T('Påfart: anpassa farten på accelerationsfältet så att du kan smälta in — du har '
              'väjningsplikt mot trafiken på motorvägen.',
              'Joining: match your speed on the acceleration lane so you can merge — you give way to traffic '
                  'already on the motorway.'),
          T('Avfart: bromsa på retardationsfältet, inte på genomfartskörfältet.',
              'Leaving: brake in the deceleration lane, not in the through lane.'),
          T('Kör om till vänster och återgå till höger körfält när det är lämpligt.',
              'Overtake on the left and return to the right-hand lane when appropriate.'),
          T('Får du stopp: kör ut på vägrenen, tänd varningsblinkers, ta på varselväst, sätt ut '
              'varningstriangel och gå bakom vägräcket.',
              'If you break down: pull onto the hard shoulder, hazard lights on, hi-vis vest on, put out the '
                  'warning triangle and get behind the barrier.'),
        ]),
        SignRow(['E1', 'E2', 'E3', 'E4'],
            caption: T('Motorväg och motortrafikled, början och slut',
                'Motorway and clearway, start and end')),
        Facts([
          (T('Lägsta konstruktiva hastighet', 'Minimum design speed'), T.same('40 km/h')),
          (T('Bil med släp', 'Car with trailer'), T('högst 80 km/h', 'max 80 km/h')),
          (T('Backning och U-sväng', 'Reversing and U-turns'), T('förbjudet', 'prohibited')),
          (T('Stanna på vägrenen', 'Stopping on the hard shoulder'),
              T('endast vid nödsituation', 'emergency only')),
        ]),
        Trap(T(
          'Missar du avfarten: kör vidare till nästa. Att backa eller stanna på motorvägen är '
              'både förbjudet och livsfarligt.',
          'If you miss your exit: carry on to the next one. Reversing or stopping on a motorway is both '
              'prohibited and lethal.',
        )),
      ],
    ),
    Section(
      'ch18.2',
      T('Landsväg', 'Country roads'),
      [
        Bullets([
          T('De flesta dödsolyckorna sker på landsväg — hög fart möter oskyddade sidoområden.',
              'Most fatal crashes happen on country roads — high speed meets unforgiving roadsides.'),
          T('Mötesfri väg (2+1) har mitträcke; kör om bara där två körfält finns och planera i god tid.',
              'A 2+1 road has a central barrier; overtake only where two lanes exist and plan well ahead.'),
          T('Vägrenen är till för att stanna på och för gående och cyklister — inte för att köra i.',
              'The hard shoulder is for stopping and for pedestrians and cyclists — not for driving.'),
          T('Räkna med långsamma fordon: traktorer, skördetröskor och timmerbilar.',
              'Expect slow vehicles: tractors, combines and timber lorries.'),
          T('Grusväg: mer damm, sämre grepp, lösa stenar. Sänk farten vid möte.',
              'Gravel road: more dust, less grip, loose stones. Slow down when meeting.'),
        ]),
      ],
    ),
    Section(
      'ch18.3',
      T('Tätort och bostadsområden', 'Towns and residential areas'),
      [
        Facts([
          (T('Gångfartsområde', 'Walking-speed zone (gångfartsområde)'),
              T('gångfart, parkering endast på markerad plats, väjningsplikt vid utfart',
                  'walking pace, parking only in marked bays, give way when leaving')),
          (T('Gågata', 'Pedestrian street (gågata)'),
              T('endast varutransport och behörig trafik, gångfart',
                  'goods deliveries and authorised traffic only, walking pace')),
          (T('Cykelgata', 'Bicycle street (cykelgata)'),
              T('högst 30 km/h, cyklister prioriteras', 'max 30 km/h, cyclists take precedence')),
          (T('Bussgata', 'Bus street'),
              T('endast buss, taxi där det anges, och utryckning',
                  'buses only, taxis where indicated, and emergency vehicles')),
        ]),
        Bullets([
          T('I gångfartsområde har fordon väjningsplikt mot gående, som får använda hela ytan.',
              'In a walking-speed zone vehicles give way to pedestrians, who may use the whole surface.'),
          T('Vid utfart från gångfartsområde, gågata eller cykelgata har du väjningsplikt mot alla.',
              'Leaving a walking-speed zone, pedestrian street or bicycle street you give way to everyone.'),
          T('Parkerade bilar döljer barn, cyklister och öppnande dörrar — håll extra avstånd i sidled.',
              'Parked cars hide children, cyclists and opening doors — keep extra sideways clearance.'),
        ]),
        SignRow(['E9', 'E7', 'E5', 'E6'],
            caption: T('Gångfartsområde, gågata, tättbebyggt område',
                'Walking-speed zone, pedestrian street, built-up area')),
      ],
    ),
    Section(
      'ch18.4',
      T('Plankorsning (järnvägskorsning)', 'Level crossings'),
      [
        Steps([
          T('Sänk farten i god tid och lyssna — stäng av musiken, öppna fönstret om sikten är dålig.',
              'Slow down in good time and listen — turn off the music, open the window if visibility is poor.'),
          T('Titta åt båda hållen även om bommarna är uppe och ljuset är släckt.',
              'Look both ways even if the barriers are up and the lights are off.'),
          T('Kör aldrig in i korsningen om du inte säkert kan köra ut på andra sidan.',
              'Never enter unless you can certainly clear the far side.'),
          T('Stanna aldrig på spåren, och lägg inte i en växel du kan tappa.',
              'Never stop on the tracks, and do not risk stalling.'),
          T('Fastnar du på spåret: lämna bilen omedelbart med alla passagerare, gå mot tåget '
              'vid sidan av spåret och larma på skylten vid korsningen eller 112.',
              'If you get stuck: leave the car at once with everyone aboard, walk towards the oncoming train '
                  'alongside the track, and call the number on the crossing sign or 112.'),
        ]),
        Facts([
          (T('Stanna eller parkera vid plankorsning', 'Stopping or parking at a level crossing'),
              T('förbjudet inom 30 meter', 'prohibited within 30 metres')),
          (T('Ett tåg i 100 km/h', 'A train at 100 km/h'),
              T('behöver ca 1 000 meter för att stanna', 'needs about 1 000 metres to stop')),
          (T('Rött blinkande ljus', 'Flashing red light'),
              T('stanna — tåg är på väg', 'stop — a train is coming')),
        ]),
        SignRow(['A35', 'A36', 'A39'],
            caption: T('Varning för järnvägskorsning och kryssmärke',
                'Level crossing warnings and the St Andrew’s cross')),
      ],
    ),
    Section(
      'ch18.5',
      T('Tunnel, färja och vägarbete', 'Tunnels, ferries and roadworks'),
      [
        Bullets([
          T('I tunnel: tänd halvljus, ta av solglasögonen, håll avstånd och lyssna på radion.',
              'In a tunnel: dipped beam on, sunglasses off, keep your distance and listen to the radio.'),
          T('Vid stopp i tunnel: stäng av motorn, lämna nyckeln i, och gå till närmaste nödutgång.',
              'If stopped in a tunnel: switch off the engine, leave the key in it, and walk to the nearest exit.'),
          T('Vid brand i tunnel: kör ut om du kan, annars lämna bilen och gå bort från röken.',
              'In a tunnel fire: drive out if you can, otherwise abandon the car and move away from the smoke.'),
          T('På färja: följ personalens anvisningar, dra åt parkeringsbromsen, lägg i en växel och '
              'stäng av motorn.',
              'On a ferry: follow the crew’s instructions, apply the parking brake, engage a gear and switch off.'),
          T('Vid vägarbete: sänk farten till skyltad hastighet — böterna är ofta förhöjda och '
              'vägarbetare står oskyddade.',
              'At roadworks: drop to the posted limit — fines are often higher and workers stand unprotected.'),
          T('Flaggvakt och trafikljus vid vägarbete gäller före ordinarie vägmärken.',
              'A flagman or temporary lights at roadworks override the ordinary signs.'),
        ]),
        SignRow(['A20', 'X-markeringsskärm'],
            caption: T('Varning för vägarbete och markeringsskärm',
                'Roadworks warning and barrier board')),
      ],
    ),
  ],
);
