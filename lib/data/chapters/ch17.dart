import 'package:flutter/material.dart';

import '../../core/l10n.dart';
import '../../models/content.dart';

const ch17 = Chapter(
  id: 'ch17',
  number: 17,
  title: T('Väglag, väder och mörker', 'Road conditions, weather and darkness'),
  summary: T(
    'Halka, vattenplaning, dimma, sol, snö, vilt och konsten att köra när du ser sämre '
        'än du tror.',
    'Ice, aquaplaning, fog, low sun, snow, wildlife — and driving when you see less than you think.',
  ),
  icon: Icons.ac_unit_rounded,
  colorIndex: 3,
  minutes: 14,
  sections: [
    Section(
      'ch17.1',
      T('Friktion och halka', 'Grip and slippery roads'),
      [
        Para(T(
          'Friktion är allt. Bromssträckan på isig väg kan bli tio gånger längre än på torr asfalt — '
              'och du har exakt lika mycket friktion att fördela mellan att bromsa och att styra.',
          'Grip is everything. Braking distance on ice can be ten times longer than on dry asphalt — and you '
              'have exactly the same amount of grip to share between braking and steering.',
        )),
        Facts([
          (T('Torr asfalt', 'Dry asphalt'), T('friktion ca 0,8', 'friction about 0.8')),
          (T('Våt asfalt', 'Wet asphalt'), T('friktion ca 0,4', 'friction about 0.4')),
          (T('Snö', 'Snow'), T('friktion ca 0,2', 'friction about 0.2')),
          (T('Is', 'Ice'), T('friktion ca 0,1 — tio gånger längre bromssträcka',
              'friction about 0.1 — ten times the braking distance')),
          (T('Farligast temperatur', 'Most dangerous temperature'),
              T('runt 0 °C — isen blir blöt och hal', 'around 0 °C — the ice turns wet and slick')),
        ]),
        Bullets([
          T('Broar, viadukter och skuggiga partier fryser först — det blåser under dem.',
              'Bridges, viaducts and shaded stretches freeze first — air passes under them.'),
          T('Underkylt regn ger ett glashalt lager på sekunder.',
              'Freezing rain lays down a glass-slick layer in seconds.'),
          T('Testa väglaget försiktigt när du börjar köra, där ingen är bakom dig.',
              'Test the grip gently as you set off, where nobody is behind you.'),
          T('Vid sladd: släpp gasen, trampa ur kopplingen och styr dit du vill åka. '
              'Bromsa inte hårt utan ABS.',
              'In a skid: release the throttle, depress the clutch and steer where you want to go. Do not brake '
                  'hard without ABS.'),
          T('Överstyrning = bakvagnen glider ut. Understyrning = bilen vill rakt fram trots att du '
              'vrider på ratten; då hjälper det att minska gasen och rätta upp ratten något.',
              'Oversteer = the rear slides out. Understeer = the car ploughs straight on despite steering; ease '
                  'off the throttle and unwind the wheel slightly.'),
        ]),
        Hook(T(
          'Friktionstalen som en trappa nedåt: torrt 0,8 – vått 0,4 – snö 0,2 – is 0,1. '
              'Varje steg halverar greppet och dubblar bromssträckan.',
          'The friction numbers as a staircase down: dry 0.8 – wet 0.4 – snow 0.2 – ice 0.1. Each step halves '
              'the grip and doubles the braking distance.',
        )),
      ],
    ),
    Section(
      'ch17.2',
      T('Vattenplaning', 'Aquaplaning'),
      [
        Para(T(
          'Vattenplaning innebär att däcket lyfter från vägbanan och flyter på en vattenkil. '
              'Då har du varken styrning eller bromsverkan — bilen är en båt.',
          'Aquaplaning means the tyre lifts off the road and floats on a wedge of water. You then have neither '
              'steering nor braking — the car is a boat.',
        )),
        Facts([
          (T('Risken ökar med', 'Risk increases with'),
              T('hög fart, slitna däck, lågt lufttryck och djupt vatten',
                  'high speed, worn tyres, low pressure and deep water')),
          (T('Kan börja redan vid', 'Can start already at'), T.same('70–80 km/h')),
          (T('Känns som', 'Feels like'),
              T('ratten blir lätt, motorljudet ändras, bilen "flyter"',
                  'the wheel goes light, engine note changes, the car "floats"')),
        ]),
        Steps([
          T('Släpp gasen mjukt — bromsa inte, styr inte häftigt.',
              'Ease off the throttle — do not brake, do not steer sharply.'),
          T('Håll ratten rakt och vänta tills däcken får kontakt igen.',
              'Hold the wheel straight and wait for the tyres to regain contact.'),
          T('Sänk sedan farten ordentligt.', 'Then reduce speed properly.'),
        ]),
        Trap(T(
          'Djupa spår i vägbanan samlar vatten. Kör i sidan av spåret, inte mitt i det, '
              'när det regnar mycket.',
          'Deep ruts collect water. In heavy rain drive on the shoulder of the rut, not in the middle of it.',
        )),
      ],
    ),
    Section(
      'ch17.3',
      T('Mörkerkörning', 'Driving in darkness'),
      [
        Bullets([
          T('Använd helljus så ofta du får. Växla till halvljus i god tid vid möte och när du '
              'kommer upp bakom någon.',
              'Use main beam whenever you may. Dip in good time when meeting and when catching up with someone.'),
          T('Du ska kunna stanna inom den sträcka du ser — halvljus räcker till ungefär 70 km/h.',
              'You must be able to stop within the distance you can see — dipped beam supports roughly 70 km/h.'),
          T('Bländas du: sänk farten, titta mot högra vägkanten och följ vägmarkeringen.',
              'If dazzled: slow down, look towards the right-hand edge and follow the line.'),
          T('En mörkklädd gående syns i ungefär 25 meter med halvljus, en med reflex i 125 meter.',
              'A pedestrian in dark clothing shows up at about 25 metres on dipped beam; with a reflector, 125 metres.'),
          T('Håll rutorna rena både utvändigt och invändigt — smuts sprider ljus och blänker.',
              'Keep the glass clean inside and out — dirt scatters light and creates glare.'),
          T('Sänk instrumentbelysningen så att ögonen får jobba mot mörkret utanför.',
              'Dim the dashboard so your eyes work against the darkness outside.'),
        ]),
        Facts([
          (T('Halvljusets räckvidd', 'Range of dipped beam'), T.same('50–75 m')),
          (T('Helljusets räckvidd', 'Range of main beam'), T('100 m eller mer', '100 m or more')),
          (T('Mörkklädd gående syns', 'Pedestrian in dark clothes seen at'), T.same('~25 m')),
          (T('Med reflex syns', 'With a reflector seen at'), T.same('~125 m')),
          (T('Ögats mörkeranpassning', 'Eye adaptation to darkness'), T.same('20–30 min')),
        ]),
        Hook(T(
          '25 meter utan reflex — kortare än din stoppsträcka i 50. Det är hela argumentet för '
              'varför reflexer räddar liv.',
          '25 metres without a reflector — shorter than your stopping distance at 50. That single number is '
              'the whole argument for reflectors.',
        )),
      ],
    ),
    Section(
      'ch17.4',
      T('Dimma, sol, regn och snö', 'Fog, sun, rain and snow'),
      [
        Bullets([
          T('I dimma: halvljus eller dimljus, aldrig helljus — ljuset studsar tillbaka.',
              'In fog: dipped or fog lights, never main beam — the light bounces back at you.'),
          T('Dimman gör att du underskattar din fart. Titta på hastighetsmätaren, inte på känslan.',
              'Fog makes you underestimate your speed. Look at the speedometer, not at the feeling.'),
          T('Lågt stående sol är lika förrädisk som dimma. Sänk solskyddet, håll rutan ren, sänk farten.',
              'Low sun is as treacherous as fog. Use the visor, keep the glass clean, slow down.'),
          T('Vid kraftigt regn: öka avståndet till minst 6 sekunder och tänd halvljus så du syns.',
              'In heavy rain: increase the gap to at least 6 seconds and switch on dipped beam so you are seen.'),
          T('Snöfall: sänk farten kraftigt, håll extra avstånd och undvik plötsliga rattrörelser.',
              'Snowfall: cut your speed hard, keep extra distance and avoid sudden steering.'),
          T('Sopa av hela bilen, inte bara en glugg — snö från taket blir en vägg för den bakom.',
              'Clear the whole car, not just a peephole — snow off the roof becomes a wall for the driver behind.'),
          T('Blåst: håll stadigt i ratten vid broar, vid utfart ur skogsparti och när du passerar '
              'en lastbil.',
              'Wind: hold the wheel firmly on bridges, coming out of forest cover and passing a lorry.'),
        ]),
        SignRow(['A24', 'A10'],
            caption: T('Varning för sidvind och för slirig väg',
                'Warning for crosswind and for a slippery road')),
      ],
    ),
    Section(
      'ch17.5',
      T('Vilt och djur', 'Wildlife and animals'),
      [
        Bullets([
          T('Störst risk i gryning och skymning, samt under maj och oktober–november.',
              'Highest risk at dawn and dusk, and during May and October–November.'),
          T('Ser du ett djur: räkna med fler. Älg och rådjur rör sig i grupp.',
              'If you see one animal, expect more. Elk and deer move in groups.'),
          T('Bromsa hårt och rakt hellre än att väja — undvikande manövrar i hög fart '
              'slutar oftast i diket eller i mötande.',
              'Brake hard and straight rather than swerve — evasive action at speed usually ends in the ditch '
                  'or in oncoming traffic.'),
          T('Vid viltolycka: du är skyldig att märka ut platsen och anmäla till polisen (112), '
              'även om djuret sprang vidare.',
              'After hitting wildlife you must mark the spot and report it to the police (112), even if the '
                  'animal ran off.'),
          T('Anmälningsplikten gäller älg, rådjur, hjort, vildsvin, björn, varg, järv, lo, utter '
              'och örn.',
              'The duty to report covers elk, roe deer, red deer, wild boar, bear, wolf, wolverine, lynx, otter '
                  'and eagle.'),
        ]),
        Facts([
          (T('Anmäl viltolycka', 'Report a wildlife collision'), T('112 — alltid', '112 — always')),
          (T('Markera olycksplatsen', 'Mark the spot'),
              T('med viltremsa eller något synligt', 'with a marker or anything visible')),
          (T('Högriskperiod', 'High-risk period'),
              T('gryning, skymning, maj och okt–nov', 'dawn, dusk, May and Oct–Nov')),
        ]),
        Trap(T(
          'Att inte anmäla en viltolycka är ett brott — även om bilen är oskadd och djuret '
              'försvann in i skogen. Det skadade djuret måste spåras.',
          'Failing to report a wildlife collision is an offence — even if the car is undamaged and the animal '
              'ran into the forest. The injured animal has to be tracked.',
        )),
      ],
    ),
  ],
);
