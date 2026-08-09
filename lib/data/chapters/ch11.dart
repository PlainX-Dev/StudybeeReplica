import 'package:flutter/material.dart';

import '../../core/l10n.dart';
import '../../models/content.dart';

const ch11 = Chapter(
  id: 'ch11',
  number: 11,
  title: T('Omkörning och möte', 'Overtaking and meeting'),
  summary: T(
    'När du får köra om, när du absolut inte får, hur ett möte ska gå till och '
        'vad du gör när vägen inte räcker till två.',
    'When you may overtake, when you absolutely may not, how to meet oncoming traffic and '
        'what to do when the road is not wide enough for two.',
  ),
  icon: Icons.swap_horiz_rounded,
  colorIndex: 5,
  minutes: 12,
  sections: [
    Section(
      'ch11.1',
      T('Omkörning sker till vänster — med undantag',
          'Overtaking is done on the left — with exceptions'),
      [
        Para(T(
          'Huvudregeln är enkel: du kör om till vänster. Undantagen är få, och de är precis '
              'det provet frågar om.',
          'The main rule is simple: you overtake on the left. The exceptions are few, and they are exactly '
              'what the test asks about.',
        )),
        Head(T('Du får köra om till höger när…', 'You may overtake on the right when…')),
        Bullets([
          T('Fordonet framför har svängt av eller tydligt förbereder en vänstersväng.',
              'The vehicle ahead has turned off or is clearly preparing to turn left.'),
          T('Du kör i ett körfält där trafiken går långsammare i det vänstra — i tät köad trafik '
              'på flerfältsväg räknas det inte som omkörning.',
              'You are in a lane where the left lane moves more slowly — in dense multi-lane queues this '
                  'does not count as overtaking at all.'),
          T('Du kör på en enkelriktad gata med flera körfält.',
              'You are on a one-way street with several lanes.'),
          T('Du passerar en spårvagn som stannat, om det finns en refug (annars vänster).',
              'You pass a stopped tram where there is a refuge island (otherwise on the left).'),
        ]),
        Head(T('Innan du drar ut', 'Before you pull out')),
        Steps([
          T('Kontrollera att sikten räcker för hela omkörningen — inte bara till nästa krön.',
              'Check that visibility covers the whole overtake — not just as far as the next crest.'),
          T('Se efter att ingen redan kör om dig bakifrån.',
              'Check that nobody is already overtaking you from behind.'),
          T('Kolla spegel och blindfläck, ge tecken.',
              'Mirror, blind spot, indicate.'),
          T('Håll ett rejält sidoavstånd — minst 1,5 meter till cyklister och mopedister.',
              'Keep a generous side distance — at least 1.5 metres to cyclists and mopeds.'),
          T('Återgå först när du ser hela fordonet du körde om i innerbackspegeln.',
              'Only pull back in when you can see the whole vehicle you passed in your interior mirror.'),
        ]),
        Trap(T(
          'Den vanligaste omkörningsmissen är att sikten mäts fram till mötande bil — den ska mätas '
              'till där du är TILLBAKA i ditt körfält, med marginal.',
          'The most common overtaking mistake is measuring visibility to the oncoming car — it must be '
              'measured to the point where you are BACK in your lane, with margin.',
        )),
      ],
    ),
    Section(
      'ch11.2',
      T('Där omkörning är förbjuden', 'Where overtaking is prohibited'),
      [
        Bullets([
          T('Strax före och i en korsning (undantag: cirkulationsplats, och korsning där du kör på huvudled '
              'eller trafiken regleras av polis eller signal).',
              'Just before and in a junction (except roundabouts, and junctions where you are on a priority '
                  'road or traffic is directed by police or signals).'),
          T('Vid ett obevakat övergångsställe, en cykelpassage eller en cykelöverfart.',
              'At an unsignalled pedestrian crossing, cycle passage or cycle crossing.'),
          T('Där sikten är skymd: backkrön, kurva, vid vägarbeten.',
              'Where the view is blocked: crests, bends, roadworks.'),
          T('Där märket C27 "Förbud mot omkörning" gäller.',
              'Where sign C27 "no overtaking" applies.'),
          T('Över heldragen mittlinje eller spärrområde.',
              'Across a solid centre line or hatched area.'),
          T('I en plankorsning och strax före den.',
              'At and just before a level crossing.'),
          T('När den framförvarande stannat för att släppa fram gående — du får inte passera denne.',
              'When the vehicle ahead has stopped to let pedestrians cross — you may not pass it.'),
        ]),
        SignRow(['C27', 'C28'],
            caption: T('Förbud mot omkörning och slut på förbudet',
                'No overtaking and end of the ban')),
        Facts([
          (T('Omkörd förares skyldighet', 'Duty of the overtaken driver'),
              T('får inte öka farten — ska hålla åt höger och underlätta',
                  'must not speed up — keep right and make it easy')),
          (T('Omkörning av tung lastbil', 'Overtaking a heavy truck'),
              T('räkna med 15–20 sekunder och lång sträcka',
                  'expect 15–20 seconds and a long distance')),
        ]),
        Hook(T(
          'Fyra K:n där du aldrig kör om: Korsning, Krön, Kurva och Klart för gående '
              '(övergångsställe). Ser du något av dem — stanna kvar bakom.',
          'Four C’s where you never overtake: Crossroads, Crest, Curve and Crossing (pedestrian). See any of '
              'them — stay behind.',
        )),
      ],
    ),
    Section(
      'ch11.3',
      T('Möte', 'Meeting oncoming traffic'),
      [
        Para(T(
          'Vid möte ska du hålla så långt till höger som möjligt och sänka farten om vägen är smal, '
              'sikten dålig eller mötet sker vid ett hinder.',
          'When meeting, keep as far right as possible and reduce speed if the road is narrow, visibility '
              'poor, or the meeting happens at an obstacle.',
        )),
        Bullets([
          T('Finns ett hinder på din sida är det du som ska vänta.',
              'If the obstacle is on your side of the road, you are the one who waits.'),
          T('I brant lutning där det är svårt att mötas: den som kör nedför backar, eftersom det är '
              'lättast — men lokala skyltar kan säga annat.',
              'On a steep hill where meeting is difficult, the vehicle heading downhill reverses, since that '
                  'is easiest — but local signs may say otherwise.'),
          T('Vid möte i mörker: växla till halvljus i god tid, och titta mot högra vägkanten om du bländas.',
              'Meeting at night: dip your headlights in good time, and look towards the right-hand edge if dazzled.'),
          T('Möter du ett brett fordon eller en buss: sänk farten och håll extra långt åt höger.',
              'Meeting a wide vehicle or a bus: slow down and keep extra far to the right.'),
        ]),
        SignRow(['B6', 'B7'],
            caption: T('Väjningsplikt mot mötande / mötande har väjningsplikt',
                'Give way to oncoming / oncoming must give way')),
        Trap(T(
          'De två mötesskyltarna är varandras motsatser och blandas ihop hela tiden. '
              'Röd pil = din väg är röd = STOPP för dig, du väjer. Röd pil på den lilla sidan = '
              'den andra väjer.',
          'The two meeting signs are opposites and get confused constantly. Red arrow pointing your way '
              'means the red one is you — you give way. Where the small red arrow is the oncoming one, '
              'they give way.',
        )),
      ],
    ),
  ],
);
