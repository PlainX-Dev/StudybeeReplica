import 'package:flutter/material.dart';

import '../../core/l10n.dart';
import '../../models/content.dart';

const ch13 = Chapter(
  id: 'ch13',
  number: 13,
  title: T('Fordonet: däck, bromsar, ljus', 'The vehicle: tyres, brakes, lights'),
  summary: T(
    'Däckens mönsterdjup och datum, bromssystem, all belysning, besiktning och de '
        'kontroller du måste kunna göra själv.',
    'Tread depths and dates, braking systems, every lamp on the car, inspection rules and the '
        'checks you are expected to do yourself.',
  ),
  icon: Icons.build_circle_rounded,
  colorIndex: 7,
  minutes: 16,
  sections: [
    Section(
      'ch13.1',
      T('Däck — den viktigaste detaljen på bilen',
          'Tyres — the single most important part of the car'),
      [
        Para(T(
          'Fyra kontaktytor stora som varsin handflata är allt som håller bilen på vägen. '
              'Däckreglerna är därför bland de mest frågade på provet.',
          'Four contact patches, each the size of a palm, are all that keeps the car on the road. Tyre '
              'rules are among the most asked on the test.',
        )),
        Facts([
          (T('Minsta mönsterdjup, sommardäck', 'Minimum tread, summer tyres'), T.same('1,6 mm')),
          (T('Minsta mönsterdjup, vinterdäck', 'Minimum tread, winter tyres'), T.same('3,0 mm')),
          (T('Vinterdäck krävs', 'Winter tyres required'),
              T('1 december – 31 mars vid vinterväglag', '1 December – 31 March in winter road conditions')),
          (T('Dubbdäck tillåtna', 'Studded tyres allowed'),
              T('1 oktober – 15 april (och annars vid vinterväglag)',
                  '1 October – 15 April (and otherwise in winter conditions)')),
          (T('Rekommenderat byte', 'Recommended replacement'),
              T('under 4 mm på vinterdäck, under 3 mm på sommardäck',
                  'below 4 mm winter, below 3 mm summer')),
          (T('Däckets ålder', 'Tyre age'),
              T('gummit hårdnar — byt efter ca 10 år oavsett mönster',
                  'rubber hardens — replace after about 10 years regardless of tread')),
        ]),
        Bullets([
          T('Vinterväglag = snö, is, snömodd eller frost på någon del av vägen.',
              'Winter road conditions = snow, ice, slush or frost on any part of the road.'),
          T('Samma sorts däck måste sitta runt om — blanda inte dubbat och odubbat.',
              'The same type of tyre must be fitted all round — never mix studded and unstudded.'),
          T('För lågt lufttryck ger högre bränsleförbrukning, sämre styrning, varmare däck och '
              'ökad risk för vattenplaning.',
              'Under-inflation means more fuel, worse steering, hotter tyres and a higher risk of aquaplaning.'),
          T('Kontrollera lufttrycket på kalla däck, minst en gång i månaden.',
              'Check pressures on cold tyres, at least once a month.'),
          T('Har du bäst däck bak blir bilen stabilare — nya däck ska sitta bak.',
              'The best tyres belong on the rear axle — that keeps the car stable.'),
          T('Slitagevarnare (TWI) i mönstret visar när 1,6 mm är nått.',
              'Tread wear indicators (TWI) in the grooves show when 1.6 mm is reached.'),
        ]),
        Hook(T(
          'Datumen: 1/12–31/3 måste du ha vinterdäck (vid vinterväglag). 1/10–15/4 får du ha dubbar. '
              'Dubbfönstret är bredare än kravfönstret — dubbarna får komma tidigare och stanna längre.',
          'The dates: 1 Dec – 31 Mar you must have winter tyres (in winter conditions). 1 Oct – 15 Apr you '
              'may have studs. The stud window is wider than the requirement window — studs come earlier and stay longer.',
        )),
        Trap(T(
          'Vinterdäckskravet gäller vid vinterväglag under perioden — inte automatiskt hela vintern. '
              'Är vägen bar och torr den 5 januari är sommardäck lagligt, men sällan klokt.',
          'The winter tyre requirement applies in winter conditions during the period — not automatically all '
              'winter. On a bare dry road on 5 January, summer tyres are legal but rarely wise.',
        )),
      ],
    ),
    Section(
      'ch13.2',
      T('Bromsar och stödsystem', 'Brakes and assistance systems'),
      [
        Bullets([
          T('ABS hindrar hjulen från att låsa sig så att du kan styra samtidigt som du bromsar. '
              'Bromssträckan blir inte alltid kortare — på grus och nysnö kan den bli längre.',
              'ABS stops the wheels locking so you can steer while braking. It does not always shorten the '
                  'braking distance — on gravel and fresh snow it can be longer.'),
          T('Med ABS: tryck hårt och håll kvar. Pumpa inte. Pedalen vibrerar — det är normalt.',
              'With ABS: press hard and hold. Do not pump. The pedal judders — that is normal.'),
          T('ESP/ESC är antisladdsystem som bromsar enskilda hjul för att räta upp bilen.',
              'ESP/ESC is stability control, braking individual wheels to straighten the car.'),
          T('Bromsassistans (BAS) ger full bromskraft vid panikinbromsning.',
              'Brake assist (BAS) delivers full braking force in an emergency stop.'),
          T('Bromsvätska drar åt sig fukt och ska bytas ungefär vartannat år, annars kan bromsarna '
              'koka bort vid långa nedförsbackar.',
              'Brake fluid absorbs moisture and should be changed roughly every two years, otherwise the '
                  'brakes can boil away on long descents.'),
          T('I långa utförsbackar: motorbromsa på låg växel i stället för att ligga på bromsen. '
              'Överhettade bromsar tappar effekt (fading).',
              'On long descents: engine brake in a low gear instead of riding the brakes. Overheated brakes '
                  'lose effect (fading).'),
          T('Efter körning genom djupt vatten: bromsa lätt några gånger för att torka bromsarna.',
              'After driving through deep water: brake gently a few times to dry the brakes.'),
        ]),
        Facts([
          (T('Parkeringsbroms', 'Parking brake'),
              T('verkar på bakhjulen', 'acts on the rear wheels')),
          (T('Röd bromsvarningslampa', 'Red brake warning light'),
              T('stanna omedelbart — bromsfel eller låg bromsvätska',
                  'stop at once — brake fault or low fluid')),
          (T('Gul ABS-lampa', 'Amber ABS light'),
              T('ABS ur funktion, vanliga bromsar fungerar', 'ABS disabled, ordinary brakes still work')),
        ]),
        Trap(T(
          'Frågan "blir bromssträckan kortare med ABS?" har svaret: inte nödvändigtvis. '
              'ABS finns för att du ska kunna STYRA under inbromsning.',
          'The question "does ABS shorten braking distance?" answers: not necessarily. ABS exists so you can '
              'STEER while braking.',
        )),
      ],
    ),
    Section(
      'ch13.3',
      T('Belysning', 'Lights'),
      [
        Facts([
          (T('Halvljus', 'Dipped beam'),
              T('ska användas i mörker, gryning, skymning och vid dålig sikt',
                  'must be used in darkness, dawn, dusk and poor visibility')),
          (T('Varselljus/DRL', 'Daytime running lights'),
              T('räcker i dagsljus, men inte vid dålig sikt — de lyser inte bakåt',
                  'enough in daylight, but not in poor visibility — they do not light the rear')),
          (T('Helljus', 'Main beam'),
              T('släck vid möte, vid kö bakom annan bil och i belyst tätort',
                  'switch off when meeting, when following another car and in lit urban areas')),
          (T('Dimljus fram', 'Front fog lights'),
              T('får användas vid dimma, snöfall eller kraftigt regn',
                  'may be used in fog, snowfall or heavy rain')),
          (T('Dimbakljus', 'Rear fog light'),
              T('endast vid dimma eller snöfall — bländar annars bakomvarande',
                  'only in fog or snowfall — otherwise it dazzles the driver behind')),
          (T('Positionsljus (parkeringsljus)', 'Position lights'),
              T('räcker aldrig som körljus i mörker', 'never enough as driving light in darkness')),
        ]),
        Bullets([
          T('Halvljus når ungefär 50–75 meter. Kör du i 90 km/h är stoppsträckan längre än så — '
              'därför ska du sänka farten i mörker.',
              'Dipped beam reaches about 50–75 metres. At 90 km/h your stopping distance is longer than that '
                  '— which is why you slow down at night.'),
          T('Helljus når 100 meter eller mer och ska användas när du får.',
              'Main beam reaches 100 metres or more and should be used whenever allowed.'),
          T('Blir du bländad: sänk farten, titta mot högra vägkanten, blinka inte tillbaka.',
              'If you are dazzled: slow down, look towards the right-hand edge, do not flash back.'),
          T('Trasiga lampor är en vanlig anmärkning vid besiktning och kan ge böter.',
              'Broken lamps are a common inspection remark and can earn a fine.'),
        ]),
        Hook(T(
          'Dimbakljuset är starkt som en bromslykta. Regel: det får bara lysa när du knappt ser '
              'bilen framför. Glömmer du det på i regn blir du den som blir tutad på.',
          'The rear fog light is as bright as a brake lamp. Rule: it may only glow when you can barely see the '
              'car ahead. Forget it on in rain and you become the one being honked at.',
        )),
      ],
    ),
    Section(
      'ch13.4',
      T('Besiktning, service och kontroller', 'Inspection, service and checks'),
      [
        Facts([
          (T('Första kontrollbesiktning', 'First inspection'),
              T('senast 36 månader efter första registrering', 'no later than 36 months after first registration')),
          (T('Andra besiktningen', 'Second inspection'),
              T('senast 24 månader efter den första', 'no later than 24 months after the first')),
          (T('Därefter', 'After that'), T('senast var 14:e månad', 'no later than every 14 months')),
          (T('Utebliven besiktning', 'Missed inspection'), T('körförbud', 'driving ban')),
          (T('Föreläggande om ny besiktning', 'Order for re-inspection'),
              T('vid anmärkning i kategori 2 — inom 1 månad',
                  'for a category 2 remark — within 1 month')),
        ]),
        Head(T('Vad du själv ska kunna kontrollera', 'What you should be able to check yourself')),
        Bullets([
          T('Däckens mönsterdjup, lufttryck och skador.', 'Tread depth, pressure and damage.'),
          T('All belysning — be någon titta, eller använd en vägg eller ett skyltfönster.',
              'All lights — get someone to look, or use a wall or shop window.'),
          T('Motorolja, kylarvätska, spolarvätska och bromsvätska.',
              'Engine oil, coolant, washer fluid and brake fluid.'),
          T('Torkarblad och rutans skick — stenskott i förarens synfält är en besiktningsanmärkning.',
              'Wipers and the windscreen — a chip in the driver’s field of view is an inspection remark.'),
          T('Att bältena löper fritt och låser vid ryck.',
              'That the belts run freely and lock when tugged.'),
          T('Bromsverkan — testa försiktigt när du börjar köra.',
              'Brake response — test gently as you set off.'),
        ]),
        Head(T('Varningslampor', 'Warning lights')),
        TableBlock(
          [T('Lampa', 'Light'), T('Betyder', 'Means'), T('Gör så här', 'Do this')],
          [
            [
              T('Röd oljekanna', 'Red oil can'),
              T('lågt oljetryck', 'low oil pressure'),
              T('stanna genast, stäng av motorn', 'stop at once, switch off the engine')
            ],
            [
              T('Röd termometer', 'Red thermometer'),
              T('motorn överhettad', 'engine overheating'),
              T('stanna, låt svalna, öppna inte locket', 'stop, let it cool, do not open the cap')
            ],
            [
              T('Röd batterisymbol', 'Red battery symbol'),
              T('laddningen fungerar inte', 'charging has failed'),
              T('stäng av strömförbrukare, kör till verkstad', 'switch off consumers, drive to a garage')
            ],
            [
              T('Gul motorsymbol', 'Amber engine symbol'),
              T('fel i motorstyrning/avgasrening', 'engine or emissions fault'),
              T('boka verkstad snart', 'book a garage soon')
            ],
            [
              T('Röd bromssymbol', 'Red brake symbol'),
              T('bromsfel eller åtdragen p-broms', 'brake fault or parking brake on'),
              T('stanna och kontrollera', 'stop and check')
            ],
          ],
        ),
        Hook(T(
          'Färgkoden är hela svaret: RÖD = stanna nu. GUL = fixa snart. GRÖN/BLÅ = bara information '
              '(blå = helljuset lyser).',
          'The colour code is the whole answer: RED = stop now. AMBER = fix soon. GREEN/BLUE = information '
              'only (blue = main beam is on).',
        )),
      ],
    ),
  ],
);
