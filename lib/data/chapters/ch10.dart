import 'package:flutter/material.dart';

import '../../core/l10n.dart';
import '../../models/content.dart';

const ch10 = Chapter(
  id: 'ch10',
  number: 10,
  title: T('Stanna och parkera', 'Stopping and parking'),
  summary: T(
    'Skillnaden mellan att stanna och parkera, alla avståndsregler, P-skiva, datumparkering '
        'och var det aldrig är tillåtet.',
    'The difference between stopping and parking, every distance rule, parking discs, date parking '
        'and where it is never allowed.',
  ),
  icon: Icons.local_parking_rounded,
  colorIndex: 4,
  minutes: 14,
  sections: [
    Section(
      'ch10.1',
      T('Stanna eller parkera — inte samma sak', 'Stopping or parking — not the same thing'),
      [
        Para(T(
          'Hela kapitlet bygger på den här skillnaden, och provet testar den nästan alltid.',
          'The whole chapter rests on this distinction, and the test checks it almost every time.',
        )),
        Facts([
          (T('Stanna', 'Stopping'),
              T('stå still med fordonet, av annan anledning än trafiken kräver',
                  'to stand still for a reason other than what traffic requires')),
          (T('Parkera', 'Parking'),
              T('att stanna, med eller utan förare, av annan anledning än att låta någon '
                  'stiga i eller ur, eller att lasta av eller på gods',
                  'to stand still, driver present or not, for any reason other than letting people get '
                      'in or out, or loading and unloading goods')),
          (T('Alltid tillåtet', 'Always allowed'),
              T('att stanna för att undvika fara, eller för att trafiken kräver det',
                  'stopping to avoid danger, or because traffic requires it')),
        ]),
        Hook(T(
          'Att släppa av mormor = stanna. Att gå och handla = parkera. '
              'Där det står "förbud att parkera" får du alltså släppa av mormor.',
          'Dropping grandma off = stopping. Going shopping = parking. So where it says "no parking" you '
              'may still drop grandma off.',
        )),
        SignRow(['C35', 'C39'],
            caption: T('Förbud att parkera respektive stanna och parkera',
                'No parking, and no stopping or parking')),
      ],
    ),
    Section(
      'ch10.2',
      T('Där du varken får stanna eller parkera',
          'Where you may neither stop nor park'),
      [
        Para(T(
          'De här förbuden gäller stanna — och därmed automatiskt även parkera. Lär dig dem som '
              'en lista; de återkommer på nästan varje prov.',
          'These bans apply to stopping — and therefore automatically to parking too. Learn them as a list; '
              'they come back on nearly every test.',
        )),
        Bullets([
          T('På eller inom 10 meter före ett övergångsställe, en cykelpassage eller en cykelöverfart.',
              'On, or within 10 metres before, a pedestrian crossing, cycle passage or cycle crossing.'),
          T('I en korsning eller inom 10 meter från korsande körbanas närmaste ytterkant.',
              'In a junction or within 10 metres of the nearest edge of the crossing carriageway.'),
          T('På eller inom 30 meter från en plankorsning (järnvägskorsning).',
              'On, or within 30 metres of, a level crossing.'),
          T('I en vägport, tunnel eller på en bro där sikten är skymd, samt på ett backkrön eller i en kurva med skymd sikt.',
              'In an underpass, tunnel or on a bridge with obscured view, and on a crest or in a blind bend.'),
          T('På en cykelbana, gångbana, trottoar, i ett cykelfält eller på en refug.',
              'On a cycle path, footway, pavement, cycle lane or traffic island.'),
          T('I ett kollektivkörfält eller på en hållplats — vid hållplats gäller 20 meter före och 5 meter efter märket.',
              'In a bus lane or at a bus stop — at a stop that means 20 metres before and 5 metres after the sign.'),
          T('På en motorväg eller motortrafikled, annat än på parkeringsplats eller vid nödsituation.',
              'On a motorway or clearway, except in a lay-by or an emergency.'),
          T('Så att fordonet skymmer ett vägmärke eller en trafiksignal.',
              'So that the vehicle hides a road sign or a traffic signal.'),
          T('Bredvid ett annat fordon som står vid vägkanten (dubbelparkering).',
              'Alongside another vehicle parked at the kerb (double parking).'),
          T('På en spärrlinje, spärrområde eller närmare än 3 meter från en heldragen linje, '
              'om inte 3 meter blir kvar bredvid.',
              'On a solid line or hatched area, or so that less than 3 metres remains free beside a solid line.'),
        ]),
        Facts([
          (T('Före övergångsställe', 'Before a pedestrian crossing'), T.same('10 m')),
          (T('Före och i korsning', 'Before and in a junction'), T.same('10 m')),
          (T('Från plankorsning', 'From a level crossing'), T.same('30 m')),
          (T('Före hållplatsmärket', 'Before a bus-stop sign'), T.same('20 m')),
          (T('Efter hållplatsmärket', 'After a bus-stop sign'), T.same('5 m')),
          (T('Fri bredd vid heldragen linje', 'Free width beside a solid line'), T.same('3 m')),
        ]),
        Hook(T(
          'Sifferramsan: 10 – 10 – 30 – 20 – 5 – 3. Övergångsställe tio, korsning tio, '
              'järnväg trettio, hållplats tjugo före och fem efter, tre meter fri väg. '
              'Säg den som en ramsa tills den sitter.',
          'The number chant: 10 – 10 – 30 – 20 – 5 – 3. Crossing ten, junction ten, railway thirty, bus stop '
              'twenty before and five after, three metres free. Say it like a rhyme until it sticks.',
        )),
        Trap(T(
          'De 10 metrarna räknas FÖRE övergångsstället, inte efter. Efter ett övergångsställe får '
              'du stanna direkt — det är sikten fram mot de gående som skyddas.',
          'The 10 metres apply BEFORE the crossing, not after. Right after a crossing you may stop — what '
              'the rule protects is the view towards the pedestrians ahead.',
        )),
      ],
    ),
    Section(
      'ch10.3',
      T('Där du får stanna men inte parkera', 'Where you may stop but not park'),
      [
        Bullets([
          T('På en huvudled utanför tättbebyggt område.',
              'On a priority road outside a built-up area.'),
          T('Bredvid en heldragen linje om avståndet mellan fordonet och linjen är mindre än 3 meter.',
              'Beside a solid line if less than 3 metres remains between vehicle and line.'),
          T('På en utfartsväg eller så att du hindrar någon annans fordon.',
              'Across an exit or so that you block another vehicle.'),
          T('På en gata eller väg där det finns ett P-förbudsmärke (C35).',
              'On any street with a no-parking sign (C35).'),
          T('På en plats reserverad för visst ändamål — taxi, lastplats, rörelsehindrade, laddplats.',
              'In a space reserved for a purpose — taxi, loading, disabled, EV charging.'),
        ]),
        Facts([
          (T('Parkera på laddplats', 'Parking in an EV charging bay'),
              T('bara medan fordonet laddas', 'only while the vehicle is actually charging')),
          (T('Parkeringstillstånd för rörelsehindrade', 'Disabled parking permit'),
              T('krävs för P-plats med rullstolssymbol', 'required for the wheelchair-marked bay')),
          (T('Parkera framför utfart', 'Parking across a driveway'),
              T('förbjudet — du hindrar', 'prohibited — you obstruct')),
        ]),
      ],
    ),
    Section(
      'ch10.4',
      T('Hur du parkerar rätt', 'How to park correctly'),
      [
        Bullets([
          T('Parkera i vägens riktning, med högra hjulen mot kanten.',
              'Park in the direction of travel with your right wheels to the kerb.'),
          T('På enkelriktad gata får du parkera på båda sidor, om inget annat anges.',
              'On a one-way street you may park on both sides unless otherwise stated.'),
          T('Utanför tättbebyggt område ska du parkera utanför körbanan om det är möjligt.',
              'Outside built-up areas park off the carriageway where possible.'),
          T('Dra åt parkeringsbromsen. I backe: lägg i ettan uppför, backen nedför, och vrid '
              'hjulen mot kanten.',
              'Apply the parking brake. On a hill: first gear facing up, reverse facing down, and turn the '
                  'wheels towards the kerb.'),
          T('Lämna aldrig barn eller djur i en varm bil, och lämna aldrig nyckeln i tändningen '
              'med motorn igång.',
              'Never leave children or animals in a hot car, and never leave the key in the ignition with '
                  'the engine running.'),
        ]),
        Facts([
          (T('Max parkeringstid utan skylt', 'Max parking time without a sign'),
              T('24 timmar på vardagar (ej lör/sön/helgdag) inom tättbebyggt område',
                  '24 hours on weekdays (not Sat/Sun/holidays) inside built-up areas')),
          (T('P-skiva', 'Parking disc'),
              T('ställ in ankomsttiden, avrundat uppåt till närmaste halvtimme',
                  'set your arrival time, rounded up to the next half hour')),
          (T('Datumparkering', 'Date parking'),
              T('jämnt datum = parkera på den sida med jämna husnummer',
                  'even date = park on the side with even house numbers')),
        ]),
        Hook(T(
          'Datumparkering: JÄMNT datum → JÄMNA husnummer. Udda mot udda. Bytet sker vid midnatt, '
              'så en bil som står över natten står fel efter kl. 00.',
          'Date parking: EVEN date → EVEN house numbers. Odd with odd. The switch is at midnight, so a car '
              'left overnight is on the wrong side after 00:00.',
        )),
      ],
    ),
    Section(
      'ch10.5',
      T('Böter och avgifter', 'Fines and charges'),
      [
        Bullets([
          T('Felparkeringsavgift utfärdas av kommunen på gatumark — den betalas även om du överklagar.',
              'A parking charge is issued by the municipality on public streets — you pay it even while appealing.'),
          T('Kontrollavgift utfärdas av markägaren på tomtmark, till exempel köpcentrum.',
              'A control fee is issued by the landowner on private land, e.g. a shopping centre.'),
          T('Felparkering ger inga prickar i körkortet, men upprepade grova överträdelser kan påverka.',
              'Parking fines do not affect the licence directly, but repeated serious offences can.'),
          T('Står fordonet trafikfarligt kan det flyttas på ägarens bekostnad.',
              'A dangerously parked vehicle can be towed at the owner’s expense.'),
        ]),
      ],
    ),
  ],
);
