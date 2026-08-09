import 'package:flutter/material.dart';

import '../../core/l10n.dart';
import '../../models/content.dart';

const ch03 = Chapter(
  id: 'ch03',
  number: 3,
  title: T('Väjningsregler och korsningar', 'Right of way and junctions'),
  summary: T(
    'Högerregeln, väjningsplikt, stopplikt, huvudled, utfartsregeln och cirkulationsplatser.',
    'The right-hand rule, give way, stop, priority roads, the exit rule and roundabouts.',
  ),
  icon: Icons.merge_type_rounded,
  colorIndex: 2,
  minutes: 16,
  sections: [
    Section(
      'ch03.1',
      T('Vad väjningsplikt faktiskt betyder', 'What giving way actually means'),
      [
        Para(T(
          'Väjningsplikt betyder att du i god tid ska visa att du tänker väja — genom att sänka '
              'farten eller stanna — och att du bara får köra vidare om det kan ske utan fara eller hinder.',
          'A duty to give way means you must show in good time that you intend to yield — by slowing or '
              'stopping — and may only continue if it can be done without danger or obstruction.',
        )),
        Bullets([
          T('Väjningsplikt = du får köra utan att stanna om vägen är fri.',
              'Give way = you may proceed without stopping if the road is clear.'),
          T('Stopplikt = du MÅSTE stanna helt, varje gång, även på en tom väg klockan tre på natten.',
              'Stop = you MUST come to a complete standstill every single time, even on an empty road at 3 a.m.'),
          T('Du ska stanna vid stopplinjen. Finns ingen linje: strax före korsningen, där du ser bäst.',
              'Stop at the stop line. If there is no line: just before the junction, where you can see best.'),
          T('Den som har väjningsplikt mot dig har inte "företräde att bli släppt fram" — du får '
              'inte heller vinka fram folk och skapa förvirring.',
              'Someone with a duty to give way to you does not gain priority by you waving them on — '
                  'waving people through creates confusion and shifts blame.'),
        ]),
        SignRow(['B1', 'B2'],
            caption: T('Väjningsplikt och stopplikt', 'Give way and stop')),
        Trap(T(
          'Stopplikt gäller även om du ser hela korsningen och den är tom. Hjulen måste stå still. '
              'Rullar du i 3 km/h är det en överträdelse som kan ge körkortsingripande.',
          'A stop sign applies even if you can see the whole junction and it is empty. The wheels must be '
              'still. Rolling through at 3 km/h is an offence that can cost you the licence.',
        )),
      ],
    ),
    Section(
      'ch03.2',
      T('Högerregeln', 'The right-hand rule'),
      [
        Para(T(
          'Grundregeln i varje korsning där inget annat sägs: du har väjningsplikt mot fordon '
              'som kommer från höger. Den gäller alltid — tills en skylt, en signal eller en '
              'polis säger något annat.',
          'The default in every junction where nothing else is said: you give way to vehicles coming from '
              'your right. It always applies — until a sign, a signal or a police officer says otherwise.',
        )),
        Facts([
          (T('Gäller när', 'Applies when'),
              T('inga skyltar, signaler eller markeringar reglerar korsningen',
                  'no signs, signals or markings govern the junction')),
          (T('Gäller inte när', 'Does not apply when'),
              T('du kör på huvudled, har väjnings-/stopplikt, eller kommer från en utfart',
                  'you are on a priority road, have a give-way/stop sign, or are leaving a driveway')),
          (T('Typisk plats', 'Typical place'),
              T('villagator, industriområden, parkeringsytor',
                  'residential streets, industrial areas, car parks')),
        ]),
        Hook(T(
          'Kom ihåg den som "höger hand vinner". Sitter du i bilen och sträcker ut höger hand — '
              'den som är på din handsida får åka först.',
          'Remember it as "the right hand wins". Stick your right hand out of the car — whoever is on '
              'your hand side goes first.',
        )),
        Trap(T(
          'Högerregeln gäller även för cyklister och mopedister som kommer från höger. '
              'Och den gäller i korsningar med gångfartsområde först när du kommit ut — '
              'på väg ut från ett gångfartsområde har du väjningsplikt mot alla.',
          'The right-hand rule applies to cyclists and mopeds from the right too. But leaving a '
              'walking-speed zone you give way to everyone — the right-hand rule never rescues you there.',
        )),
      ],
    ),
    Section(
      'ch03.3',
      T('Huvudled', 'Priority road'),
      [
        Para(T(
          'Huvudled är en väg där alla korsande vägar har väjningsplikt mot dig. Skylten är en '
              'gul romb med vit kant. Den upprepas efter varje korsning.',
          'A priority road is one where every crossing road must give way to you. The sign is a yellow '
              'diamond with a white border, repeated after each junction.',
        )),
        SignRow(['B4', 'B5', 'B6'],
            caption: T('Huvudled, huvudled upphör, väjningsplikt mot mötande',
                'Priority road, end of priority, give way to oncoming')),
        Bullets([
          T('På huvudled gäller inte högerregeln.', 'On a priority road the right-hand rule does not apply.'),
          T('Huvudled upphör-märket (överkryssad romb) betyder att högerregeln gäller igen '
              'i nästa korsning.',
              'The "end of priority road" sign (crossed-out diamond) means the right-hand rule applies again '
                  'at the next junction.'),
          T('Det är förbjudet att parkera på huvudled utanför tättbebyggt område.',
              'Parking on a priority road outside built-up areas is prohibited.'),
          T('Svänger du av från huvudled har du fortfarande väjningsplikt mot gående på ett '
              'övergångsställe du korsar.',
              'Turning off a priority road you still give way to pedestrians on a crossing you turn across.'),
        ]),
        Trap(T(
          'Huvudled ger dig företräde mot korsande fordon — men aldrig mot gående på övergångsställe, '
              'aldrig mot utryckningsfordon och aldrig mot buss som lämnar hållplats på 50-väg eller lägre.',
          'A priority road gives you priority over crossing vehicles — never over pedestrians on a crossing, '
              'never over emergency vehicles, and never over a bus pulling out from a stop on a road with '
              'a limit of 50 or less.',
        )),
      ],
    ),
    Section(
      'ch03.4',
      T('Utfartsregeln — den strängaste regeln', 'The exit rule — the strictest of them all'),
      [
        Para(T(
          'När du kommer ut på en väg från något som inte är en väg har du väjningsplikt mot allt '
              'och alla. Detta är den regel som flest missar på provet.',
          'When you come onto a road from something that is not a road, you give way to everything and '
              'everyone. This is the rule most people miss on the test.',
        )),
        Bullets([
          T('Från fastighet, tomt, parkeringsplats, bensinstation eller liknande.',
              'From a property, a plot, a car park, a petrol station or similar.'),
          T('Från gångfartsområde, gågata eller cykelgata.',
              'From a walking-speed zone, a pedestrian street or a bicycle street.'),
          T('Från terräng (åker, skogsväg, gräsmatta).', 'From off-road terrain (field, forest track, lawn).'),
          T('Efter att ha korsat en cykelbana eller gångbana på väg ut.',
              'And you give way when crossing a cycle path or footway on your way out.'),
          T('Vid vägens slut när du kör in på en annan väg via en vägren eller liknande.',
              'When joining another road from a hard shoulder or similar.'),
        ]),
        Facts([
          (T('Utfart ur parkeringsplats', 'Leaving a car park'), T('väjningsplikt mot alla', 'give way to all')),
          (T('Utfart ur gångfartsområde', 'Leaving a walking-speed zone'),
              T('väjningsplikt mot alla', 'give way to all')),
          (T('Från cykelbana ut på körbana', 'From cycle path onto carriageway'),
              T('väjningsplikt mot alla', 'give way to all')),
        ]),
        Hook(T(
          'Regel: "kommer du från något som inte är en riktig väg — väj för allt." '
              'Tomt, torg, tank (bensin), terräng, trottoar. Fem T:n, ett svar: du väjer.',
          'Rule of thumb: "coming from something that is not a proper road — yield to everything." '
              'Yard, car park, petrol pump, field, footpath. Different places, one answer: you give way.',
        )),
      ],
    ),
    Section(
      'ch03.5',
      T('Cirkulationsplats (rondell)', 'Roundabouts'),
      [
        Para(T(
          'En cirkulationsplats är en korsning med envägstrafik runt en rondell. Nästan alltid är '
              'infarterna skyltade med väjningsplikt — men det är skylten, inte rondellen i sig, '
              'som ger väjningsplikten.',
          'A roundabout is a junction with one-way traffic around a central island. The entries are almost '
              'always signed with give way — but it is the sign, not the roundabout itself, that creates '
              'the duty.',
        )),
        SignRow(['D3', 'B1'],
            caption: T('Cirkulationsplats + väjningsplikt', 'Roundabout + give way')),
        Steps([
          T('Sänk farten i god tid och läs skyltarna om vilken avfart du ska ta.',
              'Slow down in good time and read the signs for your exit.'),
          T('Placera dig: ska du första avfarten eller rakt fram — höger körfält. Ska du sista '
              'avfarten eller vänster — vänster körfält (om det finns flera).',
              'Position: first exit or straight on — right lane. Last exit or left — left lane (where there '
                  'is more than one).'),
          T('Väj mot fordon som redan är i cirkulationen.',
              'Give way to vehicles already in the roundabout.'),
          T('Blinka inte vid infart (om du inte ska direkt höger ut).',
              'Do not indicate on entry (unless you take the first exit right).'),
          T('Blinka höger när du passerat avfarten före din.',
              'Indicate right once you have passed the exit before yours.'),
          T('Väj mot gående på övergångsstället vid utfarten.',
              'Give way to pedestrians on the crossing at the exit.'),
        ]),
        Trap(T(
          'Ligger du i vänster körfält och ska ut har du väjningsplikt mot den som ligger i höger '
              'körfält bredvid dig — du gör i praktiken ett körfältsbyte.',
          'If you are in the left lane and want to exit, you must give way to the car in the right lane '
              'beside you — you are in effect changing lanes.',
        )),
      ],
    ),
    Section(
      'ch03.6',
      T('Sväng i korsning och gående', 'Turning at junctions and pedestrians'),
      [
        Bullets([
          T('Svänger du i en korsning har du väjningsplikt mot gående på det övergångsställe '
              'du korsar — oavsett om det är bevakat eller obevakat.',
              'When you turn at a junction you give way to pedestrians on the crossing you turn across — '
                  'signalled or not.'),
          T('Vid grön pil eller grön gubbe för de gående: de har rätt, du väjer.',
              'With a green arrow for you and a green man for them: they have the right, you yield.'),
          T('Svänger du vänster har du väjningsplikt mot mötande som kör rakt fram eller svänger höger.',
              'Turning left you give way to oncoming traffic going straight on or turning right.'),
          T('Korsar du en cykelbana i samband med svängen: väjningsplikt mot cyklister.',
              'Crossing a cycle path as part of the turn: give way to cyclists.'),
          T('Kör aldrig in i en korsning du inte kan lämna — blockerar du korsningen är det en '
              'förseelse i sig.',
              'Never enter a junction you cannot clear — blocking a junction is an offence in itself.'),
        ]),
        Facts([
          (T('Obevakat övergångsställe', 'Unsignalled pedestrian crossing'),
              T('väjningsplikt mot gående som gått ut eller står i begrepp att gå ut',
                  'give way to pedestrians on it or about to step onto it')),
          (T('Bevakat övergångsställe', 'Signalled crossing'),
              T('signalen styr, men väj alltid mot den som redan gått ut',
                  'the signal governs, but always yield to someone already crossing')),
          (T('Cykelöverfart', 'Cycle crossing (cykelöverfart)'),
              T('fordonsförare har väjningsplikt mot cyklande',
                  'drivers must give way to cyclists')),
          (T('Cykelpassage', 'Cycle passage (cykelpassage)'),
              T('cyklisten har väjningsplikt — men du ska anpassa farten',
                  'the cyclist gives way — but you must adapt your speed')),
        ]),
        Trap(T(
          'Cykelöverfart och cykelpassage ser nästan lika ut men har motsatta väjningsregler. '
              'Cykelöverfart är skyltad (märke B8) och har vanligtvis farthinder — där väjer DU.',
          'A cykelöverfart and a cykelpassage look almost identical but have opposite rules. The '
              'cykelöverfart is signposted (sign B8) and usually has a speed hump — there YOU give way.',
        )),
      ],
    ),
    Section(
      'ch03.7',
      T('Spårvagn, buss och utryckning', 'Trams, buses and emergency vehicles'),
      [
        Bullets([
          T('Spårvagn har företräde i korsningar — även mot dig på huvudled, om inget annat anges.',
              'A tram has priority at junctions — even over you on a priority road, unless stated otherwise.'),
          T('Inom tättbebyggt område på väg med högst 50 km/h har du väjningsplikt mot buss som '
              'blinkar ut från en hållplats.',
              'Inside a built-up area on a road with a limit of 50 or less you give way to a bus indicating '
                  'to pull out from a stop.'),
          T('Utryckningsfordon med blåljus och sirén: lämna fri väg. Kör åt sidan, stanna om det behövs, '
              'men blockera inte korsningen och kör inte mot rött för att flytta dig.',
              'Emergency vehicles with blue lights and siren: clear the way. Pull aside, stop if needed, but '
                  'do not block the junction and never run a red light to move out of the way.'),
          T('Kör aldrig om ett utryckningsfordon och följ det inte tätt.',
              'Never overtake an emergency vehicle and do not tailgate it.'),
        ]),
        Hook(T(
          'Ordningen när flera regler krockar: polisman → trafiksignal → vägmärke → vägmarkering → '
              'allmänna regler (t.ex. högerregeln). Den listan löser nästan varje "vem kör först"-fråga.',
          'When rules collide the order is: police officer → traffic signal → road sign → road marking → '
              'general rules (e.g. the right-hand rule). That list settles almost any "who goes first" question.',
        )),
      ],
    ),
  ],
);
