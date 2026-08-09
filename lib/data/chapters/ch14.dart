import 'package:flutter/material.dart';

import '../../core/l10n.dart';
import '../../models/content.dart';

const ch14 = Chapter(
  id: 'ch14',
  number: 14,
  title: T('Last, vikter och släpvagn', 'Loads, weights and trailers'),
  summary: T(
    'Tjänstevikt, totalvikt, maxlast, bärighetsklasser, lastsäkring och den släpvagnsmatte '
        'som avgör om du får köra ekipaget på B.',
    'Kerb weight, gross weight, payload, bearing classes, securing loads and the trailer arithmetic '
        'that decides whether you may drive the combination on a B licence.',
  ),
  icon: Icons.rv_hookup_rounded,
  colorIndex: 8,
  minutes: 15,
  sections: [
    Section(
      'ch14.1',
      T('Viktbegreppen', 'The weight terms'),
      [
        Para(T(
          'Fyra ord, och provet blandar dem med flit. Lär dig dem som en trappa: tjänstevikt → '
              'maxlast → totalvikt → bruttovikt.',
          'Four words, and the test mixes them on purpose. Learn them as a staircase: kerb weight → '
              'payload → gross weight → actual axle-borne weight.',
        )),
        Facts([
          (T('Tjänstevikt', 'Kerb weight (tjänstevikt)'),
              T('bilen med föraren (75 kg), full tank och verktyg',
                  'the car with driver (75 kg), a full tank and tools')),
          (T('Maxlast', 'Payload (maxlast)'),
              T('totalvikt minus tjänstevikt — passagerare räknas som last',
                  'gross weight minus kerb weight — passengers count as load')),
          (T('Totalvikt', 'Gross weight (totalvikt)'),
              T('den högsta vikt fordonet får väga fullastat',
                  'the maximum the vehicle may weigh when loaded')),
          (T('Bruttovikt', 'Actual weight (bruttovikt)'),
              T('vad fordonet faktiskt väger just nu', 'what the vehicle actually weighs right now')),
          (T('Axeltryck', 'Axle load'), T('vikten som bärs av en axel', 'the weight carried by one axle')),
        ]),
        Head(T('Räkna maxlast', 'Working out the payload')),
        Para(T(
          'Bilen har totalvikt 1 950 kg och tjänstevikt 1 400 kg. Maxlast = 1 950 − 1 400 = 550 kg. '
              'Fyra vuxna à 80 kg = 320 kg, alltså finns 230 kg kvar till bagage — men föraren '
              'räknas redan in i tjänstevikten.',
          'The car has a gross weight of 1 950 kg and a kerb weight of 1 400 kg. Payload = 1 950 − 1 400 = '
              '550 kg. Four adults at 80 kg = 320 kg, leaving 230 kg for luggage — but the driver is already '
              'counted in the kerb weight.',
        )),
        Hook(T(
          'Tjänstevikt = Tom bil (fast med förare i). Totalvikt = Taket. Maxlast = Mellanskillnaden. '
              'Bruttovikt = Bilens vikt just nu.',
          'Kerb = the car empty (but with a driver). Gross = the ceiling. Payload = the gap between them. '
              'Actual = what it weighs at this moment.',
        )),
        Trap(T(
          'Föraren ingår i tjänstevikten (75 kg). Passagerare gör det inte — de äter av maxlasten.',
          'The driver is included in the kerb weight (75 kg). Passengers are not — they eat into the payload.',
        )),
      ],
    ),
    Section(
      'ch14.2',
      T('Får du dra släpet på B?', 'May you tow that trailer on a B licence?'),
      [
        Para(T(
          'Två vägar leder till "ja". Klarar ekipaget någon av dem får du köra det med vanligt B.',
          'There are two routes to "yes". If the combination passes either of them, plain B is enough.',
        )),
        Steps([
          T('Väg 1: släpvagnens totalvikt är högst 750 kg. Då spelar bilens vikt ingen roll (så länge '
              'bilen själv är högst 3 500 kg).',
              'Route 1: the trailer’s gross weight is at most 750 kg. Then the car’s weight does not matter '
                  '(as long as the car itself is at most 3 500 kg).'),
          T('Väg 2: bilens och släpets sammanlagda totalvikt är högst 3 500 kg.',
              'Route 2: the combined gross weight of car and trailer is at most 3 500 kg.'),
        ]),
        Facts([
          (T('B', 'B'), T('ekipage högst 3 500 kg, eller släp högst 750 kg',
              'combination max 3 500 kg, or trailer max 750 kg')),
          (T('B96 (utökad B)', 'B96 (extended B)'),
              T('ekipage högst 4 250 kg', 'combination max 4 250 kg')),
          (T('BE', 'BE'),
              T('släp högst 3 500 kg; ekipage upp till 7 000 kg',
                  'trailer max 3 500 kg; combination up to 7 000 kg')),
          (T('Högsta hastighet med släp', 'Maximum speed with a trailer'), T.same('80 km/h')),
          (T('Obromsat släp', 'Unbraked trailer'),
              T('släpets totalvikt högst halva bilens tjänstevikt (och högst 750 kg)',
                  'trailer gross weight at most half the car’s kerb weight (and max 750 kg)')),
        ]),
        Head(T('Räkna ett exempel', 'Work an example')),
        Para(T(
          'Bil totalvikt 2 100 kg, släp totalvikt 1 200 kg. Släpet är över 750 kg, så väg 1 faller. '
              'Summan är 2 100 + 1 200 = 3 300 kg, alltså under 3 500 — väg 2 håller. Du får köra på B.',
          'Car gross 2 100 kg, trailer gross 1 200 kg. The trailer exceeds 750 kg, so route 1 fails. The sum '
              'is 2 100 + 1 200 = 3 300 kg, under 3 500 — route 2 holds. Plain B is enough.',
        )),
        Hook(T(
          'Fråga alltid två saker i den här ordningen: "Är släpet under 750?" Om nej: '
              '"Är summan under 3 500?" Två frågor, ett svar.',
          'Always ask two questions in this order: "Is the trailer under 750?" If no: "Is the sum under '
              '3 500?" Two questions, one answer.',
        )),
        Trap(T(
          'Det är TOTALVIKTERNA som räknas i behörighetsfrågan — inte vad släpet väger idag. '
              'Ett tomt släp med totalvikt 1 300 kg räknas som 1 300 kg.',
          'It is the GROSS weights that count for the licence question — not what the trailer weighs today. '
              'An empty trailer rated at 1 300 kg counts as 1 300 kg.',
        )),
      ],
    ),
    Section(
      'ch14.3',
      T('Lastning och lastsäkring', 'Loading and securing the load'),
      [
        Bullets([
          T('Lasten ska placeras så att den inte skymmer sikten, döljer ljus eller skyltar, '
              'eller ändrar fordonets köregenskaper farligt.',
              'A load must not block your view, hide lights or plates, or dangerously change how the car handles.'),
          T('Tung last placeras lågt och nära bakaxeln — högt placerad last gör bilen vältbenägen.',
              'Heavy items go low and close to the rear axle — a high load makes the car prone to rolling.'),
          T('Lasten ska säkras så att den håller vid en kraftig inbromsning. Använd spännband, '
              'lastnät eller stötta mot fast del.',
              'The load must be secured to survive hard braking. Use straps, a cargo net or bracing against '
                  'a fixed part.'),
          T('Löst i kupén: en väska på 20 kg blir ett projektil på ett halvt ton i en krock i 50 km/h.',
              'Loose in the cabin: a 20 kg bag becomes a half-tonne projectile in a 50 km/h crash.'),
          T('Taklast höjer tyngdpunkten och ökar bränsleförbrukningen — kör lugnare i kurvor och '
              'ta bort räcket när det inte används.',
              'A roof load raises the centre of gravity and increases fuel use — take bends gently and remove '
                  'the rack when unused.'),
        ]),
        Facts([
          (T('Last som skjuter ut framåt eller bakåt', 'Load projecting front or rear'),
              T('ska markeras om den skjuter ut mer än 1 meter',
                  'must be marked if it projects more than 1 metre')),
          (T('Markering i dagsljus', 'Marking in daylight'),
              T('flagga eller tygstycke, gult eller rött', 'a flag or cloth, yellow or red')),
          (T('Markering i mörker', 'Marking in darkness'),
              T('lykta och reflex — vit framåt, röd bakåt', 'lamp and reflector — white to the front, red to the rear')),
          (T('Största bredd', 'Maximum width'), T('260 cm inklusive last', '260 cm including load')),
          (T('Last åt sidan', 'Load to the side'),
              T('högst 20 cm utanför fordonet', 'no more than 20 cm outside the vehicle')),
        ]),
        Hook(T(
          'En meter fram eller bak → markera. Tjugo centimeter åt sidan → gränsen. '
              '1 meter, 20 cm, 260 cm bred. Tre tal.',
          'One metre front or back → mark it. Twenty centimetres to the side → the limit. '
              '1 m, 20 cm, 260 cm wide. Three numbers.',
        )),
      ],
    ),
    Section(
      'ch14.4',
      T('Bärighetsklasser och vägens tålighet', 'Bearing classes and what the road can take'),
      [
        Para(T(
          'Alla vägar tål inte all vikt. Vägnätet är indelat i bärighetsklasser, och en skylt '
              'med BK anger om vägen avviker från standard.',
          'Not every road can take every weight. The network is divided into bearing classes, and a BK sign '
              'shows where a road deviates from the standard.',
        )),
        Facts([
          (T('BK1', 'BK1'), T('högsta bruttovikt 64 ton — gäller de flesta allmänna vägar',
              'max gross weight 64 tonnes — most public roads')),
          (T('BK2', 'BK2'), T('högsta bruttovikt 51,4 ton', 'max gross weight 51.4 tonnes')),
          (T('BK3', 'BK3'), T('högsta bruttovikt 37,5 ton', 'max gross weight 37.5 tonnes')),
          (T('BK4', 'BK4'), T('högsta bruttovikt 74 ton, på utpekade vägar',
              'max gross weight 74 tonnes, on designated roads')),
        ]),
        Para(T(
          'För en personbil på 2 ton spelar det här sällan roll — men provet vill att du känner '
              'igen begreppet och vet att en skylt om begränsad bruttovikt gäller fordonets faktiska vikt.',
          'For a 2-tonne car this rarely matters — but the test wants you to recognise the term and to know '
              'that a weight restriction sign refers to the vehicle’s actual weight.',
        )),
        SignRow(['C19', 'C21', 'C16'],
            caption: T('Begränsad bruttovikt, axeltryck och fordonsbredd',
                'Weight, axle load and width restrictions')),
      ],
    ),
    Section(
      'ch14.5',
      T('Bogsering', 'Towing a broken-down vehicle'),
      [
        Facts([
          (T('Högsta hastighet vid bogsering', 'Maximum speed when towing'), T.same('30 km/h')),
          (T('Största avstånd mellan fordonen', 'Maximum gap between vehicles'), T.same('5 m')),
          (T('Bogsering på motorväg', 'Towing on a motorway'),
              T('endast till närmaste avfart', 'only to the nearest exit')),
          (T('Varningsblinkers', 'Hazard lights'),
              T('ska användas på det bogserade fordonet', 'must be used on the towed vehicle')),
        ]),
        Bullets([
          T('Bromsservo och servostyrning fungerar inte när motorn är av — pedalen blir hård och '
              'ratten tung.',
              'Brake servo and power steering stop working with the engine off — the pedal goes hard and the '
                  'wheel heavy.'),
          T('Bogserlinan ska vara tydligt markerad så andra ser den.',
              'The tow rope must be clearly marked so others see it.'),
          T('Föraren i det bogserade fordonet måste ha körkort för fordonet.',
              'The driver of the towed vehicle must hold a licence for that vehicle.'),
        ]),
        Hook(T(
          'Bogsering: 30 och 5. Trettio kilometer i timmen, fem meter emellan. '
              'Och kom ihåg att bromspedalen blir stenhård utan motor.',
          'Towing: 30 and 5. Thirty km/h, five metres apart. And remember the brake pedal turns to stone '
              'without the engine.',
        )),
      ],
    ),
  ],
);
